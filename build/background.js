let timeLeft = 0;
let TimerStart = false;
let timer = null;
let state = "Pomodoro";

let time;
let shortTime;
let longTime;
let autoStartBreaks;
let autoStartPomodoros;
let toLong = 4; // Default toLong value
let NumOfCycle = 0;
let Day = 0;

async function performFirstRunTasks() {
  const today = new Date();
  await browser.storage.local.set({
    Day: today.getDate(),
    NumOfCycle: 0,
    Tasks: [],
    config: {
      time: 1500,
      shortTime: 300,
      longTime: 900,
      autoStartBreaks: true,
      autoStartPomodoros: false,
      longBreakInterval: 4
    }
  });
  console.log("First run setup completed");
}

async function checkFirstRun() {
  const storedData = await browser.storage.local.get('firstRun');

  if (!storedData.firstRun) {
    await performFirstRunTasks();
    await browser.storage.local.set({ firstRun: true });
  } else {
    console.log('Extension has been run before.');
  }
}

checkFirstRun();

async function loadConfig() {
  try {
    const data = await browser.storage.local.get("config");
    if (data.config) {
      time = data.config.time;
      shortTime = data.config.shortTime;
      longTime = data.config.longTime;
      autoStartBreaks = data.config.autoStartBreaks;
      autoStartPomodoros = data.config.autoStartPomodoros;
      toLong = data.config.longBreakInterval || 4;

      console.log("Config loaded:", data.config);
    } else {
      console.error("Config not found in storage.");
    }
  } catch (error) {
    console.error("Error loading config:", error);
  }
}

function update() {
  console.log("Update");
  browser.runtime.sendMessage({
    command: "update",
    timeLeft: timeLeft,
    TimerStart: TimerStart,
    stateTimer: state,
    NumOfCycle: NumOfCycle
  });
}

async function saveData(key, data) {
  try {
    let item = {};
    item[key] = data;

    await browser.storage.local.set(item);
    console.log(`Data saved under key "${key}":`, data);
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

async function getData(key) {
  try {
    const result = await browser.storage.local.get(key);
    if (result[key] !== undefined) {
      console.log(`Data retrieved for key "${key}":`, result[key]);
      return result[key];
    } else {
      console.log(`No data found for key "${key}"`);
      return null;
    }
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

function updateNumOfCycle() {
  getData("NumOfCycle")
    .then(data => {
      if (data !== undefined) {
        NumOfCycle = data;
      } else {
        NumOfCycle = 0;
      }

      NumOfCycle += 1;

      return saveData("NumOfCycle", NumOfCycle);
    })
    .then(() => getData("NumOfCycle"))
    .then(updatedNumOfCycle => {
      NumOfCycle = updatedNumOfCycle;
      console.log("Counter updated and saved:", NumOfCycle);
    })
    .catch(error => {
      console.error("Error updating counter:", error);
    });
}

function checkNewDay() {
  const today = new Date();
  getData("Day")
    .then(data => {
      if (data !== undefined) {
        Day = data;
      } else {
        Day = today.getDate();
        saveData("Day", Day);
        getData("Day").then(data => {
          console.log(data);
        });
      }

      if (Day < today.getDate()) {
        return saveData("NumOfCycle", 0), saveData("Day", today.getDate());
      } else {
        return;
      }
    })
    .then(() => getData("NumOfCycle"))
    .then(updatedNumOfCycle => {
      NumOfCycle = updatedNumOfCycle;
      console.log("Counter updated and saved:", NumOfCycle);
    })
    .then(() => {
      update();
    })
    .catch(error => {
      console.error("Error updating day:", error);
    });
}

function taskProcessing(form) {
  console.log("form BACK: ", form);
  const taskName = form.taskName;
  const taskRange = form.taskRange;
  const taskIndex = form.taskIndex;
  console.log(taskIndex);

  let NewArray;

  const item = { name: taskName, range: Number(taskRange), done: false, rangeDone: 0 };
  console.log("item: ", item);
  getData("Tasks")
    .then(data => {
      if (!Array.isArray(data)) {
        throw new TypeError("Data retrieved is not an array");
      }

      console.log("Data: ", data);

      if (taskIndex === "") {
        data.push(item);
      } else {
        data[data.length - 1 - taskIndex] = item;
      }

      NewArray = data;

      console.log("New Array: ", NewArray);
      return saveData("Tasks", NewArray);
    })
    .catch(error => {
      console.error("Error processing task:", error);
    });
}

function deleteTask(index) {
  getData("Tasks").then(data => {
    console.log("component index: ", index);
    index = data.length - 1 - index;
    console.log("DB index: ", index);

    data.splice(index, 1);
    console.log("New Array", data);

    return saveData("Tasks", data);
  });
}

function updateDoneTasks() {
  getData("Tasks")
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].range === data[i].rangeDone) {
          data[i].done = true;
        } else if (data[i].done === true) {
          continue;
        } else {
          data[i].rangeDone += 1;
          if (data[i].range === data[i].rangeDone) {
            data[i].done = true;
          }
        }
      }
      return saveData("Tasks", data);
    })
    .then(() => {
      console.log("Tasks updated successfully.");
      browser.runtime.sendMessage({ command: "tasksUpdated" });
    })
    .catch(error => {
      console.error("Error updating tasks:", error);
    });
}

