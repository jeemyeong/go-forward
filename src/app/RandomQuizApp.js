import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Link } from 'react-router-dom';
import Header from './layout/Header';
import home_icon from '../img/home_icon.png'
import random_text from '../img/random_text.png'

@inject("randomQuizStore")
@observer
class RandomQuizApp extends Component {
  render() {
    const { gameStart, quizState } = this.props.randomQuizStore;
    const { started, showLastQuiz, remainSec, showLastAnswer } = quizState;
    return (
        <div>
          <Header/>
          <div className="RandomQuizApp fadeInLeft animated">
              <div className="sub_header">
                  <div className="go_home">
                      <Link to="/go-forward">
                          <img src= { home_icon } alt="홈"/>
                      </Link>
                  </div>
                  <div className="title_wrap">
                      <img src= { random_text } alt="일상단어"/>
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
              게임시작
            </button>

          </div>
        </div>
    );
  }
}

export default RandomQuizApp;
    
