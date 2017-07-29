import React from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

class Layout extends React.Component {
    render(){

        return (
            <div className="gf_pagewrap">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

export default Layout;
