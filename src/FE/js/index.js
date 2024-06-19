/** 메인 슬라이드 */

const swiper = new Swiper(".swiper", {
  // Optional parameters
  autoplay: true,
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
});

/** 상품 슬라이드 */
const goodsSwiper = new Swiper(".product-box", {
  slidesPerView: 2.2,
  spaceBetween: 10,
  breakpoints: {
    480: {
      slidesPerView: 2.5,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

/** 세일 상품 불러오기 */
async function fetchSaleProducts() {
  try {
    const response = await fetch("/");
    const products = await response.json();

    const SaleProductList = document.getElementById("sale-product-wrapper");
    let productHtml = "";
    products.forEach((product) => {
      productHtml += `<div class="swiper-slide">
                <div class="goods-image">
                    <img src="${product.image}" alt="" />
                </div>
                <button class="cart-btn" type="button">담기</button>
                <input type="hidden" value="" name="productNumber" />
                <div class="goods-info">
                    <p class="title">${product.title}</p>
                    <p class="price">${product.price}</p>
                    <div class="dc-price">
                    <span class="percent">10%</span>
                    <div class="price">${product.price}</div>
                    </div>
                    <p class="review">
                      <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#5f6368"><path d="m241.54-260-80.08 80.07q-17.07 17.08-39.27 7.74Q100-181.54 100-205.85v-581.84Q100-818 121-839q21-21 51.31-21h615.38Q818-860 839-839q21 21 21 51.31v455.38Q860-302 839-281q-21 21-51.31 21H241.54ZM216-320h571.69q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v523.08L216-320Zm-56 0v-480 480Zm160-204.62q14.69 0 25.04-10.34 10.34-10.35 10.34-25.04t-10.34-25.04q-10.35-10.34-25.04-10.34t-25.04 10.34q-10.34 10.35-10.34 25.04t10.34 25.04q10.35 10.34 25.04 10.34Zm160 0q14.69 0 25.04-10.34 10.34-10.35 10.34-25.04t-10.34-25.04q-10.35-10.34-25.04-10.34t-25.04 10.34q-10.34 10.35-10.34 25.04t10.34 25.04q10.35 10.34 25.04 10.34Zm160 0q14.69 0 25.04-10.34 10.34-10.35 10.34-25.04t-10.34-25.04q-10.35-10.34-25.04-10.34t-25.04 10.34q-10.34 10.35-10.34 25.04t10.34 25.04q10.35 10.34 25.04 10.34Z"/></svg>
                      100+
                    </p>
                </div>
            </div>
            `;
    });

    SaleProductList.innerHTML = productHtml;
  } catch (error) {
    console.error("Error fetching sale products:", error);
  }
}

// 페이지 로드 시 상품 리스트를 불러옵니다.
//window.onload = fetchSaleProducts;
