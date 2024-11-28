const $keyword = document.querySelector(".keyword");
const $keywords = document.querySelector(".keywords");
const $searchResults = document.querySelector(".search-results");

$keyword.addEventListener("keyup", (e) => {
  const { value } = e.target;
  const { key } = e;

  if (key === "Enter") {
    fetch(
      `https://lc6g0r0d5a.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/keywords?q=${value}`
    )
      .then((res) => res.json())
      .then((results) => {
        if (results.data) {
          $searchResults.innerHTML = results.data
            .map((cat) => `<article><img src="${cat.url}" /></article>`)
            .join("");
        }
      });
  }
});
