class Loading {
  $Loading = null;
  data = null;
  constructor({ $target }) {
    const $Loading = document.createElement("div");
    this.$Loading = $Loading;

    $target.appendChild($Loading);

    this.data = {
      show: false,
    };
  }

  show() {
    this.setState({
      show: true,
    });
  }

  hide() {
    this.setState({
      show: false,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$Loading.innerHTML = `
      <div class="loading">
        <span>🔥loading🔥</span>
      </div>
      `;
    } else {
      this.$Loading.className = "";
      this.$Loading.innerHTML = null;
    }
  }
}
export default Loading;
