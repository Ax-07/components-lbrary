document.addEventListener("DOMContentLoaded", function () {
    const buttonContainer = document.querySelector(".section#buttons .button-group:last-child");

    // Données dynamiques pour des boutons
    const buttons = [
        { type: "primary", icon: "fa fa-envelope", label: "Send Message" },
        { type: "success", icon: "fa fa-check", label: "Confirm" },
        { type: "danger", icon: "fa fa-trash", label: "Delete" },
        { type: "info", icon: "fa fa-info-circle", label: "More Info" },
    ];

    // Générer dynamiquement les boutons
    buttons.forEach((btn) => {
        const button = document.createElement("button");
        button.className = `btn btn-${btn.type}`;
        button.innerHTML = `<i class="${btn.icon}"></i> ${btn.label}`;
        buttonContainer.appendChild(button);
    });
});