function doneTask(index) {
  getData("Tasks")
    .then(data => {
      data[data.length - 1 - index].done = !data[data.length - 1 - index].done;
      return saveData("Tasks", data);
    })
    .then(() => {
      console.log("Tasks updated successfully.");
      browser.runtime.sendMessage({ command: "tasksUpdated" });
    })
    .catch(error => {
      console.error("Error updating tasks:", error);
    });
}

function SaveConfig(form){
  let item = {
    time: form["Pomodoro-time"], 
    shortTime: form["ShortBreak-time"], 
    longTime: form["LongBreak-time"], 
    autoStartBreaks: form["Settings-StartBreaks"],
    autoStartPomodoros: form["Settings-StartPomodoros"],
    longBreakInterval: form["LongBreak-interval"]
  }

  return saveData("config", item)
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  checkNewDay();
  console.log(message.command);
  console.log("TimerStart", TimerStart);

  loadConfig().then(() => {
    console.log("Config variables loaded");

    if (message.command === "start" && !TimerStart) {
      TimerStart = true;
      update();
      timeLeft = state === "Pomodoro" ? time : state === "Short Break" ? shortTime : state === "Long Break" ? longTime : timeLeft;

      timer = setInterval(() => {
        timeLeft -= 1;
        console.log("timer work");
        update();
        if (timeLeft <= 0) {
          let audio = new Audio(chrome.runtime.getURL("/sounds/end-sound.mp3"));
          audio.play();

          console.log("NumOfCycle: " + NumOfCycle);
          if ((NumOfCycle + 1) % toLong !== 0 && state === "Pomodoro") {
            state = "Short Break";
            if (!autoStartBreaks) {
              clearInterval(timer);
            }
            updateNumOfCycle();
            updateDoneTasks();
          } else if ((NumOfCycle + 1) % toLong === 0 && state === "Pomodoro") {
            state = "Long Break";
            toLong = 4;
            if (!autoStartBreaks) {
              clearInterval(timer);
            }
            updateNumOfCycle();
            updateDoneTasks();
          } else if (state !== "Pomodoro") {
            state = "Pomodoro";
            chrome.runtime.sendMessage({ command: "done" });
            if (!autoStartPomodoros) {
              clearInterval(timer);
            }
            TimerStart = false;
          }
          console.log(state);
          timeLeft = state === "Pomodoro" ? time : state === "Short Break" ? shortTime : state === "Long Break" ? longTime : timeLeft;
          update();
        }
      }, 1000);
    } else if (message.command === "stop" && TimerStart) {
      TimerStart = false;
      clearInterval(timer);
      console.log("Timer STOP");
      update();
    } else if (message.command === "resume") {
      if (!TimerStart) {
        TimerStart = true;

        // Resume timer with remaining time
        timer = setInterval(() => {
          timeLeft -= 1;
          console.log("timer work");
          update();

          if (timeLeft <= 0) {
            let audio = new Audio(chrome.runtime.getURL("/sounds/end-sound.mp3"));
            audio.play();
            browser.runtime.sendMessage({ command: "done" });
            if ((NumOfCycle + 1) % toLong !== 0 && state === "Pomodoro") {
              state = "Short Break";
              if (!autoStartBreaks) {
                clearInterval(timer);
              }
              updateNumOfCycle();
              updateDoneTasks();
            } else if ((NumOfCycle + 1) % toLong === 0 && state === "Pomodoro") {
              state = "Long Break";
              toLong = 4;
              if (!autoStartBreaks) {
                clearInterval(timer);
              }
              updateNumOfCycle();
              updateDoneTasks();
            } else if (state !== "Pomodoro") {
              state = "Pomodoro";
              browser.runtime.sendMessage({ command: "done" });
              if (!autoStartPomodoros) {
                clearInterval(timer);
              }
              TimerStart = false;
            }
            timeLeft = state === "Pomodoro" ? time : state === "Short Break" ? shortTime : state === "Long Break" ? longTime : timeLeft;
            update();
          }
        }, 1000);
      }
    } else if (message.command === "getTime") {
      console.log(time);
      sendResponse({
        timeLeft: timeLeft,
        TimerStart: TimerStart,
        stateTimer: state,
        time: time,
        shortTime: shortTime,
        longTime: longTime
      });
      update();
    } else if (message.command === "getStateTimer") {
      console.log("TimerStart value to send:", TimerStart);
      sendResponse({ TimerStart: TimerStart });
      return true;
    } else if (message.command === "TaskForm") {
      console.log("TaskForm BACK");
      taskProcessing(message.form);
    } else if (message.command === "DeleteTask") {
      console.log("DeleteTask BACK");
      deleteTask(message.index);
    } else if (message.command === "DoneTask") {
      doneTask(message.index);
      return getData("Tasks");
    } else if (message.command === "ClearPomodoros") {
      return saveData("NumOfCycle", 0);
    } else if (message.command === "ClearTasks") {
      return saveData("Tasks", []).then(updateDoneTasks());
    } else if (message.command === "renderTasks") {
      sendResponse(getData("Tasks"));
      return true;
    } else if(message.command === "SettingsForm") {
      SaveConfig(message.form).then(() => {update()});
      
    } else if(message.command === "GetConfig"){
      sendResponse(getData("config"));
      return true;
    }
  });
  return true;
});
