import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  audioElement = new Audio('./sounds/bell.wav');

  state = {
    status: 'off',
    time: 0,
    timer: null
  }    
  
  updateTime = () => {
    if(this.state.time < 1 && this.state.status === 'work'){
      this.audioElement.play();

      this.setState({
        status: 'rest',
        time: 20
      })
    } else if(this.state.time < 1 && this.state.status === 'rest'){
      this.audioElement.play();

      this.setState({
        status: 'work',
        time: 1200
      })
    } else {
      this.setState({
        time: this.state.time - 1
      })
    }
  }

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(() => this.updateTime(), 1000)
    })
  }

  stopTimer = () => {
    this.setState({
      status: 'off',
      time: 1200,
      timer: clearInterval(this.state.timer)
    })
  };


  formatTime = time => {
    let seconds = Math.floor(time);
    let minutes = Math.floor(seconds / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
  
    return `${(minutes < 10 ? "0" : "")}${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
  };

  closeApp = () => {
    window.close();
  }
  
  render() {
  
    return (
      <div>
        <h1>Protect your eyes</h1>
        { this.state.status === 'off' && (
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        )}
        { this.state.status === 'work' && (<img src="./images/work.png" />)}
        { this.state.status === 'rest' && (<img src="./images/rest.png" />)}
        { this.state.status !== 'off' && (
          <div className="timer">
            {this.formatTime(this.state.time)}
          </div>
        )}
        { this.state.status === 'off' && (<button className="btn" onClick={this.startTimer}>Start</button>)}
        { this.state.status !== 'off' && (<button className="btn" onClick={this.stopTimer}>Stop</button>)}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
