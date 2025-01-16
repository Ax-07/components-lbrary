document.addEventListener("DOMContentLoaded", function () {
    const badgeList = document.querySelector(".badge-list");

    /**
     * Données dynamiques pour des badges
     * @type {Array<{ type: string, content: string, icon: string }>}
     * @description Les badges sont des éléments d'interface utilisateur qui affichent des informations contextuelles.
     * Ils peuvent être utilisés pour afficher des notifications, des états, des alertes, des messages, etc.
     * Chaque badge a un type (primary, warning, danger, success), un contenu et une icône
     */
    const notifications = [
        { type: "primary", content: "10 Nouveaux Messages", icon: "fa fa-envelope" },
        { type: "warning", content: "2 Avertissements", icon: "fa fa-exclamation-triangle" },
        { type: "danger", content: "1 Erreur critique", icon: "fa fa-times-circle" },
        { type: "success", content: "Succès !", icon: "fa fa-check-circle" },
    ];

    // Génére dynamiquement les badges
    notifications.forEach((notification) => {
        
        const badge = document.createElement("div");
        badge.className = `badge badge-${notification.type}`;

        const icon = document.createElement("i");
        icon.className = notification.icon;

        const text = document.createTextNode(` ${notification.content}`);
        badge.setAttribute("role", "alert");
        badge.setAttribute("aria-live", "polite");
        badge.setAttribute("aria-label", notification.content);

        badge.appendChild(icon);
        badge.appendChild(text);
        badgeList.appendChild(badge);
    });
});
