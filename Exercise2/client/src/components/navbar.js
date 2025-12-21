// src/components/navbar.js

export function renderNavbar(container) {
  if (!container) return;

  container.innerHTML = `
  <header class="header">
    <a href="/" class="logo" data-link>
      <img src="/assets/img/logo.png" alt="Logo">
    </a>

    <div class="header-right">
      <button class="nav-toggle" aria-controls="nav" aria-expanded="false">
        <input type="checkbox" id="menu_checkbox">
        <label for="menu_checkbox" class="burger">
          <div></div>
          <div></div>
          <div></div>
        </label>
        <span class="sr-only">Menu</span>
      </button>

      <nav>
        <ul class="nav flex" data-visible="false">
          <li><a href="/" data-link class="nav-link">Home</a></li>
          <li><a href="/courses" data-link class="nav-link">Courses</a></li>
          <li><a href="/books" data-link class="nav-link">Books</a></li>
          <li><a href="/about" data-link class="nav-link">About</a></li>
          <li><a href="/register" data-link class="nav-link">Register</a></li>
        </ul>
      </nav>
    </div>
  </header>
  `;

  const navToggle = container.querySelector(".nav-toggle");
  const navMenu = container.querySelector("ul.nav");
  const menuCheckbox = container.querySelector("#menu_checkbox");
  const header = container.querySelector(".header");

  // --------------------------
  // Mobile burger menu toggle
  // --------------------------
  function toggleMenu() {
    const isVisible = navMenu.getAttribute("data-visible") === "true";
    navMenu.setAttribute("data-visible", !isVisible);
    navToggle.setAttribute("aria-expanded", !isVisible);
    if (menuCheckbox) menuCheckbox.checked = !isVisible;
  }

  navToggle.addEventListener("click", toggleMenu);
  if (menuCheckbox) menuCheckbox.addEventListener("change", toggleMenu);

  // --------------------------
  // SPA navigation
  // --------------------------
  container.querySelectorAll("[data-link]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      window.location.hash = href.startsWith("/") ? href : `/${href}`;
      // Close menu on mobile
      navMenu.setAttribute("data-visible", "false");
      navToggle.setAttribute("aria-expanded", "false");
      if (menuCheckbox) menuCheckbox.checked = false;
    });
  });

  // --------------------------
  // Highlight active link
  // --------------------------
  function highlightActiveLink() {
    const hash = window.location.hash.slice(1) || '/';
    container.querySelectorAll(".nav-link").forEach(link => {
      const href = link.getAttribute("href");
      if (href === hash || href === `/${hash}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  window.addEventListener("hashchange", highlightActiveLink);
  highlightActiveLink();

  // --------------------------
  // Header scroll effect
  // --------------------------
  function handleScroll() {
    if (!header) return;
    if (window.innerWidth > 800) {
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  handleScroll(); // initial check
}
