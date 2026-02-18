import { name } from "../utils.js";

const welcomeUser = document.querySelector('.welcome-user');

welcomeUser.innerHTML = `<i class="fa-solid fa-circle-user fa-3x"></i><br>Welcome ${name}!`