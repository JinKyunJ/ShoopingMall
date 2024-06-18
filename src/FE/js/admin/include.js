function loadHTML(selector, url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch((error) => console.error("Error loading the HTML:", error));
}

// 페이지 로드 시 header와 footer를 불러옴
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "/src/FE/Admin/header.html");
  loadHTML("nav", "/src/FE/Admin/menu.html");
});
