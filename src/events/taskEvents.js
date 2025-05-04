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

export function initializeTaskEvents() {
    const addTaskForm = document.querySelector("#add-task-form");
    const editTaskForm = document.querySelector("#edit-task-form");
    if (addTaskForm) {
        addTaskForm.addEventListener("submit", handleAddTaskFormSubmit);
    } 
    else {
      console.error("Add Task Form not found in the DOM.");
    }
  }