import appState from "../modules/appState";
import Project from "../modules/project";
import { renderProjectItems } from "../modules/domLogic";

function handleAddProjectFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const projectTitleInput = form.querySelector("#add-project-name-input");
  const projectTitle = projectTitleInput.value.trim();

  if (!projectTitle) {
    alert("Project title cannot be empty!");
    return;
  }

  const newProject = new Project(projectTitle);
  appState.addProject(newProject);
  renderProjectItems();
  projectTitleInput.value = "";
}


// Attach the event listener for the Add Project form
export function initializeProjectEvents() {
  const addProjectForm = document.querySelector("#add-project-form");
  const editProjectForm = document.querySelector("#edit-project-form");
  if (addProjectForm) {
    addProjectForm.addEventListener("submit", handleAddProjectFormSubmit);
  } 
  else {
    console.error("Add Project Form not found in the DOM.");
  }
}
