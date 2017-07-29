import React, {Component} from 'react';
import "./overlay.css"

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
        }, 1000
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
          <h1>정답입니다</h1>
        </div>
      </div>
    );
  }
}

export default SuccessOverlay;
