const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRamdomSearch }) {
    const $searchContainer = document.createElement("section");
    $searchContainer.classList.add("search_container");
    const $searchInput = document.createElement("input");
    $searchInput.autofocus = "on";
    $searchInput.autocomplete = "on";
    $searchInput.id = "name";

    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    const $randomSearchBtn = document.createElement("button");
    $randomSearchBtn.textContent = "랜덤";

    $randomSearchBtn.addEventListener("click", () => {
      onRamdomSearch();
    });

    $searchInput.className = "SearchInput";

    $target.appendChild($searchContainer);
    $searchContainer.appendChild($searchInput);
    $searchContainer.appendChild($randomSearchBtn);

    $searchInput.addEventListener("keypress", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    $searchInput.addEventListener("click", (e) => {
      e.target.value = "";
    });

    console.log("SearchInput created.", this);
  }
  render() {}
}
export default SearchInput;
