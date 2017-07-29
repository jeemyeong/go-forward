import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

@inject("quizStore")
@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <button
          onClick={this.props.quizStore.gameStart}
        >
          게임시작
        </button>
        <div>
          당신의 답변:
          {this.props.quizStore.quizState.texts.map((text, index) => (
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
