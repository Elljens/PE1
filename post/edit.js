import { BASE_URL, accessToken, name } from "../utils.js";

const editPost_URL = `${BASE_URL}/blog/posts/${name}`;

const form = document.querySelector("#edit-form");
const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const imageInput = document.querySelector("#url");
const imageAltInput = document.querySelector("#alt");
const deleteBtn = document.querySelector("#delete-button");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  alert("No post ID found");
}


const authHeaders = {
  Authorization: `Bearer ${accessToken}`,
};


async function fetchPostForEdit() {
  try {
    const response = await fetch(`${editPost_URL}/${id}`, {
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    const { data: post } = await response.json();

    titleInput.value = post.title;
    bodyInput.value = post.body;
    imageInput.value = post.media?.url || "";
    imageAltInput.value = post.media?.alt || "";

  } catch (error) {
    console.error(error);
    alert("Could not load post for editing");
  }
}

fetchPostForEdit();



form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const updatedPost = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
    media: {
      url: imageInput.value.trim(),
      alt: imageAltInput.value.trim(),
    },
  };

  try {
    const response = await fetch(`${editPost_URL}/${id}`, {
      method: "PUT",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    window.location.href = "../index.html";
    

  } catch (error) {
    console.error(error);
    alert("Could not update post");
  }
});




deleteBtn.addEventListener("click", async () => {
  const confirmed = confirm(
    "Are you sure you want to delete this post? This action cannot be undone."
  );

  if (!confirmed) return;

  try {
    const response = await fetch(`${editPost_URL}/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    window.location.href = "../index.html";

  } catch (error) {
    console.error(error);
    alert("Could not delete post");
  }
});



