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

  // Necessary DOM features
  var DOM = {};

  function cacheDom() {
    DOM.openInfo = document.querySelector("#open-info");
    DOM.closeInfo = document.querySelector("#close-info");
    DOM.infoModal = document.querySelector("#info");
  }

  function bindEvents() {
    DOM.openInfo.addEventListener('click', handleInfo);
    DOM.closeInfo.addEventListener('click', handleInfo);
  }

  function init() {
    cacheDom();
    bindEvents();
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

  /** Returns the next timer type given the previous timer type
   *  according to the Pomodoro technique.
   */
  function nextTimer(previousTimer) {
    if (previousTimer === Timers.short_break || 
          previousTimer === Timers.long_break) {
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

  /** Called whenever a timer is finished counting down. */
  function timerDone(type) {
    // type is the timer type of the one that just finished.
    if (type === Timers.pomodoro) {
      pomodorosDone++;
    }
  } 

  return {
    timerDone,
    Timers,
    nextTimer,
    init
  }
})();

export default PEvents;