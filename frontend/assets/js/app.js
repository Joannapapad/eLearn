document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loaded");

    const path = window.location.pathname;

    if (path.includes("index.html")) {
        // κλήση λειτουργιών για homepage (π.χ. featured courses)
        initIndexPage();
    }

    if (path.includes("courses.html")) {
        // κλήση λειτουργιών για courses page
        initCoursesPage();
    }

    if (path.includes("books.html")) {
        // κλήση λειτουργιών για books page
        initBooksPage();
    }

    if (path.includes("about.html")) {
        // κλήση λειτουργιών για about page (π.χ. counters)
        initAboutPage();
    }
});



function initCoursesPage() {
    
    // URL Category
    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");

    if (selectedCategory) {
        document.querySelectorAll('[data-filter="category"] input')
            .forEach(cb => cb.checked = cb.value === selectedCategory);
    }

    // Filtering
    const searchInput = document.getElementById('filter-search');
    const coursesList = document.getElementById('courses-list');

    if (!searchInput || !coursesList) return;

    function renderCourses() {
        let results = [...COURSES];

        const selectedCategories =
            [...document.querySelectorAll('[data-filter="category"] input:checked')]
                .map(i => i.value);

        const selectedLevels =
            [...document.querySelectorAll('[data-filter="level"] input:checked')]
                .map(i => i.value);

        const searchTerm = searchInput.value.trim().toLowerCase();

        if (selectedCategories.length) results = results.filter(c => selectedCategories.includes(c.category));
        if (selectedLevels.length) results = results.filter(c => selectedLevels.includes(c.level));
        if (searchTerm) results = results.filter(c =>
            c.title.toLowerCase().includes(searchTerm) ||
            c.description.toLowerCase().includes(searchTerm)
        );

        coursesList.innerHTML = results.map(c => `
            <div class="course-card" data-id="${c.id}">
                <div class="course-image">
                    <img src="assets/img/courses/${c.id}.png" alt="${c.title}">
                </div>
                <div class="card-header">
                    <h3 class="course-title">${c.title}</h3>
                    <div class="course-category-icon">
                        <img src="assets/img/icons/${c.category}.png" alt="${c.category}">
                    </div>
                </div>
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




function initBooksPage() {
    const booksSearch = document.getElementById('filter-search-books');
    const booksList = document.getElementById('books-list');

    if (!booksSearch || !booksList) return;

    function renderBooks() {
        let results = [...BOOKS];

        const selectedCategories =
            [...document.querySelectorAll('[data-filter="book-category"] input:checked')]
                .map(i => i.value);

        const selectedLevels =
            [...document.querySelectorAll('[data-filter="book-level"] input:checked')]
                .map(i => i.value);

        const searchTerm = booksSearch.value.trim().toLowerCase();

        if (selectedCategories.length) results = results.filter(b => selectedCategories.includes(b.category));
        if (selectedLevels.length) results = results.filter(b => selectedLevels.includes(b.level));
        if (searchTerm) results = results.filter(b =>
            b.title.toLowerCase().includes(searchTerm) ||
            b.description.toLowerCase().includes(searchTerm)
        );

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
        `).join('');

        document.querySelectorAll('.book-card').forEach(card => {
            card.addEventListener('click', () => {
                window.location.href = `book-details.html?id=${card.dataset.id}`;
            });
        });
    }

    document.querySelectorAll(
        '[data-filter="book-category"] input, [data-filter="book-level"] input'
    ).forEach(cb => cb.addEventListener('change', renderBooks));

    booksSearch.addEventListener('input', renderBooks);

    renderBooks();
}

function initIndexPage() {
    /* ============================
       FADE-IN SECTIONS
    ============================ */
    const fadeSections = document.querySelectorAll(".fade-section");
    if (fadeSections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle("is-visible", entry.isIntersecting);
            });
        }, { threshold: 0.2 });

        fadeSections.forEach(sec => observer.observe(sec));
    }

    /* ============================
       CATEGORY CARDS CLICK
    ============================ */
    const categoryCards = document.querySelectorAll(".category");
    categoryCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            const categoryKey = card.dataset.category;
            window.location.href = `courses.html?category=${categoryKey}`;
        });
    });

    /* ============================
       FEATURED COURSES
    ============================ */
    const featuredCoursesEl = document.getElementById("featured-courses-main");
    if (!featuredCoursesEl || typeof COURSES === "undefined") return;

    const preferred = ["programming", "networks", "security", "databases", "core", "mathematics", "systems", "ai", "engineering", "design", "data"];
    
    const uniqueCourses = [];
    const seen = new Set();
    for (const c of COURSES) {
        if (!seen.has(c.id)) {
            uniqueCourses.push(c);
            seen.add(c.id);
        }
    }

    const picked = [];
    for (const cat of preferred) {
        const found = uniqueCourses.find(c => c.category === cat);
        if (found) picked.push(found);
        if (picked.length === 11) break;
    }

    function renderFeaturedCourses(items) {
        featuredCoursesEl.innerHTML = items.map(c => `
            <div class="course-card main-page-card" data-id="${c.id}">
                <div class="main-page">
                    <img src="assets/img/courses/${c.id}.png" alt="${c.title}">
                </div>
                <div class="card-header">
                    <h3 class="main-course-title">${c.title}</h3>
                    <div class="course-category-icon">
                        <img src="assets/img/icons/${c.category}.png" alt="${c.category}">
                    </div>
                </div>
            </div>
        `).join('');

        featuredCoursesEl.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', () => {
                window.location.href = `course-details.html?id=${card.dataset.id}`;
            });
        });
    }

    renderFeaturedCourses(picked);

    /* ============================
       FEATURED COURSES SLIDER
    ============================ */
    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");

    function scrollCourseCard(d) {
        const card = featuredCoursesEl.querySelector(".course-card");
        if (!card) return;
        const gap = 16;
        const amount = card.getBoundingClientRect().width + gap;
        featuredCoursesEl.scrollBy({ left: d * amount, behavior: "smooth" });
    }

    prevBtn?.addEventListener("click", () => scrollCourseCard(-1));
    nextBtn?.addEventListener("click", () => scrollCourseCard(1));
}