import appState from "./appState.js";
import { format } from "date-fns";


export function createElement(tag, attributes = {}, textContent = "") {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach((key) =>
    element.setAttribute(key, attributes[key])
  );
  element.textContent = textContent;
  return element;
}

export function initializeUI() {
  const app = document.querySelector("#app");
  const sidebarEl = createElement("div", { class: "left-sidebar" });
  const mainEl = createElement("div", { class: "main-container" });
  app.append(sidebarEl, mainEl);
  renderAppLogo();
  renderProjectsContainer();
  renderProjectItems();
  renderAddProjectButton();
  renderMainContainer();
  renderTaskHeader();
  renderFilterOption()
  renderSortOption();
  renderAddTaskButton();
  renderTaskItems();
  renderAddProjectModal()
  renderEditProjectModal()
  renderAddTaskModal()
  renderEditTaskModal()
  renderProjectDeleteModal()
  renderTaskDeleteModal()
}

function createItemContainer(id) {
  return createElement("ul", { id: id });
}

function createIcon(iconClassName, iconText) {
  return createElement("span", { class: iconClassName }, iconText);
}

//Left sidebar
function renderProjectsContainer() {
  const leftSidebar = document.querySelector(".left-sidebar");
  const projectContainer = createItemContainer("project-container");
  leftSidebar.append(projectContainer);
}

export function renderProjectItems() {
  const projectContainer = document.querySelector("#project-container");
  projectContainer.innerHTML = "";

  appState.projects.forEach((p) => {
    const projectItem = createElement(
      "li",
      {
        class: "project-item",
        "data-id": p.id, //data-id for easier reference
      },
      p.title
    );

    const projectEditIcon = createIcon("material-symbols-outlined project-edit-icon", "edit_square");
    const projectDeleteIcon = createIcon("material-symbols-outlined project-delete-icon", "delete");
    projectEditIcon.setAttribute("data-modal-target", "#edit-project-modal");

    projectItem.append(projectEditIcon, projectDeleteIcon);
    projectContainer.append(projectItem);
  });
}

function renderAppLogo() {
  const leftSidebar = document.querySelector(".left-sidebar");
  const appLogo = createElement("h1", { id: "title" }, "ToDo App");
  leftSidebar.append(appLogo);
}

function renderAddProjectButton() {
  const leftSidebar = document.querySelector(".left-sidebar");
  const addProjectButton = createElement(
    "button",
    { id: "add-project-btn", "data-modal-target": "#add-project-modal" },
    "+ Add Project"
  );
  leftSidebar.append(addProjectButton);
}

//Main
function renderMainContainer() {
  const mainContainer = document.querySelector(".main-container");

  const mainContainerHeader = createElement("div", {
    class: "main-container-header",
  });
  const mainContainerBody = createElement("div", { class: "main-container-body" });
  const tasksContainer = createItemContainer("task-container");

  mainContainer.append(mainContainerHeader, mainContainerBody);
  mainContainerBody.append(tasksContainer);
}
export function renderTaskHeader() {
  const mainContainerHeader = document.querySelector(".main-container-header");
  mainContainerHeader.innerHTML= "";
  const projectTitle = createElement(
    "h1",
    { id: "project-title" },
    appState.selectedProject?.title || "Create a New Project to Start!"
  );
  mainContainerHeader.append(projectTitle);
}

function renderSortOption() {
  const mainContainerBody = document.querySelector(".main-container-body");
  const taskContainer = document.querySelector("#task-container"); // Select the task container

  const sortContainer = createElement("div", { class: "sort-container" }); // Create a container div
  const sortLabel = createElement(
    "label",
    { for: "sort-options", class: "sort-label" },
    "Sort Tasks:"
  );
  const sortSelect = createElement("select", { name: "sort-options", id: "sort-options" });
  const sortByDefault = createElement("option", { value: "default" }, "Default");
  const sortByTitleAsc = createElement("option", { value: "title-asc" }, "Title (A-Z)");
  const sortByTitleDesc = createElement("option", { value: "title-desc" }, "Title (Z-A)");
  const sortByDateAsc = createElement("option", { value: "date-asc" }, "Due Date (Ascending)");
  const sortByDateDesc = createElement("option", { value: "date-desc" }, "Due Date (Descending)");
  const sortByPriorityAsc = createElement("option", { value: "priority-asc" }, "Priority (High to Low)");
  const sortByPriorityDesc = createElement("option", { value: "priority-desc" }, "Priority (Low to High)");

  // Append options to the dropdown
  sortSelect.append(
    sortByDefault,
    sortByTitleAsc,
    sortByTitleDesc,
    sortByDateAsc,
    sortByDateDesc,
    sortByPriorityAsc,
    sortByPriorityDesc
  );

  // Append the label and dropdown to the container
  sortContainer.append(sortLabel, sortSelect);

  // Insert the container before the task container
  mainContainerBody.insertBefore(sortContainer, taskContainer);
}

