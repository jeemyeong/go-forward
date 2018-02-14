import React from 'react';
import Main from './main/Main';
import FourQuizApp from './FourQuizApp';
import LionQuizApp from './LionQuizApp';
import NineQuizApp from './NineQuizApp';
import RandomQuizApp from './RandomQuizApp';
import Howto from './layout/Howto';
import { Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

class Layout extends React.Component {
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

export default Layout;
