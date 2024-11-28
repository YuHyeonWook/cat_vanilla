export default function App() {
  const $keyword = document.querySelector(".keyword");
  const $keywords = document.querySelector(".keywords");
  const $searchResults = document.querySelector(".search-results");

  $keyword.addEventListener("keyup", (event) => {
    const { value } = event.target;
    const { key } = event;
    console.log(value);

    if (key === "Enter") {
      fetch(
        `https://lc6g0r0d5a.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats/search?q=${value}`
      )
        .then((res) => res.json())
        .then((results) => {
          console.log(results);
          if (results.data) {
            results.data.forEach((cat) => {
              const article = document.createElement("article");
              const img = document.createElement("img");
              img.src = cat.url;
              article.appendChild(img);
              $searchResults.appendChild(article);
            });
          }
        });
    }
  });
}
