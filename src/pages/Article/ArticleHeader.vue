<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import fallbackImage from "../../assets/college-image.avif"; // fallback image

import { useRouter } from "vue-router";
const router = useRouter();

const API_URL_FETCH_ARTICLE = import.meta.env.VITE_FETCH_ALL_ARTICLE;

const articles = ref([]);
const loading = ref(true);

const fetchArticle = async () => {
  loading.value = true;
  try {
    const response = await axios.get(API_URL_FETCH_ARTICLE);
    // Limit to 4 articles to match the target UI layout
    articles.value = response.data.data.slice(0, 4);
  } catch (error) {
    console.error("Error fetching Article:", error);
    // Optionally set an error state here
  } finally {
    loading.value = false;
  }
};

onMounted(fetchArticle);

const goToArticle = (article) => {
  const slug = article.slug || article.title.toLowerCase().replace(/\s+/g, "-");

  router.push(`/article/${slug}`);

  searchInput.value = "";
  searchResults.value = [];
};
</script>

<template>
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div
      class="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100"
    >
      <h2 class="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
        TRENDING ARTICLES
      </h2>

      <div v-if="loading" class="text-center py-10 text-gray-500">
        Loading trending articles...
      </div>

      <div
        v-else-if="articles.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="(article, index) in articles"
          :key="article.id || index"
          class="article-card group"
          @click="goToArticle(article)"
        >
          <div class="relative overflow-hidden rounded-t-md h-40">
            <div
              class="absolute inset-0 bg-black/10 z-10 flex items-start justify-start p-2"
            >
              <svg
                class="w-6 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 0 0"
              >
                <path
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 7.707L12 14.414 7.293 9.707a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414z"
                />
              </svg>
            </div>

            <img
              :src="article.image || fallbackImage"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              alt="article image"
            />
          </div>

          <div class="p-4 flex flex-col justify-start h-35">
            <h3
              class="text-base font-semibold text-gray-900 mb-2 two-line-clamp"
              :title="article.title"
            >
              {{ article.title }}
            </h3>

            <div>
              <p class="text-xs text-gray-500 mt-2">
                {{ article.category?.name || "General" }}
              </p>
              <p class="text-sm font-medium text-gray-600 mt-0.5">
                {{ article.admin?.name || "Unknown Author" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!loading" class="text-center py-10 text-gray-500">
        No Trending Articles Available
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-card {
  /* Applying the visual styles directly via utility classes */
  background-color: #ffffff; /* bg-white */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  border-width: 1px; /* border */
  border-color: #e5e7eb; /* border-gray-200 */
  cursor: pointer; /* cursor-pointer */
  overflow: hidden; /* overflow-hidden */
  transition: all 0.3s ease-in-out; /* transition-all duration-300 */

  /* Hover effect styles (combined into one rule for simplicity) */
  transform: translateY(0); /* initial state for transition */

  /* 2. OPTIMIZED CARD HEIGHT: Reduced fixed height from 350px to 320px
     Calculation: Image (160px) + Content (160px) = 320px.
     This makes the card tighter without losing content.
  */
  height: 320px;
  display: flex;
  flex-direction: column;
}

/* Explicit hover state styles (equivalent to hover:shadow-lg hover:-translate-y-1) */
.article-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
  transform: translateY(-4px); /* -translate-y-1 (approx) */
}

/* Multi-line text truncation using Webkit properties */
.two-line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* limit to 2 lines */
}
</style>
