console.log("app is running!");

class App {
  $target = null;
  data = [];
  page = 1;
  keyword = "";

  constructor($target) {
    this.$target = $target;

    this.loading = new Loading({
      $target,
    });
    this.loading.render();

    this.darkmodetoggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.keyword = keyword;
        this.handleSearch();
      },
      onRamdomSearch: () => {
        this.loading.show();
        api.randomFetchCat().then(({ data }) => {
          this.loading.hide();
          this.setState(data);
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
      },
      onSearch: () => {
        this.page += 1;
        this.handleSearch();
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  handleSearch() {
    this.loading.show();
    api.fetchCats(this.keyword, this.page).then(({ data }) => {
      this.loading.hide();
      this.setState(data);
    });
  }
}
