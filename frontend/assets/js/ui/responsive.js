document.addEventListener("DOMContentLoaded", () => {

    /* ============================
   COURSES PAGE - URL CATEGORY
============================ */

if (window.location.pathname.includes("courses.html")) {

    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");

    if (selectedCategory) {
        const categoryCheckboxes =
            document.querySelectorAll('[data-filter="category"] input');

        categoryCheckboxes.forEach(cb => {
            cb.checked = cb.value === selectedCategory;
        });
    }
}

    const filters = document.querySelectorAll('.filter-group');

    /* --------------------------
       MOBILE TOGGLE FILTERS
    -----------------------------*/
    filters.forEach(f => {
        const header = f.querySelector('.filter-header');
        const opts = f.querySelector('.filter-options');

        if (!header || !opts) return;

        header.addEventListener('click', () => {
            if (window.innerWidth < 900) {

                const open = opts.classList.contains("open");

                document.querySelectorAll(".filter-options").forEach(o => {
                    o.classList.remove("open");
                });

                if (!open) opts.classList.add("open");
            }
        });
    });

    document.addEventListener('click', e => {
        if (window.innerWidth < 900) {
            if (!e.target.closest('.filter-group')) {
                document.querySelectorAll('.filter-options')
                    .forEach(o => o.classList.remove("open"));
            }
        }
    });

    /* ============================
       COURSES PAGE ONLY
    ============================= */
    const searchInput = document.getElementById('filter-search');
    const coursesList = document.getElementById('courses-list');

    if (searchInput && coursesList) {

        function renderCourses() {
            let results = [...COURSES];

            const selectedCategories =
                [...document.querySelectorAll('[data-filter="category"] input:checked')]
                    .map(i => i.value);

            const selectedLevels =
                [...document.querySelectorAll('[data-filter="level"] input:checked')]
                    .map(i => i.value);

            const searchTerm = searchInput.value.trim().toLowerCase();

            if (selectedCategories.length > 0) {
                results = results.filter(c => selectedCategories.includes(c.category));
            }

            if (selectedLevels.length > 0) {
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
                    <img src="assets/img/courses/${c.image}" alt="${c.title}">
                </div>
        
                    <div class="card-header">
                        <h3 class="course-title">${c.title}</h3>
                        <div class="course-category-icon">
                            <img src="assets/img/icons/${c.category}.png" alt="${c.category}">
                        </div>
                    </div>
                    <p class="course-level">${c.level}</p>
                </div>
            `).join('');

            document.querySelectorAll('.course-card').forEach(card => {
                card.addEventListener('click', () => {
                    window.location.href = `course-details.html?id=${card.dataset.id}`;
                });
            });
        }

        document.querySelectorAll('.filter-options input')
            .forEach(cb => cb.addEventListener('change', renderCourses));

        searchInput.addEventListener('input', renderCourses);

        renderCourses();
    }


    /* ============================
       BOOKS PAGE ONLY
    ============================= */
    const booksSearch = document.getElementById('filter-search-books');
    const booksList = document.getElementById('books-list');

    if (booksSearch && booksList) {

        function renderBooks() {
            let results = [...BOOKS];

            const selectedCategories =
                [...document.querySelectorAll('[data-filter="book-category"] input:checked')]
                    .map(i => i.value);

            const selectedLevels =
                [...document.querySelectorAll('[data-filter="book-level"] input:checked')]
                    .map(i => i.value);

            const searchTerm = booksSearch.value.trim().toLowerCase();

            if (selectedCategories.length > 0) {
                results = results.filter(b => selectedCategories.includes(b.category));
            }

            if (selectedLevels.length > 0) {
                results = results.filter(b => selectedLevels.includes(b.level));
            }

            if (searchTerm) {
                results = results.filter(b =>
                    b.title.toLowerCase().includes(searchTerm) ||
                    b.description.toLowerCase().includes(searchTerm)
                );
            }

            booksList.innerHTML = results.map(b => `
            <div class="book-card" data-id="${b.id}">
        
                <div class="book-header book-${b.category}">
                    <div class="book-title-wrapper">
                        <p class="book-author">${b.author}</p>
                        <h3 class="book-title">${b.title}</h3>
                    </div>
                    <div class="book-edition">${b.edition ? b.edition : ""}</div>

                </div>
        
                <div class="book-body">
                    <p class="book-description">${b.description}</p>
                </div>
        
            </div>
        `).join('');
        
        

            document.querySelectorAll('.book-card').forEach(card => {
                card.addEventListener('click', () => {
                    window.location.href = `book-details.html?id=${card.dataset.id}`;
                });
            });
        }

        document.querySelectorAll('[data-filter="book-category"] input, [data-filter="book-level"] input')
            .forEach(cb => cb.addEventListener('change', renderBooks));

        booksSearch.addEventListener('input', renderBooks);

        renderBooks();
    }

});
