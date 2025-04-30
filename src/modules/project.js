import Todo from "./todo.js"

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

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todo) {
        this.todos = this.todos.filter(t => t !== todo);
    }

    defaultTodos() { //for testing
        const todo1 = new Todo("todo1", "This is a placeholder", new Date(), "High");
        const todo2 = new Todo("todo2", "This is a placeholder", new Date(), "Medium");
        const todo3 = new Todo("todo3", "This is a placeholder", new Date(), "Low");
        const todo4 = new Todo("todo4", "This is a placeholder", new Date(), "High");
        this.todos = [todo1, todo2, todo3, todo4];
    }
}

export default Project;