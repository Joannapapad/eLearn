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

        //click in cateogiry boxes
        const categoryCards = document.querySelectorAll(".category");

        categoryCards.forEach(card => {
            card.style.cursor= "pointer";
            card.addEventListener("click" ,() =>{
                const categoryKey = card.dataset.category;
                window.location.href = `courses.html?category=${categoryKey}`;
            });
        });
    }


    function getParameterByName(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }




  if (window.location.pathname.includes("course-details.html")) {
    const courseId = getParameterByName('id');
    const course = COURSES.find(c => c.id === courseId);

    const container = document.getElementById("course-details-container");

    if (!course || !container) {
      container.innerHTML = `
        <div style="padding: 40px; text-align: center;">
          <h2>Course not found</h2>
          <a href="courses.html" class="back-btn">Back to Courses</a>
        </div>
      `;
      return;
    }

    // Prepare prerequisites text
    const prereqs = course.prerequisites.length > 0 ? course.prerequisites.join(", ") : "None";

    // Map book IDs to book titles
// Map book IDs to book items with link and hover effect
    const bibliographyList = course.bibliography.length > 0
    ? course.bibliography.map(bookId => {
        const book = BOOKS.find(b => b.id === bookId);
        if (!book) return '';
        return `
            <a href="book-details.html?id=${book.id}" class="book-item">
            <div class="book-title">
                ${book.title} <span class="book-arrow">></span>
            </div>
            <div class="book-hover">Learn More</div>
            </a>
        `;
        }).join('')
    : '<div>No recommended books</div>';


    // Prepare learning outcomes list
    const learningList = course.learningOutcomes.map(item => `<li>${item}</li>`).join("");
   
    container.innerHTML = `
      <div class="course-header">
        <h1 class="course-title">${course.title}</h1>
        <div class="course-id">Course ID: ${course.id}</div>
      </div>

      <div class="course-columns">
        <div class="left-column">
          <div class="course-desc">
            <p>${course.description}</p>
          </div>

          <div class="course-instructor">
            <div class="instructor-photo">
              <img src="assets/img/default.png" alt="Instructor">
            </div>
            <div class="instructor-name">TBD</div>
            
          </div>

          <div class="course-meta">
            <div class="meta-item"><strong>Credits:</strong> ${course.credits}</div>
            <div class="meta-item"><strong>Semester:</strong> ${course.semester}</div>
            <div class="meta-item"><strong>Category:</strong><ul>${course.category}<ul></div>
            
                <div class="meta-item meta-prereqs">
                    <strong>Prerequisites:</strong>
                    <ul>
                    ${course.prerequisites.length > 0 
                        ? course.prerequisites.map(p => `<li>${p}</li>`).join("") 
                        : "<li>None</li>"}
                    </ul>
                </div>

            </div>


        </div>

        <div class="right-column">

            <div class="course-about">
                <div class="section-title">About this Course</div>
                <div class="category-icon">
                    <img src="assets/img/icons/${course.category}.png" alt="${course.category}">
                </div>
                <p>
                    This course belongs to the <strong>${course.category}</strong> category.
                    It is designed to provide students with the foundational knowledge and skills necessary for this field.
                </p>
            </div>
    
          <div class="recommended-books">
            <div class="section-title">Recommended Books</div>
            <div class="book-slider">
              ${bibliographyList}
            </div>
          </div>
        </div>



      </div>



      <div class="course-learning">
        <div class="section-title">Learning Outcomes</div>
        <ul>${learningList}</ul>
      </div>

      <a href="courses.html" class="back-btn">← Back to Courses</a>
    `;


  }

});
