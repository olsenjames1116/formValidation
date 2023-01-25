const form = document.querySelector('form');
const email = document.querySelector('input#email');
const password = document.querySelector('input#password');
const confirmPassword = document.querySelector('input#confirmPassword');
const country = document.querySelector('select#country');
const zip = document.querySelector('input#zip');
const submitButton = document.querySelector('form>div:last-child>button:first-child');
const clearButton = document.querySelector('form>div:last-child>button:last-child');
const uppercaseConstraint = new RegExp('[A-Z]+');
const lowercaseConstraint = new RegExp('[a-z]+');
const numberConstraint = new RegExp('[0-9]+');
const symbolConstraint = new RegExp('^[A-Za-z0-9]*$');
const zipConstraint = new RegExp('[0-9]{5}');
let error;

function clearInput() {
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    zip.value = '';
}

function showEmailError() {
    if (email.validity.valueMissing) {
        email.setCustomValidity('Please enter an email address')
    } else if (email.validity.typeMismatch) {
        email.setCustomValidity('Please enter an email address in the following format: name@website.com');
    }
    else {
        email.setCustomValidity('');
    }

    email.reportValidity();
}

function validateConstraint() {
    if (!uppercaseConstraint.test(password.value)) {
        error = 'uppercase';
        return false;
    } else if (!lowercaseConstraint.test(password.value)) {
        error = 'lowercase';
        return false;
    } else if (!numberConstraint.test(password.value)) {
        error = 'number';
        return false;
    } else if (symbolConstraint.test(password.value)){
        error = 'symbol';
        return false;
    }

    error = '';
    return true;
}

function showPasswordError() {
    if (password.validity.valueMissing) {
        password.setCustomValidity('Please enter a password');
    } else if (password.validity.tooShort) {
        password.setCustomValidity('Password must be a minimum of 8 characters');
    } else if (error === 'uppercase') {
        password.setCustomValidity('Passwords must include at least one uppercase letter');
    } else if (error === 'lowercase') {
        password.setCustomValidity('Passwords must include at least one lowercase letter');
    } else if (error === 'number') {
        password.setCustomValidity('Passwords must include at least one number');
    } else if (error === 'symbol') {
        password.setCustomValidity('Passwords must include at least one of the following symbols: ~`! @#$%^&*()_-+={[}]|\:;"\'<,>.?/');
    } else {
        password.setCustomValidity('');
    }

    password.reportValidity();
}

function showConfirmPasswordError() {
    confirmPassword.setCustomValidity('Passwords must match');
}

function showZipError() {

}

email.addEventListener('input', () => {
    if (!email.checkValidity()) {
        showEmailError();
    }
});

password.addEventListener('input', () => {
    if (!validateConstraint() || !password.checkValidity()) {
        showPasswordError();
    }
});

confirmPassword.addEventListener('input', () => {
    if (password.value !== confirmPassword.value) {
        showConfirmPasswordError();
    } else {
        confirmPassword.setCustomValidity('');
    }

    confirmPassword.reportValidity();
});

zip.addEventListener('change', () => {
    showZipError();
});

submitButton.addEventListener('click', () => {
    if (form.checkValidity()) {
        alert(`Form accepted!\nEmail: ${email.value}\nPassword: ${password.value}\nCountry: ${country.value}\nZip: ${zip.value}`);
        clearInput();
    }
    else{
        if (!email.checkValidity()) {
            showEmailError();
        } else if (!validateConstraint() || !password.checkValidity()) {
            showPasswordError();
        } else if (password.value !== confirmPassword.value) {
            showConfirmPasswordError();
        }
        else if (!zip.checkValidity()) {
            showZipError();
        }
    }
});

clearButton.addEventListener('click', clearInput);