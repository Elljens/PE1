export function addToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}

export const BASE_URL = 'https://v2.api.noroff.dev';

export const accessToken = getFromLocalStorage('accessToken');
export const name = getFromLocalStorage('name');
export const id = getFromLocalStorage('id');
export const post = getFromLocalStorage('allPosts');
export const isLoggedIn = getFromLocalStorage('isLoggedIn');

export const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGVucnlEYW5nZXIiLCJlbWFpbCI6IkhlbnJ5X2RhbmdlckBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc3MTQ4ODA5NH0.PWn41Sw_mig5eDnGl009zBW3oqMRjjIzJNVeMYBawPY'
