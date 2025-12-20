document.addEventListener("DOMContentLoaded" , () => {
    //get the registration form 
    const form = document.getElementById("registrationForm");
    if(!form) return;

    //modal elements for the preview step 
    const modal = document.getElementById("summaryModal");
    const summaryBox = document.getElementById("summaryBox");
    const editBtn = document.getElementById("editBtn");
    const confirmBtn = document.getElementById("confirmBtn");

    //Local storage keys 
    const draft = "registerDraft"; // autosaves form progress
    const final= "registrationData"; // confirmed registration data 

    // input elements 
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

    /*Error helpers*/

    //finds the .error element that belongs to the same .form as the input i 
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

    // set/remove an error message
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

    /*Validation helpers*/

    //check if a value is empty
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

    // form to object convertion
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

  // fill the form from a save object
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

/*draft save/restore */

//save current data as a draft
  function saveDraft() {
    const data = formToObject();
    localStorage.setItem(draft, JSON.stringify(data));
  }

  //restore draft if it exists
  function restoreDraft() {
    const raw = localStorage.getItem(draft);
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

  // restore draft 
  restoreDraft();

 //set error message for a section .error element 
  function setGroupError(selector, message) {
    const err = form.querySelector(selector);
    if (err) err.textContent = message || "";
  }

  //required fields 
    const required = [
        "firstName" , 
        "lastName",
        "dateOfBirth",
        "email",
        "password",
        "confirmPassword",
        "goal"
    ];

    // validate the form and shws error on screen
    function validateFields() {
        clearErrors();
        let accept = true;
        let firstInvalid = null;

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
            setGroupError(".form-section.recommendations .form:first-child .error", "Select your experience level");
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

   
    /*Modal */

    //temporary object that stires the validated form data draft 
    let pendingData = null;

    //open preview modal
    function openModal() {
        if (!modal) return;
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    //close preview modal
    function closeModal() {
        if (!modal) return;
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    // summary HTML inside modal
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

    // escape user-provided strings to prevent HTML injection
    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, (m) => {
        const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
        return map[m];
        });
    }

    // close modal when the user clicks outside the modal 
    modal?.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    //edit returns the user t the form 
    editBtn?.addEventListener("click", () => closeModal());

    //confirm saves the final data and clears draft
    confirmBtn?.addEventListener("click", () => {
        if (!pendingData) return;

        // save final data 
        localStorage.setItem(final, JSON.stringify(pendingData));
        // remove draft
        localStorage.removeItem(draft);

        closeModal();
        form.reset();
        pendingData = null;

        alert("Registration successful!");
    });

    /*Submit */
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateFields()) return;

        //prepare pending data from form
        pendingData = formToObject();

        // don't show passwords in summary
        delete pendingData.password;
        delete pendingData.confirmPassword;

        //show preview modal
        showSummary(pendingData);
        openModal();
    });
});