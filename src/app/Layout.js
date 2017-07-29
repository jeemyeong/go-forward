import React from 'react';
import { Link } from 'react-router-dom';
import Header from './layout/Header';
import Main from './layout/Main';

class Layout extends React.Component {
    render(){

        return (
            <div className="gf_pagewrap">
                <Header/>
                <Main/>
            </div>
        );
    }
}

export default Layout;
