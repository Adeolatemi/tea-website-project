/* 
  Core client-side interactions
  - Theme toggle with persistence
  - Accessible mobile navigation
  - Smooth in-page scrolling
  - Button feedback
  - Basic form validation
*/

const yearEl = document.getElementById('year');
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const menuList = document.getElementById('menu-list');

const THEME_KEY = 'theme';

/* Set current year in footer */
if (yearEl) {
  const currentYear = new Date().getFullYear();
  yearEl.textContent = currentYear;
  yearEl.setAttribute('datetime', String(currentYear));
}

/* Theme handling */
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
};

const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

/* Accessible mobile navigation */
if (menuToggle && menuList) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';

    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menuToggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');

    menuList.hidden = expanded;
    menuList.classList.toggle('open', !expanded);
  });

  /* Close menu when a navigation link is selected */
  menuList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuList.hidden = true;
      menuList.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

/* Smooth scrolling for in-page anchors */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href').slice(1);
    if (!targetId) return;

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    event.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* Button press feedback */
document.querySelectorAll('.primary-btn').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('pressed');
    setTimeout(() => button.classList.remove('pressed'), 150);
  });
});

/* Contact form validation */
const form = document.getElementById('contact-form');

if (form) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const statusEl = document.getElementById('form-status');

  const showError = (input, message) => {
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = message;
  };

  const clearError = (input) => {
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = '';
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    statusEl.textContent = '';

    let isValid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    if (messageInput.value.trim().length < 5) {
      showError(messageInput, 'Message must be at least 5 characters');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) {
      statusEl.textContent = 'Please correct the errors above and try again.';
      return;
    }

    /* Demo success state */
    statusEl.textContent = 'Message received successfully.';
    form.reset();
  });
}
