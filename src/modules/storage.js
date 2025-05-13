import appState from "./appState";
import Project from "./project";
import Todo from "./todo";

const STORAGE_KEY = "todo-list-app-storage";

export function saveToLocalStorage(appState) {
    const jsonObj = JSON.stringify({
        projects: appState.projects,
        selectedProjectId: appState.selectedProject?.id || null,
    });
    localStorage.setItem(STORAGE_KEY, jsonObj);
}

export function loadFromLocalStorage(appState) {
    const jsonObj = localStorage.getItem(STORAGE_KEY);
    if (!jsonObj) return;

    const parsedData = JSON.parse(jsonObj);

    // Reconstruct projects and todos
    appState.projects = parsedData.projects.map((project) => {
        const reconstructedTodos = project.todos.map(
            (todo) => new Todo(todo.title, todo.description, todo.dueDate, todo.priority)
        );
        const reconstructedProject = new Project(project.title, reconstructedTodos);
        reconstructedProject.id = project.id; // Preserve the original project ID
        return reconstructedProject;
    });

    // Reconstruct selected project
    appState.selectedProject = appState.projects.find(
        (project) => project.id === parsedData.selectedProjectId
    ) || null;
}