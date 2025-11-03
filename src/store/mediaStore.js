import { defineStore } from "pinia";
import { ref } from "vue";

export const useMediaStore = defineStore("mediaStore", () => {
  const mediaList = ref([]);
  const isLoaded = ref(false);

  async function fetchMedia() {
    if (isLoaded.value) return; // ✅ Prevent re-fetching

    try {
      const res = await fetch(import.meta.env.VITE_FETCH_WEBSITE_MEDIA);
      const data = await res.json();
      mediaList.value = data;
      isLoaded.value = true;
    } catch (err) {
      console.error("Media fetch failed:", err);
    }
  }

  return { mediaList, fetchMedia, isLoaded };
});
