import React from 'react';
import Main from './app/Main';
import FourQuizApp from './app/FourQuizApp';
import LionQuizApp from './app/LionQuizApp';
import NineQuizApp from './app/NineQuizApp';
import RandomQuizApp from './app/RandomQuizApp';
import Howto from './layout/Howto';
import { Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {
    render(){
        return (
            <div className="gf_pagewrap">
                <Router>
                    <Switch>
                        <Route exact path={`/go-forward`} component={Main}/>
                        <Route exact path={`/go-forward/four`} component={FourQuizApp}/>
                        <Route exact path={`/go-forward/lion`} component={LionQuizApp}/>
                        <Route exact path={`/go-forward/nine`} component={NineQuizApp}/>
                        <Route exact path={`/go-forward/random`} component={RandomQuizApp}/>
                        <Route exact path={`/go-forward/howto`} component={Howto}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
