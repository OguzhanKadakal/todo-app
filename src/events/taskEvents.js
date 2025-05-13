import appState from "../modules/appState";
import Todo from "../modules/todo";
import { renderTaskItems } from "../modules/domLogic";
import { addGlobalEventListener } from "./eventDelegation.js";
import { saveToLocalStorage } from "../modules/storage";

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
  saveToLocalStorage(appState);
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

  saveToLocalStorage(appState);

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

          saveToLocalStorage(appState);

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

      saveToLocalStorage(appState);
  
      // Re-render the task list
      renderTaskItems();
    });
  }

  export function sortTasksEvent() {
    const sortDropdown = document.querySelector("#sort-options");
    if (!sortDropdown) {
      console.error("Sort dropdown not found in the DOM.");
      return;
    }
  
    sortDropdown.addEventListener("change", (event) => {
      const selectedOption = event.target.value; // Get the selected sorting option
      const selectedProject = appState.selectedProject; // Get the currently selected project
  
      if (!selectedProject) {
        console.error("No project selected.");
        return;
      }
  
      // Call the appropriate sorting method based on the selected option
      switch (selectedOption) {
        case "title-asc":
          selectedProject.sortTodosByTitle("asc");
          break;
        case "title-desc":
          selectedProject.sortTodosByTitle("desc");
          break;
        case "date-asc":
          selectedProject.sortTodosByDate("asc");
          break;
        case "date-desc":
          selectedProject.sortTodosByDate("desc");
          break;
        case "priority-asc":
          selectedProject.sortTodosByPriority("asc");
          break;
        case "priority-desc":
          selectedProject.sortTodosByPriority("desc");
          break;
        default:
          console.error(`Unknown sorting option: ${selectedOption}`);
          break;
      }
  
      // Re-render the task list after sorting
      renderTaskItems(selectedProject.todos);
    });
  }

export function filterTaskEvent() {
    const filterDropdown = document.querySelector("#filter-options");

    if (!filterDropdown) {
        console.error("Filter dropdown not found in the DOM.");
        return;
    }

    console.log("Filter Task Event Initialized");

    filterDropdown.addEventListener("change", (event) => {
        const selectedOption = event.target.value; // Get the selected filter option
        const selectedProject = appState.selectedProject; // Get the currently selected project

        console.log("Selected Option:", selectedOption);
        console.log("Selected Project:", selectedProject);

        if (!selectedProject) {
            console.error("No project selected.");
            return;
        }

        // Iterate over all task items in the DOM
        const taskItems = document.querySelectorAll(".task-item");
        taskItems.forEach((taskItem) => {
            const taskId = taskItem.getAttribute("data-id");
            const task = selectedProject.todos.find((todo) => todo.id === taskId);

            if (!task) {
                console.error(`Task with ID ${taskId} not found.`);
                return;
            }

            // Show or hide tasks based on the selected filter option
            if (selectedOption === "completed" && task.completed) {
                taskItem.style.display = "block"; // Show completed tasks
            } else if (selectedOption === "not-completed" && !task.completed) {
                taskItem.style.display = "block"; // Show not completed tasks
            } else if (selectedOption === "all") {
                taskItem.style.display = "block"; // Show all tasks
            } else {
                taskItem.style.display = "none"; // Hide tasks that don't match the filter
            }
        });
    });
}