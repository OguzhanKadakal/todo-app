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
  renderTaskItems()
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

    const editIcon = createIcon("material-symbols-outlined", "edit_square");
    const deleteIcon = createIcon("material-symbols-outlined", "delete");

    projectItem.append(editIcon, deleteIcon);
    projectContainer.append(projectItem);
  });
}

function renderAppLogo() {
  const leftSidebar = document.querySelector(".left-sidebar");
  const appLogo = createElement("h1", {id: "title"}, "ToDo App");
  leftSidebar.append(appLogo)
}

function renderAddProjectButton() {
  const leftSidebar = document.querySelector(".left-sidebar");
  const addProjectButton = createElement("button", {id: "add-project-btn"}, "+ Add Project");
  leftSidebar.append(addProjectButton)
}

//Main
function renderMainContainer() {
  const mainContainer = document.querySelector(".main-container");

  const mainContainerHeader = createElement("div", {id: "main-container-header"});
  const mainContainerBody = createElement("div", {id: "main-container-body"});
  const tasksContainer = createItemContainer("task-container");

  mainContainer.append(mainContainerHeader, mainContainerBody);
  mainContainerBody.append(tasksContainer)
}
function renderTaskHeader() {
  const mainContainerHeader = document.querySelector("#main-container-header");
  const projectTitle = createElement("h1", { id: "project-title" }, appState.selectedProject?.title || "Untitled Project");
  mainContainerHeader.append(projectTitle);
}

function renderAddTaskButton() {
  const mainContainerBody = document.querySelector("#main-container-body");
  const addTaskButton = createElement("button", { id: "add-task-btn" }, "+ Add Task");
  mainContainerBody.append(addTaskButton);
}

function renderTaskItems() {
  const taskContainer = document.querySelector("#task-container");
  taskContainer.innerHTML = "";
  if(appState.selectedProject.todos.length > 0) {
    appState.selectedProject.todos.forEach((t) => {
      const todoItem = createElement("li", {class: "todo-item", "data-id": t.id}, t.title);
      taskContainer.append(todoItem)
    })
  } else {
    const addFirstTaskText = createElement("p",{class: "add-task-text"}, "Click the button below to Add your first task!");
    taskContainer.append(addFirstTaskText)
  }
}



