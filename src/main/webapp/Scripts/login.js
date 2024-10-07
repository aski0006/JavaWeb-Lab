const loginButton
    = document.getElementById('loginButton');

const loginCloseButton =
    document.getElementById('loginCloseButton')

const loginModal = document.getElementById('loginModal');

const loginForm = document.getElementById('loginForm');

const registerButton = document.getElementById('register');

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


loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    alert(`Username: ${username}\nPassword: ${password}`);
    const id = document.getElementById('userId');
    id.textContent = username;
    loginModal.style.display = 'none';
})

registerButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('register-servlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // 表示表单格式
            },
            body: new URLSearchParams({
                username: username,
                password: password
            })
        });
        // 检查响应是否成功
        if (!response.ok) {
            alert(response.statusText);
        }
        const jsonResponse = await response.json();

        if (jsonResponse.success) {
            alert(jsonResponse.message); // 注册成功
        } else {
            alert(jsonResponse.message); // 显示错误消息
        }
    } catch (error) {
        console.error('Error:', error);
        alert('注册失败，请稍后再试！');
    }
})


