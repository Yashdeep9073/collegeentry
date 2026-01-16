import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchSeoByPath(path) {
  try {
    const res = await axios.get(`${API_BASE}/by-path`, {
      params: { path },
    });
    return res.data.data;
  } catch (err) {
    console.error("SEO fetch failed", err);
    return null;
  }
}
