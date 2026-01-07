import { api } from "../services/api.service.js";

// Load and render the Books page
export function loadBooks(container) {
  if (!container) return;

  // Base page layout (filters + books list)
  container.innerHTML = `
    <main class="courses-page">
      <div class="courses-picture">
        <h1 class="page-title">Books</h1>
      </div>

      <div class="desktop">
        <section class="filters card">
          <label class="search-wrapper">
            <input type="text" id="filter-search-books" placeholder="Search books...">
          </label>

          <div class="checkboxes">
            <div class="filter-group" data-filter="book-category">
              <div class="filter-header"><h3>➤ Category</h3></div>
              <div class="filter-options">
                <label><input type="checkbox" value="programming"> Programming</label>
                <label><input type="checkbox" value="networks"> Networks</label>
                <label><input type="checkbox" value="security"> Security</label>
                <label><input type="checkbox" value="databases"> Databases</label>
                <label><input type="checkbox" value="core"> Core</label>
                <label><input type="checkbox" value="mathematics"> Mathematics</label>
                <label><input type="checkbox" value="systems"> Systems</label>
                <label><input type="checkbox" value="engineering"> Software Engineering</label>
                <label><input type="checkbox" value="design"> Design</label>
                <label><input type="checkbox" value="ai"> AI</label>
                <label><input type="checkbox" value="data"> Data</label>
              </div>
            </div>

            <div class="filter-group" data-filter="book-level">
              <div class="filter-header"><h3>➤ Level</h3></div>
              <div class="filter-options">
                <label><input type="checkbox" value="beginner"> Beginner</label>
                <label><input type="checkbox" value="intermediate"> Intermediate</label>
                <label><input type="checkbox" value="advanced"> Advanced</label>
              </div>
            </div>
          </div>
        </section>

        <section id="books-list" class="courses-grid center"></section>
      </div>
    </main>
  `;

  document.body.classList.add("page-loaded");

  // Enable mobile filter behavior
  initMobileBookFilters();

  const booksList = document.getElementById("books-list");
  const booksSearch = document.getElementById("filter-search-books");

  let ALL_BOOKS = [];

  // Initial data fetch
  fetchBooks();

  // Fetch all books from API
  async function fetchBooks() {
    try {
      ALL_BOOKS = await api.getBooks();
      renderBooks();
    } catch (err) {
      console.error(err);
      booksList.innerHTML = `<p class="error">Failed to load books</p>`;
    }
  }

  // Render books based on active filters and search input
  function renderBooks() {
    let results = [...ALL_BOOKS];

    // Get selected categories
    const selectedCategories = [
      ...document.querySelectorAll('[data-filter="book-category"] input:checked')
    ].map(i => i.value);

    // Get selected levels
    const selectedLevels = [
      ...document.querySelectorAll('[data-filter="book-level"] input:checked')
    ].map(i => i.value);

    // Normalize search term
    const searchTerm = booksSearch.value.trim().toLowerCase();

    // Apply category filter
    if (selectedCategories.length) {
      results = results.filter(b => selectedCategories.includes(b.category));
    }

    // Apply level filter
    if (selectedLevels.length) {
      results = results.filter(b => selectedLevels.includes(b.level));
    }

    // Apply text search filter
    if (searchTerm) {
      results = results.filter(b =>
        b.title.toLowerCase().includes(searchTerm) ||
        b.description.toLowerCase().includes(searchTerm)
      );
    }

    // Render book cards
    booksList.innerHTML = results.map(b => `
      <div class="book-card" data-id="${b.id}">
        <div class="book-header book-${b.category}">
          <div class="book-title-wrapper">
            <p class="book-author">${b.author}</p>
            <h3 class="book-title">${b.title}</h3>
          </div>
          <div class="book-edition">${b.edition || ""}</div>
        </div>
        <div class="book-body">
          <p class="book-description">${b.description}</p>
        </div>
      </div>
    `).join("");

    // Navigate to book details on click
    document.querySelectorAll(".book-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        if (!id) return;
        window.location.hash = `/book/${id}`;
      });
    });
  }

  // Re-render when filters change
  document.querySelectorAll(
    '[data-filter="book-category"] input, [data-filter="book-level"] input'
  ).forEach(cb => cb.addEventListener("change", renderBooks));

  // Re-render on search input
  booksSearch.addEventListener("input", renderBooks);

  // Handle mobile filter dropdown behavior
  function initMobileBookFilters() {
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

    // Close filters when clicking outside (mobile)
    document.addEventListener("click", e => {
      if (window.innerWidth < 900 && !e.target.closest(".filter-group")) {
        document
          .querySelectorAll(".filter-options")
          .forEach(o => o.classList.remove("open"));
      }
    });
  }
}
