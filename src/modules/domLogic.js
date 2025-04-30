import Project from "./project";
import Todo from "./todo.js";
import AppState from "./appState.js";
import { id } from "date-fns/locale";

// Create an instance of AppState
const appState = new AppState();
appState.initializeApp(); // Initialize the app with the default project


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
  const mainEl = createElement("div", { class: "content-container" });
  app.append(sidebarEl, mainEl);
  renderAppLogo()
  renderProjectContainer();
  renderProjectItems();
  renderAddProjectButton()
}

function createProjectContainer(id) {
  return createElement("ul", { id: id });
}

function createIcon(iconClassName, iconText) {
  return createElement("span", { class: iconClassName }, iconText);
}

function renderProjectContainer() {
  const leftSidebar = document.querySelector(".left-sidebar");
  const projectContainer = createProjectContainer("project-container");
  leftSidebar.append(projectContainer);
}

function renderProjectItems() {
    const projectContainer = document.querySelector("#project-container");
    appState.projects.forEach((p) => {
        const projectItem = createElement("li", { id: `${p.id}`, class:"project-item" }, p.title);
        const editIcon = createIcon("material-symbols-outlined", "edit_square");
        const deleteIcon = createIcon("material-symbols-outlined", "delete")
        projectItem.append(editIcon);
        projectItem.append(deleteIcon);
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