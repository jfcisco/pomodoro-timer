var minutes = 25;
var seconds = 0;
var timerstarted = false;
var intervalID;

$(document).ready(function() {
  drawtime();
});

$("#start").click(function() {
  if (!timerstarted) {
    timerstarted = true;
    intervalID = setInterval(pomodoro, 1000);
  }
});

$("#stop").click(function() {
  stoptimer(false);
});

$("#reset").click(function() {
  stoptimer(false);
  minutes = 25;
  seconds = 0;
  
  drawtime();
});

function pomodoro() {
  seconds -= 1;
  //do math then draw
  if (seconds < 0 && minutes > 0) {
    seconds += 60;
    minutes -= 1;
  }

  if (seconds === -1 && minutes === 0) {
    stoptimer(true);
  }

  drawtime();
}

function drawtime() {
  var strminutes = minutes.toString();
  var strseconds = seconds.toString();
  if (minutes < 10) {
    strminutes = "0" + strminutes;
  }

  if (seconds < 10) {
    strseconds = "0" + strseconds;
  }

  $("#time").text(strminutes + ":" + strseconds);
};

function stoptimer(alertbool) {
  timerstarted = false;
  clearInterval(intervalID);
  if (alertbool) {
    alert("Times up!");
    minutes = 25;
    seconds = 0;
  }
}