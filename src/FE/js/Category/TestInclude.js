function loadHTML(selector, url) {
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            document.querySelector(selector).innerHTML = data;
        });
}

// 페이지 로드 시 header와 footer를 불러옴
document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "/src/FE/layout/testHeader.html");
});
