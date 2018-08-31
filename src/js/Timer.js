/** This module controls the countdown timer of the Pomodoro. 
 * When the timer finishes, it calls a method for the 
 * Pomodoro module to process. 
 * @module Timer
 * */

/* 
  The Timer should only be concerned about timer functions.
  Thus, it should delegate the flows of the Pomodoro technique to
  the Pomodoro module.
*/
var Timer = (function() {
  var DOM = {};

  /* Private */
  var minutes = 0;
  var seconds = 0;
  var timerStarted = false;
  var intervalId = null;
  
  /* 
    Declare clientModule here.
    Client is expected to receive timer events.
  */
  var clientModule  = null;
  
  function cacheDom() {
    // The only concern of the Timer module with the DOM is the display.
    DOM.time = document.querySelector("#time");
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

    DOM.time.textContent = minutesStr + ":" + secondsStr;
  }

  /** Method to handle the countdown of the timer */
  function countDown() {
    seconds -= 1;

    if (seconds < 0 && minutes > 0) {
      seconds += 60;
      minutes -= 1;
    }
    else if (seconds === 0 && minutes === 0) {
      // Timer is done. Call relevant functions
      stopTimer();
      clientModule.timerDone();
    }
  
    render();
  }

  /* Public */

  function init(client) {
    cacheDom();
    clientModule = client;
    render();
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
  
  /** Load the next type of timer according to the Pomodoro technique,
     *  and change the minutes and seconds variables to the appropriate amount.
     *  @param settings {Object}
     * 
     *  To be called by the Pomodoro module to load the next timer.
     */

    /* Setting object should look like: 
      {
        minutes: int,
        seconds: int
      }
    */
  function loadTimer(settings) {
    minutes = settings.minutes;
    seconds = settings.seconds;
    render();
  }

  /**
   * Returns a boolean value indicating whether timer has started or stopped
   */
  function started() {
    return timerStarted;
  }

  return {
    init,
    startTimer,
    stopTimer,
    loadTimer,
    started
  };

})();

export default Timer;