/** back 버튼 클릭 시 홈으로 이동 */
const onBackButton = document.querySelector('.head-back-button');

onBackButton.addEventListener('click', () => {
    /** 경로 '/홈 페이지' */
    window.location.href = '/home';
});

/** cart 버튼 클릭 시 장바구니 페이지 이동 */
const onCartButton = document.querySelector('.head-cart-button');

onCartButton.addEventListener('click', () => {
    /** 경로 '/장바구니 페이지' */
    window.location.href = '/cart';
});

/** 아이디(이메일) 및 중복확인 버튼 클릭 시 */
const onConfirmButton = document.querySelector('.confirm-button');
const emailInput = document.getElementById('email-input');
const emailError = document.getElementById('email-error');

onConfirmButton.addEventListener('click', async () => {
    const email = emailInput.value;

    /** 입력값 유효성 검사 */
    if (email.length === 0) {
        emailError.textContent = '아이디(이메일)을 입력해주세요.';
        return;
    } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        emailError.textContent = '이메일 형식으로 입력해주세요.';
    } else {
        emailError.textContent = ''; // 기존 에러 메시지 제거
    }

    try {
        const response = await fetch('/check-email', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data.exists) {
                alert('중복된 아이디(이메일)입니다. 다시 입력해주세요.');
            } else {
                alert('사용 가능한 아이디(이메일)입니다.');
            }
        } else {
            /** 오류 처리 */
            const errorData = await response.json();
            alert('회원가입에 실패했습니다.');
            throw new Error(errorData.message || '회원가입 실패');
        }
    } catch (error) {
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
});

/** 비밀번호 유효성 검사 */
const passwordInput = document.getElementById('password-input');
if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        // input: 요소의 value(값)가 바뀔 때 발생
        const password = passwordInput.value;
        /** 에러 메시지 태그 */
        const errorSpan = document.getElementById('password-error');

        /** 비밀번호 길이 확인 */
        if (password.length > 0 && password.length < 10) {
            errorSpan.textContent = '10자 이상 입력해주세요.';
        } else {
            /** 영문, 숫자, 특수문자(공백 제외) 포함 여부 확인 / 정규표현식 사용 */
            const hasLetter = /[a-zA-Z]/.test(newPassword); // 영문자 포함 여부
            const hasNumber = /[0-9]/.test(newPassword); // 숫자 포함 여부
            const hasSpecialChar = /[^a-zA-Z0-9]/.test(newPassword); // 특수 문자 포함 여부
            const isValidCombination = [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;
            // filter() 이용해서 각각 2개 이상 조합 참, 거짓인지 확인

            if (!isValidCombination) {
                errorSpan.textContent = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
            } else {
                errorSpan.textContent = '';
            }
        }
    });
}

/** 비밀번호 확인 검증 */
const confirmPasswordInput = document.getElementById('confirm-password-input');
if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener('input', () => {
        /** 에러 메시지 태그 */
        const errorSpan = document.getElementById('confirm-password-error');

        if (confirmPasswordInput.value !== passwordInput.value) {
            errorSpan.textContent = '동일한 비밀번호를 입력해주세요.';
        } else {
            errorSpan.textContent = '';
        }
    });
}

/** 이름 필드 검증 */
const nameInput = document.getElementById('name');
/** 에러 메시지 태그 */
const errorSpan = document.getElementById('name-error');

if (nameInput && errorSpan) {
    nameInput.addEventListener('input', () => {
        if (!nameInput.value.trim()) {
            // trim(): 공백을 제거하는 함수
            errorSpan.textContent = '이름을 입력해주세요.';
        } else {
            errorSpan.textContent = '';
        }
    });
}

/** 주소 검색 아이콘 클릭 시 */
const onSearchIcon = document.querySelector('.search-icon');
const addressInput = document.getElementById('address-input');

onSearchIcon.addEventListener('click', async (event) => {
    event.preventDefault();

    const address = addressInput.value;
    try {
        const response = await fetch(`/search-address?q=${address}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                addressInput.value = [0].address;
            } else {
                alert('검색 결과가 없습니다.');
            }
        } else {
            /** 오류 처리 */
            const errorData = await response.json();
            alert('주소 검색에 실패했습니다. 나중에 다시 시도해주세요.');
            throw new Error(errorData.message || '주소 검색 실패');
        }
    } catch (error) {
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
});

/** 가입하기 버튼 클릭 시 */
const onSignupForm = document.getElementById('signup-form');

onSignupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value;
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
            body: JSON.stringify({ email, password, name, address }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('회원가입이 성공적으로 완료되었습니다.');
            window.location.href = '../Login/Login.html'; // 회원가입 후 로그인 페이지로 이동
        } else {
            /** 오류 처리 */
            const errorData = await response.json();
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
            throw new Error(errorData.message || '회원가입 실패');
        }
    } catch (error) {
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
});
