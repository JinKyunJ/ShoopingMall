document.addEventListener("DOMContentLoaded", (event) => {
  const input = document.getElementById("s-word");
  const SearchForm = document.getElementById("SearchForm");
  const SearchBox = document.getElementsByClassName("Search-Box")[0];
  const searchList = localStorage.getItem("recentSearch");
  const DeleteBtn = document.getElementById("DeleteBtn");
  let searchArray = [];

  // localstorage에 최근검색어 있을 경우 searchArray 배열에 저장
  if (searchList) {
    JSON.parse(searchList).forEach((word) => {
      searchArray.unshift(word);
    });
  }

  // 검색했을 때 로컬스토리지에 검색어, 주소 저장
  function SetLocalStorage(e) {
    // 검색어가 없을 때
    if (!input.value) {
      alert("검색어를 입력해주세요.");
      e.preventDefault();
      return false;
    }

    // 최근 검색어 최대 갯수
    searchArray.length = 7;

    // 최근 검색어 중복 삭제
    searchArray = searchArray.filter((word) => {
      if (word !== input.value) {
        return word;
      }
    });
    searchArray.unshift(input.value);

    localStorage.setItem("recentSearch", JSON.stringify(searchArray));
    ShowRecentSearch();
    input.value = "";
  }

  // 최근 검색어 있을 경우 최근 검색어 영역 생성
  function CreateRecentArea() {
    const RecentSearch = document.createElement("section");
    let html = "";
    RecentSearch.className = "Recent-Search";

    html += `
      <div class="Recent-Search">
        <div class="Title-Box">
          <h2>최근 검색어</h2>
          <button type="button" id="DeleteBtn">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
          </button>
        </div>
        <ul id="RecentSearchList" class="Search-List Recent-List">
        </ul>
      </div>    
    `;

    RecentSearch.innerHTML = html;
    SearchBox.after(RecentSearch);

    // 최근 검색어 모두 삭제
    function DeleteList(e) {
      e.preventDefault();
      alert("최근 검색어가 모두 삭제됩니다.");
      const RecentArea = document.getElementsByClassName("Recent-Search")[0];
      RecentArea.remove();
      localStorage.removeItem("recentSearch");
    }
    document.getElementById("DeleteBtn").addEventListener("click", DeleteList);
  }

  // 로컬스토리지에 있는 최근검색어 노출
  function ShowRecentSearch() {
    const RecentArea = document.getElementById("RecentSearchList");
    let html = "";

    searchArray.forEach((word) => {
      html += `
        <li><a href="/search?s-word=${word}">${word}</a></li>
      `;
    });

    RecentArea.innerHTML = html;
  }

  SearchForm.addEventListener("submit", SetLocalStorage);
  if (searchList) {
    CreateRecentArea();
    ShowRecentSearch();
  }
});
