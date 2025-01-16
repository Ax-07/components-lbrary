document.addEventListener("DOMContentLoaded", () => {
    const allDropdowns = document.querySelectorAll("[data-dropdown]");

    /**
     * Ferme tous les dropdowns
     */
    function closeAllDropdowns() {
        allDropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector(".dropdown-trigger");
            const menu = dropdown.querySelector(".dropdown-menu");
            if (trigger && menu) {
                trigger.setAttribute("aria-expanded", "false");
                menu.classList.add("hidden");
            }
        });
    }

    /**
     * Ferme tous les sous-menus d’un dropdown donné
     */
    function closeAllSubmenus(dropdown) {
        const submenus = dropdown.querySelectorAll(".has-submenu .submenu");
        const triggers = dropdown.querySelectorAll(".submenu-trigger");

        submenus.forEach((submenu) => submenu.classList.add("hidden"));
        triggers.forEach((t) => t.setAttribute("aria-expanded", "false"));
    }

    /**
     * Met à jour le texte du bouton en fonction des éléments sélectionnés.
     * - Pour single select : affiche la valeur choisie
     * - Pour multi select : affiche le nombre d’éléments sélectionnés
     * - Pour sous-menus : affiche la valeur choisie
     * - Pour filtres : affiche la valeur choisie
     * - Pour multi-column : affiche la valeur choisie
     */
    function refreshDropdownLabel(dropdown) {
        const trigger = dropdown.querySelector(".dropdown-trigger");

        // Single select
        if (dropdown.classList.contains("single-select")) {
            const selectedItem = dropdown.querySelector(
                "li[role='option'][aria-selected='true']"
            );
            if (selectedItem) {
                trigger.textContent = selectedItem.textContent;
            } else {
                trigger.textContent = "Sélectionner une option";
            }
        }

        // Multi select
        else if (dropdown.classList.contains("multi-select")) {
            // On récupère tous les checkbox cochés
            const checkedItems = dropdown.querySelectorAll("input[type='checkbox']:checked");
            // À vous de choisir : soit on affiche le nombre, soit on liste les libellés
            // 1) Afficher le nombre
            if (checkedItems.length > 0) {
                trigger.textContent = `${checkedItems.length} sélectionné(s)`;
            } else {
                trigger.textContent = "Sélectionner des options";
            }
        }

        // Dropdown avec sous-menus
        else if (dropdown.classList.contains("has-submenu")) {
            const selectedItem = dropdown.querySelector(
                "li[role='option'][aria-selected='true']"
            );
            if (selectedItem) {
                trigger.textContent = selectedItem.textContent;
            } else {
                trigger.textContent = "Sélectionner une option";
            }
        }

        // Dropdown avec filtre
        else if (dropdown.classList.contains("dropdown-filter")) {
            const selectedItem = dropdown.querySelector(
                "li[role='option'][aria-selected='true']"
            );
            if (selectedItem) {
                trigger.textContent = selectedItem.textContent;
            } else {
                trigger.textContent = "Sélectionner une option";
            }
        }

        // Dropdown multi-column
        else if (dropdown.classList.contains("multi-column")) {
            const selectedItem = dropdown.querySelector(
                "li[role='option'][aria-selected='true']"
            );
            if (selectedItem) {
                trigger.textContent = selectedItem.textContent;
            } else {
                trigger.textContent = "Sélectionner une option";
            }
        }
    }

    // Itère sur chaque dropdown
    allDropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector(".dropdown-trigger");
        const menu = dropdown.querySelector(".dropdown-menu");
        const filterInput = dropdown.querySelector(".dropdown-filter");

        if (!trigger || !menu) return;

        // Au clic sur le bouton principal, on ouvre/ferme le menu
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const isExpanded = trigger.getAttribute("aria-expanded") === "true";

            // Ferme tous les dropdowns
            closeAllDropdowns();

            // Si le dropdown cliqué n’était pas ouvert, on l’ouvre
            if (!isExpanded) {
                trigger.setAttribute("aria-expanded", "true");
                menu.classList.remove("hidden");

                // Réinitialise le champ de filtre au besoin
                if (filterInput) {
                    filterInput.value = "";
                    const items = menu.querySelectorAll("li[role='option']");
                    items.forEach((item) => (item.style.display = "block"));
                }
            } else {
                // Sinon on le ferme
                trigger.setAttribute("aria-expanded", "false");
                menu.classList.add("hidden");
            }
        });

        // Gestion du filtrage
        if (filterInput) {
            filterInput.addEventListener("input", (e) => {
                const filterValue = e.target.value.toLowerCase();
                const items = menu.querySelectorAll("li[role='option']");

                items.forEach((item) => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(filterValue) ? "block" : "none";
                });
            });
        }

        // Écouteur pour chaque option du menu
        menu.querySelectorAll("li[role='option']").forEach((option) => {
            // Cas Single Select
            if (dropdown.classList.contains("single-select")) {
                option.addEventListener("click", (e) => {
                    e.stopPropagation();
                    // On désélectionne tous les autres items
                    menu.querySelectorAll("li[role='option']").forEach((o) => {
                        o.removeAttribute("aria-selected");
                    });
                    // Sélection de l’item cliqué
                    option.setAttribute("aria-selected", "true");

                    // Met à jour le texte du trigger
                    refreshDropdownLabel(dropdown);

                    // Ferme le menu
                    trigger.setAttribute("aria-expanded", "false");
                    menu.classList.add("hidden");
                });
            }
            // Cas Multi Select
            else if (dropdown.classList.contains("multi-select")) {
                // Sur clic sur le <li>, on coche/décoche la case (si l’utilisateur clique directement sur le label ou le <li>)
                option.addEventListener("click", (e) => {
                    // On ne veut pas fermer la liste en multi-select, on laisse ouvert
                    e.stopPropagation();
                    const checkbox = option.querySelector("input[type='checkbox']");
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                    }
                    // Met à jour le texte du trigger
                    refreshDropdownLabel(dropdown);
                });
            }

            // Cas Dropdown avec sous-menus
            else if (dropdown.classList.contains("has-submenu")) {
                option.addEventListener("click", (e) => {
                    e.stopPropagation();
                    // On désélectionne tous les autres items
                    menu.querySelectorAll("li[role='option']").forEach((o) => {
                        o.removeAttribute("aria-selected");
                    });
                    // Sélection de l’item cliqué
                    option.setAttribute("aria-selected", "true");

                    // Met à jour le texte du trigger
                    refreshDropdownLabel(dropdown);

                    // Ferme le menu
                    trigger.setAttribute("aria-expanded", "false");
                    menu.classList.add("hidden");
                });
            }

            // Cas Dropdown avec filtre
            else if (dropdown.classList.contains("dropdown-filter")) {
                option.addEventListener("click", (e) => {
                    e.stopPropagation();
                    // On désélectionne tous les autres items
                    menu.querySelectorAll("li[role='option']").forEach((o) => {
                        o.removeAttribute("aria-selected");
                    });
                    // Sélection de l’item cliqué
                    option.setAttribute("aria-selected", "true");

                    // Met à jour le texte du trigger
                    refreshDropdownLabel(dropdown);

                    // Ferme le menu
                    trigger.setAttribute("aria-expanded", "false");
                    menu.classList.add("hidden");
                });
            }

            // Cas Dropdown multi-column
            else if (dropdown.classList.contains("multi-column")) {
                option.addEventListener("click", (e) => {
                    e.stopPropagation();
                    // On désélectionne tous les autres items
                    menu.querySelectorAll("li[role='option']").forEach((o) => {
                        o.removeAttribute("aria-selected");
                    });
                    // Sélection de l’item cliqué
                    option.setAttribute("aria-selected", "true");

                    // Met à jour le texte du trigger
                    refreshDropdownLabel(dropdown);

                    // Ferme le menu
                    trigger.setAttribute("aria-expanded", "false");
                    menu.classList.add("hidden");
                });
            }
        });

        // Gestion des sous-menus
        const hasSubmenuItems = dropdown.querySelectorAll(".has-submenu");
        hasSubmenuItems.forEach((item) => {
            const submenuTrigger = item.querySelector(".submenu-trigger");
            const submenu = item.querySelector(".submenu");

            if (submenuTrigger && submenu) {
                submenuTrigger.addEventListener("click", (e) => {
                    e.stopPropagation();
                    closeAllSubmenus(dropdown);

                    const isOpen = submenuTrigger.getAttribute("aria-expanded") === "true";
                    if (!isOpen) {
                        submenuTrigger.setAttribute("aria-expanded", "true");
                        submenu.classList.remove("hidden");
                    } else {
                        submenuTrigger.setAttribute("aria-expanded", "false");
                        submenu.classList.add("hidden");
                    }
                });
            }
        });
    });

    // Ferme tous les dropdowns en cliquant n’importe où en dehors
    document.addEventListener("click", (e) => {
        const isInsideDropdown = e.target.closest("[data-dropdown]");
        if (!isInsideDropdown) {
            closeAllDropdowns();
        }
    });
});