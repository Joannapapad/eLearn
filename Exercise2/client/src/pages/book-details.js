import { api } from "../services/api.service.js";


export async function loadBookDetails(container, bookId) {
    if (!container || !bookId) return;

    try {
      const book = await api.getBookById(bookId);

    if (!book) {
      container.innerHTML = `
        <div style="padding: 40px; text-align: center;">
          <h2>Book not found</h2>
          <a href="#/books" class="back-btn">Back to Books</a>
        </div>
      `;
      return;
    }

    // Recommended Courses
    let recommendedCoursesList = "<div>No recommended courses</div>";
    if (book.recommendedCourses?.length) {
      const allCourses = await api.getCourses(); // fetch all courses
      recommendedCoursesList = book.recommendedCourses
        .map(courseId => {
          const course = allCourses.find(c => c._id === courseId || c.id === courseId);
          if (!course) return "";
          return `
            <a href="#/course/${course._id || course.id}" class="book-item">
              <div class="book-title">${course.title} <span class="book-arrow">></span></div>
              <div class="book-hover">Learn More</div>
            </a>
          `;
        })
        .join("") || "<div>No recommended courses</div>";
    }

     
    let recommendedVideosList = "<div>No recommended videos</div>";
    if (book.recommendedVideos?.length) {
      const allVideos = await api.getVideos(); 
      recommendedVideosList = book.recommendedVideos
        .map(videoId => {
          const video = allVideos.find(v => v._id === videoId || v.id === videoId);
          if (!video) return "";
          return `
            <div class="book-item video-card" data-video-src="${video.src}">
              <div class="book-title">${video.title} <span class="book-arrow">></span></div>
              <div class="book-hover">Watch Video</div>
            </div>
          `;
        })
        .join("") || "<div>No recommended videos</div>";
    }

    // Render HTML
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
                <img src="/assets/img/books/${book._id || book.id}.png" alt="${book.title}">
              </div>
              <p class="book-desc">${book.description}</p>
            </div>

            <div class="course-instructor">
              <div class="instructor-photo">
                <img src="/assets/img/default.png" alt="Instructor">
              </div>
              <div class="instructor-name">${book.author}</div>
            </div>

            <div class="course-about">
              <div class="section-title">About this Book</div>
              <div class="category-icon">
                <img src="/assets/img/icons/${book.category}.png" alt="${book.category}">
              </div>
              <p>This book belongs to the <strong>${book.category}</strong> category.
                 It provides foundational knowledge required for this field.</p>
            </div>
          </div>

          <div class="right-column">
            <div class="recommended-books">
              <div class="section-title">Recommended Courses</div>
              <div class="book-slider">${recommendedCoursesList}</div>
            </div>

            <div class="recommended-videos">
              <div class="section-title">Recommended Videos</div>
              <div class="video-slider">${recommendedVideosList}</div>
            </div>
          </div>
        </div>

        <a href="#/books" class="btn-primary btn-book-detail">← Back to Books</a>
      </div>
    `;
    document.body.classList.add("page-loaded");

    // Video overlay handling
    const overlay = document.getElementById("video-overlay");
    const player = document.getElementById("video-player");
    document.querySelectorAll(".video-card").forEach(card => {
      card.addEventListener("click", () => {
        player.src = card.dataset.videoSrc;
        overlay.style.display = "flex";
        document.body.style.overflow = "hidden";
        player.play();
      });
    });

    document.getElementById("video-close")?.addEventListener("click", closeOverlay);
    overlay?.addEventListener("click", e => {
      if (e.target.id === "video-overlay") closeOverlay();
    });

    function closeOverlay() {
      player.pause();
      player.src = "";
      overlay.style.display = "none";
      document.body.style.overflow = "";
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <h2>Error loading book details</h2>
        <p>${err.message}</p>
        <a href="#/books" class="back-btn">Back to Books</a>
      </div>
    `;
  }
}
