import { api } from "/src/services/api.service.js";

// Load and render the Register / Login page
export function loadRegister(container) {
  container.innerHTML = `
    <main class="form-container">
      <div class="background-image">
        <div class="auth-card">
          <div class="auth-toggle">
            <button id="showRegisterBtn" class="active" type="button">Register</button>
            <button id="showLoginBtn" type="button">Login</button>
          </div>

          <!-- REGISTER FORM -->
          <form id="register-form" class="auth-form" novalidate>
            <!-- Personal information -->
            <fieldset class="form-section personal-details">
              <legend class="title">Personal Details</legend>
              ...
            </fieldset>

            <!-- Account credentials -->
            <fieldset class="form-section account-details">
              <legend class="title">Account Details</legend>
              ...
            </fieldset>

            <!-- Interests selection -->
            <fieldset class="form-section interests">
              <legend class="title">Interests</legend>
              ...
            </fieldset>

            <!-- Learning profile -->
            <fieldset class="form-section recommendations">
              <legend class="title">Learning Profile</legend>
              ...
            </fieldset>

            <div class="register-actions">
              <button class="btn-primary" type="submit">Register Now</button>
            </div>

            <p id="message" role="status" aria-live="polite"></p>
          </form>

          <!-- LOGIN FORM -->
          <form id="login-form" class="auth-form hidden" novalidate>
            <fieldset class="form-section account-details">
              <legend class="title">Login</legend>
              ...
            </fieldset>

            <div class="register-actions">
              <button type="submit" class="btn-primary">Login</button>
            </div>

            <p id="loginMessage" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </main>

    <!-- Confirmation modal -->
    <div id="summaryModal" class="modal" aria-hidden="true">
      <div class="modal-content card">
        <h2>Confirm your Details</h2>
        <div id="summaryBox"></div>
        <div class="modal-actions">
          <button type="button" class="btn-outline" id="editBtn">Edit</button>
          <button type="button" class="btn-primary" id="confirmBtn">Confirm</button>
        </div>
      </div>
    </div>
  `;

  document.body.classList.add("page-loaded");

  //  TOGGLE LOGIN / REGISTER
  const showRegisterBtn = container.querySelector("#showRegisterBtn");
  const showLoginBtn = container.querySelector("#showLoginBtn");
  const registerForm = container.querySelector("#register-form");
  const loginForm = container.querySelector("#login-form");

  // Show register form
  showRegisterBtn.addEventListener("click", () => {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    showRegisterBtn.classList.add("active");
    showLoginBtn.classList.remove("active");
  });

  // Show login form
  showLoginBtn.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    showLoginBtn.classList.add("active");
    showRegisterBtn.classList.remove("active");
  });

  // REGISTER FORM LOGIC 
  const form = registerForm;
  const message = container.querySelector("#message");
  const submitBtn = form.querySelector('button[type="submit"]');

  // Cache form fields
  const fields = {
    firstName: form.querySelector("#firstName"),
    lastName: form.querySelector("#lastName"),
    dateOfBirth: form.querySelector("#dateOfBirth"),
    gender: form.querySelector("#gender"),
    occupation: form.querySelector("#occupation"),
    email: form.querySelector("#email"),
    password: form.querySelector("#password"),
    confirmPassword: form.querySelector("#confirmPassword"),
    goal: form.querySelector("#goal"),
  };

  // LocalStorage key for draft persistence
  const draftKey = "registerDraft";

  // Retrieve error container for a field
  function getError(input) {
    return input?.closest(".form")?.querySelector(".error") || null;
  }

  // Set or clear validation error for a field
  function setError(input, text) {
    const err = getError(input);
    if (err) err.textContent = text || "";
    input?.classList.toggle("is-invalid", Boolean(text));
  }

  // Clear all validation messages
  function clearErrors() {
    Object.values(fields).forEach((el) => el && setError(el, ""));
    form.querySelector(".form-section.interests .error").textContent = "";
    form.querySelectorAll(".form-section.recommendations .error")
      .forEach(e => e.textContent = "");
  }

  // validation helpers
  const isEmpty = v => v == null || String(v).trim() === "";
  const isValidEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  // Password validation
  function strongPassword(pass) {
    return (
      pass.length >= 10 &&
      /[A-Z]/.test(pass) &&
      /[a-z]/.test(pass) &&
      /[0-9]/.test(pass) &&
      /[^a-zA-Z0-9]/.test(pass)
    );
  }

  // validation age from date of birth
  function calcAge(date) {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    if (
      today.getMonth() < date.getMonth() ||
      (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())
    ) age--;
    return age;
  }

  // Extract interests and experience values
  const getInterests = () =>
    [...form.querySelectorAll('input[name="interests"]:checked')].map(cb => cb.value);

  const getExperience = () =>
    form.querySelector('input[name="experience"]:checked')?.value || "";

  // Validate all register fields
  function validateFields() {
    clearErrors();
    message.textContent = "";

    let valid = true;
    let firstInvalid = null;

    const required = ["firstName", "lastName", "dateOfBirth", "email", "password", "confirmPassword", "goal"];

    required.forEach(name => {
      const el = fields[name];
      if (isEmpty(el.value)) {
        valid = false;
        setError(el, "This field is required");
        firstInvalid ??= el;
      }
    });

    if (!isValidEmail(fields.email.value)) {
      valid = false;
      setError(fields.email, "Invalid email format");
      firstInvalid ??= fields.email;
    }

    if (!strongPassword(fields.password.value)) {
      valid = false;
      setError(fields.password, "Weak password");
      firstInvalid ??= fields.password;
    }

    if (fields.password.value !== fields.confirmPassword.value) {
      valid = false;
      setError(fields.confirmPassword, "Passwords do not match");
      firstInvalid ??= fields.confirmPassword;
    }

    const dob = new Date(fields.dateOfBirth.value);
    if (calcAge(dob) < 16) {
      valid = false;
      setError(fields.dateOfBirth, "Minimum age is 16");
      firstInvalid ??= fields.dateOfBirth;
    }

    if (!getInterests().length) {
      valid = false;
      form.querySelector(".form-section.interests .error").textContent =
        "Select at least one interest";
    }

    if (!getExperience()) {
      valid = false;
      form.querySelector(".form-section.recommendations .error").textContent =
        "Select experience level";
    }

    firstInvalid?.focus();
    return valid;
  }

  // Convert form values to API payload
  function formToPayload() {
    return {
      firstName: fields.firstName.value.trim(),
      lastName: fields.lastName.value.trim(),
      dateOfBirth: fields.dateOfBirth.value,
      gender: fields.gender.value || undefined,
      occupation: fields.occupation.value?.trim() || undefined,
      interests: getInterests(),
      experience: getExperience(),
      goal: fields.goal.value,
      email: fields.email.value.trim(),
      password: fields.password.value,
    };
  }

  // Autosave draft (excluding password)
  function saveDraft() {
    const { password, ...draft } = formToPayload();
    localStorage.setItem(draftKey, JSON.stringify(draft));
  }

  function restoreDraft() {
    const raw = localStorage.getItem(draftKey);
    if (!raw) return;
    const data = JSON.parse(raw);

    Object.keys(fields).forEach(k => {
      if (data[k]) fields[k].value = data[k];
    });

    if (Array.isArray(data.interests)) {
      form.querySelectorAll('input[name="interests"]')
        .forEach(cb => cb.checked = data.interests.includes(cb.value));
    }

    if (data.experience) {
      form.querySelectorAll('input[name="experience"]')
        .forEach(r => r.checked = r.value === data.experience);
    }
  }

  form.addEventListener("input", saveDraft);
  restoreDraft();

  // MODAL CONFIRMATION
  const modal = container.querySelector("#summaryModal");
  const summaryBox = container.querySelector("#summaryBox");
  const editBtn = container.querySelector("#editBtn");
  const confirmBtn = container.querySelector("#confirmBtn");

  let pendingData = null;

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateFields()) return;

    pendingData = formToPayload();
    summaryBox.innerHTML = JSON.stringify(pendingData, null, 2);
    modal.setAttribute("aria-hidden", "false");
  });

  confirmBtn.addEventListener("click", async () => {
    try {
      await api.registerUser(pendingData);
      message.textContent = "Registration successful";
      localStorage.removeItem(draftKey);
      form.reset();
    } catch (err) {
      message.textContent = err.message || "Registration failed";
    } finally {
      modal.setAttribute("aria-hidden", "true");
    }
  });

  editBtn.addEventListener("click", () =>
    modal.setAttribute("aria-hidden", "true")
  );

  //  LOGIN LOGIC 
  const loginMessage = container.querySelector("#loginMessage");

  loginForm.addEventListener("submit", async e => {
    e.preventDefault();
    loginMessage.textContent = "";

    const email = loginForm.querySelector("#loginEmail").value.trim();
    const password = loginForm.querySelector("#loginPassword").value;

    if (!email || !password) {
      loginMessage.textContent = "Fill in all fields";
      return;
    }

    try {
      const user = await api.loginUser({ email, password });
      localStorage.setItem("currentUser", JSON.stringify(user));
      loginMessage.textContent = "Login successful";
      loginForm.reset();
    } catch {
      loginMessage.textContent = "Invalid credentials";
    }
  });
}
