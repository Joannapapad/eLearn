
// Base URL for the backend API (change if server/port differs)
const BASE_URL = "http://localhost:5000/api";

/**
 * Small fetch helper used by all API calls.
 * Keeps request/response handling consistent across the app.
 *
 * @param {string} endpoint - API route (e.g. "/courses")
 * @param {object} options - fetch options (method, body, headers, etc.)
 * @returns {Promise<any>} - parsed JSON response
 */

async function request(endpoint, options = {}) {
  // Default headers for JSON requests (can be extended via options)
  const res = await fetch(BASE_URL + endpoint, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  // If the server responds with an error, surface the message to help debugging
  if (!res.ok) {
    // Some endpoints may return plain text errors instead of JSON
    const errorText = await res.text();
    throw new Error(errorText || "API error");
  }

  // Successful responses are expected to be JSON
  return res.json();
}

/*
 API layer used by the UI/pages.
This keeps fetch logic out of components and makes code easier to maintain.
*/
export const api = {
  
  //COURSES

  // Get all courses
  getCourses() {
    return request("/courses");
  },

  // Get a single course by id
  getCourseById(id) {
    // The id is expected to be a string
    return request(`/courses/${id}`);
  },

  // BOOKS

  // Get all books
  getBooks() {
    return request("/books");
  },

  // Get a single book by id
  getBookById(id) {
    return request(`/books/${id}`);
  },

  // Get all videos
  getVideos() {
    return request("/videos");
  },

  //USERS

  // Register a new user (client-side sends JSON payload)
  registerUser(data) {
    return request("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Login user (returns token/user info depending on backend implementation)
  loginUser(data) {
    return request("/users/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
