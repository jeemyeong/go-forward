import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import SuccessOverlay from './SuccessOverlay';
import FailOverlay from './FailOverlay';
import home_icon from '../img/home_icon.png'
import random_text from '../img/random_text.png'
import sky_start_btn from '../img/sky_start_btn.png'

@inject("quizStore")
@observer
class RandomQuizApp extends Component {
  render() {
    const { gameStart, quizState } = this.props.quizStore;
    if (quizState.gameType !== "random") {
      this.props.quizStore.setGameType("random")
      return null;
    }
  
    const { started, showLastQuiz, remainSec, showLastAnswer, successVisible, failVisible } = quizState;
    return (
        <div>
          <SuccessOverlay
            visible={successVisible}
          />
          <FailOverlay
            visible={failVisible}
          />
          <Header/>
          <div className="RandomQuizApp fadeInLeft animated">
              <div className="sub_header">
                  <div className="go_home">
                      <Link to="/go-forward">
                          <img src= { home_icon } alt="홈"/>
                      </Link>
                  </div>
                  <div className="title_wrap">
                      <img src= { random_text } alt="랜덤퀴즈"/>
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
                      {started ? showLastQuiz[1] : null}

                  </span>

                  <span className="one_word sky">
                      {started? showLastAnswer[0] : null}
                  </span>

                  <span className="one_word sky">
                      {started? showLastAnswer[1] : null}
                </span>
              </div>
              <button
                onClick={gameStart}
              >
                <img src={ sky_start_btn } alt=""/>
            </button>

          </div>
        </div>
    );
  }
}

export default RandomQuizApp;
