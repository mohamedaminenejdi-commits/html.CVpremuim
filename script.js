// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme (persist)
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") root.classList.add("light");

function syncThemeIcon() {
  const light = root.classList.contains("light");
  themeBtn.textContent = light ? "☀" : "☾";
  themeBtn.title = light ? "Switch to dark" : "Switch to light";
}
syncThemeIcon();

themeBtn.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
  syncThemeIcon();
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const open = mobileMenu.hasAttribute("hidden") === false;
  if (open) {
    mobileMenu.setAttribute("hidden", "");
    menuBtn.setAttribute("aria-expanded", "false");
  } else {
    mobileMenu.removeAttribute("hidden");
    menuBtn.setAttribute("aria-expanded", "true");
  }
});

// Close mobile menu after clicking a link
mobileMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.setAttribute("hidden", "");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Skill search + reset
const skillSearch = document.getElementById("skillSearch");
const resetSkills = document.getElementById("resetSkills");
const skillCards = Array.from(document.querySelectorAll("#skillsGrid .skill"));

function filterSkills(q) {
  const query = q.toLowerCase().trim();
  skillCards.forEach(card => {
    const hay = (card.dataset.skill || "").toLowerCase() + " " + card.textContent.toLowerCase();
    card.style.display = (!query || hay.includes(query)) ? "" : "none";
  });
}

skillSearch.addEventListener("input", (e) => filterSkills(e.target.value));
resetSkills.addEventListener("click", () => {
  skillSearch.value = "";
  filterSkills("");
  skillSearch.focus();
});

// Reveal on scroll
const reveals = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.15 });

reveals.forEach(el => io.observe(el));

// Active nav link on scroll
const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav__link"));

function setActive(id) {
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
}

const io2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

sections.forEach(s => io2.observe(s));