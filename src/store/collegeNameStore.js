// src/store/collegeNameStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useCollegeStore = defineStore("collegeNameStore", {
  state: () => ({
    college: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCollegeByName(name) {
      this.loading = true;
      this.error = null;
      this.college = null;

      try {
        const API = import.meta.env.VITE_FETCH_COLLEGE_BY_NAME;
        if (!API) throw new Error("VITE_FETCH_COLLEGE_BY_NAME is not set");

        // Use encodeURIComponent to safely send spaces/special chars
        const url = `${API}${encodeURIComponent(name)}`;
        const response = await axios.get(url);

        // API returns: { message: "...", data: [ {...} ] } (based on your sample)
        const payload = response.data;
        if (payload?.data) {
          // pick first element if array
          this.college = Array.isArray(payload.data) ? payload.data[0] : payload.data;
        } else {
          // fallback: maybe API returns single object
          this.college = payload;
        }
      } catch (err) {
        console.error("fetchCollegeByName error:", err);
        this.error = err?.response?.data?.message || err.message || "College not found";
      } finally {
        this.loading = false;
      }
    },
  },
});
