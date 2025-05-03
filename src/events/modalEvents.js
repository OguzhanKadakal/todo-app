export function attachModalEvent(buttonSelector, modalSelector) {
  const button = document.querySelector(buttonSelector);
  if (!button) {
    console.error(`Button with selector "${buttonSelector}" not found.`);
    return;
  }

  button.addEventListener("click", () => {
    const modal = document.querySelector(modalSelector);
    if (!modal) {
      console.error(`Modal with selector "${modalSelector}" not found.`);
      return;
    }
    modal.showModal();
    const firstInput = modal.querySelector("input, textarea, select");
    if (firstInput) firstInput.focus();
  });
}

export function modalOutsideClickClose(modalSelector) {
    const dialog = document.querySelector(modalSelector);
    if (!dialog) {
      console.error(`Modal with selector "${modalSelector}" not found.`);
      return;
    }
  
    dialog.addEventListener("click", (e) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    });
  }