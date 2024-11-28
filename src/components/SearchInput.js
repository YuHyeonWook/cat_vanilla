export default function SearchInput({
  $target,
  initialState,
  onSearch,
  onBlur,
}) {
  let isInit = false;

  this.state = initialState;

  this.bindEvent = () => {
    $target.addEventListener("keyup", (event) => {
      const { key } = event;
      const { value } = event.target;

      if (value.length === 0) {
        return;
      }

      if (key === "Escape") {
        onBlur();
        return;
      }

      const ignoreKeyCodes = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Enter",
      ];

      if (!ignoreKeyCodes.includes(key)) {
        onSearch(value);
      }
    });

    $target.addEventListener("blur", () => {
      onBlur();
    });
  };
  this.render = () => {
    if (!isInit) {
      this.bindEvent();
      isInit = true;
    }

    $target.value = this.state;
  };

  this.render();

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
}
