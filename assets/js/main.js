const SUPPORT_EMAIL = "connect.k4vxd@gmail.com";
const navWrap = document.querySelector(".nav-wrap");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const revealItems = document.querySelectorAll(".reveal");
const year = document.querySelector("[data-year]");

document.querySelectorAll("[data-support-email]").forEach((item) => {
  item.textContent = SUPPORT_EMAIL;
});

document.querySelectorAll("[data-support-email-link]").forEach((link) => {
  link.setAttribute("href", `mailto:${SUPPORT_EMAIL}`);
});

document.querySelectorAll("[data-support-email-form]").forEach((form) => {
  form.setAttribute("action", `mailto:${SUPPORT_EMAIL}`);
});

if (year) {
  year.textContent = new Date().getFullYear();
}

const setScrolledState = () => {
  if (!navWrap) return;
  navWrap.classList.toggle("is-scrolled", window.scrollY > 8);
};

setScrolledState();
window.addEventListener("scroll", setScrolledState, { passive: true });

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    navLinks.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    menuToggle.classList.remove("is-open");
    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
