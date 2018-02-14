import React, {Component} from 'react';
import "../css/overlay.css"
import correct from '../img/correct.png'

class SuccessOverlay extends Component {
  constructor(props){
    super(props);
    this.state = {
      closing: false
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.visible && !nextProps.visible){
      this.setState({
        closing: true
      });

      setTimeout(
        () => {
          this.setState({
            closing: false
          });
        }, 500
      );
    }
  }

  render() {
    const { visible } = this.props;
    const { closing } = this.state;

    if(!visible && !closing) return null;
    return (
      <div className="overlay">
        <div className={`SuccessOverlay ${closing?'bounceOut':'bounceIn'} animated bounceIn`}>
          <img src={correct} alt=""/>
        </div>
      </div>
    );
  }
}

export default SuccessOverlay;
