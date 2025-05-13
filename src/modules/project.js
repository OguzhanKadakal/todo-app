class Project {
    constructor(title, todos = []) {
        this.id = `${Date.now()}-${Math.random()}`;
        this.title = title;
        this.todos = todos;
        this.originalTodos = [...todos]; // Store the original order
    }

    updateTitle(title) {
        if (title) {
            this.title = title;
        }
    }

    getTodoById(id) {
        return this.todos.find(todo => todo.id === id);
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todo) {
        this.todos = this.todos.filter(t => t !== todo);
    }

    sortTodosByTitle(direction = "asc") {
        this.todos.sort((a, b) => {
            if (direction === "asc") {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
    }

    sortTodosByDate(direction = "asc") {
        this.todos.sort((a, b) => {
            if (direction === "asc") {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else {
                return new Date(b.dueDate) - new Date(a.dueDate);
            }
        });
    }

    sortTodosByPriority(direction = "asc") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        this.todos.sort((a, b) => {
            if (direction === "asc") {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            } else {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
        });
    }

    resetToDefault() {
        this.todos = [...this.originalTodos];
        this.filteredTodos = [...this.originalTodos];
    }
}

export default Project;