import React, { Component } from 'react';
import splash from '../img/splash.png'

class Splash extends Component {
  render() {
    return (
      <div className="splash fadeOut">
        <img src={ splash } alt="" className="bounce animated"/>
      </div>
    );
  }
}

export default Splash;
