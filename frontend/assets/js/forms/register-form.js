document.addEventListener("DOMContentLoaded" , () => {
    const form = document.getElementById("registrationForm");
    if(!form) return;

    const fields = {
        firstName : document.getElementById("firstName"),
        lastName:document.getElementById("lastName"),
        dateOfBirth: document.getElementById("dateOfBirth"),
        occupation: document.getElementById("occupation"),
        gender: document.getElementById("gender"),
        email:document.getElementById("email"),
        password: document.getElementById("password"),
        confirmPassword:document.getElementById("confirmPassword")
    };

    function getError(i) {
        if(!i) 
            return null;
        

        const forms = i.closet(".form");

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
            err.textContent = message || "";
        if(message){
            i.classList.add("is-invalid");
        }else{
            i.classList.remove("is-invalid");

        }
    }

    function clearErrors(){
        Object.values(fields).forEach((element) => element && setError(element,""));
    }

    function isEmpty(value){
        return !value || value.trim();
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function strongPassword(pass) {
        const len = pass.length >=8;
        const upper = /[A-Z]/.test(pass);
        const lower = /[a-z]/.test(pass);
        const num = /[0-9]/.test(pass);
        const symbol = /[^a-zA-Z0-0]/.test(pass);
        return len && upper && lower && num && symbol;
    }

    // ENTER ALSO THE DATE CHECK
    
})