import { BASE_URL, isLoggedIn } from "../utils.js"
const blogPost = document.querySelector('#blogPost');

const Post_URL = `${BASE_URL}/blog/posts/HenryDanger`;

let post = [];

async function fetchPostDetail() {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        const response = await fetch(`${Post_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }


        const json = await response.json();
        post = json.data;

        const postPage = document.createElement('div');
        postPage.classList.add('post-page');

        const image = document.createElement('img');
        image.src = post.media.url;
        image.alt = post.media.alt;
        image.classList.add('blog-image');

        const urlCopy = document.createElement('button');
        urlCopy.classList.add('url-link');
        urlCopy.innerHTML = '<i class="fa-sharp fa-solid fa-share-nodes"></i> Share post';

        const message = document.createElement('span');
        message.classList.add('message');

        const title = document.createElement('h1');
        title.textContent = post.title;
        title.classList.add('Post-title');

        const author = document.createElement('p');
        author.textContent = post.author.name;
        author.classList.add('author');

        const date = document.createElement('p');
        date.textContent = post.created;
        date.classList.add('date');

        const body = document.createElement('p');
        body.textContent = post.body;
        body.classList.add('main-text');

        const button = document.createElement('a');
        button.classList.add('back-button');
        button.textContent = 'Back to posts';
        button.href = '../index.html';

        const link = document.createElement('a');
        link.href = `./edit.html?id=${post.id}`;
        link.classList.add('edit-link');
        link.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit post';

        postPage.appendChild(urlCopy);
        postPage.appendChild(message);
        postPage.appendChild(title);
        postPage.appendChild(author);
        postPage.appendChild(date);
        postPage.appendChild(body);
        postPage.appendChild(button);
        postPage.appendChild(link);

        blogPost.appendChild(image);
        blogPost.appendChild(postPage);

        if (!isLoggedIn) {
            link.classList.add('hidden');
        }


        urlCopy.addEventListener("click", async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              message.textContent = "URL copied!";
              setTimeout(() => message.textContent = "", 2000);
            } catch (error) {
              message.textContent = "Failed to copy";
            }
          });

    }catch(error) {
        blogPost.innerHTML = '<p>Could not load posts. Please try again later<P/>'
    }
};


    async function main () {
        await fetchPostDetail();
    }
    
    main();




 