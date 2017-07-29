import {observable, action} from 'mobx';

export class QuizStore {
  @observable
  quizState = {
    quizList: ['스타','고진','와이'],
    index: 0,
    remainSec: 0,
    correctAnswerList: [],
    recording: false,
    utterance: null,
    recognition: null,
    playingGame: false,
    texts: [

    ]
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

    this.quizState = {
      ...this.quizState,
      recognition,
      utterance
    }
  }

  @action
  gameStart = () => {
    const {quizList, index} = this.quizState;
    if (index===0){
      const state = {
        ...this.quizState,
        playingGame: true,
        correctAnswerList: []
      }
      this.quizState = state;
    }
    if(quizList.length === index){
      const state = {
        ...this.quizState,
        playingGame: false,
        index: 0,
      }
      this.quizState = state;
      return null;
    }
    this.textToSpeech(quizList[index]);
    this.delay(500).then(()=>this.recordAnswer());
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
    console.log(this.quizState.index +","+ index);
    if (this.quizState.index === index){
      this.failAnswer();
    }
  }
  @action
  successAnswer = () => {
    const {recognition, index, correctAnswerList, quizList} = this.quizState;
    console.log(this.quizState.quizList[index]+" 정답");
    this.textToSpeech("정답");
    correctAnswerList.push(quizList[index])
    const state = {
      ...this.quizState,
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
    const {recognition, index} = this.quizState;
    const state = {
      ...this.quizState,
      recording: false,
      index: index+1,
    }
    this.quizState = state;
    recognition.abort();
    this.textToSpeech("땡");
    console.log(this.quizState.quizList[index]+" 녹음끝");
    this.delay(500).then(this.gameStart());
  }

  @action
  acceptAnswer = () => {
    const {recognition} = this.quizState;
    recognition.onresult = (event) => {
      const state = {
        ...this.quizState,
        texts: [

        ]
      }
      for (let i = 0; i < event.results.length; i++) {
        const cur = event.results[i]
        const text = cur[0].transcript;
        state.texts.push(text)
      }
      this.quizState = state;
      const userAnswer = this.joinStringArray(state.texts);
      this.submitAnswer(userAnswer);
    }
  }
  
  submitAnswer = (userAnswer) => {
    if(userAnswer === '벅스' | userAnswer === '감래' | userAnswer === '파이'){
      this.successAnswer();
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