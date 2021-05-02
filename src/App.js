import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faSync } from '@fortawesome/free-solid-svg-icons'

const audio = document.getElementById('beep');           //Audio element from the html file

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
  }
  state = {
    breakCount: 5,
    sessionCount: 25,
    currentTimer: 'Session',
    timeLeft: 25 * 60,
    isPlaying: false,

  }

  convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${seconds}`
  }

  handleStartStop() {
    const { isPlaying } = this.state;
    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false
      })
    } else {
      this.setState({
        isPlaying: true
      })

      this.loop = setInterval(() => {
        const { timeLeft, currentTimer, breakCount, sessionCount } = this.state;

        if (timeLeft === 0) {
          this.setState({
            currentTimer: currentTimer === 'Session' ? 'break' : 'Session',
            timeLeft: currentTimer === 'Session' ? (breakCount * 60) : (sessionCount * 60)
          })
          audio.play();
        } else {
          this.setState({
            timeLeft: timeLeft - 1
          })
        }

      }, 1000)
    }
  }

  handleReset() {
    clearInterval(this.loop);
    this.setState({
      timeLeft: 25 * 60,
      breakCount: 5,
      sessionCount: 25,
      currentTimer: 'Session',
      isPlaying: false,
    })
  }

  sessionDecrement() {
    const { timeLeft, sessionCount, currentTimer, isPlaying } = this.state;
    if (!isPlaying) {
      if (sessionCount > 1) {
        this.setState({
          timeLeft: sessionCount * 60 - 60,
          sessionCount: sessionCount - 1
        })
      }

    }
  }

  sessionIncrement() {
    const { timeLeft, sessionCount, currentTimer, isPlaying } = this.state;
    if (!isPlaying) {
      if (sessionCount < 60) {
        this.setState({
          timeLeft: sessionCount * 60 + 60,
          sessionCount: sessionCount + 1
        })
      }

    }
  }

  breakDecrement() {
    const { timeLeft, breakCount, currentTimer, isPlaying } = this.state;
    if (!isPlaying) {
      if (breakCount > 1) {
        this.setState({
          breakCount: breakCount - 1
        })
      }
    }
  }

  breakIncrement() {
    const { timeLeft, breakCount, currentTimer, isPlaying } = this.state;
    if (!isPlaying) {
      if (breakCount < 60) {
        this.setState({
          breakCount: breakCount + 1
        })
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  render() {
    const { timeLeft, currentTimer, sessionCount, breakCount, isPlaying } = this.state
    return (
      <div id="outer-box">

        <div id="container">

          <h2>Pomodoro Clock</h2>

          <div id="session-break-box">

            <div id="break-box">

              <p id="break-label">Break Length</p>

              <div id="decrement-breakVal-increment">

                <button id="break-decrement" onClick={this.breakDecrement} className="button">

                  <FontAwesomeIcon icon={faMinus} className="faPlusMinus" />

                </button>

                <span id="break-length">{breakCount}</span>

                <button id="break-increment" onClick={this.breakIncrement} className="button">

                  <FontAwesomeIcon icon={faPlus} className="faPlusMinus" />

                </button>

              </div>

            </div>

            <div id="session-box">

              <p id="session-label">Session Length</p>

              <div id="decrement-sessionVal-increment">

                <button id="session-decrement" onClick={this.sessionDecrement} className="button">

                  <FontAwesomeIcon icon={faMinus} className="faPlusMinus" />

                </button>

                <span id="session-length">{sessionCount}</span>

                <button id="session-increment" onClick={this.sessionIncrement} className="button">

                  <FontAwesomeIcon icon={faPlus} className="faPlusMinus" />

                </button>

              </div>

              

            </div>
            
          </div>

          <div id="display">

            <h3 id="timer-label">{currentTimer}</h3>

            <div id="time-left">
              {
                this.convertTime(timeLeft)
              }
            </div>
          </div>

          <div id="buttons">

            <button id="start-stop" onClick={this.handleStartStop} className="button">


              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} id="faPlayPause" />


            </button>

            <button id="reset" onClick={this.handleReset} className="button">
              <FontAwesomeIcon icon={faSync} id="faSync" />
            </button>

          </div>

        </div>
      </div>

    )
  }
}

export default App;
