const CLOSETIME = 5000; // 5초로 설정

// 변수 영역
const ViewProductPage = document.querySelectorAll(".swiper-slide");

// 페이지 이동 버튼
ViewProductPage.forEach(product => {
    product.addEventListener('click', () => {
        window.location.href = "../../ProductList/ProductList.html"; // 상대경로 사용
    });
});

// 담기 버튼 클릭
document.addEventListener("DOMContentLoaded", () => {
    let quantity = 1; // 모달의 수량을 저장하는 변수

    // 장바구니에 담기 버튼을 클릭할 때 팝업 모달 동작
    document.querySelectorAll(".Cart-Btn").forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // 링크 기본 동작 막기
            event.stopPropagation(); // 부모 클릭 이벤트 막기

            // 모달 객체를 가져오고 id를 찾아서
            const modal = document.getElementById('CartModal');
            modal.classList.remove('hidden'); // 클래스를 지움
            modal.classList.add('show'); // 추가함

            // closest를 사용하여 해당 제품 요소를 찾기
            const findElement = button.closest('.swiper-slide');
            if (!findElement) return;

            // 제품 정보를 가져옴
            const productName = findElement.querySelector('.title').textContent;
            const productPrice = findElement.querySelector('.price').textContent;
            const discountedPrice = findElement.querySelector('.dc-price .price').textContent;
            const productImageSrc = findElement.querySelector('.Goods-Image img').src;

            // 모달에 제품 정보 설정
            document.getElementById('ModalProductName').textContent = productName;
            document.getElementById('ModalProductPrice').textContent = productPrice;
            document.getElementById('ModalProductDiscountedPrice').textContent = discountedPrice;
            document.getElementById('ModalProductImage').src = productImageSrc;

            // 초기 수량 설정
            quantity = 1;
            const productQuantityElement = document.getElementById('productQuantity');
            const decreaseQtyBtn = document.getElementById('decreaseQtyBtn');
            productQuantityElement.textContent = quantity;
            decreaseQtyBtn.disabled = true; // 초기 수량이 1이므로 감소 버튼 비활성화

            // 수량 조절 버튼 클릭 이벤트
            decreaseQtyBtn.addEventListener('click', () => {
                if (quantity > 1) {
                    quantity--;
                    productQuantityElement.textContent = quantity;
                    if (quantity === 1) {
                        decreaseQtyBtn.disabled = true; // 수량이 1일 때 감소 버튼 비활성화
                    }
                }
            });

            document.getElementById('increaseQtyBtn').addEventListener('click', () => {
                quantity++;
                productQuantityElement.textContent = quantity;
                decreaseQtyBtn.disabled = false; // 수량 증가 시 감소 버튼 활성화
            });

            // 일정 시간 후에 모달을 자동으로 닫기
            setTimeout(() => {
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
        const discountedPrice = document.getElementById("ModalProductDiscountedPrice").textContent;
        const productPrice = document.getElementById("ModalProductPrice").textContent;

        console.log(discountedPrice);
        console.log(productPrice);
        
        const productDetails = {
            imageSrc: productImg,
            nameString: productName,
            discountedPrice: discountedPrice,
            originalPrice: productPrice,
            quantity: parseInt(document.getElementById('productQuantity').textContent) // 수량을 가져옴
        };

        // cart 키로 저장
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(productDetails);
        localStorage.setItem('cart', JSON.stringify(cart));

        // 카운터 업데이트
        const counterElement = document.querySelector('.cart-counter');
        if (counterElement) {
            counterElement.textContent = cart.length;
        }
    });

    // 초기 카트 카운터 설정
    initializeCartCounter();
});

/*
 * 페이지가 새로고침되거나 처음 오픈될 때
 */
function initializeCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counterElement = document.querySelector('.cart-counter');
    if (counterElement) {
        counterElement.textContent = cart.length;
    }
}
