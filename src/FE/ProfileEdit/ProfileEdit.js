/** 페이지 로드 시 사용자 정보를 요청하여 아이디(이메일), 이름 필드 채우기 */
document.addEventListener('DOMContentLoaded', async () => {
    // DOMContentLoaded: HTML 문서가 완전히 로드, 분석 후 발생 - 스타일시트, 이미지, 하위 프레임의 로드는 기다리지 않음
    // DOM 트리가 준비된 직후에 실행하고자 하는 코드를 작성할 때 유용
    try {
        const response = await fetch('/get-user-info');
        if (response.ok) {
            const userInfo = await response.json();
            document.getElementById('email').value = userInfo.email;
            document.getElementById('name').value = userInfo.name;
        } else {
            alert('사용자 정보를 불러오는데 실패했습니다.');
        }
    } catch (error) {
        console.error('오류:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
});

/** back 버튼 클릭 시 홈으로 이동 */
const OnBackButton = document.querySelector('.head-back-button');
OnBackButton.addEventListener('click', () => {
    window.location.href = '/home';
});

/** cart 버튼 클릭 시 장바구니 페이지로 이동 */
const OnCartButton = document.querySelector('.head-cart-button');
OnCartButton.addEventListener('click', () => {
    window.location.href = '/cart';
});

/** 현재 비밀번호 검증 */
const currentPasswordInput = document.getElementById('current-password');
currentPasswordInput.addEventListener('blur', async () => {
    // blur: 포커스를 잃을 때 발생
    const currentPassword = currentPasswordInput.value;
    /** 에러 메시지 태그 */
    const errorSpan = document.getElementById('current-password-error');
    if (currentPassword) {
        try {
            const response = await fetch('/check-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: currentPassword })
            });
            const result = await response.json();
            if (!result.valid) {
                // 현재비밀번호와 입력한 비밀번호가 다를때
                errorSpan.textContent = '현재 비밀번호를 확인해 주세요.';
            } else {
                errorSpan.textContent = '';
            }
        } catch (error) {
            console.error('오류:', error);
            alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    } else {
        // 비밀번호를 입력하지 않았을때
        errorSpan.textContent = '비밀번호를 입력주세요.';
    }
});

/** 새 비밀번호 검증 */
const newPasswordInput = document.getElementById('new-password');
newPasswordInput.addEventListener('input', () => {
    // input: 요소의 value(값)가 바뀔 때 발생
    const newPassword = newPasswordInput.value;
    /** 에러 메시지 태그 */
    const errorSpan = document.getElementById('new-password-error');

    /** 새 비밀번호 길이 확인 */
    if (newPassword.length > 0 && newPassword.length < 10) {
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

/** 새 비밀번호 확인 검증 */
const confirmPasswordInput = document.getElementById('confirm-new-password');
/** 에러 메시지 태그 */
const errorSpan = document.getElementById('confirm-new-password-error');

confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.value !== newPasswordInput.value) {
        errorSpan.textContent = '동일한 비밀번호를 입력해주세요.';
    } else {
        errorSpan.textContent = '';
    }
});

/** 이름 필드 검증 */
const nameInput = document.getElementById('name');
nameInput.addEventListener('input', () => {
    /** 에러 메시지 태그 */
    const errorSpan = document.getElementById('name-error');
    if (!nameInput.value.trim()) {
        // trim(): 공백을 제거하는 함수
        errorSpan.textContent = '이름을 입력해주세요.';
    } else {
        errorSpan.textContent = '';
    }
});

/** 탈퇴하기 버튼 클릭 시 모달 창 띄우기, 예 클릭 시 탈퇴, 아니오 클릭 시 모달 창 닫기 */
const OndeleteButton = document.querySelector('.delete-button');
const deleteModal = document.querySelector('.delete-modal');
const OnconfirmDeleteButton = document.querySelector('.confirm-delete');
const OncancelDeleteButton = document.querySelector('.cancel-delete');

OndeleteButton.addEventListener('click', () => {
    deleteModal.style.display = 'block';
});

OncancelDeleteButton.addEventListener('click', () => {
    deleteModal.style.display = 'none';
});

OnconfirmDeleteButton.addEventListener('click', async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 막기

    try {
        const response = await fetch('/delete-user', {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('회원 탈퇴가 완료되었습니다.');
            window.location.href = '/home';
        } else {
            alert('탈퇴 처리에 실패했습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('오류 발생:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
});

/** 수정하기 버튼 클릭 시 수정한 내용 API로 전송하여 서버에 반영*/
const profileEditForm = document.getElementById('profile-edit-form');
profileEditForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 막기

    // 유효성 검사 위해 각각의 값 가져오기
    const email = document.getElementById('email').value;
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const name = document.getElementById('name').value;

    try {
        /** 서버에 사용자 정보 수정 요청 */
        const response = await fetch('/edit-user-info', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                currentPassword,
                newPassword,
                name
            })
        });

        if (response.ok) {
            alert('사용자 정보가 수정되었습니다.');
            window.location.href = '/home';
        } else {
            alert('사용자 정보 수정에 실패했습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('오류:', error);
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
});
