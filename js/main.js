/* Portfolio — vanilla JavaScript interactions */
"use strict";

const themes = ["light", "dark", "warm"];
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeLabel.textContent = theme.toUpperCase();
  localStorage.setItem("humanStoryTheme", theme);
}
const savedTheme = localStorage.getItem("humanStoryTheme");
applyTheme(themes.includes(savedTheme) ? savedTheme : "light");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme || "light";
  const next = themes[(themes.indexOf(current) + 1) % themes.length];
  applyTheme(next);
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Reveal content as it enters the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

// Reading progress and chapter indicator.
const sections = ["hero", "journey", "interests", "family", "hobbies", "footer"]
  .map(id => document.getElementById(id));
const scrollProgress = document.getElementById("scrollProgress");
const chapterFill = document.getElementById("chapterFill");
const chapterCurrent = document.getElementById("chapterCurrent");

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  scrollProgress.style.width = `${progress * 100}%`;
  chapterFill.style.height = `${progress * 100}%`;
  let active = 0;
  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top < window.innerHeight * 0.48) active = index;
  });
  chapterCurrent.textContent = String(active).padStart(2, "0");
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI);
updateScrollUI();

// Project case-study explorer.
const projectDetails = {
  heart: {
    eyebrow: "01 / MACHINE LEARNING",
    title: "Deep Heart",
    description: "A heart disease prediction project exploring how machine-learning models can support early risk assessment. The project uses Logistic Regression, Random Forest and SVM, with feature-selection and dimensionality-reduction exploration using Chi-Square and PCA. A Flask interface connects the model workflow to a simple user experience.",
    tags: ["Python", "Logistic Regression", "Random Forest", "SVM", "Chi-Square", "PCA", "Flask"]
  },
  keylogger: {
    eyebrow: "02 / PYTHON",
    title: "Anti-Keylogger",
    description: "A Python security-focused project built around process monitoring, keyboard-event awareness and heuristic detection. It explores how suspicious activity can be identified and surfaced for closer inspection.",
    tags: ["Python", "Process Monitoring", "Keyboard Events", "Heuristic Detection"]
  },
  yolo: {
    eyebrow: "03 / AI & ROBOTICS",
    title: "YOLOv8 Object Detection",
    description: "A real-time object-detection prototype using YOLOv8 and OpenCV. The project works with webcam input and explores a Flask-based interface for presenting detection results.",
    tags: ["YOLOv8", "OpenCV", "Computer Vision", "Webcam", "Flask"]
  }
};
const projectDialog = document.getElementById("projectDialog");
document.querySelectorAll("[data-project]").forEach(card => {
  card.addEventListener("click", () => {
    const project = projectDetails[card.dataset.project];
    document.getElementById("dialogEyebrow").textContent = project.eyebrow;
    document.getElementById("dialogTitle").textContent = project.title;
    document.getElementById("dialogDescription").textContent = project.description;
    const tags = document.getElementById("dialogTags");
    tags.replaceChildren(...project.tags.map(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      return span;
    }));
    projectDialog.showModal();
  });
});
document.getElementById("dialogClose").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", event => {
  if (event.target === projectDialog) projectDialog.close();
});

// Visitor note reveal.
const noteButton = document.getElementById("noteButton");
const hiddenNote = document.getElementById("hiddenNote");
noteButton.addEventListener("click", () => {
  const opening = hiddenNote.hidden;
  hiddenNote.hidden = !opening;
  noteButton.innerHTML = opening ? 'CLOSE THE NOTE <span>×</span>' : 'OPEN A LITTLE NOTE <span>↗</span>';
});

// Footer year.
document.getElementById("year").textContent = new Date().getFullYear();

// Accessible family flip cards: works with mouse, touch, Enter and Space.
document.querySelectorAll('.family-person').forEach(card => {
  card.addEventListener('click', () => {
    const flipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', String(flipped));
  });
});

// Native dialog lightbox for hobby photographs (no external library).
const hobbyLightbox = document.getElementById('hobbyLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxDescription = document.getElementById('lightboxDescription');
document.querySelectorAll('.hobby-card').forEach(card => {
  const photo = card.querySelector('.hobby-photo');
  if (!photo) return;
  photo.tabIndex = 0;
  photo.setAttribute('role', 'button');
  photo.setAttribute('aria-haspopup', 'dialog');
  photo.setAttribute('aria-label', `Enlarge ${card.querySelector('h3').textContent} photograph`);
  const openLightbox = () => {
    lightboxImage.src = photo.currentSrc || photo.src;
    lightboxImage.alt = photo.alt;
    lightboxTitle.textContent = card.querySelector('h3').textContent;
    lightboxCategory.textContent = card.querySelector('.hobby-info > span').textContent;
    lightboxDescription.textContent = card.querySelector('.hobby-info p').textContent;
    hobbyLightbox.showModal();
  };
  photo.addEventListener('click', openLightbox);
  photo.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox();
    }
  });
});
document.getElementById('lightboxClose').addEventListener('click', () => hobbyLightbox.close());
hobbyLightbox.addEventListener('click', event => {
  if (event.target === hobbyLightbox) hobbyLightbox.close();
});
hobbyLightbox.addEventListener('close', () => { lightboxImage.src = ''; });

// Keep navigation state in sync with the section currently in view.
const navLinks = [...document.querySelectorAll('.main-nav a')];
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));

// Ensure the theme toggle is announced clearly to assistive technology.
themeToggle.setAttribute('aria-label', 'Change colour theme. Current theme: ' + document.documentElement.dataset.theme);
// Update accessible label whenever the theme changes.
themeToggle.addEventListener('click', () => {
  window.setTimeout(() => themeToggle.setAttribute('aria-label', 'Change colour theme. Current theme: ' + document.documentElement.dataset.theme), 0);
});

// Timeline description disclosure: keeps longer milestones compact by default.
document.querySelectorAll('.timeline-card > div > p').forEach(description => {
  if (description.textContent.trim().length < 105) return;
  description.classList.add('timeline-description-collapsed');
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'timeline-more';
  toggle.textContent = 'READ MORE +';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    description.classList.toggle('is-expanded', !expanded);
    toggle.textContent = expanded ? 'READ MORE +' : 'SHOW LESS −';
  });
  description.insertAdjacentElement('afterend', toggle);
});
