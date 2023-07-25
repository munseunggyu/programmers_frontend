const API_ENDPOINT = "http://localhost:4001";

const REQUSET_ERROR = {
  400: { msg: "400 요청실패" },
  500: { msg: "500 요청실패" },
};

const api = {
  fetchCats: async (keyword, page) => {
    try {
      const res = await fetch(
        `${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}&limit=15`
      );
      console.log(res);
      console.log(res.status);
      if (res.status !== 200) {
        throw REQUSET_ERROR[res.status];
      } else {
        const data = await res.json();
        return data;
      }
    } catch (err) {
      console.log(err);
      alert(err.msg);
      return {
        data: null,
      };
    }
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
