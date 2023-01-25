const form = document.querySelector('form');
const email = document.querySelector('input#email');
const emailError = document.querySelector('input#email+span.error');
const password = document.querySelector('input#password');
const passwordError = document.querySelector('input#password+span.error');
const confirmPassword = document.querySelector('input#confirmPassword');
const confirmPasswordError = document.querySelector('input#confirmPassword+span.error');
const country = document.querySelector('select#country');
const zip = document.querySelector('input#zip');
const zipError = document.querySelector('input#zip+span.error');
const submitButton = document.querySelector('form>div:last-child>button:first-child');
const clearButton = document.querySelector('form>div:last-child>button:last-child');
const constraints = {
    uppercase: [
        '[A-Z]+',
        'Passwords must contain at least one uppercase letter',
    ],
    lowercase: [
        '[a-z]+',
        'Passwords must contain at least one lowercase letter',
    ],
    number: [
        '[0-9]+',
        'Passwords must contain at least one number',
    ],
    numbers: [
        '[0-9]{5}',
        'Zip codes must only contain numbers',
    ],
    symbols: [
        '[^A-Za-z0-9]',
        'Passwords must contain at least one allowed symbol',
    ],
}

function clearInput() {
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    zip.value = '';
}

function showEmailError() {
    if (email.validity.valueMissing) {
        emailError.textContent = 'Please enter an email address';
    } else {
        emailError.textContent = 'Please enter the correct format';
    }
}

function showPasswordError () {
    if (password.validity.valueMissing) {
        passwordError.textContent = 'Please enter a password';
    } else if (password.validity.tooShort) {
        passwordError.textContent = 'Password must be a minimum of 8 characters';
    }
}

function showZipError() {
    console.log('zip error');
}

email.addEventListener('change', () => {
    if (!email.checkValidity()) {
        showEmailError();
    } else {
        emailError.textContent = '';
    }
});

password.addEventListener('change', () => {
    console.log('password');
});

confirmPassword.addEventListener('change', () => {
    console.log('confirm password');
});

zip.addEventListener('change', () => {
    console.log('zip');
});

submitButton.addEventListener('click', () => {
    if (form.checkValidity()) {
        alert(`Form accepted!\nEmail: ${email.value}\nPassword: ${password.value}\nCountry: ${country.value}\nZip: ${zip.value}`);
        clearInput();
    }
    else{
        if (!email.checkValidity()) {
            showEmailError();
        }
        if (!password.checkValidity() || !password.checkValidity()) {
            showPasswordError();
        }
        if (!zip.checkValidity()) {
            showZipError();
        }
    }
});

clearButton.addEventListener('click', clearInput);