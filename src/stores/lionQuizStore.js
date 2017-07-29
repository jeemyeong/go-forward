import {observable, action} from 'mobx';
import axios from 'axios';
import config from '../config.json'
import ddang from '../ddang.mp3';

export class LionQuizStore {
  @observable
  quizState = {
    quizList: [],
    answerList: [],
    index: 0,
    remainSec: 0,
    correctAnswerList: [],
    wrongAnswerList: [],
    recording: false,
    utterance: null,
    recognition: null,
    playingGame: false,
    texts: [
    ],
    ddang: null,
    quizData: null
  }

  constructor(props) {
    // Init recognition
    const BrowserSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition;
    const recognition = BrowserSpeechRecognition ? new BrowserSpeechRecognition() : null;
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.start();
    setTimeout(function() {
      recognition.abort();
    }, 10);

    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'ko-KR';
    utterance.rate = 0.3;

    const audio = new Audio(ddang);

    this.quizState = {
      ...this.quizState,
      recognition,
      utterance,
      audio
    }
    this.getQuizFromServer()
  }

  @action
  gameStart = () => {
    const {quizList, index} = this.quizState;
    if (index===0){

      const state = {
        ...this.quizState,
        playingGame: true,
        correctAnswerList: [],
        wrongAnswerList: []
      }
      this.quizState = state;
    }
    if(quizList.length === index){
      this.quizEnded();
      return null;
    }
    this.textToSpeech(quizList[index]);
    this.delay(500).then(()=>this.recordAnswer());
  }

  @action
  getQuizFromServer = () => {
    const url = config.server.url;
    const req = url + "/lion";
    try{
      axios.get(req)
            .then( res => {
              const state = {
                ...this.quizState,
                quizList: [],
                answerList: [],
                quizData: res.data
              }
              res.data.map((quiz, index) => {
                state.quizList.push(quiz.question)
                state.answerList.push(quiz.answer)
                return null;
              })
              this.quizState = state;
            })
    } catch(e){
      console.log(e);
    }
  }
  textToSpeech = (text) => {
    const synth = window.speechSynthesis;
    const {utterance} = this.quizState;
    utterance.text = text;
    synth.speak(utterance);
  }

  @action
  recordAnswer = () => {
    const {recognition, index, recording} = this.quizState;

    this.acceptAnswer()
    console.log(this.quizState.quizList[index]+" 녹음시작");
    if(!recording){
      const state = {
        ...this.quizState,
        recording: true
      }
      this.quizState = state;

      recognition.start();
    }

    this.delay(3000).then(() => {
      this.timeOver(index);
    })
    this.countDown();
  }

  @action
  countDown = (remainSec = 3000) => {
    const state = {
      ...this.quizState,
      remainSec: remainSec
    }
    this.quizState = state;
    if (remainSec <= 0){
      return;
    }
    setTimeout(() => {
      this.countDown(remainSec-1000)
    }, 1000);
  }
  timeOver = (index) => {
    if (this.quizState.index === index){
      this.failAnswer();
    }
  }
  @action
  successAnswer = (answer) => {
    const {recognition, index, correctAnswerList, quizList} = this.quizState;
    const quizData = [
      ...this.quizState.quizData,
    ]
    quizData[index].answer_yn = 1
    quizData[index].exam_yn = 1
    console.log(this.quizState.quizList[index]+" 정답");
    this.textToSpeech("정답");
    correctAnswerList.push(quizList[index]+answer)
    const state = {
      ...this.quizState,
      quizData,
      correctAnswerList,
      recording: false,
      index: index+1,
    }
    this.quizState = state;
    recognition.onresult = null;
    recognition.abort();
    this.delay(500).then(this.gameStart());
  }
  @action
  failAnswer = () => {
    const {recognition, quizList, answerList, wrongAnswerList, index} = this.quizState;
    wrongAnswerList.push(quizList[index]+answerList[index][0])
    const quizData = [
      ...this.quizState.quizData,
    ]
    quizData[index].exam_yn = 1
    const state = {
      ...this.quizState,
      recording: false,
      index: index+1,
      quizData
    }
    this.quizState = state;
    recognition.abort();
    this.quizState.audio.play();
    console.log(this.quizState.quizList[index]+" 녹음끝");
    this.quizEnded();
  }

  @action
  acceptAnswer = () => {
    const {recognition, index} = this.quizState;
    recognition.onresult = (event) => {
      const state = {
        ...this.quizState,
        texts: []
      }
      for (let i = 0; i < event.results.length; i++) {
        const cur = event.results[i]
        const text = cur[0].transcript;
        state.texts.push(text)
      }
      this.quizState = state;
      const userAnswer = this.joinStringArray(state.texts);
      this.identifyAnswer(index, userAnswer);
    }
  }

  identifyAnswer = (index, userAnswer) => {
    const {quizList, answerList} = this.quizState
    for (let i = 0; i < answerList[index].length; i++) {
      if(userAnswer === answerList[index][i] || userAnswer === (quizList[index] + answerList[index][i])){
        this.successAnswer(userAnswer.substring(userAnswer.length-2,userAnswer.length));
        break
      }
    }
  }

  @action
  quizEnded = async () => {
    await this.putQuizDataToServer()
    const state = {
      ...this.quizState,
      playingGame: false,
      index: 0,
      texts: []
    }
    this.quizState = state;
    this.getQuizFromServer()
  }

  putQuizDataToServer = async () => {
    const quizData = [
      ...this.quizState.quizData
    ]
    for (let i = 0; i < quizData.length; i++) {
      quizData[i] = {
        ...quizData[i],
        answer: quizData[i].answer.slice()
      }
    }
    console.log(quizData);

    const url = config.server.url;
    const req = url + "/lion";
    try{
      await axios.put(req,quizData)
            .then( res => {
              console.log(res);
            })
    } catch(e){
      console.log(e);
    }
  }

  postNewQuiz = (question, answer) => {
    const quiz = {
      question,
      answer
    }
    const url = config.server.url;
    const req = url + "/lion";
    try{
      axios.post(req, quiz)
            .then( res => {
              console.log(res);
            })
    } catch(e){
      console.log(e);
    }
  }

  joinStringArray = (ary) => {
    let ret = "";
    for (let i = 0; i < ary.length; i++) {
      ret+=ary[i];
    }
    return ret;
  }

  delay = (t) => new Promise((resolve) => {
    setTimeout(resolve, t)
  });

}

export default new LionQuizStore();
