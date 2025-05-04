import { initializeUI } from "./modules/domLogic.js";
import { modalOpenButtonEvent, enableOutsideClickToCloseModals, modalCloseButtonEvent  } from "./events/modalEvents.js";
import { initializeProjectEvents } from "./events/projectEvents.js"
import { initializeTaskEvents } from "./events/taskEvents.js"
import { addGlobalEventListener } from "./events/eventDelegation.js";


window.addEventListener("DOMContentLoaded", () => {
    // Initialize the UI
    initializeUI();
    // Attach modal open events for buttons
    addGlobalEventListener("click", ".modal", enableOutsideClickToCloseModals);

    // Close modals when clicked outside of the modal
    addGlobalEventListener("click", "[data-modal-target]", modalOpenButtonEvent);

    // Close modals when clicked when cancel button of modal clicked
    addGlobalEventListener("click", ".modal .cancel-btn", modalCloseButtonEvent);
    
    // Initialize project-related events
    initializeProjectEvents()

    // Initialize task-related events
    initializeTaskEvents()
  });
  