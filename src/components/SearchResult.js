export default function SearchResult({ $target, initialState }) {
  this.state = initialState;

  this.render = () => {
    console.log("searchResult render");
    console.log(this.state);
    if (!this.state || !Array.isArray(this.state)) {
      return;
    }
    $target.innerHTML = this.state
      .map((cat) => `<article><img src="${cat.url}" /></article>`)
      .join("");
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render();
}
