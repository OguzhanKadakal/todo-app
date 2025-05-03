import Project from "./project";
import Todo from "./todo.js";
import appState from "./appState.js";
import { id } from "date-fns/locale";

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
  renderAddTaskButton();
  renderTaskItems();
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

function renderProjectItems() {
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

    const projectEditIcon = createIcon("material-symbols-outlined", "edit_square");
    const projectDeleteIcon = createIcon("material-symbols-outlined", "delete");

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
    { id: "add-project-btn" },
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
function renderTaskHeader() {
  const mainContainerHeader = document.querySelector(".main-container-header");
  const projectTitle = createElement(
    "h1",
    { id: "project-title" },
    appState.selectedProject?.title || "Untitled Project"
  );
  mainContainerHeader.append(projectTitle);
}

function renderAddTaskButton() {
  const mainContainerBody = document.querySelector(".main-container-body");
  const addTaskButton = createElement(
    "button",
    { id: "add-task-btn" },
    "+ Add Task"
  );
  mainContainerBody.append(addTaskButton);
}

function renderTaskItems() {
  const taskContainer = document.querySelector("#task-container");
  taskContainer.innerHTML = "";
  const todos = appState.selectedProject?.todos || [];
  if (todos.length > 0) {
    todos.forEach((t) => {
      const todoItem = createElement("li", {
        class: "todo-item",
        "data-id": t.id,
      });
      taskContainer.append(todoItem);

      const todoCheckbox = createElement("input", { type: "checkbox" });
      const todoTitle = createElement("p", { class: "todo-title"}, t.title);
      const todoDate = createElement("p", {class: "todo-date"}, `${"Due: " + t.dueDate}` )
      const todoPriority = createElement("p", {class: "todo-priority"}, t.priority);
      const todoIconContainer = createElement("div", {class: "icon-container"});
      const todoEditIcon = createIcon("material-symbols-outlined", "edit_square");
      const todoDeleteIcon = createIcon("material-symbols-outlined", "delete");
  

      todoItem.append(todoCheckbox, todoTitle, todoDate, todoPriority, todoIconContainer);
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

