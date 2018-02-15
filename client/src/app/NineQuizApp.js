import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import SuccessOverlay from './SuccessOverlay';
import FailOverlay from './FailOverlay';
import home_icon from '../img/home_icon.png'
import nine_text from '../img/nine_text.png'
import green_start_btn from '../img/green_start_btn.png'
import Loading from './Loading'

@inject("quizStore")
@observer
class NineQuizApp extends Component {
  render() {
    const { gameStart, quizState } = this.props.quizStore;
    const { started, showLastQuiz, remainSec, showLastAnswer, successVisible, failVisible, quizList, gameType} = quizState;
    if (gameType !== "nine" || quizList.length === 0) {
      this.props.quizStore.setGameType("nine")
      return <Loading/>
    }
    console.log(showLastQuiz);
    return (
        <div>
          <SuccessOverlay
            visible={successVisible}
          />
          <FailOverlay
            visible={failVisible}
          />
          <Header/>
          <div className="NineQuizApp fadeInLeft animated">
              <div className="sub_header">
                  <div className="go_home">
                      <Link to="/go-forward">
                          <img src= { home_icon } alt="홈"/>
                      </Link>
                  </div>
                  <div className="title_wrap">
                      <img src= { nine_text } alt="일상단어"/>
                  </div>
              </div>
              <div className="count_sect">
                  {remainSec / 1000}
              </div>
              <div className="question_sect">
                  <span className="one_word black">
                      {started ? showLastQuiz[0] : null}


                  </span>
                  <span className="one_word black">
                      {started ? showLastQuiz[2] : null}

                  </span>

                  <span className="one_word green">
                      {started? showLastAnswer[0] : null}
                  </span>

                  <span className="one_word green">
                      {started? showLastAnswer[1] : null}
                </span>
              </div>
            <button
              onClick={gameStart}
            >
              <img src={ green_start_btn } alt=""/>
            </button>

          </div>
        </div>
    );
  }
}

export default NineQuizApp;
