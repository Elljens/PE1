import { BASE_URL } from "../utils.js"
const registerForm = document.querySelector('#register-form');
const successBox = document.querySelector('.success-box');
const failBox = document.querySelector('.fail-box');

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

            if (response.ok) {
                successBox.classList.add('active');
        
            } else {
                failBox.classList.add('active');
                
            }

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