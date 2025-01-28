  // Accordéon JS (Variante 3)
  document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question-js");
    questions.forEach((btn) => {
      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        const answerId = btn.getAttribute("aria-controls");
        const answerEl = document.getElementById(answerId);
        if (expanded) {
          answerEl.hidden = true;
        } else {
          answerEl.hidden = false;
        }
      });
    });
  });