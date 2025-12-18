document.addEventListener("DOMContentLoaded", () => {

  function getParameterByName(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
  }

  /* --------------------------
     COURSE DETAILS
  -------------------------- */
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
      } else {
          const bibliographyList = course.bibliography.length > 0
              ? course.bibliography.map(bookId => {
                  const book = BOOKS.find(b => b.id === bookId);
                  if (!book) return "";
                  return `
                  <a href="book-details.html?id=${book.id}" class="book-item">
                      <div class="book-title">
                          ${book.title} <span class="book-arrow">></span>
                      </div>
                      <div class="book-hover">Learn More</div>
                  </a>`;
              }).join("")
              : "<div>No recommended books</div>";

          const learningList = course.learningOutcomes
              .map(item => `<li>${item}</li>`).join("");

          container.innerHTML = `
          <div class="details">
              <div class="book-header">
                <div class="course-header">

                  <h1 class="course-title">${course.title}</h1>
                  <div class="course-id">Course ID: ${course.id}</div>
                  </div>
              </div>

              <div class="course-columns">
                  <div class="left-column">
                      <div class="course-desc"><p>${course.description}</p></div>

                      <div class="course-instructor">
                          <div class="instructor-photo">
                              <img src="assets/img/default.png" alt="Instructor">
                          </div>
                          <div class="instructor-name">${course.profesor}</div>
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
                          <p>This course belongs to the <strong>${course.category}</strong> category.
                             It provides the foundational knowledge required for this field.</p>
                      </div>

                      <div class="recommended-books">
                          <div class="section-title">Recommended Books</div>
                          <div class="book-slider">${bibliographyList}</div>
                      </div>
                  </div>
              </div>

              <div class="course-learning">
                  <div class="section-title">Learning Outcomes</div>
                  <ul>${learningList}</ul>
              </div>

              <a href="courses.html" class="btn-primary btn-course-detail">← Back to Courses</a>
              </div>
          `;
      }
  }

  /* --------------------------
     BOOK DETAILS
  -------------------------- */
  if (window.location.pathname.includes("book-details.html")) {
    const bookId = getParameterByName('id');
    const book = BOOKS.find(b => b.id === bookId);
    const container = document.getElementById("book-details-container");

    if (!book || !container) {
        container.innerHTML = `
            <div style="padding: 40px; text-align: center;">
                <h2>Book not found</h2>
                <a href="books.html" class="back-btn">Back to Books</a>
            </div>
        `;
    } else {

        // Create Recommended Courses list
        const recommendedCoursesList = book.recommendedCourses && book.recommendedCourses.length > 0
            ? book.recommendedCourses.map(courseId => {
                const course = COURSES.find(c => c.id === courseId);
                if (!course) return '';
                return `
                    <a href="course-details.html?id=${course.id}" class="book-item">
                        <div class="book-title">
                            ${course.title} <span class="book-arrow">></span>
                        </div>
                        <div class="book-hover">Learn More</div>
                    </a>
                `;
            }).join('')
            : '<div>No recommended courses</div>';

        // Create Recommended Videos list
        const recommendedVideosList = book.recommendedVideos && book.recommendedVideos.length > 0
            ? book.recommendedVideos.map(videoId => {
                const video = VIDEOS.find(v => v.id === videoId);
                if (!video) return '';

                return `
                    <div class="book-item video-card" data-video-src="${video.src}">
                        <img src="${video.thumbnail}" class="video-thumb">
                        <div class="book-title">
                            ${video.title} <span class="book-arrow">></span>
                        </div>
                        <div class="book-hover">Watch Video</div>
                    </div>
                `;
            }).join('')
            : '<div>No recommended videos</div>';


        container.innerHTML = `
        <div class="details">

    
            <div class="book-header book-${book.category}">
                <div class="book-header-left">
                  <h1 class="book-title">${book.title}</h1>
                </div>
                <div class="book-header-right">
                    <span class="book-edition">${book.edition || ""}</span>
                </div>
            </div>

            <div class="course-columns">
                <div class="left-column">

                    <div class="book-body">
                        <div class="book-photo flex">
                            <img src="assets/img/books/${book.id}.png" alt="${book.title}">
                        </div>

                        <p class="book-desc">${book.description}</p>
                    </div>

                    <div class="course-instructor">
                        <div class="instructor-photo">
                            <img src="assets/img/default.png" alt="Instructor">
                        </div>
                        <div class="instructor-name">${book.author}</div>
                    </div>

                    <div class="course-about">
                        <div class="section-title">About this Book</div>
                        <div class="category-icon">
                            <img src="assets/img/icons/${book.category}.png" alt="${book.category}">
                        </div>
                        <p>This book belongs to the <strong>${book.category}</strong> category.
                           It provides the foundational knowledge required for this field.</p>
                    </div>
                </div>

                <div class="right-column">


                    <div class="recommended-books">
                        <div class="section-title">Recommended Courses</div>
                        <div class="book-slider">
                            ${recommendedCoursesList}
                        </div>
                    </div>
                    <div class="recommended-videos">
                        <div class="section-title">Recommended Videos</div>
                        <div class="video-slider">
                            ${recommendedVideosList}
                        </div>
                    </div>

                </div>
            </div>

            <a href="books.html" class="btn-primary btn-book-detail">← Back to Books</a>
        


        </div>
        `;
    }
}


// Video Overlay Logic
document.addEventListener("click", function (e) {
    const card = e.target.closest(".video-card");
    if (!card) return;

    const videoSrc = card.getAttribute("data-video-src");
    const overlay = document.getElementById("video-overlay");
    const player = document.getElementById("video-player");

    player.src = videoSrc;
    overlay.style.display = "flex";


    // 🔒 LOCK SCROLL
    document.body.style.overflow = "hidden";

    player.play();
});

// Close overlay
document.getElementById("video-close").addEventListener("click", closeOverlay);

// Close when clicking outside video
document.getElementById("video-overlay").addEventListener("click", (e) => {
    if (e.target.id === "video-overlay") {
        closeOverlay();
    }
});

function closeOverlay() {
    const overlay = document.getElementById("video-overlay");
    const player = document.getElementById("video-player");

    player.pause();
    player.src = "";
    overlay.style.display = "none";
    // 🔓 UNLOCK SCROLL
    document.body.style.overflow = "";
}


});