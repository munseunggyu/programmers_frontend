class DarkModeToggle {
  isDarkMode = null;
  $DarkModeToggle = null;
  constructor({ $target, onSearch }) {
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    $DarkModeToggle.type = "checkbox";
    this.$DarkModeToggle = $DarkModeToggle;

    $DarkModeToggle.className = "dark-mode";
    $target.appendChild($DarkModeToggle);

    $DarkModeToggle.addEventListener("change", (e) => {
      console.log(e.target.checked);
      this.setColorMode(e.target.checked);
    });
    this.initColorMode();
  }
  render() {}

  initColorMode() {
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.$DarkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      "color-mode",
      isDarkMode ? "dark" : "light"
    );
  }
}
export default DarkModeToggle;
