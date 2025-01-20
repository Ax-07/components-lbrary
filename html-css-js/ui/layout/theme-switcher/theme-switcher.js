document.addEventListener("DOMContentLoaded", function () {
    function changeTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        console.log('Theme changed to ' + theme);
      }
      window.changeTheme = changeTheme; // Expose globally
});