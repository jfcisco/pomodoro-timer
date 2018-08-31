import Timer from './Timer';

/**
 * Pomodoro module that will handle the logic of the pomodoro technique
 * @module Pomodoro
 */

var Pomodoro = (function() {
  /*
    Possible events:
    1. Work/Pomodoro (25 minutes)
    2. Short Break (5 minutes)
    3. Long Break (25 minutes)
  */

  // ENUM for different timer types:
  var Timers = {
    pomodoro: { minutes: 25, seconds: 0 },
    short_break: { minutes: 25, seconds: 0 },
    long_break: { minutes: 25, seconds: 0 }
  }

  // Pomodoro state
  var pomodorosDone = 0;
  var currentTimerType = Timers.pomodoro;

  // Necessary DOM features
  var DOM = {};

  function cacheDom() {
    DOM.app = document.querySelector("#app");
    DOM.openInfo = document.querySelector("#open-info");
    DOM.closeInfo = document.querySelector("#close-info");
    DOM.infoModal = document.querySelector("#info");    
  }

  function bindEvents() {
    DOM.app.addEventListener('click', toggleTimer);
    DOM.openInfo.addEventListener('click', handleInfo);
    DOM.closeInfo.addEventListener('click', handleInfo);
  }

  function init() {
    Timer.loadTimer(currentTimerType);
    Timer.init(this);

    cacheDom();
    bindEvents();
    render();
  }

  /** Event handler for the info modal. Effect changes depending on
   *  the event target
   *  @param event
   */
  function handleInfo(event) {
    event.stopPropagation();

    switch(event.target) {
      case DOM.openInfo:
        if (DOM.infoModal.classList.contains("hidden")) {
          DOM.infoModal.classList.remove("hidden");
        }
        break;
      case DOM.closeInfo:
      if (!DOM.infoModal.classList.contains("hidden")) {
        DOM.infoModal.classList.add("hidden");
      }
    }
  }

  
  /** Called whenever a timer is finished counting down. 
   *  @see module:Timer
  */
  function timerDone(type) {
    // type is the timer type of the one that just finished.
    if (currentTimerType === Timers.pomodoro) {
      pomodorosDone++;
    }

    nextTimer();
  } 

  /** Loads the next timer type given the previous timer type
   *  according to the Pomodoro technique.
   */
  function nextTimer() {
    if (currentTimerType === Timers.short_break || 
        currentTimerType === Timers.long_break) {
      Timer.loadTimer(Timers.pomodoro);
      currentTimerType = Timers.pomodoro;
    }
    else if (pomodorosDone < 4) { 
      Timer.loadTimer(Timers.short_break);
      currentTimerType = Timers.short_break;
    }
    else if (pomodorosDone === 4) {
      pomodorosDone = 0;
      Timer.loadTimer(Timers.long_break);
      currentTimerType = Timers.long_break;
    }
    else {
      throw "currentTimerType is not valid."
    }

    render();
  }

  /* Updating currentTimerType means we also need to update the app's style
  Change class of the app depending on currentTimerType */
  function render() {
    switch(currentTimerType) {
      case Timers.pomodoro:
        DOM.app.setAttribute("class", "working");
        break;
      case Timers.short_break:
        DOM.app.setAttribute("class", "short-break");
        break;
      case Timers.long_break:
        DOM.app.setAttribute("class", "long-break");
        break;
    }
  }

  /** Starts the timer if it is stopped, and vice versa */
  function toggleTimer() {
    Timer.started() ? Timer.stopTimer() : Timer.startTimer();
  }

  return {
    timerDone,
    Timers,
    nextTimer,
    init
  }
})();

export default Pomodoro;