import React from "react";

import { BidRemaining as BidReContainer } from "./styles";

class RemainingTime extends React.Component {
  constructor(props) {
    super(props);
    let time = props.time * 1000;
    this.state = {
      hours: new Date(time).getHours(),
      minutes: new Date(time).getMinutes(),
      seconds: new Date(time).getSeconds(),
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
    const chker = this.state.seconds && this.state.minutes && this.state.hours;
    if (this.timer === 0) {
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
    if (seconds <= 0) {
      minutes = this.state.minutes - 1;
      seconds = 59;
    }
    // Check if we're at zero.
    if (minutes <= 0 && seconds <= 0) {
      hours = this.state.hours - 1;
      seconds = 59;
      minutes = 59;
    }
    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      console.log("BID - TIMED OUT");
      clearInterval(this.timer);
    }
    this.setState({
      ...this.state,
      hours,
      seconds,
      minutes,
    });
  };

  render() {
    return (
      <BidReContainer short={this.props.short}>
        {this.props.header && (
          <div className="bid-re-header">Auction ending in</div>
        )}
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
