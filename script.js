// Mobile menu toggle
const toggle = document.getElementById("navToggle");
const menu = document.getElementById("navMenu");
const setMenu = (open) => {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
};
toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Scroll progress bar + nav border
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  nav.classList.toggle("is-scrolled", scrollY > 8);
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Active nav link
const links = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.hash === `#${e.target.id}`));
  }),
  { rootMargin: "-45% 0px -50% 0px" }
);
links.forEach((a) => { const s = document.querySelector(a.hash); if (s) spy.observe(s); });

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Project "Read more"
document.querySelectorAll(".more").forEach((btn) => {
  const desc = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", () => {
    const open = desc.classList.toggle("clamp") === false;
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Show less" : "Read more";
  });
});

// Experience accordion
document.querySelectorAll(".exp__head").forEach((btn) => {
  const body = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    body.hidden = !open;
  });
});

// Copy email
const copyBtn = document.getElementById("copyEmail");
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(document.getElementById("email").textContent.trim());
    copyBtn.textContent = "Copied";
  } catch {
    copyBtn.textContent = "Copy failed";
  }
  setTimeout(() => (copyBtn.textContent = "Copy"), 1800);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
