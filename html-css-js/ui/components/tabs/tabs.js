document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll('.tab-item');
  const panes = document.querySelectorAll('.tab-pane');

  // Pour la navigation clavier (flèches), on aura besoin d’un index
  let currentTabIndex = 0;

  tabs.forEach((tab, index) => {
    // Clic sur un onglet
    tab.addEventListener('click', () => {
      activateTab(index);
    });

    // Gestion des flèches gauche/droite
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (index + 1) % tabs.length;
        tabs[nextIndex].focus();
        activateTab(nextIndex);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (index - 1 + tabs.length) % tabs.length;
        tabs[prevIndex].focus();
        activateTab(prevIndex);
      }
    });
  });

  function activateTab(index) {
    // Mise à jour des onglets
    tabs.forEach((t, i) => {
      const isActive = i === index;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        t.removeAttribute('tabindex');
      } else {
        t.setAttribute('tabindex', '-1');
      }
    });

    // Mise à jour des panneaux
    panes.forEach((pane, i) => {
      const isActive = i === index;
      pane.classList.toggle('active', isActive);
      // Optionnel : on peut utiliser [hidden]
      if (isActive) {
        pane.removeAttribute('hidden');
      } else {
        pane.setAttribute('hidden', 'true');
      }
    });

    currentTabIndex = index;
  }
});
