document.addEventListener('DOMContentLoaded', () => {
    const switchBackgroundButton = document.getElementById('changeBackgroundColor');
    const bodyView = document.getElementById('body');
    switchBackgroundButton.addEventListener('click', () => {
        if (switchBackgroundButton.checked) {
            bodyView.setAttribute('data-theme', 'dark');
        } else {
            bodyView.setAttribute('data-theme', 'light');
        }
    });

    fetch("loadArticles-servlet").then(response => response.text()
        .then(data => {
            const articles_container = document.getElementById('articles-content');
            articles_container.innerHTML = data;
        }))
        .catch(error => console.error('Error fetching articles:', error));

    function startTime() {
        const today = new Date();
        const h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);

        document.getElementById('clock').children[0].innerHTML = h;
        document.getElementById('clock').children[1].innerHTML = m;
        document.getElementById('clock').children[2].innerHTML = s;

        const t = setTimeout(startTime, 1000);
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i;
    }

    window.onload = function () {
        startTime();
    }
});