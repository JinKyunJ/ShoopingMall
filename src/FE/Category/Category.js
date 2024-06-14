//상수 영역
const CLOSETIME = 50000;

//변수 영역
//const ViewCartPargeButton = document.querySelector()
const ViewProductPage= document.querySelectorAll(".Product");
//페이지 이동 버튼
ViewProductPage.forEach(product =>{
    product.addEventListener('click', ()=>{
        window.location.href = "../ProductList/ProductList.html"; //상대경로는 ..찍고 가자 절대경로 연결 안될수도있음
    });
});

//담기 버튼 클릭
document.addEventListener("DOMContentLoaded", ()=>{
    //처음에 로드될때 영역
    initializeCartCounter();
    //장바구니에 담기 버튼을 클릭할때 팝업 모달 동작
    document.querySelectorAll(".AddCart-btn").forEach(button =>{
        //모든 이벤트에 연결
        button.addEventListener('click',()=>{

            event.stopPropagation();// 이벤트 전파 중단

            //모달 객체를 가져오고 id를 찾아서
            const model = document.getElementById('CartModal');
            model.classList.remove('hidden'); //클래스를 지움
            model.classList.add ('show'); //추가함

            //closest는 selectors의 일치하는 가낭 가까운 상위요소를 찾는데 사용함. 일치하는 첫번째 부모 요소를 리턴함
            const findElement = button.closest('.Product');

            //텍스트 엘리멘트를 가져옴 나중에 디테일은 조금 바뀔거같음
            const productName= findElement.querySelector('span').textContent;
            const productPrice = findElement.querySelector('span[style*="font-weight:bold"]').textContent;

            document.getElementById('ModalProductName').textContent = productName;
            document.getElementById('ModalProductPrice').textContent = productPrice;

            //일정 시간 후에 모달을 자동으로 닫기
            setTimeout(()=>{
                //기능 정의
                model.classList.remove('show');
                model.classList.add('hidden');
            },CLOSETIME);
        });
    });

    document.querySelector(".title-div-button").addEventListener('click', () => {
        window.location.href = "../Cart/AddCartPage.html";
    });

    //열려있는 모달 닫기 버튼
    document.getElementById("ButtonModel-btnClose").addEventListener('click', () => {
        const modal = document.getElementById("CartModal");
        modal.classList.remove('show');
        modal.classList.add('hidden');

        //제품 정보 컨트롤하기위해 변수 가져옴
        const productImg = document.getElementById("ModalProductImage").src;
        const productName = document.getElementById("ModalProductName").textContent;
        const productPrice = document.getElementById("ModalProductPrice").textContent;

        const productDetails = {
            imageSrc: productImg,
            nameString : productName,
            priceString : productPrice
        };

        //cart 키로 잡아서
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.push(productDetails);
        localStorage.setItem('cart', JSON.stringify(cart));

        const counterElement = document.querySelector('.cart-counter');
        counterElement.textContent = cart.length;
    });
});

function initializeCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const counterElement = document.querySelector('.cart-counter');
    counterElement.textContent = cart.length;
}
//장바구니에 담기
//SPA 싱글페이지 어플리케이션 컴포넌트만 불러와서 랜더링 되는 방식.

//장바구니의 관점에서는 카운트가 유지되는게 맞다.
//웹을 켯을때도 유지가 되어야한다.
