import { initializeUI } from "./modules/domLogic.js";
import { modalOpenButtonEvent, enableOutsideClickToCloseModals, modalCloseButtonEvent  } from "./events/modalEvents.js";
import { initializeProjectAddEvent, initializeProjectEditEvent, deleteProjectEvent, changeSelectedProjectEvent } from "./events/projectEvents.js"
import { initializeTaskAddEvent, initializeTaskEditEvent, deleteTaskEvent, completeTaskEvent, sortTasksEvent, filterTaskEvent } from "./events/taskEvents.js"
import { addGlobalEventListener } from "./events/eventDelegation.js";
import "./styles.css"

window.addEventListener("DOMContentLoaded", () => {
    // Initialize the UI
    initializeUI();

    // Attach modal open events for buttons
    addGlobalEventListener("click", ".modal", enableOutsideClickToCloseModals);

    // Close modals when clicked outside of the modal
    addGlobalEventListener("click", "[data-modal-target]", modalOpenButtonEvent);

    // Close modals when cancel button of modal is clicked
    addGlobalEventListener("click", ".modal .cancel-btn", modalCloseButtonEvent);

    // Initialize project-related events
    initializeProjectAddEvent();
    initializeProjectEditEvent();
    deleteProjectEvent();
    changeSelectedProjectEvent();

    // Initialize task-related events
    initializeTaskAddEvent();
    initializeTaskEditEvent();
    deleteTaskEvent();
    completeTaskEvent();
    sortTasksEvent();
    filterTaskEvent();
});