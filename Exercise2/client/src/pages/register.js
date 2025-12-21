import { api } from "/src/services/api.service.js";

export function loadRegister(container) {
  container.innerHTML = `
    <h2>Register</h2>
    <form id="register-form">
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Register</button>
      <p id="message"></p>
    </form>
  `;

  const form = document.getElementById("register-form");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
    };

    try {
      await api.registerUser(data); // ✅ εδώ καλούμε μέσω api object
      message.textContent = "✅ Registration successful";
      message.style.color = "green";
      form.reset();
    } catch (err) {
      message.textContent = "❌ Registration failed";
      message.style.color = "red";
    }
  });
}
