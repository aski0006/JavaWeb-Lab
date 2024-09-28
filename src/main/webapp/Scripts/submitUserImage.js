const fileSelectorModal = document.getElementById('fileSelectorModal');

function changeUserImage() {
    fileSelectorModal.style.display = 'block';
}

const close = document.getElementById('fileSelectorCloseButton');
close.addEventListener('click', () => {
    fileSelectorModal.style.display = 'none';
})

window.addEventListener('click', (event) => {
    if (event.target === fileSelectorModal) {
        fileSelectorModal.style.display = 'none';
    }
})

function uploadImage() {
    const fileInput = document.querySelector('#fileSelectorModal input[type="file"]');
    const file = fileInput.files[0]; // 获取选择的文件
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // 获取文件的本地URL
            const fileUrl = e.target.result;

            // 这里可以添加上传文件的代码
            alert(fileUrl);
        }
        reader.readAsDataURL(file); // 读取文件内容
    }
    fileSelectorModal.style.display = "none"; // 关闭模态框
}