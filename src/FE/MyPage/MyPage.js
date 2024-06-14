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
            /** 오류 처리 */
            const errorData = await response.json();
            /** 사용자 알림 + 오류 추적 및 실행 중단 throw new Error 추가 */
            alert('페이지 이동에 실패했습니다. 나중에 다시 시도해주세요.');
            throw new Error(errorData.message || '페이지 이동 실패');
        }
    } catch (error) {
        console.error('오류:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
};

/** 사용자 이름 가져오기 */
const fetchUserName = async () => {
    try {
        const response = await fetch('/user-info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            const userNameElement = document.getElementById('user-name'); /** 'user-name' ID를 가진 HTML요소 */
            userNameElement.textContent = `${data.name}님`; /** 요소의 텍스트 내용을 `${data.name}님`으로 변경 */
        } else {
            /** 오류 처리 */
            const errorData = await response.json();
            alert('사용자 정보를 가져오는 데 실패했습니다.');
            throw new Error(errorData.message || '사용자 정보 가져오기 실패');
        }
    } catch (error) {
        console.error('오류:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
};
/** 사용자 이름 가져오기 함수 호출 */
fetchUserName();

/** cart 버튼 클릭 시 장바구니 페이지로 이동 */
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

/** 메뉴 정보 섹션 버튼 클릭 시 각 페이지로 이동 */
setEventListener('.menu-info-section button', 'click', async (event) => {
    const url = event.currentTarget.getAttribute('data-url');
    await fetchAndNavigate(url, event);
});

/** 로그아웃 버튼 클릭 시 로그아웃 처리 후 홈 페이지로 이동 */
const onLogoutButton = document.querySelector('.logout-button');
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
            // 로컬 스토리지에서 JWT 토근 제거
            localStorage.removeItem('jwtToken');
            window.location.href = '/home';
        } else {
            /** 오류 처리 */
            const errorData = await response.json();
            alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
            throw new Error(errorData.message || '로그아웃 실패');
        }
    } catch (error) {
        console.error('오류:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
});
