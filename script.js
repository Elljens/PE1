const registerForm = document.querySelector('#register-form');

const BASE_URL = 'https://v2.api.noroff.dev';
const Register_URL = `${BASE_URL}/auth/register`;

async function registerUser(userDetails) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-type': 'application/json',
            },
        };
        const response = await fetch(Register_URL, fetchOptions);
    } catch (error) {

    }
}


function submittingForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);
    registerUser(formFields);
}

registerForm.addEventListener('submit', submittingForm);