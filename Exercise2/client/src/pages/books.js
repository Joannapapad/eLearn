import { api } from "../services/api.service.js"; 

export function loadBooks(container) {
  if (!container) return;

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

  initMobileBookFilters();

  const booksList = document.getElementById("books-list");
  const booksSearch = document.getElementById("filter-search-books");

  let ALL_BOOKS = [];

  fetchBooks();

  async function fetchBooks() {
    try {
      ALL_BOOKS = await api.getBooks();
      renderBooks();
    } catch (err) {
      console.error(err);
      booksList.innerHTML = `<p class="error">Failed to load books</p>`;
    }
  }

  function renderBooks() {
    let results = [...ALL_BOOKS];

    const selectedCategories = [
      ...document.querySelectorAll('[data-filter="book-category"] input:checked')
    ].map(i => i.value);

    const selectedLevels = [
      ...document.querySelectorAll('[data-filter="book-level"] input:checked')
    ].map(i => i.value);

    const searchTerm = booksSearch.value.trim().toLowerCase();

    if (selectedCategories.length) {
      results = results.filter(b => selectedCategories.includes(b.category));
    }

    if (selectedLevels.length) {
      results = results.filter(b => selectedLevels.includes(b.level));
    }

    if (searchTerm) {
      results = results.filter(b =>
        b.title.toLowerCase().includes(searchTerm) ||
        b.description.toLowerCase().includes(searchTerm)
      );
    }

    booksList.innerHTML = results.map(b => `
      <div class="book-card" data-id="${b._id}">
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

    document.querySelectorAll(".book-card").forEach(card => {
      card.addEventListener("click", () => {
        window.location.hash = `/book/${card.dataset.id}`;
      });
    });
  }

  // re-render on filters
  document.querySelectorAll(
    '[data-filter="book-category"] input, [data-filter="book-level"] input'
  ).forEach(cb => cb.addEventListener("change", renderBooks));

  booksSearch.addEventListener("input", renderBooks);

  function initMobileBookFilters() {
    const filters = document.querySelectorAll('.filter-group');

    filters.forEach(f => {
      const header = f.querySelector('.filter-header');
      const opts = f.querySelector('.filter-options');
      if (!header || !opts) return;

      header.addEventListener('click', () => {
        if (window.innerWidth < 900) {
          const open = opts.classList.contains("open");
          document.querySelectorAll(".filter-options").forEach(o => o.classList.remove("open"));
          if (!open) opts.classList.add("open");
        }
      });
    });

    document.addEventListener('click', e => {
      if (window.innerWidth < 900 && !e.target.closest('.filter-group')) {
        document.querySelectorAll('.filter-options')
          .forEach(o => o.classList.remove("open"));
      }
    });
  }
}
