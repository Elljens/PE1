import { BASE_URL, accessToken, name } from "./utils.js";

const BlogPost_URL = `${BASE_URL}/blog/posts/${name}`;
const blogPostContainer = document.getElementById('blog-post-container');
const carousel = document.getElementById('carousel');

let allPosts = [];

async function fetchPosts() {
    const fetchOptions = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await fetch(BlogPost_URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }
        const json = await response.json();
        console.log(response);
        console.log(json);

        allPosts = json.data;

        localStorage.setItem('allPosts', JSON.stringify(json));

    }catch(error) {
        blogPostContainer.innerHTML = '<p>Could not load posts. Please try again later<P/>'
    }
};

function renderPosts(postsToRender) {
    blogPostContainer.innerHTML = '';

    if (postsToRender.length === 0) {
        blogPostContainer.innerHTML = '<p>No posts found</p>';
        return;
    }

    postsToRender.forEach((post) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = post.media.url;
        image.alt = post.media.alt;
        image.classList.add('index-image');

        const title = document.createElement('h3');
        title.textContent = post.title;

        const link = document.createElement('a');
        link.href = `./post/index.html?id=${post.id}`;
        link.classList.add('card-link');

        card.appendChild(image);
        card.appendChild(title);
        link.appendChild(card);

        blogPostContainer.appendChild(link);
    })
}

function renderCarousel(posts) {
    carousel.innerHTML = '';

    let currentSlide = 0;

    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-container')

    const dotContainer = document.createElement('div');
    dotContainer.classList.add('carousel-dots');

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('carousel-btn-prev');
    prevBtn.textContent = '❮';
    
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('carousel-btn-next');
    nextBtn.textContent = '❯';

    posts.forEach((post, index) => {

        const slide = document.createElement('div');
        slide.classList.add('slide');

        const link = document.createElement('a');
        link.href = `./post/index.html?id=${post.id}`;
        link.classList.add('carousel-link');

        const image = document.createElement('img');
        image.src = post.media.url || '';
        image.alt = post.media.alt || '';
        image.classList.add('carousel-image');

        const title = document.createElement('H2');
        title.textContent = post.title;

        link.appendChild(image);
        link.appendChild(title);

        slide.appendChild(link);
        carouselInner.appendChild(slide);


        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            goToSlide(index);
        });

        dotContainer.appendChild(dot);

    });

    carousel.appendChild(carouselInner);
    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);
    carousel.appendChild(dotContainer);

    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % posts.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + posts.length) % posts.length;
        updateCarousel();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    updateCarousel();

}


async function main () {
    await fetchPosts();

    const firstThreePosts = allPosts.slice(0, 3);
    const indexPosts = allPosts.slice(3);

    renderCarousel(firstThreePosts);
    renderPosts(indexPosts);
}

main();

