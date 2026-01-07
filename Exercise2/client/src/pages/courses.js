import { api } from "../services/api.service.js";

// Load and render the Courses page
export function loadCourses(container) {
  if (!container) return;

  // Base page layout (filters + courses grid)
  container.innerHTML = `
    <main class="courses-page">

      <div class="courses-picture">
        <h1 class="page-title">Courses</h1>
      </div>

      <div class="desktop">
        <section class="filters card">
          <label class="search-wrapper">
            <input type="text" id="filter-search" placeholder="Search courses...">
          </label>

          <div class="checkboxes">

            <div class="filter-group" data-filter="category">
              <div class="filter-header"><h3>➤ Category</h3></div>
              <div class="filter-options">
                <label><input type="checkbox" value="programming"> Programming</label>
                <label><input type="checkbox" value="networks"> Networks</label>
                <label><input type="checkbox" value="security"> Security</label>
                <label><input type="checkbox" value="databases"> Databases</label>
                <label><input type="checkbox" value="core"> Core</label>
                <label><input type="checkbox" value="mathematics"> Mathematics</label>
                <label><input type="checkbox" value="systems"> Systems</label>
                <label><input type="checkbox" value="engineering"> Engineering</label>
                <label><input type="checkbox" value="design"> Design</label>
                <label><input type="checkbox" value="ai"> AI</label>
                <label><input type="checkbox" value="data"> Data</label>
              </div>
            </div>

            <div class="filter-group" data-filter="level">
              <div class="filter-header"><h3>➤ Level</h3></div>
              <div class="filter-options">
                <label><input type="checkbox" value="beginner"> Beginner</label>
                <label><input type="checkbox" value="intermediate"> Intermediate</label>
                <label><input type="checkbox" value="advanced"> Advanced</label>
              </div>
            </div>

          </div>
        </section>

        <section id="courses-list" class="courses-grid center"></section>
      </div>
    </main>
  `;

  document.body.classList.add("page-loaded");

  // Enable mobile filter dropdown behavior
  initMobileFilters();

  const coursesList = document.getElementById("courses-list");
  const searchInput = document.getElementById("filter-search");

  let ALL_COURSES = [];

  // Read optional category filter from URL (e.g. #/courses?category=ai)
  const params = new URLSearchParams(window.location.hash.split("?")[1]);
  const selectedCategory = params.get("category");

  if (selectedCategory) {
    document
      .querySelectorAll('[data-filter="category"] input')
      .forEach(cb => cb.checked = cb.value === selectedCategory);
  }

  // Initial data fetch
  fetchCourses();

  // Fetch all courses from API
  async function fetchCourses() {
    try {
      ALL_COURSES = await api.getCourses();
      renderCourses();
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  }

  // Render courses based on filters and search input
  function renderCourses() {
    let results = [...ALL_COURSES];

    // Get selected categories
    const selectedCategories = [
      ...document.querySelectorAll('[data-filter="category"] input:checked')
    ].map(i => i.value);

    // Get selected levels
    const selectedLevels = [
      ...document.querySelectorAll('[data-filter="level"] input:checked')
    ].map(i => i.value);

    // Normalize search term
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Apply category filter
    if (selectedCategories.length) {
      results = results.filter(c => selectedCategories.includes(c.category));
    }

    // Apply level filter
    if (selectedLevels.length) {
      results = results.filter(c => selectedLevels.includes(c.level));
    }

    // Apply text search filter
    if (searchTerm) {
      results = results.filter(c =>
        c.title.toLowerCase().includes(searchTerm) ||
        c.description.toLowerCase().includes(searchTerm)
      );
    }

    // Render course cards
    coursesList.innerHTML = results.map(c => `
      <div class="course-card" data-id="${c.id}">
        <div class="course-image">
          <img src="/assets/img/courses/${c.id}.png" alt="${c.title}">
        </div>
        <div class="card-header">
          <h3 class="course-title">${c.title}</h3>
          <div class="course-category-icon">
            <img src="/assets/img/icons/${c.category}.png" alt="${c.category}">
          </div>
        </div>
      </div>
    `).join("");

    // Navigate to course details on click
    document.querySelectorAll(".course-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        if (!id) return;
        window.location.hash = `/course/${id}`;
      });
    });
  }

  // Re-render when filters change
  document
    .querySelectorAll('[data-filter="category"] input, [data-filter="level"] input')
    .forEach(cb => cb.addEventListener("change", renderCourses));

  // Re-render on search input
  searchInput.addEventListener("input", renderCourses);

  // Handle mobile filter dropdown behavior
  function initMobileFilters() {
    const filters = document.querySelectorAll(".filter-group");

    filters.forEach(f => {
      const header = f.querySelector(".filter-header");
      const opts = f.querySelector(".filter-options");
      if (!header || !opts) return;

      header.addEventListener("click", () => {
        if (window.innerWidth < 900) {
          const isOpen = opts.classList.contains("open");
          document
            .querySelectorAll(".filter-options")
            .forEach(o => o.classList.remove("open"));
          if (!isOpen) opts.classList.add("open");
        }
      });
    });

    // Close open filters when clicking outside (mobile)
    document.addEventListener("click", e => {
      if (window.innerWidth < 900 && !e.target.closest(".filter-group")) {
        document
          .querySelectorAll(".filter-options")
          .forEach(o => o.classList.remove("open"));
      }
    });
  }
}
