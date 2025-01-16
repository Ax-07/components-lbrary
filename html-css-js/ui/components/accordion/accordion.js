document.addEventListener("DOMContentLoaded", function () {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach((header) => {
        header.addEventListener("click", function () {
            const isExpanded = this.getAttribute("aria-expanded") === "true";
            const bodyId = this.getAttribute("aria-controls");
            const body = document.getElementById(bodyId);

            // Ensure body element exists
            if (!body) {
                console.error(`Accordion body with ID "${bodyId}" not found.`);
                return;
            }

            // Toggle the current accordion section
            this.setAttribute("aria-expanded", !isExpanded);
            body.hidden = isExpanded;

            // Close other sections if exclusive
            accordionHeaders.forEach((otherHeader) => {
                if (otherHeader !== this) {
                    const otherBodyId = otherHeader.getAttribute("aria-controls");
                    const otherBody = document.getElementById(otherBodyId);

                    if (otherBody) {
                        otherHeader.setAttribute("aria-expanded", "false");
                        otherBody.hidden = true;
                    } else {
                        console.error(`Accordion body with ID "${otherBodyId}" not found.`);
                    }
                }
            });
        });
    });
});
