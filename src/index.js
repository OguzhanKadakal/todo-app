import { initializeUI } from "./modules/domLogic.js";
import { attachModalEvent } from "./events/modalEvents.js";


window.addEventListener("DOMContentLoaded", () => {
    // Initialize the UI
    initializeUI();
    // Attach modal open events for buttons
    attachModalEvent("#add-project-btn", "#add-project-modal");
    attachModalEvent("#add-task-btn", "#add-task-modal");
  });
  