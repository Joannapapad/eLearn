const BASE_URL = "/api";

async function request(endpoint, options = {}) {
  const res = await fetch(BASE_URL + endpoint, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "API error");
  }

  return res.json();
}

export const api = {
  // COURSES
  getCourses() {
    return request("/courses");
  },

  getCourseById(id) {
    return request(`/courses/${id}`);
  },

  // USERS
  registerUser(data) {
    return request("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};