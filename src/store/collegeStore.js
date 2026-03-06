import { defineStore } from "pinia";
import { ref } from "vue";

export const useCollegeStore = defineStore("collegeStore", () => {
  const collegeList = ref([]);
  const featuredColleges = ref([]);
  const isLoaded = ref(false);
  const loading = ref(false);
  const error = ref(null);

  async function fetchColleges() {
    if (isLoaded.value) return;

    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(import.meta.env.VITE_FETCH_COLLEGES_MEDIA);
      const data = await res.json();

      collegeList.value = Array.isArray(data) ? data : data.data || [];
      isLoaded.value = true;
    } catch (err) {
      console.error("College fetch failed:", err);
      error.value = err.message || "Failed to fetch colleges";
    } finally {
      loading.value = false;
    }
  }

  async function fetchFeaturedColleges() {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(import.meta.env.VITE_FETCH_FEATURED_COLLEGES);
      const data = await res.json();
      featuredColleges.value = data.data || [];
    } catch (err) {
      console.error("Featured college fetch failed:", err);
      error.value = err.message || "Failed to fetch featured colleges";
    } finally {
      loading.value = false;
    }
  }

  return { collegeList, featuredColleges, fetchColleges, fetchFeaturedColleges, isLoaded, loading, error };
});
