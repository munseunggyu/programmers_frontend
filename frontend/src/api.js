const API_ENDPOINT = "http://localhost:4001";

const api = {
  fetchCats: async (keyword) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    const data = await res.json();
    return data;
  },
  randomFetchCat: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    const data = await res.json();
    return data;
  },
};
