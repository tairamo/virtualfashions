import React from "react";

import { BidRemaining as BidReContainer } from "./styles";

class RemainingTime extends React.Component {
  constructor() {
    super();
    this.state = {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds(),
    };
    this.timer = 0;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;
    let hours = this.state.hours;
    seconds = this.state.seconds - 1;
    // Check if we're at zero.
    if (seconds === 0) {
      minutes = this.state.minutes - 1;
      seconds = 59;
    }
    // Check if we're at zero.
    if (minutes === 0) {
      hours = this.state.hours - 1;
      seconds = 59;
      minutes = 59;
    }
    this.setState({
      ...this.state,
      hours: hours,
      seconds,
      minutes,
    });
  };

  render() {
    return (
      <BidReContainer>
        <div>Action ending in</div>
        <div className="bid-remaining-time">
          <div>
            <div>{this.state.hours}</div>
            <div>Hours</div>
          </div>
          <div>
            <div>{this.state.minutes}</div>
            <div>Minutes</div>
          </div>
          <div>
            <div>{this.state.seconds}</div>
            <div>Seconds</div>
          </div>
        </div>
      </BidReContainer>
    );
  }
}

export default RemainingTime;
