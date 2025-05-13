import Project from "./project.js";
import { loadFromLocalStorage } from "./storage.js";

class AppState {
  constructor() {
    this.projects = [];
    this.selectedProject = null;
  }

  addProject(project) {
    this.projects.push(project);
  }

  getProjectById(id) {
    return this.projects.find((project) => project.id === id);
  }

  removeProject(project) {
    this.projects = this.projects.filter((p) => p.id !== project.id);
    if (project === this.selectedProject) {
      this.selectedProject = this.projects[0] || null;
    }
  }

  updateProject(updatedProject) {
    this.projects = this.projects.map((project) =>
      project.id === updatedProject.id
        ? { ...project, ...updatedProject }
        : project
    );
  }

  initializeApp() {
    // Load data from local storage
    loadFromLocalStorage(this, Project);

    // If no projects exist, create a default project
    if (this.projects.length === 0) {
        const defaultProject = new Project("My First Project");
        this.projects.push(defaultProject);
        this.selectedProject = defaultProject;
    }
}

  changeSelectedProject(id) {
    const project = this.projects.find((project) => project.id === id);
    if (project) {
      this.selectedProject = project;
    } else {
      console.error(`Project with id ${id} not found.`);
      this.selectedProject = null;
    }
  }
}

const appState = new AppState();
appState.initializeApp();

export default appState;
