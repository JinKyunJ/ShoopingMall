const addCartButtons = document.querySelectorAll('.Product button'); //프로덕트 클래스 안에 버튼을 누르면 카트에 넣기
const ViewProductPage= document.querySelectorAll(".Product");


addCartButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        window.location.href='ProductList.html';
    });
});

//페이지 이동 버튼
ViewProductPage.forEach(product =>{
    product.addEventListener('click', ()=>{
        window.location.href = "ProductList.html";
    });
});