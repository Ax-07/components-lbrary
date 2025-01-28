document.addEventListener("DOMContentLoaded", function () {
    // Carousel
    const carousel = document.querySelector(".carousel-inner");
    const items = document.querySelectorAll(".carousel-item");
    const nextBtn = document.querySelector(".carousel-control.next");
    const prevBtn = document.querySelector(".carousel-control.prev");
    let index = 0;
  
    function showSlide(i) {
      index = (i + items.length) % items.length;
      carousel.style.transform = `translateX(${-index * 100}%)`;
      items.forEach((item) => item.classList.remove("active"));
      items[index].classList.add("active");
    }
  
    nextBtn.addEventListener("click", () => showSlide(index + 1));
    prevBtn.addEventListener("click", () => showSlide(index - 1));
  
    setInterval(() => {
      showSlide(index + 1);
    }, 5000);
  
  });
  