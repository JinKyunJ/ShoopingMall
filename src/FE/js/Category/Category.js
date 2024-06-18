const CLOSETIME = 5000; // 50초가 너무 길어 5초로 줄였습니다.

//변수 영역
const ViewProductPage = document.querySelectorAll(".Product");
// 페이지 이동 버튼
ViewProductPage.forEach(product => {
    product.addEventListener('click', () => {
        window.location.href = "../../ProductList/ProductList.html"; //상대경로는 ..찍고 가자 절대경로 연결 안될수도있음
    });
});

// 담기 버튼 클릭
document.addEventListener("DOMContentLoaded", () => {
    // 장바구니에 담기 버튼을 클릭할때 팝업 모달 동작
    document.querySelectorAll(".Cart-Btn").forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // 링크 기본 동작 막기
            event.stopPropagation(); // 부모 클릭 이벤트 막기

            // 모달 객체를 가져오고 id를 찾아서
            const modal = document.getElementById('CartModal');
            modal.classList.remove('hidden'); // 클래스를 지움
            modal.classList.add('show'); // 추가함

            // closest는 selectors의 일치하는 가장 가까운 상위 요소를 찾는데 사용함
            const findElement = button.closest('.Product');

            // 텍스트 엘리멘트를 가져옴 나중에 디테일은 조금 바뀔거같음
            const productName = findElement.querySelector('span').textContent;
            const productPrice = findElement.querySelector('span[style*="font-weight:bold"]').textContent;

            document.getElementById('ModalProductName').textContent = productName;
            document.getElementById('ModalProductPrice').textContent = productPrice;

            // 일정 시간 후에 모달을 자동으로 닫기
            setTimeout(() => {
                // 기능 정의
                modal.classList.remove('show');
                modal.classList.add('hidden');
            }, CLOSETIME);
        });
    });

    // 열려있는 모달 닫기 버튼
    document.getElementById("ButtonModel-btnClose").addEventListener('click', () => {
        const modal = document.getElementById("CartModal");
        modal.classList.remove('show');
        modal.classList.add('hidden');

        // 제품 정보 컨트롤하기 위해 변수 가져옴
        const productImg = document.getElementById("ModalProductImage").src;
        const productName = document.getElementById("ModalProductName").textContent;
        const productPrice = document.getElementById("ModalProductPrice").textContent;

        const productDetails = {
            imageSrc: productImg,
            nameString: productName,
            priceString: productPrice
        };

        // cart 키로 잡아서
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(productDetails);
        localStorage.setItem('cart', JSON.stringify(cart));

        const counterElement = document.querySelector('.cart-counter');
        counterElement.textContent = cart.length; // 카운트 변경
    });
});

/*
 * 페이지가 새로고침되거나 처음 오픈될때
 */
function initializeCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // 빈 배열로 초기화
    const counterElement = document.querySelector('.cart-counter');
    if (counterElement) {
        counterElement.textContent = cart.length;
    }
}
