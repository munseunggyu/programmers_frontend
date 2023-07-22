class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  loading = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.loading = new Loading({
      $target,
    });
    this.loading.render();

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map((cat) => {
        return `
          <li class="item" data-id=${cat.id}>
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `;
      })
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.loading.show();
        api.detailFetchCat($item.dataset.id).then(({ data }) => {
          this.loading.hide();
          this.onClick(data);
        });
      });
    });
  }
}
