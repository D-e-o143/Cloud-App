let posts = [];

function createPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;
    const id = Date.now(); // Unique ID for each post

    if (title && content && author) {
        const post = { id, title, content,author };
        posts.push(post);
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('author').value = '';
        displayPosts();
    } else {
        alert('Please fill in both fields');
    }
}

function displayPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>${post.author}</p>
            <button class="edit-button" onclick="editPost(${post.id})">Edit</button>
            <button class="delete-button" onclick="deletePost(${post.id})">Delete</button>
        `;
        postsDiv.appendChild(postDiv);
    });
}

function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        document.getElementById('author').value = post.author;
        deletePost(id);
    }
}

function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    displayPosts();
}
// client/script.js
const submitButton = document.getElementById('submitButton');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const authorInput = document.getElementById('author');
const postsDiv = document.getElementById('posts');

submitButton.addEventListener('click', async () => {
    const post = {
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        author: authorInput.value.trim(),
    };

    if (post.title && post.content && post.author) {
        await fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post),
        });
        titleInput.value = '';
        contentInput.value = '';
        authorInput.value = '';
        loadPosts();
    } else {
        alert('Please fill in all fields.');
    }
});

// Load posts from server
async function loadPosts() {
    const response = await fetch('http://localhost:5000/posts');
    const posts = await response.json();
    postsDiv.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p><small>By ${post.author} on ${new Date(post.createdAt).toLocaleDateString()}</small>`;
        postsDiv.appendChild(postDiv);
    });
}

// Load posts on initial load
loadPosts();
