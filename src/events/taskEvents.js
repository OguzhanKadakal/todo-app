import appState from "../modules/appState";
import Project from "../modules/project";
import Todo from "../modules/todo";
import { renderTaskItems } from "../modules/domLogic";
import { addGlobalEventListener } from "./eventDelegation.js";

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

  const newTodo = new Todo(
    projectTitle,
    taskDescription,
    taskDueDate,
    taskPriority
  );
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
  } else {
    console.error("Add Task Form not found in the DOM.");
  }
}

function handleEditTaskFormSubmit(event) {
  event.preventDefault();

  const editForm = event.target;
  const taskId = editForm.dataset.taskId;

  if (!taskId) {
    console.error("No task ID found in the form's dataset.");
    return;
  }

  const taskToEdit = appState.selectedProject.getTodoById(taskId);
  if (!taskToEdit) {
    console.error("Task not found.");
    return;
  }

  const taskTitleInput = editForm.querySelector("#edit-task-title-input");
  const taskDescriptionInput = editForm.querySelector(
    "#edit-task-description-input"
  );
  const taskDueDateInput = editForm.querySelector("#edit-task-due-date-input");
  const taskPrioritySelect = editForm.querySelector(
    "#edit-task-priority-select"
  );

  const updatedTitle = taskTitleInput.value.trim();
  const updatedDescription = taskDescriptionInput.value.trim();
  const updatedDueDate = taskDueDateInput.value;
  const updatedPriority = taskPrioritySelect.value;

  if (!updatedTitle) {
    alert("Task title cannot be empty!");
    return;
  }

  // Update the task details
  taskToEdit.updateDetails({
    title: updatedTitle,
    description: updatedDescription,
    dueDate: updatedDueDate,
    priority: updatedPriority,
  });

  // Re-render the task list
  renderTaskItems();

  // Close the modal
  const modal = document.querySelector("#edit-task-modal");
  if (modal) {
    modal.close();
  } else {
    console.error("Edit Task Modal not found in the DOM.");
  }
}

export function initializeTaskEditEvent() {
  const editTaskForm = document.querySelector("#edit-task-form");
  if (editTaskForm) {
    editTaskForm.addEventListener("submit", handleEditTaskFormSubmit);
  } else {
    console.error("Edit Task Form not found in the DOM.");
  }

  // Attach event delegation for edit icons
  addGlobalEventListener("click", ".task-edit-icon", (event) => {
    const modal = document.querySelector("#edit-task-modal");
    if (!modal) {
      console.error(`Modal with selector "#edit-task-modal" not found.`);
      return;
    }

    const taskItem = event.target.closest(".task-item");
    if (!taskItem) {
      console.error("No parent task-item element found for the clicked icon.");
      return;
    }

    const taskId = taskItem.getAttribute("data-id");
    if (!taskId) {
      console.error(
        "No data-id attribute found on the parent task-item element."
      );
      return;
    }

    const editTaskForm = modal.querySelector("#edit-task-form");
    if (editTaskForm) {
      editTaskForm.dataset.taskId = taskId;
    }

    const taskToEdit = appState.selectedProject.getTodoById(taskId);
    if (!taskToEdit) {
      console.error("Task not found.");
      return;
    }

    const taskTitleInput = modal.querySelector("#edit-task-title-input");
    const taskDescriptionInput = modal.querySelector(
      "#edit-task-description-input"
    );
    const taskDueDateInput = modal.querySelector("#edit-task-due-date-input");
    const taskPrioritySelect = modal.querySelector(
      "#edit-task-priority-select"
    );

    if (taskTitleInput) taskTitleInput.value = taskToEdit.title;
    if (taskDescriptionInput)
      taskDescriptionInput.value = taskToEdit.description;
    if (taskDueDateInput) taskDueDateInput.value = taskToEdit.dueDate;
    if (taskPrioritySelect) taskPrioritySelect.value = taskToEdit.priority;

    modal.showModal();
  });
}

//Delete
export function deleteTaskEvent() {
    const deleteTaskModal = document.querySelector("#task-delete-modal");
  
    document.addEventListener("click", (event) => {
      if (event.target.matches(".task-delete-icon")) {
        const taskItem = event.target.closest(".task-item");
        if (!taskItem) {
          console.error("No parent task-item element found for the clicked icon.");
          return;
        }
  
        const taskId = taskItem.getAttribute("data-id");
        if (!taskId) {
          console.error("No data-id attribute found on the parent task-item element.");
          return;
        }
  
        deleteTaskModal.dataset.taskId = taskId;
        deleteTaskModal.showModal();
      }
  
      if (event.target.matches(".delete-modal-confirm-btn")) {
        const taskId = deleteTaskModal.dataset.taskId;
      
        if (!appState.selectedProject) {
          console.error("No selected project. Cannot delete task.");
          deleteTaskModal.close();
          return;
        }
      
        const taskToDelete = appState.selectedProject.getTodoById(taskId);
        if (taskToDelete) {
          appState.selectedProject.removeTodo(taskToDelete);
          renderTaskItems();
          deleteTaskModal.close();
        } else {
          console.error("Task to delete not found.");
        }
      }
    });
  }

  //Toggle Completed

  export function completeTaskEvent() {
    addGlobalEventListener("change", ".task-item input[type='checkbox']", (event) => {
      const taskItem = event.target.closest(".task-item");
      if (!taskItem) {
        console.error("No parent task-item element found for the checkbox.");
        return;
      }
  
      const taskId = taskItem.getAttribute("data-id");
      if (!taskId) {
        console.error("No data-id attribute found on the parent task-item element.");
        return;
      }
  
      const taskToToggle = appState.selectedProject.getTodoById(taskId);
      if (!taskToToggle) {
        console.error("Task not found.");
        return;
      }
  
      // Toggle the completed status
      taskToToggle.toggleCompleted();
  
      // Re-render the task list
      renderTaskItems();
    });
  }

  export function sortTasksEvent() {
    document.querySelector("#sort-options").addEventListener("change", (event) => {
      const selectedOption = event.target.value; // Get the selected option
      const selectedProject = appState.selectedProject; // Get the currently selected project
  
      if (!selectedProject) {
          console.error("No project selected.");
          return;
      }
  
      // Call the appropriate sorting method based on the selected option
      if (selectedOption === "title") {
          selectedProject.sortTodosByTitle();
      } else if (selectedOption === "date") {
          selectedProject.sortTodosByDate();
      } else if (selectedOption === "priority") {
          selectedProject.sortTodosByPriority();
      }
  
      // Re-render the task list after sorting
      renderTaskItems();
  });
  }

