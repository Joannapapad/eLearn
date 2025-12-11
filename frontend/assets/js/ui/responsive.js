// wait for DOM
document.addEventListener("DOMContentLoaded", () => {

    const filters = document.querySelectorAll('.filter-group');
    const searchInput = document.getElementById('filter-search');
    const coursesList = document.getElementById('courses-list');

    /* --------------------------
       MOBILE TOGGLE FILTERS
    -----------------------------*/
    filters.forEach(f => {
        const header = f.querySelector('.filter-header');
        const opts = f.querySelector('.filter-options');

        header.addEventListener('click', () => {
            if (window.innerWidth < 900) {
                const open = opts.classList.contains("open");

                // close all
                document.querySelectorAll(".filter-options").forEach(o => {
                    o.classList.remove("open");
                });

                // open only this if was closed
                if (!open) opts.classList.add("open");
            }
        });
    });

    // close when clicking outside
    document.addEventListener('click', e => {
        if (window.innerWidth < 900) {
            if (!e.target.closest('.filter-group')) {
                document.querySelectorAll('.filter-options').forEach(o => o.classList.remove("open"));
            }
        }
    });


    /* --------------------------
        RENDER COURSES
    -----------------------------*/
    function renderCourses() {
        let results = [...COURSES];

        const selectedCategories =
            [...document.querySelectorAll('[data-filter="category"] input:checked')]
                .map(i => i.value);

        const selectedLevels =
            [...document.querySelectorAll('[data-filter="level"] input:checked')]
                .map(i => i.value);

        const searchTerm = searchInput.value.trim().toLowerCase();


        // CATEGORY FILTER
        if (selectedCategories.length > 0) {
            results = results.filter(c => selectedCategories.includes(c.category));
        }

        // LEVEL FILTER
        if (selectedLevels.length > 0) {
            results = results.filter(c => selectedLevels.includes(c.level));
        }

        // SEARCH FILTER
        if (searchTerm !== "") {
            results = results.filter(c =>
                c.title.toLowerCase().includes(searchTerm) ||
                c.description.toLowerCase().includes(searchTerm)
            );
        }


        coursesList.innerHTML = results.map(c => `
        <div class="course-card"  data-id="${c.id}">
    
            <div class="card-header">
                <h3 class="course-title">${c.title}</h3>
                <div class="course-category-icon">
                    <img src="assets/img/icons/${c.category}.png" alt="${c.category}">
                </div>
            </div>
    
            <p class="course-level">${c.level}</p>
            
            <p class="course-description">${c.description}</p>
    
        </div>
    `).join('');
    
        // Add click listeners
        document.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                window.location.href = `course-details.html?id=${id}`;
            });
        });
    
    }


    /* --------------------------
        EVENT LISTENERS
    -----------------------------*/
    document.querySelectorAll('.filter-options input')
        .forEach(cb => cb.addEventListener('change', renderCourses));

    searchInput.addEventListener('input', renderCourses);

    renderCourses();
});
