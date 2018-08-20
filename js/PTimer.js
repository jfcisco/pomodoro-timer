/** This module controls the countdown timer of the Pomodoro. 
 * When the timer finishes, it calls a method for the 
 * PEvents module to process. */

/* 
  The PTimer should only be concerned about timer functions.
  Thus, it should depend on PEvents to know which type of
  timer it needs to display.
*/
var PTimer = (function() {
  var DOM = {};
  
  var minutes = 25;
  var seconds = 0;
  var timerStarted = false; 
  var intervalId = null;

  /* Private */
  function cacheDom() {
    DOM.time = $("#time");
    DOM.start = $("#start");
    DOM.stop = $("#stop");
    DOM.reset = $("#reset");
  }

  function bindEvents() {
    DOM.start.click(function() {
      if (!timerStarted) {
        timerStarted = true;
        intervalId = setInterval(countDown, 1000);
      }
    });
    
    DOM.stop.click(function() {
      stopTimer(false);
    });
    
    DOM.reset.click(function() {
      stopTimer(false);
      minutes = 25;
      seconds = 0;
      
      render();
    });
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
  
    DOM.time.text(minutesStr + ":" + secondsStr);
  }

  /** Method to handle the countdown of the timer */
  function countDown() {
    seconds -= 1;

    if (seconds < 0 && minutes > 0) {
      seconds += 60;
      minutes -= 1;
    }
  
    if (seconds === -1 && minutes === 0) {
      stopTimer(true);
    }
  
    render();
  }

  function stopTimer(displayAlert) {
    settings.timerStarted = false;
    clearInterval(intervalId);
    if (alertbool) {
      alert("Times up!");
      minutes = 25;
      seconds = 0;
    }
  }

  /* Public */

  function init() {
    cacheDom();
    bindEvents();
    render();
  }
  
  return {
    init
  };

})();