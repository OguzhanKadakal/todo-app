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