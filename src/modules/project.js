class Project {
    constructor(title,todos) {
        this.id = `${Date.now()}-${Math.random()}`;
        this.title = title;
        this.todos = [];
    }

    updateTitle(title) {
        if (title) {
            this.title = title;
        }
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    removeTodo(todo){
        this.todos = this.todos.filter(t => t !== todo);
    }

    getTodos() {
        return this.todos;
    }
}

export default Project;