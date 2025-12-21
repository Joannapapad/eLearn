// src/services/api.service.js
const BASE_URL = "http://localhost:5000/api"; // adjust if needed

/**
 * Generic fetch wrapper
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const res = await fetch(BASE_URL + endpoint, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API error");
  }

  return res.json();
}

export const api = {
  // COURSES
  getCourses() {
    return request("/courses");
  },

  getCourseById(id) {
    // Accept either string or ObjectId string
    return request(`/courses/${id}`);
  },

  // BOOKS
  getBooks() {
    return request("/books");
  },

  getBookById(id) {
    return request(`/books/${id}`);
  },

  // USERS
  registerUser(data) {
    return request("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  loginUser(data) {
    return request("/users/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
};
