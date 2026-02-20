import { addToLocalStorage, BASE_URL, isLoggedIn } from "../utils.js"
const loginForm = document.querySelector('#login-form');
const successBox = document.querySelector('.success-box');
const failBox = document.querySelector('.fail-box');

const Login_URL = `${BASE_URL}/auth/login`;

async function loginUser(userDetails) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userDetails),
            headers: {
                'Content-type': 'application/json',
            },
        };

        const response = await fetch(Login_URL, fetchOptions);
        const json = await response.json();

    if (response.ok) {
        const accessToken = json.data.accessToken;
        const name = json.data.name;
        const isLoggedIn = response.ok;

        addToLocalStorage('name', name);
        addToLocalStorage('accessToken', accessToken);
        addToLocalStorage('isLoggedIn', isLoggedIn);

        successBox.classList.add('active');

        console.log(json);
        console.log(response);

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
    loginUser(formFields);
}

loginForm.addEventListener('submit', submittingForm);