function renderFilterOption() {
  const mainContainerBody = document.querySelector(".main-container-body");
  const taskContainer = document.querySelector("#task-container"); // Select the task container

  const filterContainer = createElement("div", { class: "filter-container" }); // Create a container div
  const filterLabel = createElement(
    "label",
    { for: "filter-options", class: "filter-label" },
    "Filter Tasks:"
  );
  const filterSelect = createElement("select", { name: "filter-options", id: "filter-options" });
  const filterAll = createElement("option", { value: "all" }, "All");
  const filterCompleted = createElement("option", { value: "completed" }, "Completed");
  const filterNotCompleted = createElement("option", { value: "not-completed" }, "Not Completed");

  // Append options to the dropdown
  filterSelect.append(filterAll, filterCompleted, filterNotCompleted);

  // Append the label and dropdown to the container
  filterContainer.append(filterLabel, filterSelect);

  // Insert the container before the task container
  mainContainerBody.insertBefore(filterContainer, taskContainer);
}

export function renderAddTaskButton() {
  const mainContainerBody = document.querySelector(".main-container-body");
  let addTaskButton = document.querySelector("#add-task-btn");

  if (!addTaskButton) {
    addTaskButton = createElement(
      "button",
      { id: "add-task-btn", "data-modal-target": "#add-task-modal" },
      "+ Add Task"
    );
    mainContainerBody.append(addTaskButton);
  }

  if (appState.projects.length > 0 && appState.selectedProject) {
    addTaskButton.style.display = "block";
  } else {
    addTaskButton.style.display = "none";
  }
}

export function renderTaskItems() {
  const taskContainer = document.querySelector("#task-container");
  taskContainer.innerHTML = "";
  const todos = appState.selectedProject?.todos || [];
  if (todos.length > 0) {
    todos.forEach((t) => {
      const todoItem = createElement("li", {
        class: "task-item",
        "data-id": t.id,
      });

      taskContainer.append(todoItem);

      const todoCheckbox = createElement("input", { type: "checkbox" });
      const todoTDContainer = createElement("div", {class: "task-TD-container"});
      const todoTitle = createElement("p", { class: "task-title"}, t.title);
      const todoDescription = createElement("p", {class: "title-description"}, t.description);
      const todoDate = createElement(
        "p",
        { class: "task-date" },
        `Due: ${t.dueDate ? format(new Date(t.dueDate), "dd MMM, yyyy") : "No due date"}`
      );
      const todoPriority = createElement("p", {class: "task-priority"}, t.priority);
      const todoIconContainer = createElement("div", {class: "icon-container"});
      const todoEditIcon = createIcon("material-symbols-outlined task-edit-icon", "edit_square");
      const todoDeleteIcon = createIcon("material-symbols-outlined task-delete-icon", "delete");
      todoEditIcon.setAttribute("data-modal-target", "#edit-task-modal");

      if (t.completed) {
        todoCheckbox.checked = true;
        todoTitle.style.textDecoration = "line-through";
        todoDescription.style.textDecoration = "line-through";
        todoDate.style.textDecoration = "line-through";
        todoPriority.style.textDecoration = "line-through";
      }
  

      todoItem.append(todoCheckbox, todoTDContainer, todoDate, todoPriority, todoIconContainer);
      todoTDContainer.append(todoTitle, todoDescription);
      todoIconContainer.append(todoEditIcon, todoDeleteIcon);

    });
  } else {
    const addFirstTaskText = createElement(
      "p",
      { class: "add-task-text" },
      "Click the button below to Add your first task!"
    );
    taskContainer.append(addFirstTaskText);
    
  }
}

