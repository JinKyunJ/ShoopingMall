const ViewProductPage= document.querySelectorAll(".Product");

//페이지 이동 버튼
ViewProductPage.forEach(product =>{
    product.addEventListener('click', ()=>{
        window.location.href = "ProductList.html";
    });
});


const modelCloseTime = 50000;
//장바구니 담기 버튼 클릭
document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelectorAll(".AddCart-btn").forEach(button =>{
        //모든 이벤트에 연결
        button.addEventListener('click',()=>{
            
            //모달 객체를 가져오고 id를 찾아서
            const model = document.getElementById('CartModal');
            model.classList.remove('hidden');
            model.classList.add ('show');
            
            //일정 시간 후에 모달을 자동으로 닫기
            setTimeout(()=>{
                //기능 정의
                model.classList.remove('show');
                model.classList.add('hidden');
            },modelCloseTime);
        });
    });
    //열려있는 모달 닫기 버튼
    document.getElementById("ButtonModel-btnClose").addEventListener('click', () => {
        const modal = document.getElementById("CartModal");
        modal.classList.remove('show');
        modal.classList.add('hidden');
    });
});
