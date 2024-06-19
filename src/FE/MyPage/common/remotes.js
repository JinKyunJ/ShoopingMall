/** 중복되는 API 호출 및 페이지 이동 함수 */
export async function fetchAndNavigate(url, event) {
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
            alert('페이지 이동에 실패했습니다. 나중에 다시 시도해주세요.');
            throw new Error(errorData.message || '페이지 이동 실패');
        }
    } catch (error) {
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
}

/** 사용자 이름 가져오기 API 함수 */
export async function fetchUserName() {
    try {
        const response = await fetch('http://localhost:3002/users', {
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
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
}

/** 로그아웃 API 함수 */
export async function logoutUser() {
    try {
        const response = await fetch('/http://localhost:3002/logout', {
            method: 'GET',
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
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
}