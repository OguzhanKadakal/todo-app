class Project {
    constructor(title,todos = []) {
        this.id = `${Date.now()}-${Math.random()}`;
        this.title = title;
        this.todos = todos;
        this.originalTodos = [...todos]; // original order
        this.sortState = 0; // 0: Original, 1: Ascending, 2: Descending
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
        if (this.sortState === 0) {
            // Sort Ascending (A-Z)
            this.todos.sort((a, b) => a.title.localeCompare(b.title));
            this.sortState = 1;
        } else if (this.sortState === 1) {
            // Sort Descending (Z-A)
            this.todos.sort((a, b) => b.title.localeCompare(a.title));
            this.sortState = 2;
        } else {
            // Restore Original Order
            this.todos = [...this.originalTodos];
            this.sortState = 0;
        }
    }

    sortTodosByDate() {
        if (this.sortState === 0) {
            // Sort Ascending
            this.todos.sort((a, b) => a.dueDate - b.dueDate);
            this.sortState = 1;
        } else if (this.sortState === 1) {
            // Sort Descending 
            this.todos.sort((a, b) => a.dueDate - b.dueDate);
            this.sortState = 2;
        } else {
            // Restore Original
            this.todos = [...this.originalTodos];
            this.sortState = 0;
        }
    }

    sortTodosByPriority() {
        const priorityOrder = { high: 1, medium: 2, low: 3 }; // Define priority order
        if (this.sortState === 0) {
            // Sort Ascending (High to Low)
            this.todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            this.sortState = 1;
        } else if (this.sortState === 1) {
            // Sort Descending (Low to High)
            this.todos.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
            this.sortState = 2;
        } else {
            // Restore Original
            this.todos = [...this.originalTodos];
            this.sortState = 0;
        }
    }
    }

export default Project;