export function loadCourses(container) {
  if (!container) return;

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
  initMobileFilters();

  const coursesList = document.getElementById("courses-list");
  const searchInput = document.getElementById("filter-search");

  let ALL_COURSES = [];

  // -------------------------
  // Read category from URL
  // -------------------------
  const params = new URLSearchParams(window.location.hash.split("?")[1]);
  const selectedCategory = params.get("category");

  if (selectedCategory) {
    document
      .querySelectorAll('[data-filter="category"] input')
      .forEach(cb => cb.checked = cb.value === selectedCategory);
  }

  fetchCourses();

  async function fetchCourses() {
    try {
      const res = await fetch("http://localhost:5000/api/courses");
      if (!res.ok) throw new Error("Failed to fetch courses");

      ALL_COURSES = await res.json();
      renderCourses();
    } catch (err) {
      console.error(err);
      coursesList.innerHTML = `<p class="error">Failed to load courses</p>`;
    }
  }

  function renderCourses() {
    let results = [...ALL_COURSES];

    const selectedCategories = [
      ...document.querySelectorAll('[data-filter="category"] input:checked')
    ].map(i => i.value);

    const selectedLevels = [
      ...document.querySelectorAll('[data-filter="level"] input:checked')
    ].map(i => i.value);

    const searchTerm = searchInput.value.trim().toLowerCase();

    if (selectedCategories.length) {
      results = results.filter(c => selectedCategories.includes(c.category));
    }

    if (selectedLevels.length) {
      results = results.filter(c => selectedLevels.includes(c.level));
    }

    if (searchTerm) {
      results = results.filter(c =>
        c.title.toLowerCase().includes(searchTerm) ||
        c.description.toLowerCase().includes(searchTerm)
      );
    }

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

    document.querySelectorAll(".course-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id; // make sure this is the MongoDB _id
        if (!id) return;
        window.location.hash = `/course/${id}`;
      });
    });
    
    
  }

  document
    .querySelectorAll('[data-filter="category"] input, [data-filter="level"] input')
    .forEach(cb => cb.addEventListener("change", renderCourses));

  searchInput.addEventListener("input", renderCourses);

  function initMobileFilters() {
    const filters = document.querySelectorAll(".filter-group");

    filters.forEach(f => {
      const header = f.querySelector(".filter-header");
      const opts = f.querySelector(".filter-options");
      if (!header || !opts) return;

      header.addEventListener("click", () => {
        if (window.innerWidth < 900) {
          const open = opts.classList.contains("open");
          document.querySelectorAll(".filter-options").forEach(o => o.classList.remove("open"));
          if (!open) opts.classList.add("open");
        }
      });
    });

    document.addEventListener("click", e => {
      if (window.innerWidth < 900 && !e.target.closest(".filter-group")) {
        document.querySelectorAll(".filter-options").forEach(o => o.classList.remove("open"));
      }
    });
  }
}
