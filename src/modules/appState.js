import Project from "./project";

class AppState {
    constructor() {
        this.projects = [];
        this.selectedProject = null;
    }

    removeProject(project){
        this.projects = this.projects.filter(p => p !== project);
    }
}