class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      const closeBtn = this.$imageInfo.querySelector(".close");
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hide();
      });
      const contentWrapper = this.$imageInfo.querySelector(".content-wrapper");

      contentWrapper.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      this.$imageInfo.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hide();
      });
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.$imageInfo.style.display = "block";
  }

  hide() {
    this.$imageInfo.style.display = "none";
  }
}

export default ImageInfo;
