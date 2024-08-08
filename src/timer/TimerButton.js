import React from 'react';
import PropTypes from 'prop-types';

class TimerButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      IsTimerRunning: this.props.IsTimerRunning
    };

    this.TimerButtonActivate = this.TimerButtonActivate.bind(this);
  }

  componentDidMount() {
    // Send a message to the background script to get the timer state
    browser.runtime.sendMessage({ command: "getStateTimer" }, (response) => {
      // Check if response is defined and has the TimerStart property
      console.log(response)
      if (response && response.TimerStart !== undefined) {
        this.setState({ IsTimerRunning: response.TimerStart });
        console.log("Received TimerStart state:", response.TimerStart);
      } else {
        console.error("Invalid response or TimerStart undefined", response);
      }
    });

    // Listener to handle messages from the background script
    this.listener = (message) => {
      if (message.command === "done") {
        this.setState({ IsTimerRunning: false });
        console.log("Timer done, setting IsTimerRunning to false.");
      }
    };

    // Add listener for runtime messages
    browser.runtime.onMessage.addListener(this.listener);
  }

  componentWillUnmount() {
    // Clean up listener when component unmounts
    browser.runtime.onMessage.removeListener(this.listener);
  }

  TimerButtonActivate(event) {
    const button = event.target;

    if (this.state.IsTimerRunning) {
      button.classList.remove("active");
      this.setState({ IsTimerRunning: false });
      this.props.ToggleTimer();
    } else {
      button.classList.add("active");
      this.setState({ IsTimerRunning: true });
      this.props.ToggleTimer();
    }
  }

  render() {
    return (
      <div className="TimerButton-container">
        <button
          onClick={this.TimerButtonActivate}
          className={`TimerButton glass ${this.state.IsTimerRunning ? 'active' : ''}`}
        >
          {this.state.IsTimerRunning ? 'STOP' : 'START'}
        </button>
      </div>
    );
  }
}

TimerButton.propTypes = {
  ToggleTimer: PropTypes.func.isRequired,
  IsTimerRunning: PropTypes.bool.isRequired
};

export default TimerButton;
