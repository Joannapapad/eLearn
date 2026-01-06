import { api } from "/src/services/api.service.js";

export function loadRegister(container) {
  container.innerHTML = `
   <main class=" form-container">
    <div class="background-image">

        <p id="message" role="status" aria-live="polite"></p>
        <form class="registration-form" id="register-form" novalidate>
            <fieldset class="form-section personal-details">
                <legend class="title">Personal Details</legend>

                <div class="form">
                    <label for="firstName">First Name : </label>
                    <input id="firstName" name="firstName" type="text" required minlength="2" placeholder="Yout First Name" autocomplete="given-name"/>
                    <small class="error" aria-live="polite"></small>
                </div>

                <div class="form">
                    <label for="lastName">Last Name : </label>
                    <input id="lastName" name="lastName" type="text" required minlength="2" placeholder="Yout Last Name" autocomplete="family-name"/>
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
                    pattern= "(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{10,}" title="At least 10 chars , 1 uppercase, 1 lowercase, 1 number, 1 symbol"
                    placeholder="Enter Yout Password" autocomplete="new-password"/>
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
                <legend class="title">Intersts </legend>

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
                <button class="btn-primary" type="submit">
                    Register Now
                </button>
            </div>
            <p id="message" role="status" aria-live="polite"></p>
        </form>

    </div>
</main>

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

  const form = container.querySelector("#register-form");
  
  const message = container.querySelector("#message");

  const fields = {
    firstName : form.querySelector("#firstName"),
    lastName: form.querySelector("#lastName"),
    dateOfBirth: form.querySelector("#dateOfBirth"),
    gender: form.querySelector("#gender"),
    occupation: form.querySelector("#occupation"),
    email: form.querySelector("#email"),
    password: form.querySelector("#password"),
    confirmPassword: form.querySelector("#confirmPassword"),
    goal: form.querySelector("#goal"),
  };

  const draftKey = "registerDraft";

  function getError(i) {
    if(!i) 
      return null;
      const wrapper = i.closest(".form");
    if(!wrapper)
      return null;
      const error = wrapper.querySelector(".error");
    if(error){
        return error;
    }else{
        return null;
    }
  }

  function setError(i,mess) {
    const err = getError(i);
    if(err) 
        err.textContent = mess || "";
    if(mess){
        i.classList.add("is-invalid");
    }else{
        i.classList.remove("is-invalid");

    }
}

//clear all errors 
  function clearErrors(){
      Object.values(fields).forEach((element) => element && setError(element,""));
      const interestErr= form.querySelector(".form-section.interests .error");
      if(interestErr)
          interestErr.textContent="";
      const expErr= form.querySelectorAll(".form-section.recommendations .error").forEach(e=>(e.textContent=""));
  }

  function isEmpty(value){
    return value==null || String(value).trim() ==="";
  }

  //email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  //pasword strength
  function strongPassword(pass) {
    const len = pass.length >=10;
    const upper = /[A-Z]/.test(pass);
    const lower = /[a-z]/.test(pass);
    const num = /[0-9]/.test(pass);
    const symbol = /[^a-zA-Z0-9]/.test(pass);
    return len && upper && lower && num && symbol;
  }

  // calculate age from data object
  function calcAge(date){
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();

    if(m< 0 || (m === 0 && today.getDate() < date.getDate()))
        age--;
    return age;
  }

   //set error message for a section .error element 
   function setGroupError(selector, message) {
    const err = form.querySelector(selector);
    if (err) err.textContent = message || "";
  }

  function getInterests() {
    return Array.from(form.querySelectorAll('input[name="interests"]:checked'))
      .map((cb) => cb.value);
  }

  function getExperience() {
    return form.querySelector('input[name="experience"]:checked')?.value || "";
  }
  

  function validateFields() {
    clearErrors();
    message.textContent = "";
    message.style.color = "";

    let accept = true;
    let firstInvalid = null;

    const required = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "email",
      "password",
      "confirmPassword",
      "goal",
    ];

    //required fields check 
    for(const fieledName of required) {
        const element = fields[fieledName];

        if(!element) continue;

        if(isEmpty(element.value)) {
            accept = false;
            if(!firstInvalid) 
                firstInvalid = element;
            setError(element , "this field is required");
        }
    }

    //email format check
    if( fields.email && !isEmpty(fields.email.value) && !isValidEmail(fields.email.value)) {
        accept = false;
        if(!firstInvalid) 
            firstInvalid = fields.email;
        setError(fields.email , "Please enter a valid email addres (eg. example@email.com");
    }

    //password strength check
    if(fields.password && !isEmpty(fields.password.value) && !strongPassword(fields.password.value)) {
        accept = false;
        if(!firstInvalid) 
            firstInvalid = fields.password;
        setError(fields.password , "Password should be at least 10 characters, 1 lowercase , 1 uppercase, 1 number and 1 symbol");
    }

    //password match check
    if( fields.password && fields.confirmPassword && !isEmpty(fields.password.value) && !isEmpty(fields.confirmPassword.value) && fields.password.value!== fields.confirmPassword.value ) {
        accept = false;
        if(!firstInvalid) 
            firstInvalid = fields.confirmPassword;
        setError(fields.confirmPassword , "Passwords do not match!!");

    }

    //age check 
   if (fields.dateOfBirth && !isEmpty(fields.dateOfBirth.value)) {
        const dob = new Date(fields.dateOfBirth.value);
        if (Number.isNaN(dob.getTime())) {
            accept = false;
            if (!firstInvalid) firstInvalid = fields.dateOfBirth;
            setError(fields.dateOfBirth, "Invalid date");
        } else {
            const age = calcAge(dob);
            if (age < 16) {
            accept = false;
            if (!firstInvalid) firstInvalid = fields.dateOfBirth;
            setError(fields.dateOfBirth, "You must be at least 16 years old");
            }
        }
    }

    //interests checkbox required
    const interestsChecked = form.querySelectorAll('input[name="interests"]:checked');
    if (interestsChecked.length === 0) {
        accept = false;
        setGroupError(".form-section.interests .error", "Select at least one interest");
        if (!firstInvalid && fields.firstName) firstInvalid = fields.firstName; 
    }

    // experience radio required
    const expChecked = form.querySelector('input[name="experience"]:checked');
    if (!expChecked) {
        accept = false;
        // the first .error inside recommendations corresponds to that section
        setGroupError(".form-section.recommendations .form .error", "Select your experience level");
        if (!firstInvalid) {
            // focus first radio if exists
            const firstRadio = form.querySelector('input[name="experience"]');
            if (firstRadio) firstInvalid = firstRadio;
        }
    }


    // focus the first invalid field
    if(!accept && firstInvalid) 
        firstInvalid.focus();
    return accept;
  }

  function formToPayload() {

    return {
      firstName: fields.firstName.value.trim(),
      lastName: fields.lastName.value.trim(),
      dateOfBirth: fields.dateOfBirth.value,
      gender: fields.gender.value || undefined,
      occupation: fields.occupation.value?.trim() || undefined,
      interests: getInterests(),          // ✅ σωστό
      experience: getExperience(),        // ✅ σωστό
      goal: fields.goal.value,
      email: fields.email.value.trim(),
      password: fields.password.value,
    };
  }

  function saveDraft() {
    const draft = {
      ...formToPayload() ,
      // ΜΗΝ αποθηκεύεις password σε localStorage για ασφάλεια
      password: undefined,
    };
    localStorage.setItem(draftKey, JSON.stringify(draft));
  }

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

      // interests
      if (Array.isArray(data.interests)) {
        form.querySelectorAll('input[name="interests"]').forEach((cb) => {
          cb.checked = data.interests.includes(cb.value);
        });
      }

      // experience
      if (data.experience) {
        form.querySelectorAll('input[name="experience"]').forEach((r) => {
          r.checked = r.value === data.experience;
        });
      }
    } catch (e) {
      console.warn("Draft parse failed", e);
    }
  }


const modal = container.querySelector("#summaryModal");
const summaryBox = container.querySelector("#summaryBox");
const editBtn = container.querySelector("#editBtn");
const confirmBtn = container.querySelector("#confirmBtn");

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[m];
  });
}

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

  function openModal() {
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    // move focus out of the modal before hiding
    document.activeElement?.blur();
    modal.setAttribute("aria-hidden", "true");
    // optionally focus the message banner so SRs announce it
    message?.focus();
  }
  

  let pendingData = null;

  editBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // ✅ ΜΟΝΟ ΕΝΑ submit: ανοίγει modal, δεν κάνει register
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    pendingData = formToPayload();
    showSummary(pendingData);
    openModal();
  });

  // ✅ ΜΟΝΟ confirm κάνει register
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
      message.textContent = "❌ Registration failed";
      message.style.color = "red";
      console.error(err);
    } finally {
      closeModal();
    }
  });
}