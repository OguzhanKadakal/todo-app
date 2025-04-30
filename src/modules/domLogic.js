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
  const mainEl = createElement("div", { class: "tasks-container" });
  app.append(sidebarEl, mainEl);
  renderAppLogo()
  renderProjectsContainer();
  renderProjectItems();
  renderAddProjectButton()

  renderTaskContainer()
}

function createProjectContainer(id) {
  return createElement("ul", { id: id });
}

function createIcon(iconClassName, iconText) {
  return createElement("span", { class: iconClassName }, iconText);
}

function renderProjectsContainer() {
  const leftSidebar = document.querySelector(".left-sidebar");
  const projectContainer = createProjectContainer("project-container",);
  leftSidebar.append(projectContainer);
}

function renderProjectItems() {
  const projectContainer = document.querySelector("#project-container");
  projectContainer.innerHTML = ""; //Clear existing items before rendering

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

function renderTaskContainer() {
  const tasksContainer = document.querySelector(".tasks-container");

  const tasksContainerHeader = createElement("div", {id: "tasks-container-header"});
  const projectTitle = createElement("h1", {id: "project-title"}, appState.selectedProject?.title || "Untitled Project");

  tasksContainer.append(tasksContainerHeader);
  tasksContainerHeader.append(projectTitle);
}