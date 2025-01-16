document.addEventListener("DOMContentLoaded", function () {
    const showAlertButton = document.getElementById("show-alert");
    const alertModal = document.getElementById("alert-modal");
    const confirmButton = document.getElementById("alert-confirm");
    const cancelButton = document.getElementById("alert-cancel");

    // Open the alert modal
    showAlertButton.addEventListener("click", function () {
        alertModal.setAttribute("aria-hidden", "false");
    });

    // Close the alert modal
    function closeAlertModal() {
        alertModal.setAttribute("aria-hidden", "true");
    }

    // Confirm action
    confirmButton.addEventListener("click", function () {
        alert("Action confirmée !");
        closeAlertModal();
    });

    // Cancel action
    cancelButton.addEventListener("click", closeAlertModal);
});
