const API_ENDPOINT = "http://localhost:4001";

const api = {
  fetchCats: async (keyword, page) => {
    const res = await fetch(
      `${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}&limit=15`
    );
    const data = await res.json();
    return data;
  },
  randomFetchCat: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    const data = await res.json();
    return data;
  },
  detailFetchCat: async (id) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
    const data = await res.json();
    return data;
  },
};
