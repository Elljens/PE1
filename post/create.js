import { BASE_URL, name, accessToken } from "../utils.js"
const createPost = document.querySelector('#create-post');

const newPost_URL = `${BASE_URL}/blog/posts/${name}`;

async function newBlogPost(userInput) {
    try {
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(userInput),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json',
            },
        };
        const response = await fetch(newPost_URL, fetchOptions);
        const result = await response.json();
        console.log(result);

        window.location.href = "../index.html";
        
    } catch (error) {
        console.log(error);
    }
}


function submittingPost(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const payload = {
        title: data.title,
        body: data.body,
        media: data['url']
        ? {
            url: data['url'],
            alt: data['alt']
        }
        : undefined
    };

    newBlogPost(payload);
};


createPost.addEventListener('submit', submittingPost);
