/** 이메일 중복 확인 API 함수 */
export async function checkEmail(email) {
    try {
        const response = await fetch('/check-email', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json(); // 변수에 할당 하지 않고 데이터 반환
        } else {
            /** 오류 처리 */
            const errorData = await response.json();
            alert('이메일 중복 확인에 실패했습니다. 다시 시도해주세요.');
            throw new Error(errorData.message || '이메일 중복 확인 실패');
        }
    } catch (error) {
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요');
    }
}

/** 주소 검색 API 함수 */
export async function searchAddress(address) {
    try {
        const response = await fetch(`/search-address?q=${address}`);
        if (response.ok) {
            return await response.json(); // 변수에 할당 하지 않고 데이터 반환
        } else {
            /** 오류 처리 */
            const errorData = await response.json();
            alert('주소 검색에 실패했습니다. 나중에 다시 시도해주세요.');
            throw new Error(errorData.message || '주소 검색 실패');
        }
    } catch (error) {
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
}

/** 회원가입 API 함수 */
export async function signupUser(email, password, name, address) {
    try {
        const response = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, name, address }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json(); // 변수에 할당 하지 않고 데이터 반환
        } else {
            /** 오류 처리 */
            const errorData = await response.json();
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
            throw new Error(errorData.message || '회원가입 실패');
        }
    } catch (error) {
        alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
}
