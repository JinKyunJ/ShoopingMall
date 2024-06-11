/** X 버튼 클릭 시 모달 창 닫기 */
const OnCloseButton = document.querySelector('.head-x-button');
const OnModalContainer = document.querySelector('.container');

OnCloseButton.addEventListener('click', () => {
    OnModalContainer.style.display = 'none';
});

/** 로그인 버튼 클릭 시 서버에 사용자가 입력한 id, password 전송 */
const OnLoginForm = document.getElementById('login-form');
const idInput = document.getElementById('id-input');
const passwordInput = document.getElementById('password-input');

OnLoginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); /** 기본 폼 제출 방지 */

    const id = idInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ id, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            /** 서버 응답 처리 */
            const data = await response.json();
            console.log('로그인 성공:', data);
        } else {
            /** 오류 처리 */
            const errorData = await response.json();
            console.error('로그인 실패:', errorData);
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    } catch (error) {
        console.error('오류:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }

    /** 회원가입 버튼 클릭 시 회원가입 페이지로 이동 */
    const OnsignupButton = document.querySelector('.signup-button');

    OnsignupButton.addEventListener('click', () => {
        /** 경로 '/회원가입 페이지' */
        window.location.href = '/signup';
    });
});
