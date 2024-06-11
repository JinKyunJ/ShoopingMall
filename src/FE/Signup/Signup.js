/** back 버튼 클릭 시 홈으로 이동 */
const OnBackButton = document.querySelector('.head-back-button button');

OnBackButton.addEventListener('click', () => {
    /** 경로 '/홈 페이지' */
    window.location.href = '/home';
});

/** cart 버튼 클릭 시 장바구니 페이지 이동 */
const OnCartButton = document.querySelector('.head-cart-button button');

OnCartButton.addEventListener('click', () => {
    /** 경로 '/장바구니 페이지' */
    window.location.href = '/cart';
});

/** 아이디 중복확인 버튼 클릭 시 */
const OnConfirmButton = document.querySelector('.confirm-button');
const idInput = document.getElementById('id-input');

OnConfirmButton.addEventListener('click', async () => {
    if (!idInput.checkValidity()) {
        // 입력값 유효성 검사
        idInput.reportValidity(); // 유효하지 않으면 경고 메시지 표시
        return;
    }

    const id = idInput.value;

    try {
        const response = await fetch('/check-id', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.exists) {
                alert('중복된 아이디입니다. 다시 입력해주세요.');
            } else {
                alert('사용 가능한 아이디입니다.');
            }
        } else {
            alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('오류:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
});

/** 가입하기 버튼 클릭 시 */
const OnSignupForm = document.getElementById('signup-form');

OnSignupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = idInput.value;
    const password = document.getElementById('password-input').value;
    const confirmPassword = document.getElementById('confirm-password-input').value;
    const name = document.getElementById('name-input').value;
    const address = document.getElementById('address-input').value;

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ id, password, name, address }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('회원가입이 성공적으로 완료되었습니다.');
            window.location.href = '/login'; // 회원가입 후 로그인 페이지로 이동
        } else {
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('오류:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
});
