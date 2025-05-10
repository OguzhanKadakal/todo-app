class Project {
    constructor(title,todos = []) {
        this.id = `${Date.now()}-${Math.random()}`;
        this.title = title;
        this.todos = todos;
        this.originalTodos = [...todos];
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

    sortTodosByTitle() {
        this.todos = this.todos.sort((a,b) => a.title - b.title);
    }

    sortTodosByDate() {
        this.todos = this.todos.sort((a,b) => a.dueDate - b.dueDate);
    }

    sortTodosByPriority() {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        this.todos = this.todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    resetToDefault() {
        this.todos = [...this.originalTodos];
    }
    }

export default Project;