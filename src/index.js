import { initializeUI } from "./modules/domLogic.js";
import { attachModalEvent, modalOutsideClickClose  } from "./events/modalEvents.js";


window.addEventListener("DOMContentLoaded", () => {
    // Initialize the UI
    initializeUI();
    // Attach modal open events for buttons
    attachModalEvent("#add-project-btn", "#add-project-modal");
    attachModalEvent("#add-task-btn", "#add-task-modal");
    // Close modals when clicked outside of the modal
    modalOutsideClickClose("#add-project-modal");
    modalOutsideClickClose("#add-task-modal");

    
  });
  