import appState from "../modules/appState";
import Project from "../modules/project";
import { renderProjectItems, renderTaskHeader, renderTaskItems, renderAddTaskButton } from "../modules/domLogic";
import { addGlobalEventListener } from "./eventDelegation.js";

//Add
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

  const modal = document.querySelector("#add-project-modal");
  if (modal) {
    modal.close();
  } else {
    console.error("Add Project Modal not found in the DOM.");
  }
}

export function initializeProjectAddEvent() {
  const addProjectForm = document.querySelector("#add-project-form");

  if (addProjectForm) {
    addProjectForm.addEventListener("submit", handleAddProjectFormSubmit);
  } else {
    console.error("Add Project Form not found in the DOM.");
  }
}

//Edit
function handleEditProjectFormSubmit(event) {
  event.preventDefault();

  const editForm = event.target;
  const editProjectTitleInput = editForm.querySelector("#edit-project-name-input");
  const editProjectTitle = editProjectTitleInput.value.trim();

  if (!editProjectTitle) {
    alert("Project title cannot be empty!");
    return;
  }

  // Retrieve the project ID from the form's dataset
  const projectId = editForm.dataset.projectId;
  if (!projectId) {
    console.error("No project ID found in the form's dataset.");
    return;
  }

  // Find the project in appState and update its title
  const projectToEdit = appState.getProjectById(projectId);
  if (!projectToEdit) {
    console.error("Project not found.");
    return;
  }

  projectToEdit.updateTitle(editProjectTitle); // Use the updateTitle method

  // Re-render the project list and header
  renderProjectItems();
  renderTaskHeader();
  // Close the modal
  const modal = document.querySelector("#edit-project-modal");
  if (modal) {
    modal.close();
  } else {
    console.error("Edit Project Modal not found in the DOM.");
  }
}

export function initializeProjectEditEvent() {
  const editProjectForm = document.querySelector("#edit-project-form");

  if (editProjectForm) {
    editProjectForm.addEventListener("submit", handleEditProjectFormSubmit);
  } else {
    console.error("Edit Project Form not found in the DOM.");
  }

  // Attach event delegation for edit icons
  addGlobalEventListener("click", ".project-edit-icon", (event) => {
    const modal = document.querySelector("#edit-project-modal");
    if (!modal) {
      console.error(`Modal with selector "#edit-project-modal" not found.`);
      return;
    }

    const projectItem = event.target.closest(".project-item");
    if (!projectItem) {
      console.error("No parent project-item element found for the clicked icon.");
      return;
    }

    const projectId = projectItem.getAttribute("data-id");
    if (!projectId) {
      console.error("No data-id attribute found on the parent project-item element.");
      return;
    }

    const editProjectForm = modal.querySelector("#edit-project-form");
    if (editProjectForm) {
      editProjectForm.dataset.projectId = projectId;
    }

    const projectToEdit = appState.getProjectById(projectId);
    const editProjectTitleInput = modal.querySelector("#edit-project-name-input");
    if (projectToEdit && editProjectTitleInput) {
      editProjectTitleInput.value = projectToEdit.title;
    }

    modal.showModal();
  });
}


//Delete
export function deleteProjectEvent() {
  const deleteProjectForm = document.querySelector("#project-delete-modal");
  const confirmButton = deleteProjectForm.querySelector(".delete-modal-confirm-btn");

  addGlobalEventListener("click", ".project-delete-icon", (event) => {
    const projectItem = event.target.closest(".project-item");
    if (!projectItem) {
      console.error("No parent project-item element found for the clicked icon.");
      return;
    }

    const projectId = projectItem.getAttribute("data-id");
    if (!projectId) {
      console.error("No data-id attribute found on the parent project-item element.");
      return;
    }

    
    deleteProjectForm.dataset.projectId = projectId;

  
    deleteProjectForm.showModal();
  });

 
  confirmButton.addEventListener("click", () => {
    const projectId = deleteProjectForm.dataset.projectId;
    const projectToDelete = appState.getProjectById(projectId);

    if (projectToDelete) {
      appState.removeProject(projectToDelete);
      if (appState.selectedProject === projectToDelete) {
        appState.selectedProject = appState.projects[0] || null;
      }
      renderProjectItems();
      renderTaskHeader();
      renderTaskItems();
      renderAddTaskButton();
      deleteProjectForm.close();
      console.log("Number of Projects:", appState.projects.length);
      console.log("Selected Project:", appState.selectedProject);
    } else {
      console.error("Project to delete not found.");
    }
  });
}