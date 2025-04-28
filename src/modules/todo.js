class Todo {
    constructor(title, description, dueDate, priority) {
        this.id = `${Date.now()}-${Math.random()}`;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    markAsCompleted() {
        this.completed = true;
    }

    updateDetails({ title, description, dueDate, priority }) {
        if (title) this.title = title;
        if (description) this.description = description;
        if (dueDate) this.dueDate = dueDate;
        if (priority) this.priority = priority;
    }
}

export default Todo;