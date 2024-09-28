const loginButton
    = document.getElementById('loginButton');

const loginCloseButton =
    document.getElementById('loginCloseButton')

const loginModal = document.getElementById('loginModal');


loginButton.addEventListener('click', () => {
    loginModal.style.display = 'block';
})

loginCloseButton.addEventListener('click', () => {
    loginModal.style.display = 'none';
})

window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
})

document.getElementById('loginForm')
    .addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        alert(`Username: ${username}\nPassword: ${password}`);
        const id = document.getElementById('userId');
        id.textContent = username;
        loginModal.style.display = 'none';
    })