
// let taskName = document.getElementById ("taskName");
// let dueDate = document.getElementById ("dueDate");
// let names = document.getElementById ("names");
// let taskStatus = document.getElementById ("taskStatus");

// //add event listener for Submit button

// form.addEventListener("submit",(e) => {
//     e.preventDefault()
// }) {
//   let messages = [] {
//     if (
//         taskName.value === "" ||  taskName.value == null
//         messages.push ("Please enter a task")
//      if (
//         dueDate.value === "" ||  dueDate.value == null
//         messages.push ("Please enter a task")
//      if (
//         names.value === "" ||  names.value == null
//         messages.push ("Please enter a task")
//      if (
//         taskStatus.value === "" ||  taskStatus.value == null
//         messages.push ("Please enter a task")
    
//      }
// )

// Initialize a new TaskManager with currentId set to 0
// const taskManager = new TaskManager(0);

// Load the tasks from localStorage
// taskManager.load();
// Render the loaded tasks to the page
// taskManager.render();

// Select the New Task Form
const form = document.getElementById("mainForm");

// Add an 'onsubmit' event listener
form.addEventListener("submit", (event) => {
  // Select the inputs
  let validateName = document.getElementById("mainForm");
  let validateDescription = document.getElementById("taskName");
  let validateAssignedTo = document.querySelector("#names");
  let validateDueDate = document.querySelector("#dueDate");
  let validateStatus = document.querySelector("#taskStatus");
  let validationFail = 0;
  console.log (validateDueDate)

  // Prevent default action
  event.preventDefault();

  // Call this to clear all the form fields after the submission
  const clearFormFields = () => {
    validateName.value = "";
    validateDescription.value = "";
    validateAssignedTo.value = "";
    validateStatus.value = "In Progress";
    validateDueDate.value = "";
    validateName.classList.remove("is-valid");
    validateDescription.classList.remove("is-valid");
    validateAssignedTo.classList.remove("is-valid");
    validateStatus.classList.remove("is-valid");
    validateDueDate.classList.remove("is-valid");
  };

  let todaysDate = new Date(Date.now())
    .toLocaleString()
    .split(",")[0]
    .split("/");
  let day = todaysDate[0];
  let month = todaysDate[1];
  let year = todaysDate[2];
  // taskDueDate is in yyyy-mm-dd format
  let taskDueDate = validateDueDate.value.split("-");

  // Form validation for Task Name Field for min length 2
  if (validateName.value.length > 2) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Description Field for min length 8
  if (validateDescription.value.length > 8) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Assigned Field for min length 5
  if (validateAssignedTo.value.length > 5) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  }
  console.log(
    `taskDueDate[2]:${taskDueDate[2]} day:${day} taskDueDate[1]:${taskDueDate[1]} month:${month} taskDueDate[0]:${taskDueDate[0]} year:${year}`
  );
  if (
    taskDueDate[2] >= day &&
    taskDueDate[1] >= month &&
    taskDueDate[0] >= year
  ) {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Task Status Field for not empty
  if (validateStatus.value) {
    validateStatus.classList.add("is-valid");
    validateStatus.classList.remove("is-invalid");
  } else {
    validateStatus.classList.add("is-invalid");
    validateStatus.classList.remove("is-valid");
    validationFail++;
  }
  // If validation fails then function will not proceed further and
  // will return. The value of validationFail will also needed to be
  // reset to 0.
  // ----------------------------------------------------------------------------------
  if (validationFail > 0) {
    validationFail = 0;
    return;
  } else {
    // Push the valid input into our tasks array
    taskManager.addTask(
      validateName.value,
      validateDescription.value,
      validateAssignedTo.value,
      validateDueDate.value,
      validateStatus.value
    );
    clearFormFields();
    taskManager.save();
    taskManager.render();
  }
});

const taskList = document.querySelector("#task-list");
// Add an 'onclick' event listener to the Tasks List
taskList.addEventListener("click", (event) => {
  // Check if a "Done" button was clicked
  if (event.target.classList.contains("done-button")) {
    // Get the correct parent Task, yours might be slightly different
    // Use console.log(event.target.parentElement) to see
    const parentTask =
      event.target.parentElement.parentElement.parentElement.parentElement;
    // Get the taskId of the parent Task and turn it into a number.
    const taskId = Number(parentTask.dataset.taskId);
    // Get the task from the TaskManager using the taskId
    const task = taskManager.getTaskById(taskId);
    // Update the task status to 'DONE'
    task.status = "Done";
    taskManager.save();
    // Render the tasks
    taskManager.render();
  }

  // Check if a "Delete" button was clicked
  if (event.target.classList.contains("delete-button")) {
    // Get the parent Task
    const parentTask =
      event.target.parentElement.parentElement.parentElement.parentElement;

    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);

    // Delete the task
    taskManager.deleteTask(taskId);

    // Save the tasks to localStorage
    taskManager.save();

    // Render the tasks
    taskManager.render();
  }
});