//Modals

function createDialogModal(id){
    return createElement("dialog", {class: "modal", id: id});
}

// Projects
function renderAddProjectModal() {
  const addProjectModal = createDialogModal("add-project-modal");
  const app = document.querySelector("#app");
  app.append(addProjectModal);

  const addProjectForm = createElement("form", { id: "add-project-form" });
  addProjectModal.append(addProjectForm);

  const addProjectFormLabel = createElement(
      "label",
      { class: "add-project-form-label", htmlFor: "add-project-name-input" },
      "Please enter a name for your project: "
  );
  const addProjectFormInput = createElement("input", { class: "add-project-form-input", type: "text", id: "add-project-name-input", name: "project-name" });

  const addProjectFormSubmitButton = createElement(
    "button",
    { class: "add-project-form-submit-btn", type: "submit" },
    "Submit"
  );
  const addProjectFormCancelButton = createElement(
    "button",
    { class: "cancel-btn", type: "button", formmethod: "dialog" },
    "Cancel"
  );
  addProjectForm.append(addProjectFormLabel, addProjectFormInput, addProjectFormSubmitButton, addProjectFormCancelButton);
}

function renderEditProjectModal() {
  const editProjectModal = createDialogModal("edit-project-modal");
  const app = document.querySelector("#app");
  app.append(editProjectModal);

  const editProjectForm = createElement("form", { id: "edit-project-form" });
  editProjectModal.append(editProjectForm);

  const editProjectFormLabel = createElement(
      "label",
      { class: "edit-project-form-label", htmlFor: "edit-project-name-input" },
      "Please enter a new name for the project: "
  );
  const editProjectFormInput = createElement("input", { class: "edit-project-form-input", type: "text", id: "edit-project-name-input", name: "edit-project-name" });

  const editProjectFormSubmitButton = createElement(
    "button",
    { class: "edit-project-form-submit-btn", type: "submit" },
    "Submit"
  );
  const editProjectFormCancelButton = createElement(
    "button",
    { class: "cancel-btn", type: "button", formmethod: "dialog" },
    "Cancel"
  );
  editProjectForm.append(editProjectFormLabel, editProjectFormInput, editProjectFormSubmitButton, editProjectFormCancelButton);
}

//Tasks
function renderAddTaskModal() {
  const addTaskModal = createDialogModal("add-task-modal");
  const app = document.querySelector("#app");
  app.append(addTaskModal);

  const addTaskForm = createElement("form", { id: "add-task-form" });
  addTaskModal.append(addTaskForm);

  const titleLabel = createElement(
    "label",
    { for: "task-title-input", class: "task-form-label" },
    "Task Title:"
  );
  const titleInput = createElement("input", {
    type: "text",
    id: "task-title-input",
    name: "task-title",
    class: "task-form-input",
    "aria-label": "Task Title",
  });

  const descriptionLabel = createElement(
    "label",
    { for: "task-description-input", class: "task-form-label" },
    "Task Description:"
  );
  const descriptionInput = createElement("textarea", {
    id: "task-description-input",
    name: "task-description",
    class: "task-form-input",
    "aria-label": "Task Description",
  });

  const dueDateLabel = createElement(
    "label",
    { for: "task-due-date-input", class: "task-form-label" },
    "Due Date:"
  );
  const dueDateInput = createElement("input", {
    type: "date",
    id: "task-due-date-input",
    name: "task-due-date",
    class: "task-form-input",
    "aria-label": "Task Due Date",
  });

  const priorityLabel = createElement(
    "label",
    { for: "task-priority-select", class: "task-form-label" },
    "Priority:"
  );
  const prioritySelect = createElement("select", {
    id: "task-priority-select",
    name: "task-priority",
    class: "task-form-input",
    "aria-label": "Task Priority",
  });
  const lowOption = createElement("option", { value: "low" }, "Low");
  const mediumOption = createElement("option", { value: "medium" }, "Medium");
  const highOption = createElement("option", { value: "high" }, "High");
  prioritySelect.append(lowOption, mediumOption, highOption);

  const submitButton = createElement(
    "button",
    { type: "submit", class: "task-form-submit-btn" },
    "Submit"
  );
  const cancelButton = createElement(
    "button",
    { type: "button", class: "cancel-btn", formmethod: "dialog" },
    "Cancel"
  );

  addTaskForm.append(
    titleLabel,
    titleInput,
    descriptionLabel,
    descriptionInput,
    dueDateLabel,
    dueDateInput,
    priorityLabel,
    prioritySelect,
    submitButton,
    cancelButton
  );
}

