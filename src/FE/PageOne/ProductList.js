//<summary>
//TagId : 매개변수로 이동하려고하는 섹션(위치) id 입니다
// behavior : smooth는 scrollintoviw메소드의 속성입니다. 에니메이션의 방식을 정의하고 두가지 값중 선택합니다
//smooth는 부드럽게 이동 auto 즉시 이동
function OnScrollSection(TagId)
{
    document.getElementById(TagId).scrollIntoView({behavior : 'auto'});
}
//<summary>
//
document.addEventListener('DOMContentLoaded', () => {
    // '상품설명' 버튼
    const infoBtnClick = document.querySelector('.Category-Nav-btn:nth-child(1)');
    // '상세정보' 버튼
    const detailsBtnClick = document.querySelector('.Category-Nav-btn:nth-child(2)');

    // '상품설명' 버튼 클릭 시
    infoBtnClick.addEventListener('click', () => {
        OnScrollSection('product-info');
    });

    // '상세정보' 버튼 클릭 시
    detailsBtnClick.addEventListener('click', () => {
        OnScrollSection('more-details');
    });
});
