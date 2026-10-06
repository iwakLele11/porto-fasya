// Mobile menu toggle
const toggle = document.getElementById("navToggle");
const menu = document.getElementById("navMenu");
toggle.addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("open")));

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
