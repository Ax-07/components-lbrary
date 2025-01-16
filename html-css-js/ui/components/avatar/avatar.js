document.addEventListener("DOMContentLoaded", function () {
    const avatarContainer = document.getElementById("dynamic-avatars");

    // Exemple de données d'utilisateurs
    const users = [
        { name: "Jane Smith", role: "UX Designer", image: "https://placehold.co/50", alt: "Jane Smith" },
        { name: "Alice Johnson", role: "Software Engineer", image: "https://placehold.co/50", alt: "Alice Johnson" }
    ];

    // Génération des avatars dynamiques
    users.forEach((user) => {
        const avatar = document.createElement("div");
        avatar.classList.add("avatar");

        const img = document.createElement("img");
        img.src = user.image;
        img.alt = `Portrait de l'utilisateur ${user.name}`;
        img.width = 50;
        img.height = 50;
        img.loading = "lazy";

        const content = document.createElement("div");
        content.classList.add("avatar-content");

        const name = document.createElement("h3");
        name.textContent = user.name;

        const role = document.createElement("p");
        role.textContent = user.role;

        content.appendChild(name);
        content.appendChild(role);

        avatar.appendChild(img);
        avatar.appendChild(content);
        avatarContainer.appendChild(avatar);
    });
});
