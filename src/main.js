const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;

// Illos.dev: each illustration loops while it is on screen and pauses when it is not.
if (!reduce) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.style.setProperty("--illos-play", e.isIntersecting ? "running" : "paused");
  });
  for (const el of document.querySelectorAll("[data-illos]")) {
    el.style.setProperty("--illos-play", "paused");
    io.observe(el);
  }
}

// Light and dark switch.
const themeBtn = document.getElementById("theme");
const themeLabel = document.getElementById("theme-l");
const paint = () => {
  const dark = root.getAttribute("data-theme") === "dark";
  themeLabel.textContent = dark ? "Light" : "Dark";
  themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
};
themeBtn.addEventListener("click", () => {
  const t = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", t);
  try { localStorage.setItem("quillery-theme", t); } catch (e) {}
  paint();
});
paint();

// Mobile menu.
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const setMenu = (open) => {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); menuBtn.focus(); } });
addEventListener("click", (e) => { if (menu.classList.contains("open") && !e.target.closest(".nav")) setMenu(false); });
matchMedia("(min-width: 901px)").addEventListener("change", () => setMenu(false));

// Binder or Quillery. Without this script both views show, one under the other.
const seg = document.getElementById("seg");
const segTabs = [...seg.querySelectorAll('[role="tab"]')];
const show = (tab, animate) => {
  for (const t of segTabs) {
    const on = t === tab;
    t.setAttribute("aria-selected", on);
    t.tabIndex = on ? 0 : -1;
    const view = document.getElementById(t.getAttribute("aria-controls"));
    view.hidden = !on;
    view.classList.toggle("enter", on && animate);
  }
  seg.dataset.on = tab.id === "seg-live" ? "live" : "wiki";
};
segTabs.forEach((t, i) => {
  t.addEventListener("click", () => show(t, true));
  t.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = segTabs[(i + 1) % segTabs.length];
    show(next, true);
    next.focus();
  });
});
show(document.getElementById("seg-live"), false);

// Live record ages tick up; now and then one task is filed again.
const ticks = [...document.querySelectorAll(".tick")];
if (!reduce) {
  let live = false;
  new IntersectionObserver(([e]) => { live = e.isIntersecting; }).observe(document.getElementById("view-live"));
  setInterval(() => {
    if (!live) return;
    for (const t of ticks) {
      t.dataset.s = +t.dataset.s + 1;
      t.textContent = t.dataset.s + "s ago";
      t.classList.remove("fresh");
    }
    if (Math.random() < 0.35) {
      const t = ticks[Math.floor(Math.random() * 3)];
      t.dataset.s = 1;
      t.textContent = "1s ago";
      t.classList.add("fresh");
    }
  }, 1000);
}

// Source chips: the card under them shows which record was read.
const chips = document.getElementById("chips");
const pop = document.getElementById("pop");
chips.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b || b.getAttribute("aria-pressed") === "true") return;
  for (const o of chips.querySelectorAll("button")) o.setAttribute("aria-pressed", o === b);
  pop.querySelector(".pop-path").textContent = b.dataset.path;
  const dd = pop.querySelectorAll("dd");
  dd[0].textContent = b.dataset.who;
  dd[1].textContent = b.dataset.when;
  pop.classList.remove("swap");
  void pop.offsetWidth;
  pop.classList.add("swap");
});

