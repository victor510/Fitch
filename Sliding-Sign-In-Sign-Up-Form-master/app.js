const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Validating....');
    checkInputs();
});


// flags for Login
let emailConfirmed, pwdConfirmed, nameConfirmed = false;

function checkInputs() {

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('Password');

    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const emailValue = email.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccessFor(username);
        nameConfirmed = true
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
        emailConfirmed = true
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else {
        setSuccessFor(password);
        pwdConfirmed = true;
    }
    console.log(password, passwordValue)

    if (nameConfirmed && emailConfirmed && pwdConfirmed) {
        let userData = {
            emailValue,
            usernameValue,
            passwordValue
        }
        localStorage.setItem(emailValue, JSON.stringify(userData))

        alert(`Congratulations ${usernameValue}, You are now registered`);
        location.href = '../Home/index.html'
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'input-field error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'input-field success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


// Login Logic
const Loginform = document.getElementById("loginForm")

Loginform.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Signing in....');
    const emailLogin = document.getElementById("emailLogin");
    const passwordLogin = document.getElementById("passwordLogin");
    const popUp = document.getElementById('popUp');
    const popUpUsername = document.getElementById('welcomeMessage')

    const emailLoginValue = emailLogin.value.trim();
    const passwordLoginValue = passwordLogin.value.trim();

    const validEmail = JSON.parse(localStorage.getItem(emailLoginValue));
    // console.log(validEmail)
    if (validEmail == null) {
        alert("Sorry, The user name you entered appears to have a problem 😢");
        Loginform.reset();
    } else {
        const validPassword = validEmail.passwordValue;
        console.log(validPassword)
        if (validPassword == passwordLoginValue) {
            popUp.classList.add('show')
            popUpUsername.innerHTML = `🎉🎉 </br>We missed you </br> ${validEmail.usernameValue} `
            setInterval(() => {
                popUp.classList.remove('show');
                location.href = '../Home/index.html'
            }, 5000)

        } else {
            alert('Incorrect Password')
            Loginform.reset();
        }
    }

});