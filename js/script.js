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

/* ============================================================
   ФОРМА ЗАЯВКИ
   ============================================================ */
const form = document.getElementById('contactForm');

if (form) {
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    nameError.textContent = '';
    phoneError.textContent = '';
    nameInput.classList.remove('error');
    phoneInput.classList.remove('error');

    if (nameInput.value.trim().length < 2) {
      nameError.textContent = 'Введите имя (минимум 2 символа)';
      nameInput.classList.add('error');
      valid = false;
    }

    const phoneClean = phoneInput.value.replace(/[^\d+]/g, '');
    if (phoneClean.length < 11) {
      phoneError.textContent = 'Введите корректный телефон';
      phoneInput.classList.add('error');
      valid = false;
    }

    if (valid) {
      form.reset();
      showThankYou();
    }
  });
}

// простая модалка «Спасибо» (без сложной a11y — для визитки хватит)
function showThankYou() {
  const modal = document.createElement('div');
  modal.className = 'thanks-modal';
  modal.innerHTML = `
    <div class="thanks-box">
      <div class="thanks-icon">✅</div>
      <h3>Спасибо!</h3>
      <p>Заявка отправлена. Свяжусь с вами в течение часа.</p>
      <button class="btn btn-primary" id="thanksClose">Отлично</button>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  document.getElementById('thanksClose').addEventListener('click', () => {
    modal.remove();
    document.body.style.overflow = '';
  });
}

/* ============================================================
   ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');

function updateToggleIcon(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'
  );
}

const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
updateToggleIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon(next);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (localStorage.getItem('theme')) return;
  const next = e.matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  updateToggleIcon(next);
});