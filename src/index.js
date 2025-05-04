import { initializeUI } from "./modules/domLogic.js";
import { attachModalEvent, modalOutsideClickClose, modalCloseButtonEvent  } from "./events/modalEvents.js";
import { initializeProjectEvents } from "./events/projectEvents.js"


window.addEventListener("DOMContentLoaded", () => {
    // Initialize the UI
    initializeUI();
    // Attach modal open events for buttons
    attachModalEvent("#add-project-btn", "#add-project-modal");
    attachModalEvent("#add-task-btn", "#add-task-modal");
    // Close modals when clicked outside of the modal
    modalOutsideClickClose("#add-project-modal");
    modalOutsideClickClose("#add-task-modal");
    // Close modals when clicked when cancel button of modal clicked
    modalCloseButtonEvent("#add-project-modal", ".add-project-form-cancel-btn");
    modalCloseButtonEvent("#add-project-modal", ".add-project-form-cancel-btn");
    modalCloseButtonEvent("#add-task-modal", ".task-form-cancel-btn");
    modalCloseButtonEvent("#edit-task-modal", ".task-form-cancel-btn");

    // Initialize project-related events
    initializeProjectEvents()
  });
  