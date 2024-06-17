/** 로그인 통신 API 함수 */

export async function loginUser(email, password) {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            /** 서버 응답 처리 */
            const data = await response.json();
            /** 로컬 스토리지에 JWT 토큰 저장 */
            const token = data.token;
            localStorage.setItem('jwtToken', token);
            // ('key값-수정&삭제', value값-저장): 새로 고침, 브라우저 닫고 열어도 토근 유지

            /** 로그인 성공 시 관리자, 일반회원에 따라 페이지로 이동 */
            if (data.isAdmin) {
                window.location.href = '/admin-page';
            } else {
                window.location.href = '/landing-page';
            }
            return data;
        } else {
            /** 오류 처리 */
            const errorData = await response.json();
            /** 사용자 알림 + 오류 추적 및 실행 중단 throw new Error 추가 */
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
            throw new Error(errorData.message || '로그인 실패');
        }
    } catch (error) {
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요');
    }
}
