/** X 버튼 클릭 시 모달 창 닫기 */
const onCloseButton = document.querySelector('.head-x-button');
const onModalContainer = document.querySelector('.container');

onCloseButton.addEventListener('click', () => {
    onModalContainer.style.display = 'none';
});

/** 로그인 버튼 클릭 시 서버에 사용자가 입력한 email, password 전송 */
const onLoginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');

onLoginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); /** 기본 폼 제출 방지 */

    const email = emailInput.value;
    const password = passwordInput.value;

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
});

/** 회원가입 버튼 클릭 시 회원가입 페이지로 이동 */
const onSignupButton = document.querySelector('.signup-button');
onSignupButton.addEventListener('click', () => {
    /** 경로 '/회원가입 페이지' */
    window.location.href = '../Signup/Signup.html';
});
