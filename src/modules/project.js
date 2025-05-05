class Project {
    constructor(title,todos = []) {
        this.id = `${Date.now()}-${Math.random()}`;
        this.title = title;
        this.todos = todos;
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
}

export default Project;