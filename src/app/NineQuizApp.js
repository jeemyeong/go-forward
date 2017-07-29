
import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { Link } from 'react-router-dom';
import Header from './layout/Header';
import home_icon from '../img/home_icon.png'
import nine_text from '../img/nine_text.png'

@inject("nineQuizStore")
@observer
class NineQuizApp extends Component {
  render() {
  const { gameStart, quizState } = this.props.nineQuizStore;
  const { quizList, index, texts, playingGame, remainSec, correctAnswerList, wrongAnswerList } = quizState;
    return (
        <div>
          <Header/>
          <div className="NineQuizApp fadeInLeft animated">
              <div className="sub_header">
                  <div className="go_home">
                      <Link to="/go-forward">
                          <img src= { home_icon } alt="홈"/>
                      </Link>
                  </div>
                  <div className="title_wrap">
                      <img src= { nine_text } alt="구구단"/>
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
                      {playingGame ? "x" : "x"}

                  </span>
                  <span className="one_word black">
                      {playingGame ? quizList[index][2] : null}

                  </span>

                  <span className="one_word green">
                      {correctAnswerList.map((correctAnswer, index) => (

                              <span key={index}>
                                  {correctAnswer[3]}{correctAnswer[4]}
                              </span>

                      ))}
                      {wrongAnswerList.map((wrongAnswer, index) => (

                              <span key={index}>
                                  {wrongAnswer[3]}{wrongAnswer[4]}
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

export default NineQuizApp;
