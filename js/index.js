(function() {

var minutes = 25;
var seconds = 0;
var timerStarted = false;
var intervalId;
var listOfTasks = [];
var selectedTask = "";

// EVENT LISTENERS:

$(document).ready(function() {
  drawtime();

  // TODO: DEV-only, remove when localStorage is okay
  listOfTasks.push("Task 1", "Task 2");
  updateListDom();

  $("#start").click(function() {
    if (!timerstarted) {
      timerstarted = true;
      intervalId = setInterval(pomodoro, 1000);
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
  
  // Using event delegation to make delete button work.
  $("#task-list").on("click", function(e) {
      
    switch($(e.target).prop("tagName").toLowerCase()) {
      case "button":
        // Get index of the tasks to be deleted
        var taskIndexToDelete = $(e.target).parent().data("task-id");

        // Filter out the task from the listOfTasks
        listOfTasks = listOfTasks.filter(function(task, index) {
          return index !== taskIndexToDelete;
        });

        updateListDom();
        break;

      case "label":
        // Set the selectedTask variable to the currently selected task
        selectedTask = $(e.target).text();
        break;
    }
  });

  $("#new-task").submit(function(e) {
    e.preventDefault();
    var taskName = $("input[name='new-task']").val();
    
    // Clear input on submit
    $("input[name='new-task']").val("");
    
    // Add task list item to list of tasks
    listOfTasks.push(taskName);

    // Update DOM
    updateListDom();
  });

});

// HELPFUL FUNCTIONS:

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

 /** Update the unordered list of tasks on the DOM to reflect the state. */
function updateListDom() {
  var domTaskList = $("#task-list");

  // Delete the contents of the unordered list
  domTaskList.empty();

  // Replace with new children
  listOfTasks.forEach(function(taskName, i) {
    domTaskList.append($(`
    <li data-task-id=${i}> 
      <label><input type="radio" name="task">${taskName}</label>
      <button type="button" class="delete-button">Delete</button>
    </li>
    `));
  });
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
  clearInterval(intervalId);
  if (alertbool) {
    alert("Times up!");
    minutes = 25;
    seconds = 0;
  }
}

})();