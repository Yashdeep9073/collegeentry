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

        // Try direct call
        let response = null;
        const rawName = name.trim();
        const variants = [
          rawName,
          rawName.replace(/\s+/g, "-"),
          rawName.replace(/-/g, " "),
        ];

        for (const variant of [...new Set(variants)]) {
          try {
            const res = await axios.get(`${API}${encodeURIComponent(variant)}`);
            if (res.data?.data) {
              response = res;
              break;
            }
          } catch (e) {}
        }

        // If direct variants fail (e.g. "sanskaramuniversity" without spaces/hyphens), fallback to all colleges list
        if (!response) {
          const listApi =
            import.meta.env.VITE_FETCH_COLLEGES_MEDIA ||
            "https://api.collegeenroll.in/common/college/read";
          try {
            const listRes = await axios.get(listApi);
            const list = Array.isArray(listRes.data)
              ? listRes.data
              : listRes.data?.data || [];
            const cleanTarget = rawName.toLowerCase().replace(/[^a-z0-9]/g, "");

            const match = list.find((c) => {
              if (!c?.name) return false;
              const cClean = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
              const sClean = (c.shortName || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              return (
                cClean === cleanTarget ||
                sClean === cleanTarget ||
                cClean.includes(cleanTarget) ||
                cleanTarget.includes(cClean)
              );
            });

            if (match?.name) {
              try {
                response = await axios.get(`${API}${encodeURIComponent(match.name.trim())}`);
              } catch (e) {
                this.college = match;
                return;
              }
            }
          } catch (e) {}
        }

        if (!response) {
          throw new Error("College not found");
        }

        // API returns: { message: "...", data: [ {...} ] }
        const payload = response.data;
        if (payload?.data) {
          // pick first element if array
          this.college = Array.isArray(payload.data)
            ? payload.data[0]
            : payload.data;
        } else {
          this.college = payload;
        }
      } catch (err) {
        console.error("fetchCollegeByName error:", err);
        this.error =
          err?.response?.data?.message || err.message || "College not found";
      } finally {
        this.loading = false;
      }
    },
  },
});
