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
