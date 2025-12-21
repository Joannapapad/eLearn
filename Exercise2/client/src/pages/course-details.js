// src/pages/course-details.js
import { api } from "../services/api.service";

export async function loadCourseDetails(container, courseId) {
  if (!container || !courseId) return;

  try {
    const course = await api.getCourseById(courseId);

    if (!course) {
      container.innerHTML = `
        <div style="padding: 40px; text-align: center;">
          <h2>Course not found</h2>
          <a href="#/courses" class="back-btn">Back to Courses</a>
        </div>
      `;
      return;
    }

// Fetch recommended books
let bibliographyList = "<div>No recommended books</div>";
if (course.bibliography?.length) {
  const allBooks = await api.getBooks?.() || [];

  bibliographyList = course.bibliography
    .map(bookId => {
      const book = allBooks.find(
        b => (b._id?.toString() === bookId) || (b.id?.toString() === bookId)
      );
      if (!book) return "";
      return `
        <a href="#/book/${book.id || book.id}" class="book-item">
          <div class="book-title">${book.title} <span class="book-arrow">></span></div>
          <div class="book-hover">Learn More</div>
        </a>
      `;
    })
    .join("") || "<div>No recommended books</div>";
}


    // Render learning outcomes
    const learningList = course.learningOutcomes?.map(item => `<li>${item}</li>`).join("") || "";

    // Render HTML
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
                <img src="/assets/img/default.png" alt="Instructor">
              </div>
              <div class="instructor-name">${course.profesor}</div>
            </div>

            <div class="course-meta">
              <div class="meta-item"><strong>Credits:</strong> ${course.credits}</div>
              <div class="meta-item"><strong>Semester:</strong> ${course.semester}</div>
              <div class="meta-item"><strong>Category:</strong><ul><li>${course.category}</li></ul></div>
              <div class="meta-item meta-prereqs">
                <strong>Prerequisites:</strong>
                <ul>
                  ${course.prerequisites?.length ? course.prerequisites.map(p => `<li>${p}</li>`).join("") : "<li>None</li>"}
                </ul>
              </div>
            </div>
          </div>

          <div class="right-column">
            <div class="course-about">
              <div class="section-title">About this Course</div>
              <div class="category-icon">
                <img src="/assets/img/icons/${course.category}.png" alt="${course.category}">
              </div>
              <p>This course belongs to the <strong>${course.category}</strong> category. It provides the foundational knowledge required for this field.</p>
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

        <a href="#/courses" class="btn-primary btn-course-detail">← Back to Courses</a>
      </div>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <h2>Error loading course details</h2>
        <p>${err.message}</p>
        <a href="#/courses" class="back-btn">Back to Courses</a>
      </div>
    `;
  }
  document.body.classList.add("page-loaded");

}
