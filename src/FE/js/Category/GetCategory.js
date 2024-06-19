// DOMContentLoaded 이벤트가 발생했을 때 실행될 함수
document.addEventListener("DOMContentLoaded", async () => {
  await fetchProducts();

  let quantity = 1; // 모달의 수량을 저장하는 변수

  // 장바구니에 담기 버튼을 클릭할 때 팝업 모달 동작
  document.querySelectorAll(".Cart-Btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // 링크 기본 동작 막기
      event.stopPropagation(); // 부모 클릭 이벤트 막기

      // 모달 객체를 가져오고 id를 찾아서
      const modal = document.getElementById("CartModal");
      modal.classList.remove("hidden"); // 클래스를 지움
      modal.classList.add("show"); // 추가함

      // closest를 사용하여 해당 제품 요소를 찾기
      const findElement = button.closest(".swiper-slide");
      if (!findElement) return;

      // 제품 정보를 가져옴
      const productName = findElement.querySelector(".title").textContent;
      const productPrice = findElement.querySelector(".price").textContent;
      const discountedPrice =
        findElement.querySelector(".dc-price .price").textContent;
      const productImageSrc = findElement.querySelector(".Goods-Image img").src;
      const discountPercent =
        findElement.querySelector(".percent")?.textContent || "0%";

      // 모달에 제품 정보 설정
      document.getElementById("ModalProductName").textContent = productName;
      document.getElementById("ModalProductPrice").textContent = productPrice;
      document.getElementById("ModalProductDiscountedPrice").textContent =
        discountedPrice;
      document.getElementById("ModalProductImage").src = productImageSrc;
      document.getElementById("ModalproductSale").textContent = discountPercent;

      // 초기 수량 설정
      quantity = 1;
      const productQuantityElement = document.getElementById("productQuantity");
      const decreaseQtyBtn = document.getElementById("decreaseQtyBtn");
      productQuantityElement.textContent = quantity;
      decreaseQtyBtn.disabled = true; // 초기 수량이 1이므로 감소 버튼 비활성화

      // 수량 조절 버튼 클릭 이벤트
      decreaseQtyBtn.addEventListener("click", () => {
        if (quantity > 1) {
          quantity--;
          productQuantityElement.textContent = quantity;
          if (quantity === 1) {
            decreaseQtyBtn.disabled = true; // 수량이 1일 때 감소 버튼 비활성화
          }
        }
      });

      document
        .getElementById("increaseQtyBtn")
        .addEventListener("click", () => {
          quantity++;
          productQuantityElement.textContent = quantity;
          decreaseQtyBtn.disabled = false; // 수량 증가 시 감소 버튼 활성화
        });

      // 일정 시간 후에 모달을 자동으로 닫기
      setTimeout(() => {
        modal.classList.remove("show");
        modal.classList.add("hidden");
      }, CLOSETIME);
    });
  });

  // 열려있는 모달 닫기 버튼
  document
    .getElementById("ButtonModel-btnClose")
    .addEventListener("click", () => {
      const modal = document.getElementById("CartModal");
      modal.classList.remove("show");
      modal.classList.add("hidden");

      // 제품 정보 컨트롤하기 위해 변수 가져옴
      const productImg = document.getElementById("ModalProductImage").src;
      const productName =
        document.getElementById("ModalProductName").textContent;
      const discountedPrice = document.getElementById(
        "ModalProductDiscountedPrice"
      ).textContent;
      const productPrice =
        document.getElementById("ModalProductPrice").textContent;
      const discountPercent =
        document.getElementById("ModalproductSale")?.textContent || "0%";

      const productDetails = {
        imageSrc: productImg,
        nameString: productName,
        discountedPrice: discountedPrice,
        originalPrice: productPrice,
        discountPErcent: discountPercent,
        quantity: parseInt(
          document.getElementById("productQuantity").textContent
        ), // 수량을 가져옴
      };

      // cart 키로 저장
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(productDetails);
      localStorage.setItem("cart", JSON.stringify(cart));

      // 카운터 업데이트
      const counterElement = document.querySelector(".cart-counter");
      if (counterElement) {
        counterElement.textContent = cart.length;
      }
    });

  // 초기 카트 카운터 설정
  initializeCartCounter();
});

const CLOSETIME = 5000; // 5초로 설정

// 변수 영역
const ViewProductPage = document.querySelectorAll(".swiper-slide");

// 페이지 이동 버튼
ViewProductPage.forEach((product) => {
  product.addEventListener("click", () => {
    window.location.href = "../../ProductList/ProductList.html"; // 상대경로 사용
  });
});

// 담기 버튼 클릭
document.addEventListener("DOMContentLoaded", () => {});

/*
 * 페이지가 새로고침되거나 처음 오픈될 때
 */
function initializeCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const counterElement = document.querySelector(".cart-counter");
  if (counterElement) {
    counterElement.textContent = cart.length;
  }
}

// 제품 데이터를 가져오는 함수
function fetchProducts() {
  // fetch API를 사용하여 제품 데이터를 가져옴
  return fetch("http://localhost:3002/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // JSON 형태로 데이터 수신을 명시
    },
  })
    .then(function (response) {
      // 응답 상태가 ok인지 확인
      if (!response.ok) {
        throw new Error("HTTP error! status: " + response.status);
      }
      // 응답을 JSON으로 변환
      return response.json();
    })
    .then(function (data) {
      // 서버에서 받은 데이터 확인 (콘솔에 출력하여 형식을 확인)
      console.log("Fetched data:", data);

      // 모든 product 객체를 추출하여 배열로 만듭니다.
      const products = Object.values(data).map(function (prodData) {
        return prodData.product;
      });

      // 가져온 제품 데이터를 콘솔에 출력
      console.log("Parsed products:", products);

      // 제품 데이터를 사용하여 동적으로 페이지에 렌더링
      renderProducts(products);
    })
    .catch(function (error) {
      // 오류가 발생하면 콘솔에 오류 메시지를 출력
      console.error("Error fetching products:", error);
    });
}

// 제품 데이터를 사용하여 페이지에 동적으로 제품 요소를 추가하는 함수
function renderProducts(products) {
  const container = document.querySelector(".swiper-wrapper");

  if (!container) {
    console.error("Container element not found");
    return;
  }

  // 각 제품 데이터를 사용하여 HTML 요소 생성
  products.forEach(function (product) {
    const imgPath = `../img/TextImage/${product.image}`; //뭐야?
    const productElement = document.createElement("a");
    productElement.href = "/src/FE/ProductDetails/Productdetails.html";
    productElement.className = "swiper-slide";
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
                    <div class="price">${formatPrice(
                      getDiscountedPrice(product.price, product.sale)
                    )}원</div>
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
    const cartButton = productElement.querySelector(".Cart-Btn");
    cartButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior
      event.stopPropagation(); // Stop parent link event

      // Show the modal (assuming you have a function to show the modal)
      showModal();
    });
  });
}

// 가격을 포맷팅하는 함수
function formatPrice(price) {
  return price.toLocaleString("ko-KR"); // 한국어 로케일에 맞게 천 단위 구분 기호를 추가
}

// 할인가를 계산하는 함수
function getDiscountedPrice(price, sale) {
  return price - price * (sale / 100);
}

// 모달을 보여주는 함수
function showModal() {
  const modal = document.getElementById("CartModal");
  if (modal) {
    modal.classList.add("show");
  }
}
