"use strict";

var timeLeft = 0;
var TimerStart = false;
var timer = null;
var state = "Pomodoro";
var time;
var shortTime;
var longTime;
var autoStartBreaks;
var autoStartPomodoros;
var toLong = 4; // Default toLong value

var NumOfCycle = 0;
var Day = 0;

function performFirstRunTasks() {
  var today;
  return regeneratorRuntime.async(function performFirstRunTasks$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          today = new Date();
          _context.next = 3;
          return regeneratorRuntime.awrap(browser.storage.local.set({
            Day: today.getDate(),
            NumOfCycle: 0,
            Tasks: [],
            config: {
              time: 10,
              shortTime: 3,
              longTime: 5,
              autoStartBreaks: true,
              autoStartPomodoros: false,
              longBreakInterval: 4
            }
          }));

        case 3:
          console.log("First run setup completed");

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function checkFirstRun() {
  var storedData;
  return regeneratorRuntime.async(function checkFirstRun$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(browser.storage.local.get('firstRun'));

        case 2:
          storedData = _context2.sent;

          if (storedData.firstRun) {
            _context2.next = 10;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(performFirstRunTasks());

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(browser.storage.local.set({
            firstRun: true
          }));

        case 8:
          _context2.next = 11;
          break;

        case 10:
          console.log('Extension has been run before.');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
}

checkFirstRun();

function loadConfig() {
  var data;
  return regeneratorRuntime.async(function loadConfig$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(browser.storage.local.get("config"));

        case 3:
          data = _context3.sent;

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

          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Error loading config:", _context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
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

function saveData(key, data) {
  var item;
  return regeneratorRuntime.async(function saveData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          item = {};
          item[key] = data;
          _context4.next = 5;
          return regeneratorRuntime.awrap(browser.storage.local.set(item));

        case 5:
          console.log("Data saved under key \"".concat(key, "\":"), data);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error("Error saving data:", _context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function getData(key) {
  var result;
  return regeneratorRuntime.async(function getData$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(browser.storage.local.get(key));

        case 3:
          result = _context5.sent;

          if (!(result[key] !== undefined)) {
            _context5.next = 9;
            break;
          }

          console.log("Data retrieved for key \"".concat(key, "\":"), result[key]);
          return _context5.abrupt("return", result[key]);

        case 9:
          console.log("No data found for key \"".concat(key, "\""));
          return _context5.abrupt("return", null);

        case 11:
          _context5.next = 16;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](0);
          console.error("Error getting data:", _context5.t0);

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

function updateNumOfCycle() {
  getData("NumOfCycle").then(function (data) {
    if (data !== undefined) {
      NumOfCycle = data;
    } else {
      NumOfCycle = 0;
    }

    NumOfCycle += 1;
    return saveData("NumOfCycle", NumOfCycle);
  }).then(function () {
    return getData("NumOfCycle");
  }).then(function (updatedNumOfCycle) {
    NumOfCycle = updatedNumOfCycle;
    console.log("Counter updated and saved:", NumOfCycle);
  })["catch"](function (error) {
    console.error("Error updating counter:", error);
  });
}

function checkNewDay() {
  var today = new Date();
  getData("Day").then(function (data) {
    if (data !== undefined) {
      Day = data;
    } else {
      Day = today.getDate();
      saveData("Day", Day);
      getData("Day").then(function (data) {
        console.log(data);
      });
    }

    if (Day < today.getDate()) {
      return saveData("NumOfCycle", 0), saveData("Day", today.getDate());
    } else {
      return;
    }
  }).then(function () {
    return getData("NumOfCycle");
  }).then(function (updatedNumOfCycle) {
    NumOfCycle = updatedNumOfCycle;
    console.log("Counter updated and saved:", NumOfCycle);
  }).then(function () {
    update();
  })["catch"](function (error) {
    console.error("Error updating day:", error);
  });
}

function taskProcessing(form) {
  console.log("form BACK: ", form);
  var taskName = form.taskName;
  var taskRange = form.taskRange;
  var taskIndex = form.taskIndex;
  console.log(taskIndex);
  var NewArray;
  var item = {
    name: taskName,
    range: Number(taskRange),
    done: false,
    rangeDone: 0
  };
  console.log("item: ", item);
  getData("Tasks").then(function (data) {
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
  })["catch"](function (error) {
    console.error("Error processing task:", error);
  });
}

function deleteTask(index) {
  getData("Tasks").then(function (data) {
    console.log("component index: ", index);
    index = data.length - 1 - index;
    console.log("DB index: ", index);
    data.splice(index, 1);
    console.log("New Array", data);
    return saveData("Tasks", data);
  });
}

function updateDoneTasks() {
  getData("Tasks").then(function (data) {
    for (var i = 0; i < data.length; i++) {
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
  }).then(function () {
    console.log("Tasks updated successfully.");
    browser.runtime.sendMessage({
      command: "tasksUpdated"
    });
  })["catch"](function (error) {
    console.error("Error updating tasks:", error);
  });
}

function doneTask(index) {
  getData("Tasks").then(function (data) {
    data[data.length - 1 - index].done = !data[data.length - 1 - index].done;
    return saveData("Tasks", data);
  }).then(function () {
    console.log("Tasks updated successfully.");
    browser.runtime.sendMessage({
      command: "tasksUpdated"
    });
  })["catch"](function (error) {
    console.error("Error updating tasks:", error);
  });
}

function SaveConfig(form) {
  var item = {
    time: form["Pomodoro-time"],
    shortTime: form["ShortBreak-time"],
    longTime: form["LongBreak-time"],
    autoStartBreaks: form["Settings-StartBreaks"],
    autoStartPomodoros: form["Settings-StartPomodoros"],
    longBreakInterval: form["LongBreak-interval"]
  };
  return saveData("config", item);
}

browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  checkNewDay();
  console.log(message.command);
  console.log("TimerStart", TimerStart);
  loadConfig().then(function () {
    console.log("Config variables loaded");

    if (message.command === "start" && !TimerStart) {
      TimerStart = true;
      update();
      timeLeft = state === "Pomodoro" ? time : state === "Short Break" ? shortTime : state === "Long Break" ? longTime : timeLeft;
      timer = setInterval(function () {
        timeLeft -= 1;
        console.log("timer work");
        update();

        if (timeLeft <= 0) {
          var audio = new Audio(chrome.runtime.getURL("/sounds/end-sound.mp3"));
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
            chrome.runtime.sendMessage({
              command: "done"
            });

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
        TimerStart = true; // Resume timer with remaining time

        timer = setInterval(function () {
          timeLeft -= 1;
          console.log("timer work");
          update();

          if (timeLeft <= 0) {
            var audio = new Audio(chrome.runtime.getURL("/sounds/end-sound.mp3"));
            audio.play();
            browser.runtime.sendMessage({
              command: "done"
            });

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
              browser.runtime.sendMessage({
                command: "done"
              });

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
      sendResponse({
        TimerStart: TimerStart
      });
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
    } else if (message.command === "SettingsForm") {
      SaveConfig(message.form).then(function () {
        update();
      });
    } else if (message.command === "GetConfig") {
      sendResponse(getData("config"));
      return true;
    }
  });
  return true;
});