function renderEditTaskModal() {
  const editTaskModal = createDialogModal("edit-task-modal");
  const app = document.querySelector("#app");
  app.append(editTaskModal);

  const editTaskForm = createElement("form", { id: "edit-task-form" });
  editTaskModal.append(editTaskForm);

  const titleLabel = createElement(
    "label",
    { for: "edit-task-title-input", class: "task-form-label" },
    "Task Title:"
  );
  const titleInput = createElement("input", {
    type: "text",
    id: "edit-task-title-input",
    name: "edit-task-title",
    class: "task-form-input",
    "aria-label": "Task Title",
  });

  const descriptionLabel = createElement(
    "label",
    { for: "edit-task-description-input", class: "task-form-label" },
    "Task Description:"
  );
  const descriptionInput = createElement("textarea", {
    id: "edit-task-description-input",
    name: "edit-task-description",
    class: "task-form-input",
    "aria-label": "Task Description",
  });

  const dueDateLabel = createElement(
    "label",
    { for: "edit-task-due-date-input", class: "task-form-label" },
    "Due Date:"
  );
  const dueDateInput = createElement("input", {
    type: "date",
    id: "edit-task-due-date-input",
    name: "edit-task-due-date",
    class: "task-form-input",
    "aria-label": "Task Due Date",
  });

  const priorityLabel = createElement(
    "label",
    { for: "edit-task-priority-select", class: "task-form-label" },
    "Priority:"
  );
  const prioritySelect = createElement("select", {
    id: "edit-task-priority-select",
    name: "edit-task-priority",
    class: "task-form-input",
    "aria-label": "Task Priority",
  });
  const lowOption = createElement("option", { value: "low" }, "Low");
  const mediumOption = createElement("option", { value: "medium" }, "Medium");
  const highOption = createElement("option", { value: "high" }, "High");
  prioritySelect.append(lowOption, mediumOption, highOption);

  const submitButton = createElement(
    "button",
    { type: "submit", class: "task-form-submit-btn" },
    "Submit"
  );
  const cancelButton = createElement(
    "button",
    { type: "button", class: "cancel-btn", formmethod: "dialog" },
    "Cancel"
  );

  editTaskForm.append(
    titleLabel,
    titleInput,
    descriptionLabel,
    descriptionInput,
    dueDateLabel,
    dueDateInput,
    priorityLabel,
    prioritySelect,
    submitButton,
    cancelButton
  );
}

export function renderProjectDeleteModal() {
  const modal = createDialogModal("project-delete-modal");
  const app = document.querySelector("#app");
  const message = createElement(
    "p",
    { class: "delete-modal-message" },
    "Are you sure you want to delete this project?"
  );

  const confirmButton = createElement(
    "button",
    { class: "delete-modal-confirm-btn", type: "button" },
    "Yes"
  );

  const cancelButton = createElement(
    "button",
    { class: "cancel-btn", type: "button", formmethod: "dialog" },
    "No"
  );

  modal.append(message, confirmButton, cancelButton);
  app.append(modal);
}

export function renderTaskDeleteModal() {
  const modal = createDialogModal("task-delete-modal");
  const app = document.querySelector("#app");
  const message = createElement(
    "p",
    { class: "delete-modal-message" },
    "Are you sure you want to delete this task?"
  );

  const confirmButton = createElement(
    "button",
    { class: "delete-modal-confirm-btn", type: "button" },
    "Yes"
  );

  const cancelButton = createElement(
    "button",
    { class: "cancel-btn", type: "button", formmethod: "dialog" },
    "No"
  );

  modal.append(message, confirmButton, cancelButton);
  app.append(modal);
}