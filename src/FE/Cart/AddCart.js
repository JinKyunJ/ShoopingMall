

function loadCartItems()
{
    const cartList = document.getElementById('cart-list'); //생성할 위치 리스트 가져옴
    let cartItems = JSON.parse(localStorage.getItem('cart')); //로컬에 넣어둔 목록을 가져옴


    cartItems.forEach(item => {
        const li = document.createElement('li');//엘리맨트 생성
        
        //li테그 안에 넣어야하니까 li를 제외한 테그를 넣음
        li.innerHTML = `
            <label>
                <input type="checkbox" />
            </label>
            <a href="#">
                <img src="${item.imageSrc}" class="product-image" alt="제품 이미지">
            </a>
            <div class="product-details">
                <a href="#">
                    <p class="product-title">${item.nameString}</p>
                </a>
                <div class="price-info">
                    <span class="discount-price">${item.discountPrice || '할인가 없음'}</span>
                    <span class="sale-price">${item.priceString}</span>
                </div>
                <div class="quantity-control">
                    <button aria-label="수량 내리기">-</button>
                    <div>0</div>
                    <button aria-label="수량 올리기">+</button>
                </div>
            </div>
            <button aria-label="삭제">✖</button> `;

        li.querySelector('button[aria-label="삭제"]').addEventListener('click', function () {
            li.remove();

            let updatedCartItems = cartItems.filter(cartItem => cartItem.nameString !== item.nameString);
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        });
        cartList.appendChild(li);
    });
}

// 페이지 로드 시 장바구니 항목을 로드
document.addEventListener('DOMContentLoaded', loadCartItems);
/*
// 삭제 버튼 클릭 시 li를 삭제하는 기능
document.querySelectorAll('li button[aria-label="삭제"]').forEach(button => {
    button.addEventListener('click', function () {
        this.closest('li').remove();
    });
});*/