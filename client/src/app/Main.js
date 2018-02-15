import React from 'react';
import { Link } from 'react-router-dom';
import {inject} from 'mobx-react';
import Header from '../layout/Header';
import Splash from './Splash';
import lion_text from '../img/lion_text.png'
import four_text from '../img/four_text.png'
import nine_text from '../img/nine_text.png'
import random_text from '../img/random_text.png'
import icon_lion from '../img/icon_lion.png'
import icon_four from '../img/icon_four.png'
import icon_nine from '../img/icon_nine.png'
import icon_random from '../img/icon_random.png'

import howto_text from '../img/howto_text.png'
import howto_icon from '../img/howto_icon.png'

@inject("quizStore")
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedSplash: false
        }
    }
    componentDidMount() {
        setTimeout(()=> {
            this.setState({
                loadedSplash: true
            });
        }, 2500);
    }

    render(){
        if(!this.state.loadedSplash){
            return <Splash/>
        }
        return (
            <div>
                <Header/>
                <main className="gf_main" role="main">
                    <Link to='/go-forward/Howto'>
                        <div className="go_howto fadeIn animated">
                            <img src= { howto_icon } alt=""/><img src= { howto_text } alt=""/>
                        </div>
                    </Link>
                    <div className="row">
                        <div className="col-xs-6">
                            <Link to="/go-forward/lion" onClick={(e) => this.props.quizStore.setGameType("lion")}>
                                <div className="go_lion linkbox_square fadeIn animated">
                                    <div className="icon_wrap">
                                        <img src= { icon_lion } alt=""/>
                                    </div>
                                    <div className="text_wrap">
                                        <img src={ lion_text } alt=""/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-xs-6">
                            <Link to="/go-forward/four" onClick={() => this.props.quizStore.setGameType("four")}>
                                <div className="go_four linkbox_square fadeIn animated">
                                    <div className="icon_wrap">
                                            <img src= { icon_four } alt=""/>
                                    </div>
                                    <div className="text_wrap">
                                        <img src={ four_text } alt=""/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <Link to="/go-forward/nine" onClick={() => this.props.quizStore.setGameType("nine")}>
                                <div className="go_nine linkbox_square fadeIn animated">
                                    <div className="icon_wrap">
                                        <img src= { icon_nine } alt=""/>
                                    </div>
                                    <div className="text_wrap">
                                        <img src={ nine_text } alt=""/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-xs-6">
                            <Link to="/go-forward/random" onClick={() => this.props.quizStore.setGameType("random")}>
                                <div className="go_random linkbox_square fadeIn animated">
                                    <div className="icon_wrap">
                                        <img src= { icon_random } alt=""/>
                                    </div>
                                    <div className="text_wrap">
                                        <img src={ random_text } alt=""/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Main;
