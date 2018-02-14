import {observable, action} from 'mobx';
import axios from 'axios';
import config from '../config.json'
import ddang from '../ddang.mp3';
import _ from 'partial-js';

export class QuizStore {
  @observable
  quizState = {
    quizList: [],
    answerList: [],
    showLastQuiz: "",
    showLastAnswer: "",
    index: 0,
    remainSec: 0,
    correctAnswerList: [],
    wrongAnswerList: [],
    recording: false,
    utterance: null,
    recognition: null,
    started: false,
    texts: [
    ],
    ddang: null,
    quizData: null,
    successVisible: false,
    failVisible: false,
    gameType: ""
  }

  constructor(props) {
    const recognition = this.initRecognition();
    const utterance = this.initUtterance();
    const audio = new Audio(ddang);
    
    this.quizState = {
      ...this.quizState,
      recognition,
      utterance,
      audio
    }
  }

  setGameType = (gameType) => {
    this.quizState.gameType = gameType
    this.getQuizFromServer()
  }
  
  initRecognition = () => {
    const BrowserSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition;
    const recognition = BrowserSpeechRecognition ? new BrowserSpeechRecognition() : null;
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.start();
    this.delay(10).then(() => recognition.abort())
    
    return recognition;
  }

  initUtterance = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'ko-KR';
    utterance.rate = 0.7;

    return utterance;
  }

  @action
  gameStart = () => {
    const state = {
      ...this.quizState,
      started: true,
      showLastQuiz: "",
      showLastAnswer: "",
      correctAnswerList: [],
      wrongAnswerList: []
    }
    this.quizState = state;
    this.nextQuiz();
  }

  nextQuiz = () => {
    const {quizList, index} = this.quizState;
    if(quizList.length === index){
      this.quizEnded();
      return null;
    }
    this.textToSpeech(quizList[index]);
    this.delay(500).then(this.recordAnswer);
  }

  getQuizFromServer = () => {
    const url = config.server.url;
    const req = `${url}/${this.quizState.gameType}`;
    axios.get(req).then( res => {this.pushQuizDataIntoQuizState(res.data)})
  }

  @action
  pushQuizDataIntoQuizState = (quizData) => {
    const state = {
      ...this.quizState,
      quizList: [],
      answerList: [],
      quizData
    }
    state.quizList = _.go(quizData.results,
      _.map(_.val("quiz"))
    )
    state.answerList = _.go(quizData.results,
      _.map(_.pipe(_.val("answer_list"), answer => answer.split("|")))
    )
    this.quizState = state;
  }

  textToSpeech = (text) => {
    const synth = window.speechSynthesis;
    const {utterance} = this.quizState;
    utterance.text = text;
    synth.speak(utterance);
  }

  @action
  recordAnswer = () => {
    const {recognition, index, recording, quizList} = this.quizState;
    this.acceptAnswer()
    console.log(this.quizState.quizList[index]+" 녹음시작");
    if(!recording){
      const state = {
        ...this.quizState,
        recording: true,
        showLastQuiz: quizList[index],
        showLastAnswer: "",
      }
      this.quizState = state;
      
      recognition.start();
    }

    this.delay(4000).then(() => {
      this.timeOver(index);
    })
    this.countDown(index);
  }

  @action
  countDown = (index, remainSec = 4000) => {
    console.log(this.quizState.index, index, remainSec);
    if (remainSec <= 0 || this.quizState.index !== index){
      return;
    }
    const state = {
      ...this.quizState,
      remainSec: remainSec
    }
    this.quizState = state;
    setTimeout(() => {
      this.countDown(index, remainSec-1000)
    }, 1000);
  }

  timeOver = (index) => {
    if (this.quizState.index === index){
      this.failAnswer();
    }
  }

  @action
  successAnswer = (answer) => {
    const {recognition, index, correctAnswerList, quizList, answerList} = this.quizState;
    const quizData = [
      ...this.quizState.quizData,
    ]
    console.log(this.quizState.quizList[index]+" 정답");
    this.textToSpeech("정답");
    correctAnswerList.push(quizList[index]+answer)
    const state = {
      ...this.quizState,
      quizData,
      showLastQuiz: quizList[index],
      showLastAnswer: answerList[index][0],
      correctAnswerList,
      recording: false,
      index: index+1,
      successVisible: true
    }
    this.quizState = state;
    this.delay(500).then(() => {this.quizState.successVisible = false; this.nextQuiz()})
    recognition.abort();
  }
  @action
  failAnswer = () => {
    const {recognition, quizList, answerList, wrongAnswerList, index} = this.quizState;
    wrongAnswerList.push(quizList[index]+answerList[index][0])
    const quizData = [
      ...this.quizState.quizData,
    ]
    const state = {
      ...this.quizState,
      recording: false,
      index: index+1,
      failVisible: true,
      quizData
    }
    this.quizState = state;
    this.delay(1000).then(() => {this.quizState.failVisible = false})

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
        texts: ""
      }
      state.texts = _.go(event.results,
        _.first,
        _.first,
        _.val("transcript")
      )
      this.quizState = state;
      this.identifyAnswer(index, state.texts);
    }
  }

  identifyAnswer = (index, userAnswer) => {
    const splicedUserAnswer = userAnswer.substring(userAnswer.length-2, userAnswer.length);
    const {answerList} = this.quizState
    _.go(answerList[index],
      answerList => answerList.toJS(),
      _.find(answer => answer === splicedUserAnswer),
      _.if2(_.identity)(() => this.successAnswer(splicedUserAnswer))
    )
  }

  @action
  quizEnded = () => {
    const {quizList, index, answerList} = this.quizState;
    const state = {
      ...this.quizState,
      showLastQuiz: quizList[index-1],
      showLastAnswer: answerList[index-1][0],
      index: 0,
      texts: []
    }
    this.quizState = state;
    this.getQuizFromServer("four")
  }

  postNewQuiz = (question, answer) => {
    const quiz = {
      question,
      answer
    }
    const url = config.server.url;
    const req = url + "/four";
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

export default new QuizStore();