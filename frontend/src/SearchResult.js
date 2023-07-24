class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  loading = null;
  $parent = null;
  isInfiniteDiv = false;
  $infiniteDiv = null;
  observer = null;
  handleSearch = null;
  constructor({ $target, initialData, onClick, onSearch }) {
    this.handleSearch = onSearch;
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);
    this.$infiniteDiv = document.createElement("div");
    this.$parent = $target;

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
    if (this.$searchResult.innerHTML !== "") {
      const addData = this.data.map((cat) => {
        return `
          <li class="item" data-id=${cat.id}>
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `;
      });
      this.$searchResult.innerHTML = this.$searchResult.innerHTML + addData;
    } else {
      this.$searchResult.innerHTML = this.data
        .map((cat) => {
          return `
            <li class="item" data-id=${cat.id}>
              <img src=${cat.url} alt=${cat.name} />
            </li>
          `;
        })
        .join("");
    }

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.loading.show();
        api.detailFetchCat($item.dataset.id).then(({ data }) => {
          this.loading.hide();
          this.onClick(data);
        });
      });
    });
    if (!this.isInfiniteDiv && this.data.length > 0) {
      this.isInfiniteDiv = true;
      const handleSearch = this.handleSearch;
      this.$parent.appendChild(this.$infiniteDiv);
      this.observer = new IntersectionObserver(
        function observerFuc(entries, io) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              handleSearch();
            }
          });
        },
        {
          threshold: 1,
        }
      );
      setTimeout(() => {
        this.observer.observe(this.$infiniteDiv);
      }, 1000);
      this.isInfiniteDiv = true;
    }
  }
}
