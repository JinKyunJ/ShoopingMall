// DOMContentLoaded 이벤트가 발생했을 때 실행될 함수
document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();
});

// 제품 데이터를 가져오는 함수
function fetchProducts() {
    // fetch API를 사용하여 제품 데이터를 가져옴
    fetch('http://localhost:3002/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' // JSON 형태로 데이터 수신을 명시
        }
    })
    .then(function(response) {
        // 응답 상태가 ok인지 확인
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        // 응답을 JSON으로 변환
        return response.json();
    })
    .then(function(data) {
        // 서버에서 받은 데이터 확인 (콘솔에 출력하여 형식을 확인)
        console.log('Fetched data:', data);

        // 모든 product 객체를 추출하여 배열로 만듭니다.
        const products = Object.values(data).map(function(prodData) {
            return prodData.product;
        });

        // 가져온 제품 데이터를 콘솔에 출력
        console.log('Parsed products:', products);

        // 제품 데이터를 사용하여 동적으로 페이지에 렌더링
        renderProducts(products);
    })
    .catch(function(error) {
        // 오류가 발생하면 콘솔에 오류 메시지를 출력
        console.error('Error fetching products:', error);
    });
}

// 제품 데이터를 사용하여 페이지에 동적으로 제품 요소를 추가하는 함수
function renderProducts(products) {
    const container = document.querySelector('.swiper-wrapper');
    
    if (!container) {
        console.error('Container element not found');
        return;
    }
    
    // 각 제품 데이터를 사용하여 HTML 요소 생성
    products.forEach(function(product) {
        const imgPath = `../img/TextImage/${product.image}` //뭐야?
        const productElement = document.createElement('a'); //엘리멘트 만들고
        productElement.href = '/src/FE/ProductDetails/Productdetails.html';
        productElement.className = 'swiper-slide';
        productElement.innerHTML = `
            <div class="Goods-Image">
                <img src=" ${imgPath}" alt="${product.title}" />
                <span class="Goods-Icon"></span>
            </div>
            <button class="Cart-Btn" type="button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="#333"
                >
                </svg>
                담기
            </button>
            <div class="goods-info">
                <p class="title">${product.title}</p>
                <p class="price">${formatPrice(product.price)}원</p>
                <div class="dc-price">
                    <span class="percent">${product.sale}%</span>
                    <div class="price">${formatPrice(getDiscountedPrice(product.price, product.sale))}원</div>
                </div>
                <p class="review">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16px"
                        viewBox="0 -960 960 960"
                        width="16px"
                        fill="#5f6368"
                    >
                    </svg>
                    ${product.comments.length}+
                </p>
            </div>
        `;

        // 제품 요소를 컨테이너에 추가
        container.appendChild(productElement);

        // Add event listener to the "담기" button
        const cartButton = productElement.querySelector('.Cart-Btn');
        cartButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            event.stopPropagation(); // Stop parent link event

            // Show the modal (assuming you have a function to show the modal)
            showModal();
        });
    });
}

// 가격을 포맷팅하는 함수
function formatPrice(price) {
    return price.toLocaleString('ko-KR'); // 한국어 로케일에 맞게 천 단위 구분 기호를 추가
}

// 할인가를 계산하는 함수
function getDiscountedPrice(price, sale) {
    return price - (price * (sale / 100));
}

// 모달을 보여주는 함수
function showModal() {
    const modal = document.getElementById('CartModal');
    if (modal) {
        modal.classList.add('show');
    }
}
