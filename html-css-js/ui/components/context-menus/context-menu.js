document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("context-menu");
    const target = document.getElementById("context-menu-target");

    // Open context menu on right-click
    target.addEventListener("contextmenu", function (event) {
        event.preventDefault(); // Prevent default browser menu
        openMenu(event.pageX, event.pageY);
    });

    // Close the menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && event.target !== target) {
            closeMenu();
        }
    });

    // Utility functions
    function openMenu(x, y) {
        menu.hidden = false;
    }

    function closeMenu() {
        menu.hidden = true;
    }
});
