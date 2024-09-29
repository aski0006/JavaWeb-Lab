const submit = document.getElementById('submit');
const textInput = document.getElementById('inputText');
submit.addEventListener('click',()=>{
    const inputValue = textInput.value; // 获取输入框的值
    if (inputValue === '')
        alert('Please enter')
    else{
        alert(inputValue);
        fetch('hello-servlet').then(response => response.text()
            .then(data => {
                const mes = document.getElementById('getServlet');
                mes.textContent = data
            }))
            .catch(error => console.error('Error fetching articles:', error));
    }
})