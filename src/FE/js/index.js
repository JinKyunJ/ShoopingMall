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
const goodsSwiper = new Swiper(".Goods-Box", {
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

    const SaleProductList = document.getElementById("Sale-Product-Wrapper");
    let productHtml = "";
    products.forEach((product) => {
      productHtml += `<div class="swiper-slide">
                <div class="Goods-Image">
                    <img src="${product.image}" alt="" />
                </div>
                <button class="Cart-Btn" type="button">담기</button>
                <div class="Goods-Info">
                    <p class="Title">${product.title}</p>
                    <p class="Price">${product.price}</p>
                    <div class="Dc-Price">
                    <span class="Percent">10%</span>
                    <div class="Price">${product.price}</div>
                    </div>
                    <p class="Review">100+</p>
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
