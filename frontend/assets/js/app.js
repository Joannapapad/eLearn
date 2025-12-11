document.addEventListener("DOMContentLoaded", () => {
    
    if(window.location.pathname.includes("index.html")) {
        const fadeSection = document.querySelector(".fade-section");
    
        if(fadeSection) {
            const observer = new IntersectionObserver((entries,obs) => {
                entries.forEach(entry=> {
                    if(entry.isIntersecting){
                        entry.target.classList.add("is-visible");
                    }else{
                        entry.target.classList.remove("is-visible");
    
                    }
                })
            }, {threshold:0.2});
            
            observer.observe(fadeSection);
    
    
    
        }
    }
    function getParameterByName(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    if (window.location.pathname.includes("courses.html")) {
        const listEl = document.getElementById("courses-list");
        const filterCategory = document.getElementById("filter-category");
        const filterLevel = document.getElementById("filter-level");
        const filterSearch = document.getElementById("filter-search");

        if (!listEl) return;

        function renderCourses(items) {
            listEl.innerHTML = items.map(course => `
                <div class="course-card" data-id="${course.id}">
                    <div class="card-header">
                        <h3 class="course-title">${course.title}</h3>
                        <div class="course-category-icon">
                            <img src="assets/img/icons/${course.category}.png" alt="${course.category}">
                        </div>
                    </div>
                    <p class="course-level">${course.level}</p>
                    <p class="course-description">${course.description}</p>
                </div>
            `).join("");

            document.querySelectorAll('.course-card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = card.dataset.id;
                    window.location.href = `course-details.html?id=${id}`;
                });
            });
        }

        function applyFilters() {
            let results = [...COURSES];

            if (filterCategory?.value && filterCategory.value !== "all") {
                results = results.filter(c => c.category === filterCategory.value);
            }

            if (filterLevel?.value && filterLevel.value !== "all") {
                results = results.filter(c => c.level === filterLevel.value);
            }

            if (filterSearch?.value?.trim()) {
                const term = filterSearch.value.trim().toLowerCase();
                results = results.filter(c =>
                    c.title.toLowerCase().includes(term) ||
                    c.description.toLowerCase().includes(term)
                );
            }

            renderCourses(results);
        }

        filterCategory?.addEventListener("change", applyFilters);
        filterLevel?.addEventListener("change", applyFilters);
        filterSearch?.addEventListener("input", applyFilters);

        renderCourses(COURSES);
    }

    if (window.location.pathname.includes("course-details.html")) {
        const courseId = getParameterByName('id');

        const titleEl = document.getElementById("course-title");
        const levelEl = document.getElementById("course-level");
        const descEl = document.getElementById("course-description");
        const iconEl = document.getElementById("course-icon");

        if (!titleEl || !levelEl || !descEl || !iconEl) return;

        const course = COURSES.find(c => c.id === courseId);

        if (!course) {
            document.body.innerHTML = `
                <div style="padding: 40px; text-align: center;">
                    <h2>Course not found</h2>
                    <a href="courses.html">Back to Courses</a>
                </div>
            `;
        } else {
            titleEl.textContent = course.title;
            levelEl.textContent = "Level: " + course.level;
            descEl.innerHTML = course.description;
            iconEl.src = `assets/img/icons/${course.category}.png`;
            iconEl.alt = course.category;
        }
    }

});
