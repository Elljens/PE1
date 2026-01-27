import { getFromLocalStorage } from "./basics.js";

const blogPostContainer = document.getElementById('blog-post-container');

const BASE_URL = 'https://v2.api.noroff.dev';
const BlogPost_URL = `${BASE_URL}/blog/posts/<name>`;

async function fetchPosts() {
    try {
        const accessToken = getFromLocalStorage('accessToken');
        console.log(accessToken);
        const fetchOptions = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await fetch(BlogPost_URL, fetchOptions);
        const json = await response.json();
        console.log(response);
        console.log(json);
    }catch(error) {

    }
}

function main () {
    fetchPosts();
}

main();