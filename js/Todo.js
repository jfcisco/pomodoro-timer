var Todo = (function() {
  // Mapping for "cached" DOM elements
  var DOM = {};

  /* Private Methods */

  function cacheDom() {
    DOM.taskList = $("#task-list");
    DOM.newTask = $("#new-task");
  }

  function bindEvents() {
    // Using event delegation to make delete button work.
    DOM.taskList.on("click", function(e) {
          
      switch($(e.target).prop("tagName").toLowerCase()) {
        case "button":
          // Get index of the tasks to be deleted
          var taskIndexToDelete = $(e.target).parent().data("task-id");

          // Filter out the task from the listOfTasks
          listOfTasks = listOfTasks.filter(function(task, index) {
            return index !== taskIndexToDelete;
          });

          render();
          break;

        case "label":
          // Set the selectedTask variable to the currently selected task
          selectedTask = $(e.target).text();
          break;
      }
    });

    DOM.newTask.submit(function(e) {
      e.preventDefault();
      var taskName = $("input[name='new-task']").val();
      
      // Clear input on submit
      $("input[name='new-task']").val("");
      
      // Add task list item to list of tasks
      listOfTasks.push(taskName);
    
      // Update DOM
      render();
    });

  }
  
  /** Update the unordered list of tasks on the DOM to reflect the state. */
  function render() {
    // Delete the contents of the unordered list
    DOM.taskList.empty();
  
    // Replace with new children
    listOfTasks.forEach(function(taskName, i) {
      DOM.taskList.append($(`
      <li data-task-id=${i}> 
        <label><input type="radio" name="task">${taskName}</label>
        <button type="button" class="delete-button">Delete</button>
      </li>
      `));
    });
  }

  function test() {
      // Dev-only, remove when localStorage is okay
      listOfTasks.push("Task 1", "Task 2");
      render();
  }

  /* Public Methods and Properties */
  var listOfTasks = [];
  var selectedTask = "";
  
  function init() {
    cacheDom();
    bindEvents();
    test();
  }

  return {
    init,
    listOfTasks,
    selectedTask
  };
})();