document.addEventListener("DOMContentLoaded" , () => {
    const form = document.getElementById("registrationForm");
    if(!form) return;

    const modal = document.getElementById("summaryModal");
    const summaryBox = document.getElementById("summaryBox");
    const editBtn = document.getElementById("editBtn");
    const confirmBtn = document.getElementById("confirmBtn");

    const DRAFT_KEY = "registerDraft";
    const FINAL_KEY= "registrationData";

    const fields = {
        firstName : document.getElementById("firstName"),
        lastName:document.getElementById("lastName"),
        dateOfBirth: document.getElementById("dateOfBirth"),
        occupation: document.getElementById("occupation"),
        gender: document.getElementById("gender"),
        email:document.getElementById("email"),
        password: document.getElementById("password"),
        confirmPassword:document.getElementById("confirmPassword"),
        goal:document.getElementById("goal")
    };

    function getError(i) {
        if(!i) 
            return null;
        const forms = i.closest(".form");
        if(!forms)
            return null;
        const error = forms.querySelector(".error");
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

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function strongPassword(pass) {
        const len = pass.length >=10;
        const upper = /[A-Z]/.test(pass);
        const lower = /[a-z]/.test(pass);
        const num = /[0-9]/.test(pass);
        const symbol = /[^a-zA-Z0-9]/.test(pass);
        return len && upper && lower && num && symbol;
    }

    function calcAge(date){
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const m = today.getMonth() - date.getMonth();

        if(m< 0 || (m === 0 && today.getDate() < date.getDate()))
            age--;
        return age;
    }

    function formToObject() {
        const fd = new FormData(form);
        const obj = {};

        for (const [k, v] of fd.entries()) {
        if (k === "interests") {
            obj.interests = obj.interests || [];
            obj.interests.push(v);
        } else {
            obj[k] = v;
        }
        }

        return obj;
  }

  function fillForm(data) {
    if (!data || typeof data !== "object") return;

    // basic named elements
    for (const [k, v] of Object.entries(data)) {
      if (k === "interests") continue;

      const els = form.querySelectorAll(`[name="${k}"]`);
      if (!els.length) continue;

      const first = els[0];

      // radios
      if (first.type === "radio") {
        els.forEach(r => (r.checked = r.value === v));
      } else {
        // input/select
        if (first instanceof HTMLInputElement || first instanceof HTMLSelectElement) {
          first.value = v;
        }
      }
    }

    // interests checkboxes
    if (Array.isArray(data.interests)) {
      form.querySelectorAll(`input[name="interests"]`).forEach(cb => {
        cb.checked = data.interests.includes(cb.value);
      });
    }
  }

  // ---- Draft save/restore ----
  function saveDraft() {
    const data = formToObject();
    // don't store confirm password if you want (optional). We'll keep it simple:
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  }

  function restoreDraft() {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      fillForm(data);
    } catch (e) {
      console.warn("Draft parse failed", e);
    }
  }

  // autosave as user types
  form.addEventListener("input", saveDraft);
  form.addEventListener("change", saveDraft);

  // restore on load
  restoreDraft();

  // ---- Group error helper (interests, experience) ----
  function setGroupError(selector, message) {
    const err = form.querySelector(selector);
    if (err) err.textContent = message || "";
  }

    const required = [
        "firstName" , 
        "lastName",
        "dateOfBirth",
        "email",
        "password",
        "confirmPassword",
        "goal"
    ];

    function validateFields() {
        clearErrors();
        let accept = true;
        let firstInvalid = null;

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

        if( fields.email && !isEmpty(fields.email.value) && !isValidEmail(fields.email.value)) {
            accept = false;
            if(!firstInvalid) 
                firstInvalid = fields.email;
            setError(fields.email , "Please enter a valid email addres (eg. example@email.com");
        }

        if(fields.password && !isEmpty(fields.password.value) && !strongPassword(fields.password.value)) {
            accept = false;
            if(!firstInvalid) 
                firstInvalid = fields.password;
            setError(fields.password , "Password should be at least 10 characters, 1 lowercase , 1 uppercase, 1 number and 1 symbol");
        }

        if( fields.password && fields.confirmPassword && !isEmpty(fields.password.value) && !isEmpty(fields.confirmPassword.value) && fields.password.value!== fields.confirmPassword.value ) {
            accept = false;
            if(!firstInvalid) 
                firstInvalid = fields.confirmPassword;
            setError(fields.confirmPassword , "Passwords do not match!!");

        }

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

        const interestsChecked = form.querySelectorAll('input[name="interests"]:checked');
        if (interestsChecked.length === 0) {
            accept = false;
            setGroupError(".form-section.interests .error", "Select at least one interest");
            if (!firstInvalid && fields.firstName) firstInvalid = fields.firstName; // fallback focus
        }

        // experience radio required
        const expChecked = form.querySelector('input[name="experience"]:checked');
        if (!expChecked) {
            accept = false;
            // the first .error inside recommendations corresponds to that section
            setGroupError(".form-section.recommendations .form:first-child .error", "Select your experience level");
            if (!firstInvalid) {
                // focus first radio if exists
                const firstRadio = form.querySelector('input[name="experience"]');
                if (firstRadio) firstInvalid = firstRadio;
            }
        }



        if(!accept && firstInvalid) 
            firstInvalid.focus();
        return accept;
    }

    fields.email?.addEventListener("blur" , () => {
        if(isEmpty(fields.email.value))
            return setError(fields.email,"");
        setError(fields.email , isValidEmail(fields.email.value) ? "" : "Invalid email format");
    });

    fields.confirmPassword?.addEventListener("blur" , () => {
        if(isEmpty(fields.confirmPassword.value))
            return setError(fields.confirmPassword,"");
        setError(fields.confirmPassword , fields.password.value === fields.confirmPassword.value ? "" : "Passwords do not match");
    });

        
    // ---- Modal open/close + summary ----
    let pendingData = null;

    function openModal() {
        if (!modal) return;
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) return;
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function showSummary(data) {
        if (!summaryBox) return;

        const interests = (data.interests || []).join(", ") || "—";

        summaryBox.innerHTML = `
        <p><strong>Name:</strong> ${escapeHtml(data.firstName || "")} ${escapeHtml(data.lastName || "")}</p>
        <p><strong>DOB:</strong> ${escapeHtml(data.dateOfBirth || "—")}</p>
        <p><strong>Gender:</strong> ${escapeHtml(data.gender || "—")}</p>
        <p><strong>Occupation:</strong> ${escapeHtml(data.occupation || "—")}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email || "—")}</p>
        <p><strong>Interests:</strong> ${escapeHtml(interests)}</p>
        <p><strong>Experience:</strong> ${escapeHtml(data.experience || "—")}</p>
        <p><strong>Goal:</strong> ${escapeHtml(data.goal || "—")}</p>
        `;
    }

    // simple HTML escape to avoid injecting raw user text
    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, (m) => {
        const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
        return map[m];
        });
    }

    // close modal on click outside the content
    modal?.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    editBtn?.addEventListener("click", () => closeModal());

    confirmBtn?.addEventListener("click", () => {
        if (!pendingData) return;

        // save final
        localStorage.setItem(FINAL_KEY, JSON.stringify(pendingData));
        // clear draft
        localStorage.removeItem(DRAFT_KEY);

        closeModal();
        form.reset();
        pendingData = null;

        alert("Registration successful!");
    });

    // ---- Submit handler: validate -> show preview modal ----
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateFields()) return;

        pendingData = formToObject();
        // don't show passwords in summary
        delete pendingData.password;
        delete pendingData.confirmPassword;

        showSummary(pendingData);
        openModal();
    });
});