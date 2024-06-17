/*
페이지마다 다른 목록을 가지고싶어서 유동적으로 만들고자함.
 */
const pageMenu = {
    "home": ["추천", "신상품", "베스트", "알뜰쇼핑"],
    "products": ["전자제품", "가구", "의류", "액세서리"],
    "sales": ["오늘의 할인", "주간 특가", "시즌 오퍼", "기획전"],
    "Category" : ["밀키트", "샐러드", "..."]
};

const currentPage = "home";

function CreateMenu(menuItem)
{
    const menuList = document.getElementById("Menu");

    /*
    while (menuList.firstChild) {
        menuList.removeChild(menuList.firstChild);
    }*/

    menuItem.forEach(item => {
        const li = document.createElement('li'); //태그 생성
        const a = document.createElement('a');
        a.href="#";//
        a.textContent = item;
        li.appendChild(a);
       // menuList.appendChild(li);
    });
}
function getPageIdFinder()
{
    return document.body.getAttribute('data-page-id');
}
// 현재 페이지에 맞는 메뉴 생성
CreateMenu(pageMenu[currentPage]);