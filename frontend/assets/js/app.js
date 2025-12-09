if (window.location.pathname.includes("courses.html")) {

    const listEl = document.getElementById("courses-list");
    const filterCategory = document.getElementById("filter-category");
    const filterLevel = document.getElementById("filter-level");
    const filterSearch = document.getElementById("filter-search");
    
    function renderCourses(items) {
        listEl.innerHTML = items.map(course => `
            <div class="course-card">
                <h3>${course.title}</h3>
                <div class="course-meta">
                    Category: ${course.category} • Level: ${course.level}
                </div>
                <p>${course.description}</p>
    
                <a href="course-details.html?id=${course.id}">
                    View Details
                </a>
            </div>
        `).join("");
    }
    
    function applyFilters() {
        let result = COURSES;
    
        if (filterCategory.value !== "all") {
            result = result.filter(c => c.category === filterCategory.value);
        }
    
        if (filterLevel.value !== "all") {
            result = result.filter(c => c.level === filterLevel.value);
        }
    
        if (filterSearch.value.trim() !== "") {
            result = result.filter(c =>
                c.title.toLowerCase().includes(filterSearch.value.toLowerCase())
            );
        }
    
        renderCourses(result);
    }
    
    filterCategory.addEventListener("change", applyFilters);
    filterLevel.addEventListener("change", applyFilters);
    filterSearch.addEventListener("input", applyFilters);
    
    renderCourses(COURSES);
}
