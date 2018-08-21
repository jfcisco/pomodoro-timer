var PEvents = (function() {
  /*
    Possible events:
    1. Work/Pomodoro (25 minutes)
    2. Short Break (5 minutes)
    3. Long Break (25 minutes)
  */

  // ENUM for different timer types:
  var Timers = {
    pomodoro: 1,
    short_break: 2,
    long_break: 3
  }

  var pomodorosDone = 0;

  function nextTimer(previousTimer) {
    if (previousTimer === Timers.short_break || previousTimer === Timers.long_break) {
      return Timers.pomodoro;
    }
    else if (pomodorosDone < 4) { // It is implied that beyond here, previousTimer is pomodoro
      return Timers.short_break;
    }
    else if (pomodorosDone === 4) {
      pomodorosDone = 0;
      return Timers.long_break;
    }
    else {
      throw "previousTimer is not valid."
    }
  }

  function timerDone(type) {
    switch(type) {
      case "pomodoro":
        // Increment pomodoro and load break timer next
        pomodorosDone++;
        break;
    }

    alert("Done!");
  } 

  return {
    timerDone,
    Timers,
    nextTimer
  }
})();