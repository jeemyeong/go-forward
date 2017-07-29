import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Link } from 'react-router-dom';
import Header from './layout/Header';
import home_icon from '../img/home_icon.png'
import four_text from '../img/four_text.png'

@inject("fourQuizStore")
@observer
class FourQuizApp extends Component {
  render() {
  const { gameStart, quizState } = this.props.fourQuizStore;
  const { quizList, index, texts, playingGame, remainSec, correctAnswerList, wrongAnswerList } = quizState;
    return (
        <div>
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
                      {playingGame ? quizList[index][0] : null}


                  </span>
                  <span className="one_word black">
                      {playingGame ? quizList[index][1] : null}

                  </span>

                  <span className="one_word purple">
                      {correctAnswerList.map((correctAnswer, index) => (

                              <span key={index}>
                                  {correctAnswer[2]}
                              </span>

                      ))}
                      {wrongAnswerList.map((wrongAnswer, index) => (

                              <span key={index}>
                                  {wrongAnswer[2]}
                              </span>

                      ))}
                  </span>

                  <span className="one_word purple">
                      {correctAnswerList.map((correctAnswer, index) => (

                              <span key={index}>
                                  {correctAnswer[3]}
                              </span>

                      ))}

                      {wrongAnswerList.map((wrongAnswer, index) => (

                              <span key={index}>
                                  {wrongAnswer[3]}
                              </span>

                      ))}
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

export default FourQuizApp;