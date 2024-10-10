// 确保DOM元素已完全加载
document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const loginButton = document.getElementById('loginButton');
    const loginCloseButton = document.getElementById('loginCloseButton');
    const loginModal = document.getElementById('loginModal');
    const registerButton = document.getElementById('register');
    const modalTitle = document.getElementById('modalTitle');
    const nicknameLabel = document.getElementById('nicknameLabel');
    const nicknameInput = document.getElementById('nickname');
    const loginSubmitButton = document.getElementById('loginSubmitButton');
    const registerSubmitButton = document.getElementById('registerSubmitButton');

    // 登录按钮点击事件：显示登录模态框
    loginButton.addEventListener('click', () => {
        clearFormFields();
        loginModal.style.display = 'block';
        modalTitle.textContent = 'Login';
        nicknameLabel.style.display = 'none';
        nicknameInput.style.display = 'none';
        loginSubmitButton.style.display = 'block';
        registerButton.style.display = 'block';
        registerSubmitButton.style.display = 'none';
    });

    // 关闭按钮点击事件：隐藏登录模态框
    loginCloseButton.addEventListener('click', () => {
        loginSubmitButton.style.display = 'block';
        registerButton.style.display = 'block';
        registerSubmitButton.style.display = 'none';
        nicknameLabel.style.display = 'none';
        nicknameInput.style.display = 'none';
        loginModal.style.display = 'none';
    });

    // 点击模态框外部区域关闭模态框
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    loginSubmitButton.addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (isInputValid(username, password)) {
            try {
                const response = await sendLoginRequest(username, password);
                handleLoginResponse(response);
            } catch (error) {
                handleLoginError(error);
            }
        }
    });

    function isInputValid(username, password) {
        if (username === '' || password === '') {
            alert('Please input username and password');
            loginModal.style.display = 'block';
            return false;
        }
        return true;
    }

    async function sendLoginRequest(username, password) {
        const response = await fetch('login-servlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // 表示表单格式
            },
            body: new URLSearchParams({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }

    function handleLoginResponse(jsonResponse) {
        if (jsonResponse.success) {
            const id = document.getElementById('userId');
            id.textContent = jsonResponse.username; // 显示用户ID
            loginModal.style.display = 'none'; // 隐藏模态框
        } else {
            alert(jsonResponse.message); // 显示错误消息
        }
    }

    function handleLoginError(error) {
        console.error('Error:', error);
        alert('Login failed, please try again!');
    }

    // 注册按钮点击事件：获取用户名和密码，发送POST请求到服务器进行注册
    registerButton.addEventListener('click', async () => {
        modalTitle.textContent = 'Register';
        nicknameLabel.style.display = 'block';
        nicknameInput.style.display = 'block';
        loginSubmitButton.style.display = 'none';
        registerButton.style.display = 'none';
        registerSubmitButton.style.display = 'block';
        clearFormFields();
    });

    // 注册提交按钮点击事件：获取用户名、密码和昵称，发送POST请求到服务器进行注册
    registerSubmitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const nickname = document.getElementById('nickname').value;

        try {
            const response = await fetch('register-servlet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // 表示表单格式
                },
                body: new URLSearchParams({
                    nickname: nickname,
                    username: username,
                    password: password
                })
            });

            // 检查响应是否成功
            if (!response.ok) {
                alert(response.statusText);
                return;
            }

            const jsonResponse = await response.json();

            if (jsonResponse.success) {
                alert(jsonResponse.message); // 注册成功
                const id = document.getElementById('userId');
                id.textContent = jsonResponse.username; // 显示用户ID
                loginModal.style.display = 'none'; // 隐藏模态框
            } else {
                alert(jsonResponse.message); // 显示错误消息
            }
        } catch (error) {
            console.error('Error:', error);
            alert('注册失败，请稍后再试！');
        }
    });

    // 清空所有输入框的文字
    function clearFormFields() {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('nickname').value = '';
    }
});