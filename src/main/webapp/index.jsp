<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="stylesheet" href="CSS/loginModal.css">
    <link rel="stylesheet" href="CSS/fileSelector.css">
</head>
<body id="body">
<header id="header">
    <div class="header-left">Asaki Blog</div>
    <div class="header-right">
        <label class="switch">
            <input type="checkbox" id="changeBackgroundColor">
            <span class="slider"></span>
        </label>
    </div>
</header>
<div class="main-content">
    <div class="profile-section">
        <nav class="navbar">
            <div class="logo">ArkNight</div>
            <div id="clock" class="profile-time"><span>00</span>:<span>00</span>:<span>00</span></div>
            <img src="Images/image_01.jpg" alt="profile-photo" class="profile-image" onclick="changeUserImage()">
            <div class="profile-info">
                <p class="profile-id" id="userId">unknown</p>
                <button type="button" id="loginButton" class="profile-button">Login</button>
            </div>
            <br>
            <ul class="nav-links">
                <li><a href="#">content</a></li>
                <li><a href="#">about</a></li>
                <li><a href="#">setting</a></li>
                <li><a href="#">contacted</a></li>
            </ul>
        </nav>
    </div>
    <div class="articles-section" id="articles-content">

    </div>
</div>

<!-- 模态登录框 -->
<div id="loginModal" class="modal">
    <div class="modal-content">
        <span class="close" id="loginCloseButton">&times;</span>
        <h2>Login</h2>
        <form id="loginForm">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Login</button>
            <button type="button" id="register">Register</button>
        </form>
    </div>
</div>

<!-- 图片上传 -->
<div id="fileSelectorModal" class="fileSelectorModal">
    <div class="modal-content">
        <span class="close" id="fileSelectorCloseButton">&times;</span>
        <h2>select your user image</h2>
        <input type="file">
        <button type="button" id="submitUserImage" onclick="uploadImage()">submit</button>
    </div>
</div>
<!-- 脚本 -->
<script type="text/javascript" src="Scripts/login.js"></script>
<script type="text/javascript" src="Scripts/index.js"></script>
<script type="text/javascript" src="Scripts/submitUserImage.js"></script>
</body>
</html>