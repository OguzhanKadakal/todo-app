import Project from "./project";
import Todo from "./todo.js";
import AppState from "./appState.js";

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
  renderProjectContainer();
  renderProjectItems();
}

function createProjectContainer(id) {
  return createElement("ul", { id: id });
}

function renderProjectContainer() {
  const leftSidebar = document.querySelector(".left-sidebar");
  const projectContainer = createProjectContainer("project-container");
  leftSidebar.append(projectContainer);
}
function renderProjectItems() {
    const projectContainer = document.querySelector("#project-container");
    AppState.projects.forEach((p) => {
        const projectItem = createElement("li", { id: `${p.id}` }, p.title);
        projectContainer.append(projectItem);
    });
}
