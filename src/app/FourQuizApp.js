import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Link } from 'react-router-dom';
import Header from './layout/Header';
import SuccessOverlay from './SuccessOverlay';
import FailOverlay from './FailOverlay';
import home_icon from '../img/home_icon.png'
import four_text from '../img/four_text.png'
import purple_start_btn from '../img/purple_start_btn.png'

@inject("fourQuizStore")
@observer
class FourQuizApp extends Component {
  render() {
    const { gameStart, quizState } = this.props.fourQuizStore;
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
          <div className="FourQuizApp fadeInLeft animated">
              <div className="sub_header">
                  <div className="go_home">
                      <Link to="/go-forward">
                          <img src= { home_icon } alt="홈"/>
                      </Link>
                  </div>
                  <div className="title_wrap">
                      <img src= { four_text } alt="일상단어"/>
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

                  <span className="one_word purple">
                      {started? showLastAnswer[0] : null}
                  </span>

                  <span className="one_word purple">
                      {started? showLastAnswer[1] : null}
                </span>
              </div>
            <button
              onClick={gameStart}
            >
              <img src={purple_start_btn} alt=""/>
            </button>

          </div>
        </div>
    );
  }
}

export default FourQuizApp;
