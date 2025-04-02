import React from 'react';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        time: 25, // default value
        shortTime: 5, // default value
        longTime: 15, // default value
        autoStartBreaks: false,
        autoStartPomodoros: false,
        longBreakInterval: 4,
      },
    };
  }

  componentDidMount() {
    // Load a configuration
    this.loadConfig();
  }

  async loadConfig() {
    try {
      const config = await this.GetConfig();
      console.log('Received config:', config); // Check configuration
      if (config) {
        config.time = config.time / 60;
        config.shortTime = config.shortTime / 60;
        config.longTime = config.longTime / 60;
        this.setState({ config });
      }
    } catch (error) {
      console.error('Error with receive config:', error);
    }
  }

  async GetConfig() {
    return new Promise((resolve, reject) => {
      browser.runtime.sendMessage({ command: 'GetConfig' }, (response) => {
        if (browser.runtime.lastError) {
          reject(browser.runtime.lastError);
        } else {
          console.log('Rresponce from GetConfig:', response); // Check response
          resolve(response);
        }
      });
    });
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let newValue = value;

    // Limit input lines from 1 to 99 or empty value
    if (type === 'text') {
      newValue = newValue.replace(/\D/g, ''); // Remove all non-numeric characters
      if (newValue === '') {
        newValue = '';
      } else if (newValue < 1) {
        newValue = 1;
      } else if (newValue > 99) {
        newValue = 99;
      }
    }

    this.setState((prevState) => ({
      config: {
        ...prevState.config,
        [name]: type === 'checkbox' ? checked : newValue,
      },
    }));
  };

  setSettings = (event) => {
    event.preventDefault();
    const { config } = this.state;
    const formObject = {
      'Pomodoro-time': Number(config.time) * 60,
      'ShortBreak-time': Number(config.shortTime) * 60,
      'LongBreak-time': Number(config.longTime) * 60,
      'LongBreak-interval': Number(config.longBreakInterval),
      'Settings-StartBreaks': config.autoStartBreaks,
      'Settings-StartPomodoros': config.autoStartPomodoros,
    };

    browser.runtime.sendMessage(
      { command: 'SettingsForm', form: formObject },
      () => {
        console.log('SettingsForm sent');
      }
    );
  };



  render() {
    const { config } = this.state;
    return (
      <div>
        <div className="Settings-container">
          <h1>Settings</h1>
          <form className="Settings-form" onSubmit={this.setSettings}>
            <h2>Timer</h2>
            <h3>Tasks (minutes)</h3>
            <div className="Settings-timer">
              <div className="Settings-time">
                <label htmlFor="Pomodoro-time">Pomodoro</label>
                <div className="counter Pomodoro glass">
                  <input
                    id="Pomodoro-time"
                    type="text"
                    name="time"
                    value={config.time}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="Settings-time">
                <label htmlFor="ShortBreak-time">Short Break</label>
                <div className="counter ShortBreak glass">
                  <input
                    type="text"
                    name="shortTime"
                    value={config.shortTime}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="Settings-time">
                <label htmlFor="LongBreak-time">Long Break</label>
                <div className="counter LongBreak glass">
                  <input
                    type="text"
                    name="longTime"
                    value={config.longTime}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="checkbox-wrapper">
              <label
                className="Settings-StartBreaks-label name"
                htmlFor="Settings-StartBreaks"
              >
                Auto Start Breaks
              </label>
              <label className="toggle-checkbox">
                <input
                  className="Settings-checkbox"
                  type="checkbox"
                  name="autoStartBreaks"
                  checked={config.autoStartBreaks}
                  onChange={this.handleChange}
                />
                <div className="toggle-container">
                  <div className="toggle-slider"></div>
                </div>
              </label>
            </div>

            <div className="checkbox-wrapper">
              <label
                className="Settings-StartPomodoros-label name"
                htmlFor="Settings-StartPomodoros"
              >
                Auto Start Pomodoros
              </label>
              <label className="toggle-checkbox">
                <input
                  className="Settings-checkbox"
                  type="checkbox"
                  name="autoStartPomodoros"
                  checked={config.autoStartPomodoros}
                  onChange={this.handleChange}
                />
                <div className="toggle-container">
                  <div className="toggle-slider"></div>
                </div>
              </label>
            </div>
            <div className="LongBreak-interval">
              <label
                className="LongBreak-interval-label name"
                htmlFor="LongBreak-interval"
              >
                Long Break Interval
              </label>
              <div className="counter glass counter-individual">
                <input
                  type="text"
                  name="longBreakInterval"
                  value={config.longBreakInterval}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <footer>
              <div 
                className="CancelBtn" 
                onClick={() => {window.location.reload()}}>
                Cancel
              </div>
              <input
                name="save"
                type="submit"
                value="Save"
                className="SaveBtn glass"
                onClick={() => {window.location.reload()}}
              />
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

export default Settings;
