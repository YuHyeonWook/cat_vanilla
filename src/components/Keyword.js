export default function Keywords({
  $target,
  initialState = {
    cursor: 0,
    keywords: [],
  },
  onSelect,
}) {
  let isInit = false;
  this.state = initialState;

  this.render = () => {
    if (!isInit) {
      $target.addEventListener("click", (event) => {
        const $li = event.target.closest("li");

        if ($li) {
          const keyword = $li.textContent;

          if (keyword) {
            onSelect(keyword);
          }
        }
      });
      window.addEventListener("keyup", (event) => {
        const { key } = event;

        const { keywords, cursor } = this.state;

        if (key === "Enter") {
          onSelect(keywords[cursor]);
          return;
        }
        let nextCursor = cursor;

        if (key === "ArrowUp") {
          nextCursor = cursor - 1;
          if (nextCursor < 0) {
            nextCursor = keywords.length - 1;
          }
        } else if (key === "ArrowDown") {
          nextCursor = cursor + 1;
          if (nextCursor > keywords.length - 1) {
            nextCursor = 0;
          }
        }

        if (nextCursor !== cursor) {
          this.setState({
            ...this.state,
            cursor: nextCursor,
          });
        }
      });
      isInit = true;
    }
    if (
      !this.state ||
      !Array.isArray(this.state.keywords) ||
      this.state.keywords.length === 0
    ) {
      $target.style.display = "none";
      return;
    }

    $target.innerHTML = `<ul>
          ${this.state.keywords
            .map(
              (keyword, i) =>
                `<li class="${
                  this.state.cursor === i ? "active" : ""
                }">${keyword}</li>`
            )
            .join("")}
        </ul>`;

    $target.style.display = "block";
  };

  this.render();

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
}
