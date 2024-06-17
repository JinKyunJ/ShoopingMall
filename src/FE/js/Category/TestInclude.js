function loadHTML(selector, url) {
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = data;
                // 헤더가 로드된 후 카트 카운터 초기화
                if (selector === 'header') {
                    initializeCartCounter();
                }
            } else {
                console.error("Element not found: ", selector);
            }
        });
}

// 페이지 로드 시 header와 footer를 불러옴
document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "/src/FE/layout/testHeader.html");
});