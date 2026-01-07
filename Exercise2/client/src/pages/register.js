import { api } from "/src/services/api.service.js";

export function loadRegister(container) {
  container.innerHTML = `
    <main class="form-container">
      <div class="background-image">
        

        <div class="auth-card">
        <div class="auth-toggle">
          <button id="showRegisterBtn" class="active">Register</button>
          <button id="showLoginBtn">Login</button>
        </div>
      
        <form id="register-form" class="auth-form">
          <fieldset class="form-section personal-details">
            <legend class="title">Personal Details</legend>
            <div class="form">
              <label for="firstName">First Name : </label>
              <input id="firstName" name="firstName" type="text" required minlength="2" placeholder="Your First Name" autocomplete="given-name"/>
              <small class="error" aria-live="polite"></small>
            </div>
            <div class="form">
              <label for="lastName">Last Name : </label>
              <input id="lastName" name="lastName" type="text" required minlength="2" placeholder="Your Last Name" autocomplete="family-name"/>
              <small class="error" aria-live="polite"></small>
            </div>
            <div class="form">
              <label for="dateOfBirth">Date Of Birth : </label>
              <input id="dateOfBirth" name="dateOfBirth" type="date" required/>
              <small class="error" aria-live="polite"></small>
            </div>
            <div class="form">
              <label for="occupation">Occupation : </label>
              <input id="occupation" name="occupation" type="text" placeholder="Enter Your Occupation" autocomplete="organization-title"/>
              <small class="error" aria-live="polite"></small>
            </div>
            <div class="form">
              <label for="gender">Gender : </label>
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
              <label for="email">Email : </label>
              <input id="email" name="email" type="email" inputmode="email" required autocomplete="email" placeholder="ex. example@email.com"/>
              <small class="error" aria-live="polite"></small>
            </div>
            <div class="form">
              <label for="password">Password : </label>
              <input id="password" name="password" type="password" required minlength="10" 
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{10,}" 
                title="At least 10 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol" 
                placeholder="Enter Your Password" autocomplete="new-password"/>
              <small class="error" aria-live="polite"></small>
            </div>
            <div class="form">
              <label for="confirmPassword">Confirm Password : </label>
              <input id="confirmPassword" name="confirmPassword" type="password" required minlength="10" placeholder="Re-enter Your Password"
              autocomplete="new-password"/>
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
              <label for="goal">Goal </label>
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

          <form id="login-form" class="auth-form hidden">
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
      
    </main>

      <!-- Modal for Register -->
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



  const draftKey = "registerDraft";

  /** ------------------ TOGGLE LOGIN / REGISTER ------------------ **/
  const showRegisterBtn = container.querySelector("#showRegisterBtn");
  const showLoginBtn = container.querySelector("#showLoginBtn");
  const registerForm = container.querySelector("#register-form");
  const loginForm = container.querySelector("#login-form");
  
  showRegisterBtn.addEventListener("click", () => {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    showRegisterBtn.classList.add("active");
    showLoginBtn.classList.remove("active");
  });
  
  showLoginBtn.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    showLoginBtn.classList.add("active");
    showRegisterBtn.classList.remove("active");
  });
  
  
  /** ------------------ REGISTRATION LOGIC ------------------ **/
  // --- keep all your validation, modal, draft, showSummary, etc --- 
  // copy all your functions: getError, setError, clearErrors, isEmpty, isValidEmail, strongPassword, calcAge, setGroupError, getInterests, getExperience, validateFields, formToPayload, saveDraft, restoreDraft, modal, summaryBox, editBtn, confirmBtn, openModal, closeModal, pendingData, event listeners...
  // ⚠️ This part remains exactly as your original code, just inside this function scope

  /** ------------------ LOGIN LOGIC ------------------ **/
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginMessage.textContent = "";
    loginMessage.style.color = "";

    const email = loginForm.querySelector("#loginEmail").value.trim();
    const password = loginForm.querySelector("#loginPassword").value;

    if (!email || !password) {
      loginMessage.textContent = "Please fill in all fields";
      loginMessage.style.color = "red";
      return;
    }

    try {
      const user = await api.loginUser({ email, password });
    
      // Save user for enrollment
      localStorage.setItem("currentUser", JSON.stringify(user));
    
      loginMessage.textContent = " Login successful";
      loginMessage.style.color = "green";
      console.log("Logged in user:", user);
    
      loginForm.reset();
    } catch (err) {
      loginMessage.textContent = " Login failed: invalid credentials";
      loginMessage.style.color = "red";
      console.error(err);
    }
    
  });
}
