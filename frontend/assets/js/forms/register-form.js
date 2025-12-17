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
    }

    function isEmpty(value){
        return value==null || value.trim() ==="";
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

    // ENTER ALSO THE DATE CHECK

    const required = [
        "firstName" , 
        "lastName",
        "dateOfBirth",
        "email",
        "password",
        "confirmPassword"
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

        
    form.addEventListener("submit" , (e) => {
        e.preventDefault();

        if(!validateFields())
            return;

        const data = Object.fromEntries(new FormData(form).entries());
        localStorage.setItem("registrationData" , JSON.stringify(data));

        alert("Registration successfull!");
        form.reset();
    });
});