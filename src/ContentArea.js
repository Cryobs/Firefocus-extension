import React from "react"
import PeriodTimer from "./timer/PeriodTimer"
import Timer from "./timer/Timer"
import TimerButton from "./timer/TimerButton"
import TimerStats from "./timer/TimerStats"
import TaskManager from "./Task/TaskManager"
import Settings from "./Settings"

class ContentArea extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            time: 1500,
            shortTime: 300,
            longTime: 900,
            timeLeft: 0,
            IsTimerRunning: false,
            stateTimer: "Pomodoro",
            NumOfCycle: 0,
        };

        this.ToggleTimer = this.ToggleTimer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    changeColor(color){
      let app = document.querySelector(".App")
      switch(color){
        case "Pomodoro": app.classList.remove("ShortBreak"); app.classList.remove("LongBreak"); break;
        case "Short Break": app.classList.remove("Pomodoro"); break;
        case "Long Break": app.classList.remove("Pomodoro"); break;
      }
      app.classList.add(color);
    }

    AllTimeEnc(){
      let seconds;

      seconds = this.state.NumOfCycle * this.state.time;
       // Проверяем, что входные данные являются неотрицательным числом
      if (typeof seconds !== 'number' || seconds < 0) {
        throw new Error('Invalid input: must be a non-negative number');
      }

      // Определяем количество часов, минут и секунд
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      // Создаем массив для хранения частей результата
      const parts = [];

      // Добавляем часы, если они есть
      if (hours > 0) {
        parts.push(`${hours}h`);
      }

      // Добавляем минуты, если они есть
      if (minutes > 0 || hours > 0) { // Добавляем минуты, если есть часы или сами минуты больше 0
        parts.push(`${minutes}m`);
      }

      // Добавляем секунды, если они есть
      if (secs > 0 || (hours === 0 && minutes === 0)) { // Добавляем секунды, если нет часов и минут
        parts.push(`${secs}s`);
      }

      if(parts.join(' ') === "0s"){
        return "-";
      }

      // Возвращаем результат, соединенный пробелом
      return parts.join(' ');
    }

    TimerTimeEnc(time){
      console.log(time);
        let timeStr = "";
        let min = parseInt(time / 60);
        let sec = parseInt(time % 60);

        if (min < 10 && min != 0){
            min = "0" + min;
        } else if (min === 0){
            min = "00";
        }

        if (sec < 10 && sec != 0){
            sec = "0" + sec;
        } else if (sec === 0){
            sec = "00";
        }

        timeStr = min + ":" + sec;

        console.log(timeStr);
        return timeStr
    }

    componentDidMount() {
        browser.runtime.sendMessage({ command: "getTime" }, (response) => {
          this.setState({ 
            timeLeft: response.timeLeft, 
            IsTimerRunning: response.TimerStart, 
            stateTimer: response.stateTimer,
            time: response.time,
            shortTime: response.shortTime,
            longTime: response.longTime,
             });

          console.log(this.state);
        });
  
        this.listener = (message) => {
          if (message.command === "update") {
            this.setState({ timeLeft: message.timeLeft, IsTimerRunning: message.TimerStart, stateTimer: message.stateTimer, NumOfCycle: message.NumOfCycle});
            switch(message.stateTimer){
              case "Pomodoro": this.changeColor("Pomodoro"); break;
              case "Short Break": this.changeColor("ShortBreak"); break;
              case "Long Break": this.changeColor("LongBreak"); break;
            }
            
          } else if(message.command === "done"){
            this.setState({NumOfCycle: this.state.NumOfCycle + 1});
          }
        };
  
        browser.runtime.onMessage.addListener(this.listener);
      }

      componentWillUnmount() {
        browser.runtime.onMessage.removeListener(this.listener);
      }

    
      ToggleTimer() {
        const {IsTimerRunning} = this.state;
        console.log(IsTimerRunning)
        const TimerText = document.querySelector(".Timer")
        if (TimerText.innerHTML === this.TimerTimeEnc(this.state.time) && !IsTimerRunning) {
          browser.runtime.sendMessage({ command: "start"}, () => {
            this.setState({IsTimerRunning: true });
          });
        } else if (IsTimerRunning) {
          browser.runtime.sendMessage({ command: "stop" }, () => {
            this.setState({ IsTimerRunning: false });
          });
        } else if (!IsTimerRunning) {
          browser.runtime.sendMessage({ command: "resume"}, () => {
            this.setState({ IsTimerRunning: true });
          });
        }
      }
    
    
      handleChange(event) {
        this.setState({ time: event.target.value });
      }

	render() {
		return (
			<div className="ContentArea">
                <div className="content glass">
                  <div className='content-default active'>
                    <PeriodTimer stateTimer={this.state.stateTimer}/>
                    <Timer time={this.TimerTimeEnc(this.state.timeLeft) === "00:00" ? this.TimerTimeEnc(this.state.time): this.TimerTimeEnc(this.state.timeLeft)}/>
                    <TimerButton ToggleTimer={this.ToggleTimer} IsTimerRunning={this.state.IsTimerRunning}/>
                    <TimerStats cycle={this.state.NumOfCycle} allTime={this.AllTimeEnc()}/>
                    <TaskManager />
                  </div>
                  <div className='content-settings'>
                    <Settings closeSettings={this.CloseSettings}/>
                  </div>
                </div>
			</div>
		)
	}


}

export default ContentArea