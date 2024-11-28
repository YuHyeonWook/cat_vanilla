const API_URL = "https://lc6g0r0d5a.execute-api.ap-northeast-2.amazonaws.com";

const request = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchKeyword = (keyword) => {
  return request(`${API_URL}/dev/api/cats/keywords?q=${keyword}`);
};

export const fetchCats = (keyword) => {
  return request(`${API_URL}/dev/api/cats/search?q=${keyword}`);
};
