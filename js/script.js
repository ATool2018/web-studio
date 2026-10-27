// Плавное появление секций при скролле
const revealTargets = document.querySelectorAll(
  '.service-card, .process-step, .work-card, .feature'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => {
  el.classList.add('reveal-init');
  observer.observe(el);
});