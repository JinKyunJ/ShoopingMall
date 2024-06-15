const titleEl = document.querySelectorAll(".title-box");
titleEl.forEach((el) => {
  el.addEventListener("click", () => {
    console.log(el.classList);
    if (el.className.includes("active")) {
      el.classList.remove("active");
    } else {
      el.classList.add("active");
    }
  });
});
