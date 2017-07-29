import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png'


class Header extends React.Component {
    render(){
        return (
            <header className="gf_header" role="banner">
                <img src={ logo } alt="로고"/>
            </header>
        );
    }
}

export default Header;
