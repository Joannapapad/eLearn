import { api } from "/src/services/api.service.js";

export function loadRegister(container) {
  // Render the full Register/Login UI into the given container
  container.innerHTML = `
    <main class="form-container">
      <div class="background-image">

        <div class="auth-card">
          <div class="auth-toggle">
            <button id="showRegisterBtn" class="active" type="button">Register</button>
            <button id="showLoginBtn" type="button">Login</button>
          </div>

          <!-- REGISTER -->
          <form id="register-form" class="auth-form" novalidate>
            <fieldset class="form-section personal-details">
              <legend class="title">Personal Details</legend>

              <div class="form">
                <label for="firstName">First Name :</label>
                <input id="firstName" name="firstName" type="text" required minlength="2"
                  placeholder="Your First Name" autocomplete="given-name"/>
                <small class="error" aria-live="polite"></small>
              </div>

              <div class="form">
                <label for="lastName">Last Name :</label>
                <input id="lastName" name="lastName" type="text" required minlength="2"
                  placeholder="Your Last Name" autocomplete="family-name"/>
                <small class="error" aria-live="polite"></small>
              </div>

              <div class="form">
                <label for="dateOfBirth">Date Of Birth :</label>
                <input id="dateOfBirth" name="dateOfBirth" type="date" required/>
                <small class="error" aria-live="polite"></small>
              </div>

              <div class="form">
                <label for="occupation">Occupation :</label>
                <input id="occupation" name="occupation" type="text"
                  placeholder="Enter Your Occupation" autocomplete="organization-title"/>
                <small class="error" aria-live="polite"></small>
              </div>

              <div class="form">
                <label for="gender">Gender :</label>
                <select id="gender" name="gender">
                  <option value="" selected>Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
                <small class="error" aria-live="polite"></small>
              </div>
            </fieldset>

            <fieldset class="form-section account-details">
              <legend class="title">Account Details</legend>

              <div class="form">
                <label for="email">Email :</label>
                <input id="email" name="email" type="email" inputmode="email" required
                  autocomplete="email" placeholder="ex. example@email.com"/>
                <small class="error" aria-live="polite"></small>
              </div>

              <div class="form">
                <label for="password">Password :</label>
                <input id="password" name="password" type="password" required minlength="10"
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{10,}"
                  title="At least 10 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol"
                  placeholder="Enter Your Password" autocomplete="new-password"/>
                <small class="error" aria-live="polite"></small>
              </div>

              <div class="form">
                <label for="confirmPassword">Confirm Password :</label>
                <input id="confirmPassword" name="confirmPassword" type="password" required minlength="10"
                  placeholder="Re-enter Your Password" autocomplete="new-password"/>
                <small class="error" aria-live="polite"></small>
              </div>
            </fieldset>

            <fieldset class="form-section interests">
              <legend class="title">Interests</legend>
              <div class="form">
                <label><input type="checkbox" name="interests" value="programming">Programming</label>
                <label><input type="checkbox" name="interests" value="networks">Networks</label>
                <label><input type="checkbox" name="interests" value="security">Security</label>
                <label><input type="checkbox" name="interests" value="databases">Databases</label>
                <label><input type="checkbox" name="interests" value="core">Core</label>
                <label><input type="checkbox" name="interests" value="mathematics">Mathematics</label>
                <label><input type="checkbox" name="interests" value="systems">Systems</label>
                <label><input type="checkbox" name="interests" value="engineering">Engineering</label>
                <label><input type="checkbox" name="interests" value="design">Design</label>
                <label><input type="checkbox" name="interests" value="ai">Artificial Intelligence</label>
                <label><input type="checkbox" name="interests" value="data">Data</label>
                <small class="error" aria-live="polite"></small>
              </div>
            </fieldset>

            <fieldset class="form-section recommendations">
              <legend class="title">Learning Profile</legend>

              <div class="form">
                <label><input type="radio" name="experience" value="beginner" required>Beginner</label>
                <label><input type="radio" name="experience" value="intermediate" required>Intermediate</label>
                <label><input type="radio" name="experience" value="advanced" required>Advanced</label>
                <small class="error" aria-live="polite"></small>
              </div>

              <div class="form">
                <label for="goal">Goal</label>
                <select id="goal" name="goal" required>
                  <option value="" selected>Select Goal</option>
                  <option value="job">Get a Job</option>
                  <option value="uni">University Support</option>
                  <option value="hobby">Hobby</option>
                </select>
                <small class="error" aria-live="polite"></small>
              </div>
            </fieldset>

            <div class="register-actions">
              <button class="btn-primary" type="submit">Register Now</button>
            </div>

            <p id="message" role="status" aria-live="polite"></p>
          </form>

          <!-- LOGIN -->
          <form id="login-form" class="auth-form hidden" novalidate>
            <fieldset class="form-section account-details">
              <legend class="title">Login</legend>

              <div class="form">
                <label for="loginEmail">Email:</label>
                <input type="email" id="loginEmail" name="email" placeholder="example@email.com" required />
                <small class="error" aria-live="polite"></small>
              </div>

              <div class="form">
                <label for="loginPassword">Password:</label>
                <input type="password" id="loginPassword" name="password" placeholder="Enter your password" required />
                <small class="error" aria-live="polite"></small>
              </div>
            </fieldset>

            <div class="register-actions">
              <button type="submit" class="btn-primary">Login</button>
            </div>

            <p id="loginMessage" role="status" aria-live="polite"></p>
          </form>
        </div>
      </div>
    </main>

    <!-- Simple confirmation modal shown right before we actually submit the registration -->
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

  // Adds a class to the body so the page can trigger any “loaded” styles/animations
  document.body.classList.add("page-loaded");

  // Buttons that switch between the register and login forms
  const showRegisterBtn = container.querySelector("#showRegisterBtn");
  const showLoginBtn = container.querySelector("#showLoginBtn");
  const registerForm = container.querySelector("#register-form");
  const loginForm = container.querySelector("#login-form");

  // Show Register form and hide Login form
  showRegisterBtn.addEventListener("click", () => {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    showRegisterBtn.classList.add("active");
    showLoginBtn.classList.remove("active");
  });

  // Show Login form and hide Register form
  showLoginBtn.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    showLoginBtn.classList.add("active");
    showRegisterBtn.classList.remove("active");
  });

  // Main register form references + shared status message area
  const form = registerForm;
  const message = container.querySelector("#message");
  const submitBtn = form.querySelector('button[type="submit"]');

  // Cache all important input elements in one place (easier to validate and read values)
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

  // LocalStorage key used to keep a “draft” of the form while the user types
  const draftKey = "registerDraft";

  // Find the <small class="error"> element linked to a given input
  function getError(i) {
    if (!i) return null;
    const wrapper = i.closest(".form");
    if (!wrapper) return null;
    return wrapper.querySelector(".error");
  }

  // Set/clear the error message for a field and toggle invalid styling
  function setError(i, mess) {
    const err = getError(i);
    if (err) err.textContent = mess || "";
    if (mess) i.classList.add("is-invalid");
    else i.classList.remove("is-invalid");
  }

  // Clears all inline field errors + group errors (checkboxes/radios)
  function clearErrors() {
    Object.values(fields).forEach((el) => el && setError(el, ""));
    const interestErr = form.querySelector(".form-section.interests .error");
    if (interestErr) interestErr.textContent = "";
    form.querySelectorAll(".form-section.recommendations .error").forEach((e) => (e.textContent = ""));
  }

  // Used for “group-level” validation messages (like interests/radio groups)
  function setGroupError(selector, message) {
    const err = form.querySelector(selector);
    if (err) err.textContent = message || "";
  }

  // Small helper to check if a value is basically empty
  function isEmpty(value) {
    return value == null || String(value).trim() === "";
  }

  // Simple email format validation (good enough for UI validation)
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Password rules: min length + at least 1 upper/lower/number/symbol
  function strongPassword(pass) {
    const len = pass.length >= 10;
    const upper = /[A-Z]/.test(pass);
    const lower = /[a-z]/.test(pass);
    const num = /[0-9]/.test(pass);
    const symbol = /[^a-zA-Z0-9]/.test(pass);
    return len && upper && lower && num && symbol;
  }

  // Calculate age from the selected date of birth
  function calcAge(date) {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
    return age;
  }

  // Collect checked interests into an array of values
  function getInterests() {
    return Array.from(form.querySelectorAll('input[name="interests"]:checked')).map((cb) => cb.value);
  }

  // Get selected experience level (radio group)
  function getExperience() {
    return form.querySelector('input[name="experience"]:checked')?.value || "";
  }

  // Full client-side validation for the register form
  function validateFields() {
    clearErrors();
    message.textContent = "";
    message.style.color = "";

    let ok = true;
    let firstInvalid = null;

    // Required fields we want to enforce before showing the confirmation modal
    const required = ["firstName", "lastName", "dateOfBirth", "email", "password", "confirmPassword", "goal"];

    for (const name of required) {
      const el = fields[name];
      if (!el) continue;
      if (isEmpty(el.value)) {
        ok = false;
        if (!firstInvalid) firstInvalid = el;
        setError(el, "this field is required");
      }
    }

    // Email format check
    if (fields.email && !isEmpty(fields.email.value) && !isValidEmail(fields.email.value)) {
      ok = false;
      if (!firstInvalid) firstInvalid = fields.email;
      setError(fields.email, "Please enter a valid email address (eg. example@email.com)");
    }

    // Password strength check
    if (fields.password && !isEmpty(fields.password.value) && !strongPassword(fields.password.value)) {
      ok = false;
      if (!firstInvalid) firstInvalid = fields.password;
      setError(fields.password, "Password should be at least 10 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol");
    }

    // Confirm password must match
    if (
      fields.password &&
      fields.confirmPassword &&
      !isEmpty(fields.password.value) &&
      !isEmpty(fields.confirmPassword.value) &&
      fields.password.value !== fields.confirmPassword.value
    ) {
      ok = false;
      if (!firstInvalid) firstInvalid = fields.confirmPassword;
      setError(fields.confirmPassword, "Passwords do not match!!");
    }

    // Date of birth validation (must be valid date, and user must be 16+)
    if (fields.dateOfBirth && !isEmpty(fields.dateOfBirth.value)) {
      const dob = new Date(fields.dateOfBirth.value);
      if (Number.isNaN(dob.getTime())) {
        ok = false;
        if (!firstInvalid) firstInvalid = fields.dateOfBirth;
        setError(fields.dateOfBirth, "Invalid date");
      } else {
        const age = calcAge(dob);
        if (age < 16) {
          ok = false;
          if (!firstInvalid) firstInvalid = fields.dateOfBirth;
          setError(fields.dateOfBirth, "You must be at least 16 years old");
        }
      }
    }

    // Interests: at least one checkbox must be selected
    const interestsChecked = form.querySelectorAll('input[name="interests"]:checked');
    if (interestsChecked.length === 0) {
      ok = false;
      setGroupError(".form-section.interests .error", "Select at least one interest");
      if (!firstInvalid) firstInvalid = fields.firstName;
    }

    // Experience: one radio option must be selected
    const expChecked = form.querySelector('input[name="experience"]:checked');
    if (!expChecked) {
      ok = false;
      setGroupError(".form-section.recommendations .form .error", "Select your experience level");
      if (!firstInvalid) firstInvalid = form.querySelector('input[name="experience"]') || fields.firstName;
    }

    // If something failed, focus the first invalid field so the user knows where to start
    if (!ok && firstInvalid) firstInvalid.focus();
    return ok;
  }

  // Convert the form into the payload the backend expects
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

  // Save a draft of the form to localStorage (password intentionally excluded)
  function saveDraft() {
    const draft = { ...formToPayload(), password: undefined }; // don't store password
    localStorage.setItem(draftKey, JSON.stringify(draft));
  }

  // Restore saved draft data (so the user doesn’t lose progress on refresh)
  function restoreDraft() {
    const raw = localStorage.getItem(draftKey);
    if (!raw) return;
    try {
      const data = JSON.parse(raw);

      if (data.firstName) fields.firstName.value = data.firstName;
      if (data.lastName) fields.lastName.value = data.lastName;
      if (data.dateOfBirth) fields.dateOfBirth.value = data.dateOfBirth;
      if (data.gender) fields.gender.value = data.gender;
      if (data.occupation) fields.occupation.value = data.occupation;
      if (data.email) fields.email.value = data.email;
      if (data.goal) fields.goal.value = data.goal;

      // Restore interests checkboxes
      if (Array.isArray(data.interests)) {
        form.querySelectorAll('input[name="interests"]').forEach((cb) => (cb.checked = data.interests.includes(cb.value)));
      }

      // Restore experience radio selection
      if (data.experience) {
        form.querySelectorAll('input[name="experience"]').forEach((r) => (r.checked = r.value === data.experience));
      }
    } catch (e) {
      console.warn("Draft parse failed", e);
    }
  }

  // Auto-save draft while the user is typing/changing inputs
  form.addEventListener("input", saveDraft);
  form.addEventListener("change", saveDraft);
  restoreDraft();

  // Modal elements for previewing the form before sending to the server
  const modal = container.querySelector("#summaryModal");
  const summaryBox = container.querySelector("#summaryBox");
  const editBtn = container.querySelector("#editBtn");
  const confirmBtn = container.querySelector("#confirmBtn");

  // Escape HTML to safely render user input in the modal summary
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[m];
    });
  }

  // Build the human-readable summary inside the modal
  function showSummary(data) {
    const interests = (data.interests || []).join(", ") || "—";
    summaryBox.innerHTML = `
      <p><strong>Name:</strong> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</p>
      <p><strong>DOB:</strong> ${escapeHtml(data.dateOfBirth || "—")}</p>
      <p><strong>Gender:</strong> ${escapeHtml(data.gender || "—")}</p>
      <p><strong>Occupation:</strong> ${escapeHtml(data.occupation || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Interests:</strong> ${escapeHtml(interests)}</p>
      <p><strong>Experience:</strong> ${escapeHtml(data.experience)}</p>
      <p><strong>Goal:</strong> ${escapeHtml(data.goal)}</p>
    `;
  }

  // Open modal and move focus to the confirm button for accessibility
  function openModal() {
    modal.setAttribute("aria-hidden", "false");
    confirmBtn?.focus();
  }

  // Close modal and return focus back to the submit button
  function closeModal() {
    submitBtn?.focus();
    modal.setAttribute("aria-hidden", "true");
  }

  // We store the validated form payload here until the user clicks Confirm
  let pendingData = null;

  // If the user clicks Edit, we just close the modal and let them change inputs
  editBtn.addEventListener("click", closeModal);

  // Close modal when clicking on the dark overlay area
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    pendingData = formToPayload();
    showSummary(pendingData);
    openModal();
  });

  confirmBtn.addEventListener("click", async () => {
    if (!pendingData) return;

    try {
      await api.registerUser(pendingData);
      message.textContent = "✅ Registration successful";
      message.style.color = "green";
      localStorage.removeItem(draftKey);
      form.reset();
      pendingData = null;
    } catch (err) {
      // Show the server message if available (e.g. "Email already registered")
      const msg = typeof err?.message === "string" ? err.message : "Registration failed";
      message.textContent = msg;
      message.style.color = "red";
      console.error(err);
    } finally {
      closeModal();
    }
  });

  // Simple login form handler
  const loginMessage = container.querySelector("#loginMessage");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginMessage.textContent = "";
    loginMessage.style.color = "";

    const email = loginForm.querySelector("#loginEmail").value.trim();
    const password = loginForm.querySelector("#loginPassword").value;

    // Basic empty fields validation
    if (!email || !password) {
      loginMessage.textContent = "Please fill in all fields";
      loginMessage.style.color = "red";
      return;
    }

    try {
      const user = await api.loginUser({ email, password });
      localStorage.setItem("currentUser", JSON.stringify(user));
      loginMessage.textContent = " Login successful";
      loginMessage.style.color = "green";
      loginForm.reset();
    } catch (err) {
      loginMessage.textContent = " Login failed: invalid credentials";
      loginMessage.style.color = "red";
      console.error(err);
    }
  });
}