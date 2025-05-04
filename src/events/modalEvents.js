//Open Model
export function modalOpenButtonEvent(e) {
  const opener = e.target.closest("[data-modal-target]"); 
  if (!opener) return;

  const modalSelector = opener.dataset.modalTarget;
  const modal = document.querySelector(modalSelector);

  if (modal && typeof modal.showModal === "function") {
    modal.showModal();
  }
}

//Close model
export function enableOutsideClickToCloseModals() {
  const modals = document.querySelectorAll("dialog.modal");

  modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
      const rect = modal.getBoundingClientRect();
      const clickedOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;

      if (clickedOutside) {
        modal.close();
      }
    });
  });
}

export function modalCloseButtonEvent(e) {
  const cancelButton = e.target.closest(".cancel-btn");
  if (cancelButton) {
    const modal = cancelButton.closest("dialog.modal");
    if (modal) {
      modal.close();
    }
  }
}
