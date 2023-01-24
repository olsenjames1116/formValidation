const email = document.querySelector('input#email');
const password = document.querySelector('input#password');
const confirmPassword = document.querySelector('input#confirmPassword');
const zip = document.querySelector('input#zip');
const clearButton = document.querySelector('form>div:last-child>button:last-child');


function clearInput() {
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    zip.value = '';
}


clearButton.addEventListener('click', clearInput);