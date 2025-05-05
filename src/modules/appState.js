import Project from "./project.js";

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
        this.projects = this.projects.filter(p => p.id !== project.id);
        if(project === this.selectedProject) {
            this.selectedProject = this.projects[0] || null;
        }
    }

    updateProject(updatedProject) {
        this.projects = this.projects.map(project => 
            project.id === updatedProject.id ? { ...project, ...updatedProject } : project
        );
    }

    initializeApp() {
        const defaultProject = new Project("My First Project");
        this.projects.push(defaultProject);
        this.selectedProject = defaultProject;
    }

}


const appState = new AppState();
appState.initializeApp(); 


export default appState;