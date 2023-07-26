import Loading from "./Loading.js";
import { api } from "./api.js";

class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  loading = null;
  $parent = null;
  isInfiniteDiv = false;
  $infiniteDiv = null;
  handleSearch = null;
  infiniteObserver = null;
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

  imgObserver = new IntersectionObserver(
    (entries, io) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log();
          entry.target.querySelector("img").src =
            entry.target.querySelector("img").dataset.src;
          // this.handleSearch();
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  render() {
    if (this.$searchResult.innerHTML !== "") {
      const addData = this.data
        .map((cat) => {
          return `
          <li class="item" data-id=${cat.id}>
            <img src=${cat.url} alt=${cat.name} data-src=${cat.url} />
          </li>
        `;
        })
        .join("");
      this.$searchResult.innerHTML = this.$searchResult.innerHTML + addData;
    } else {
      this.$searchResult.innerHTML = this.data
        .map((cat) => {
          return `
            <li class="item" data-id=${cat.id}>
              <img src="https://via.placeholder.com/200x300" data-src=${cat.url}  alt=${cat.name} />
            </li>
          `;
        })
        .join("");
    }

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      this.imgObserver.observe($item);
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
      this.infiniteObserver = new IntersectionObserver(
        (entries, io) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.handleSearch();
            }
          });
        },
        {
          threshold: 1,
        }
      );
      setTimeout(() => {
        this.infiniteObserver.observe(this.$infiniteDiv);
      }, 1000);
      //   this.isInfiniteDiv = true;
    }
  }
}

export default SearchResult;
