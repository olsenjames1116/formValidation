const form = document.querySelector('form');
const email = document.querySelector('input#email');
const password = document.querySelector('input#password');
const confirmPassword = document.querySelector('input#confirmPassword');
const country = document.querySelector('select#country');
const zip = document.querySelector('input#zip');
const submitButton = document.querySelector('form>div:last-child>button:first-child');
const clearButton = document.querySelector('form>div:last-child>button:last-child');
// Regex to check if there is at least one uppercase letter in a string
const uppercaseConstraint = new RegExp('[A-Z]+');
// Regex to check if there is at least one lowercase letter in a string
const lowercaseConstraint = new RegExp('[a-z]+');
// Regex to check if there is at least one number in a string
const numberConstraint = new RegExp('[0-9]+');
// Regex to check if a string only contains numbers and letters
const symbolConstraint = new RegExp('^[A-Za-z0-9]*$');
let error;

function clearInput() {
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    zip.value = '';
}

// Reached after a validity issue has been found in the email input
function showEmailError() {
    // Runs through all the possible validity issues and resets the validity if there are none
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

// Sets validity using regex on passwords and specifies the validity concern under the error variable
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
    } else if (symbolConstraint.test(password.value)) {
        error = 'symbol';
        return false;
    }

    error = '';
    return true;
}

// Reached after a validity issue has been found in the password input
function showPasswordError() {
    // Runs through all the possible validity issues and resets the validity if there are none
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

// Reached after a validity issue has been found in the password confirmation input
function showConfirmPasswordError() {
    confirmPassword.setCustomValidity('Passwords must match');
}

// Reached after a validity issue has been found in the zip input
function showZipError() {
    // Runs through all the possible validity issues and resets the validity if there are none
    if (zip.validity.valueMissing) {
        zip.setCustomValidity('Please enter a zip code');
    } else if (zip.validity.tooShort) {
        zip.setCustomValidity('Zip code must be 5 digits');
    } else if (zip.validity.patternMismatch) {
        zip.setCustomValidity('Zip code must only contain numbers');
    } else {
        zip.setCustomValidity('');
    }

    zip.reportValidity()
}

// After every time the user enters something into the email input, validity will be checked and reported
email.addEventListener('input', () => {
    if (!email.checkValidity()) {
        showEmailError();
    }
});

// After every time the user enters something into the password input, validity will be checked and reported
password.addEventListener('input', () => {
    if (!validateConstraint() || !password.checkValidity()) {
        showPasswordError();
    }
});

// After every time the user enters something into the password confirmation input, validity will be checked and reported
confirmPassword.addEventListener('input', () => {
    if (password.value !== confirmPassword.value) {
        showConfirmPasswordError();
    } else {
        confirmPassword.setCustomValidity('');
    }

    confirmPassword.reportValidity();
});

// After every time the user enters something into the zip input, validity will be checked and reported
zip.addEventListener('input', () => {
    if (!zip.checkValidity()) {
        showZipError();
    }
});

// Checks for validity across the form and identifies where the validity concern is if there is one
submitButton.addEventListener('click', () => {
    if (form.checkValidity()) {
        // Reached if all validity has been checked and confirmed
        alert(`Form accepted!\nEmail: ${email.value}\nPassword: ${password.value}\nCountry: ${country.value}\nZip: ${zip.value}`);
        clearInput();
    }
    else{
        // Identify where the validity concern is
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