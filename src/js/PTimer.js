import $ from 'jquery';
import PEvents from './PEvents';

/** This module controls the countdown timer of the Pomodoro. 
 * When the timer finishes, it calls a method for the 
 * PEvents module to process. */

/* 
  The PTimer should only be concerned about timer functions.
  Thus, it should depend on PEvents to handle the flows of
  the Pomodoro technique.
*/
var PTimer = (function() {
  var DOM = {};

  /* Private */
  var minutes = 0;
  var seconds = 0;
  var timerStarted = false;
  var currentTimerType = PEvents.Timers.short_break;
  var intervalId = null;
  
  function cacheDom() {
    DOM.time = $("#time");
    DOM.app = $("#app");
  }

  function bindEvents() {
    DOM.app.click(toggleTimer);
  }

  function render() {
    var minutesStr = minutes.toString();
    var secondsStr = seconds.toString();

    if (minutes < 10) {
      minutesStr = "0" + minutesStr;
    }
  
    if (seconds < 10) {
      secondsStr = "0" + secondsStr;
    }
    
    // Change class of the app depending on currentTimerType
    switch(currentTimerType) {
      case PEvents.Timers.pomodoro:
        DOM.app.attr("class", "working");
        break;
      case PEvents.Timers.short_break:
        DOM.app.attr("class", "short-break");
        break;
      case PEvents.Timers.long_break:
        DOM.app.attr("class", "long-break");
        break;
    }

    DOM.time.text(minutesStr + ":" + secondsStr);
  }

  /** Method to handle the countdown of the timer */
  function countDown() {
    seconds -= 1;

    if (seconds < 0 && minutes > 0) {
      seconds += 60;
      minutes -= 1;
    }
    else if (seconds === -1 && minutes === 0) {
      // Timer is done. Call relevant functions
      stopTimer();
      PEvents.timerDone(currentTimerType);
      loadTimer();
    }
  
    render();
  }

  /** Load the next type of timer according to the Pomodoro technique,
   *  and change the minutes and seconds variables to the appropriate amount.
   */
  function loadTimer() {
    currentTimerType = PEvents.nextTimer(currentTimerType);
    
    switch (currentTimerType) {
      case PEvents.Timers.pomodoro:
        minutes = 25;
        seconds = 0;
        break;
      
      case PEvents.Timers.short_break:
        minutes = 5;
        seconds = 0;
        break;

      case PEvents.Timers.long_break:
        minutes = 25;
        seconds = 0;
        break;
    }

    render();
  }

  /** Toggles timer, i.e. it starts when the timer is stopped and stops when started */
  function toggleTimer() {
    !timerStarted ? startTimer() : stopTimer();
  }

  function startTimer() {
    if (!timerStarted) {
      timerStarted = true;
    }

    intervalId = setInterval(countDown, 1000);
  }

  function stopTimer() {
    if (timerStarted) {
      timerStarted = false;
    }
    
    clearInterval(intervalId);
  }

  /* Public */

  function init() {
    cacheDom();
    bindEvents();

    loadTimer();
    render();
  }
  
  return {
    init,
    startTimer,
    stopTimer
  };

})();

export default PTimer;