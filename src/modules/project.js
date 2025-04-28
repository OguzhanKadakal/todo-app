class Project {
    constructor(title,todos) {
        this.title = title;
        this.todos = [];
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