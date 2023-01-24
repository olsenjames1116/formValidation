const email = document.querySelector('input#email');
const password = document.querySelector('input#password');
const confirmPassword = document.querySelector('input#confirmPassword');
const country = document.querySelector('select#country');
const zip = document.querySelector('input#zip');
const submitButton = document.querySelector('form>div:last-child>button:first-child');
const clearButton = document.querySelector('form>div:last-child>button:last-child');


function clearInput() {
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    zip.value = '';
}

function showEmailError() {
    console.log('email error');
}

function showPasswordError () {
    console.log('password error');
}

function showZipError() {
    console.log('zip error');
}

email.addEventListener('change', () => {
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
    if (email.checkValidity() && password.checkValidity() && confirmPassword.checkValidity() && zip.checkValidity()) {
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