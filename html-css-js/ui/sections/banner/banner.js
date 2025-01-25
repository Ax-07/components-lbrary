document.addEventListener("DOMContentLoaded", () => {
    // Sélection de tous les slides
    const slides = document.querySelectorAll(".banner-carousel .banner-slide");
    if (!slides.length) return; // Sécurité : si pas de slide, on stoppe.
  
    // Sélection des boutons suivant/précédent
    const prevBtn = document.querySelector(".banner-carousel .prev-btn");
    const nextBtn = document.querySelector(".banner-carousel .next-btn");
  
    let currentIndex = 0; // indice du slide affiché
  
    // Fonction d’affichage d’un slide par son index
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }
  
    // Bouton suivant
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }
  
    // Bouton précédent
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }
  
    // Écouteurs sur les boutons
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  
    // Optionnel : auto-play (toutes les 5 secondes, par exemple)
    // const autoPlayInterval = 5000; 
    // setInterval(nextSlide, autoPlayInterval);
  
    // Afficher le slide initial
    showSlide(currentIndex);
  });
  