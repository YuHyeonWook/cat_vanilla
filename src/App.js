import { fetchCats, fetchKeyword } from "./apis/getCat.js";
import Keywords from "./components/Keyword.js";
import SearchInput from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";

export default function App({ $target }) {
  this.state = {
    visibleSuggestion: false,
    keywords: [],
  };

  $target.innerHTML = `
     <header>
        <h1>고양이 사진 검색기</h1>
        <input class="keyword" autocomplete="off" />
      </header>
      <div class="keywords"></div>
      <div class="search-results"></div>`;

  const $keyword = document.querySelector(".keyword");
  const $keywords = document.querySelector(".keywords");
  const $searchResults = document.querySelector(".search-results");

  const searchParams = new URLSearchParams(location.search);

  const searchInput = new SearchInput({
    $target: $keyword,
    initialState: "",
    onSearch: async (keyword) => {
      const result = await fetchKeyword(keyword);
      keywords.setState({
        cursor: 0,
        keywords: result,
      });
    },
    onBlur: () => {
      keywords.setState({
        cursor: 0,
        keywords: [],
      });
    },
  });

  const keywords = new Keywords({
    $target: $keywords,
    onSelect: async (keyword) => {
      searchInput.setState(keyword);
      keywords.setState({
        cursor: 0,
        keywords: [],
      });
      const result = await fetchCats(keyword);
      searchResult.setState(result.data);
    },
  });

  const searchResult = new SearchResult({
    $target: $searchResults,
  });

  if (searchParams.has("q")) {
    const keywordByQuerystring = searchParams.get("q");
    handleSearch(keywordByQuerystring);
  }

  async function handleSearch(keyword) {
    searchInput.setState(keyword);

    const result = await fetchCats(keyword);
    searchResult.setState(result.data);
  }
}
