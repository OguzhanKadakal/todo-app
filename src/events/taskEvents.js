import appState from "../modules/appState";
import Project from "../modules/project";
import Todo from "../modules/todo";
import { renderTaskItems } from "../modules/domLogic";

function handleAddTaskFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const taskTitleInput = form.querySelector("#task-title-input");
    const projectTitle = taskTitleInput.value.trim();

    const taskDescriptionInput = form.querySelector("#task-description-input");
    const taskDescription = taskDescriptionInput.value.trim();

    const taskDueDateInput = form.querySelector("#task-due-date-input");
    const taskDueDate = taskDueDateInput.value;
    
    const taskPrioritySelect = form.querySelector("#task-priority-select");
    const taskPriority = taskPrioritySelect.value;

    const newTodo = new Todo(projectTitle, taskDescription, taskDueDate, taskPriority);
    appState.selectedProject.addTodo(newTodo);
    renderTaskItems();
    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    taskDueDateInput.value = "";
    taskPrioritySelect.selectedIndex = 0;
    
    const modal = document.querySelector("#add-task-modal");
    if (modal) {
      modal.close();
    } else {
      console.error("Add Task Modal not found in the DOM.");
    }
}

export function initializeTaskAddEvent() {
    const addTaskForm = document.querySelector("#add-task-form");
    if (addTaskForm) {
        addTaskForm.addEventListener("submit", handleAddTaskFormSubmit);
    } 
    else {
      console.error("Add Task Form not found in the DOM.");
    }
  }

 //Edit

function handleEditTaskFormSubmit(event) {
  event.preventDefault();

  const editTaskForm = event.target;
  const editTaskTitleInput = editTaskForm.querySelector("#edit-task-title-input");
  const editTaskDescInput = editTaskForm.querySelector("#edit-task-description-input");
  const editTaskDateInput = editTaskForm.querySelector("#edit-task-due-date-input");
  const editTaskPrioritySelect = editTaskForm.querySelector("#edit-task-priority-select");

  const editTaskTitle = editTaskTitleInput.value.trim();
  const editTaskDesc = editTaskDescInput.value.trim();
  const editTaskDate = editTaskDateInput.value;
  const editTaskPriority = editTaskPrioritySelect.selectedIndex;

  if (!editTaskTitle) {
    alert("Task title cannot be empty!");
    return;
  }

  if (!editTaskDesc) {
    alert("Task Description cannot be empty!");
    return;
  }

  if (!editTaskDate) {
    alert("Please select a valid date!");
    return;
  }

  const taskId = editTaskForm.dataset.taskId;
  if (!taskId) {
    console.error("No task ID found in the form's dataset.");
    return;
  }

  const taskToEdit = appState.selectedProject.getTodoById(taskId)
  if (!taskToEdit) {
    console.error("Task not found.");
    return;
  }

  taskToEdit.updateDetails(editTaskTitle, editTaskDesc, editTaskDate, editTaskPriority);
  renderTaskItems();

  const modal = document.querySelector("#edit-task-modal");
  if (modal) {
    modal.close();
  } else {
    console.error("Edit Task Modal not found in the DOM.");
  }
}
