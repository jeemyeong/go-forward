import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import howto_1 from '../../img/howto_1.png'
import howto_2 from '../../img/howto_2.png'
import howto_3 from '../../img/howto_3.png'
import howto_4 from '../../img/howto_4.png'
import howto_5 from '../../img/howto_5.png'



class Howto extends React.Component {
    constructor(params){
        super(params)
        this.state={
            src:[howto_1, howto_2, howto_3, howto_4, howto_5],
            index:0
        }
    }
    render(){
        const {index, src} = this.state;
        const nextIndex = index<4 ? index+1:0
        return (
            <div>
                <Header/>
                <main className="gf_main howto" role="main">
                    <img
                        src= { src[index]} alt="" className="howto_image"
                        onClick={e => this.setState({index:nextIndex})}
                    />
                </main>
            </div>
        );
    }
}

export default Howto;
