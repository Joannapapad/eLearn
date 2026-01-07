// Handles loading and rendering the course details page

import { api } from "../services/api.service";

export async function loadCourseDetails(container, courseId) {
  // Safety check – if router passed invalid params, do nothing
  if (!container || !courseId) return;

  try {
    // Fetch course data from the API using the course id
    const course = await api.getCourseById(courseId);

    // If course does not exist, show a fallback UI
    if (!course) {
      container.innerHTML = `
        <div style="padding: 40px; text-align: center;">
          <h2>Course not found</h2>
          <a href="#/courses" class="back-btn">Back to Courses</a>
        </div>
      `;
      return;
    }

    
    //Recommended books section

    // Default message if there are no books
    let bibliographyList = "<div>No recommended books</div>";

    // Only try to load books if bibliography exists and has items
    if (course.bibliography?.length) {
      // Fetch all books once
      const allBooks = await api.getBooks?.() || [];

      // Match each bibliography id with the actual book object
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

    //Learning outcomes list

    // Convert array of learning outcomes into <li> elements
    const learningList =
      course.learningOutcomes?.map(item => `<li>${item}</li>`).join("") || "";

    //Render page HTML

    container.innerHTML = `
      <div class="courses-picture">
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
                <div class="meta-item">
                  <strong>Category:</strong>
                  <ul><li>${course.category}</li></ul>
                </div>

                <div class="meta-item meta-prereqs">
                  <strong>Prerequisites:</strong>
                  <ul>
                    ${
                      course.prerequisites?.length
                        ? course.prerequisites.map(p => `<li>${p}</li>`).join("")
                        : "<li>None</li>"
                    }
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
                <p>
                  This course belongs to the <strong>${course.category}</strong> category.
                  It provides the foundational knowledge required for this field.
                </p>
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

          <!-- Enroll button -->
          <button id="enrollBtn" data-course-id="${course._id}" class="btn-primary">
            Enroll
          </button>

          <a href="#/courses" class="btn-primary btn-course-detail">
            ← Back to Courses
          </a>
        </div>
      </div>
    `;
  } catch (err) {
    // If API call fails or something crashes during rendering
    console.error(err);

    container.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <h2>Error loading course details</h2>
        <p>${err.message}</p>
        <a href="#/courses" class="back-btn">Back to Courses</a>
      </div>
    `;
  }

  // Page animation / styling hook
  document.body.classList.add("page-loaded");

  //Enroll button logic

  // Button exists only after HTML is injected
  const enrollBtn = container.querySelector("#enrollBtn");
  enrollBtn.addEventListener("click", () => enroll(courseId));

  async function enroll(courseId) {
    console.log("Enroll button clicked for courseId:", courseId);

    // Read logged-in user from localStorage
    const userStr = localStorage.getItem("currentUser");
    console.log("Current user from localStorage:", userStr);

    // If user is not logged in, redirect to register page
    if (!userStr) {
      alert("You must be logged in to enroll");
      window.location.hash = "#/register";
      return;
    }

    let stored;
    try {
      // Parse stored JSON safely
      stored = JSON.parse(userStr);
      console.log("Parsed localStorage object:", stored);
    } catch (err) {
      console.error("Failed to parse localStorage:", err);
      alert("User info is corrupted. Please login again.");
      window.location.hash = "#/register";
      return;
    }

    // Extract nested user object
    const user = stored.user;
    if (!user || !user.id) {
      console.error("User object missing id:", user);
      alert("User ID not found. Please login again.");
      window.location.hash = "#/register";
      return;
    }

    try {
      // Send enrollment request to backend
      console.log("Sending POST to /api/enrollments with body:", {
        userId: user.id,
        courseId
      });

      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,   // backend expects user.id
          courseId
        })
      });

      const data = await res.json();
      console.log("Response from server:", res.status, data);

      if (!res.ok) {
        alert(data.message || "Enrollment failed");
        return;
      }

      alert("Enrolled successfully!");
    } catch (err) {
      // Network or fetch error
      console.error("Fetch error during enrollment:", err);
      alert("An error occurred while enrolling. Check console.");
    }
  }
}
