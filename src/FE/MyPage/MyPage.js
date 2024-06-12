/** 중복되는 이벤트 리스너 함수 */
const setEventListener = (selector, eventType, callback) => {
    document.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventType, callback);
    });
};

/** 중복되는 API 호출 및 페이지 이동 함수 */
const fetchAndNavigate = async (url, event) => {
    event.preventDefault(); /** 기본 동작 막기 */
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            window.location.href = url;
        } else {
            alert('페이지 이동에 실패했습니다. 나중에 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('오류:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
};

/** 장바구니 버튼 클릭 시 장바구니 페이지로 이동 */
const OnCartButton = document.querySelector('.head-cart-button');
OnCartButton.addEventListener('click', () => {
    window.location.href = '/cart';
});

/** 전체 등급 확인 버튼 클릭 시 등급 확인 페이지로 이동 */
const OnGradeButton = document.querySelector('.grade-button');
OnGradeButton.addEventListener('click', () => {
    window.location.href = '/grade-info';
});

/** 대시보드 버튼 클릭 시 API 호출 + 페이지로 이동 */
setEventListener('.dashboard-button', 'click', async (event) => {
    const url = event.currentTarget.getAttribute('data-url');
    await fetchAndNavigate(url, event);
});

/** 메뉴 정보 섹션 버튼 클릭 시 API 호출 + 각 페이지로 이동 */
setEventListener('.menu-info-section button', 'click', async (event) => {
    const url = event.currentTarget.getAttribute('data-url');
    await fetchAndNavigate(url, event);
});

/** 로그아웃 버튼 클릭 시 API 호출 + 로그아웃 처리 후 홈 페이지로 이동 */
const onLogoutButton = document.querySelector('.logout-button button');
onLogoutButton.addEventListener('click', async (event) => {
    event.preventDefault(); /** 기본 동작 막기 */
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            window.location.href = '/home';
        } else {
            alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('오류:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
});
