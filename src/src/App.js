import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

@inject("quizStore")
@observer
class App extends Component {
  render() {
  const { gameStart, quizState } = this.props.quizStore;
  const { quizList, index, texts, playingGame, remainSec } = quizState;
    return (
      <div className="App">
        <button
          onClick={gameStart}
        >
          게임시작
        </button>
        <div>
          질문: {playingGame && !!quizList[index]? quizList[index].substring(0,2): null}
        </div>
        <div>
          남은시간: {remainSec}
        </div>
        <div>
          당신의 답변:
          {texts.map((text, index) => (
            <div key={index}>
              {text}
            </div>
          ))}
        </div>
        <div>
          정답:
          {this.props.quizStore.quizState.correctAnswerList.map((correctAnswer, index) => (
            <div key={index}>
              {correctAnswer}
            </div>
          ))}
        </div>    
      </div>    
    );
  }
}

export default App;
