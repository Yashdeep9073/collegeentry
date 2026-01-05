<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

const route = useRoute();

const goToContactPage = () => {
  router.push("/contact-us");
};
const goToNotFoundPage = () => {
  router.push("/contact-us");
};
const slug = ref(route.params.slug);

// Ensure this environment variable is correctly set in your project
const API_URL = import.meta.env.VITE_FETCH_ARTICLE_BY_SLUG;

const article = ref(null);
const loading = ref(true);
const errorMessage = ref(null);

const fetchArticle = async () => {
  if (!slug.value) return;

  loading.value = true;
  errorMessage.value = null;

  try {
    const res = await axios.get(`${API_URL}/${slug.value}`);

    // ✅ Article found
    article.value = res.data.data;
  } catch (error) {
    console.error("Error fetching article:", error);

    // ✅ If article not found → redirect to 404
    if (error.response && error.response.status === 404) {
      router.replace({ name: "NotFound" });
      return;
    }

    errorMessage.value =
      "Oops! We couldn't load this article. Please try again later.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchArticle);

// Watch for changes in the route slug to fetch a new article
watch(
  () => route.params.slug,
  (newSlug) => {
    slug.value = newSlug;
    fetchArticle();
  }
);

// Helper function to format date as seen in the image (e.g., Dec 09, 2025)
const formatPublishDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const ADS_API = import.meta.env.VITE_FETCH_ADVERTISMENT_API;

const adBanners = ref([]);

// Fetch Advertisement Banners
const getAdvertisementBanners = async () => {
  try {
    const response = await axios.get(ADS_API);
    adBanners.value = response.data?.data || [];
  } catch (error) {
    console.error("Error fetching advertisement banners:", error);
  }
};

onMounted(() => {
  getAdvertisementBanners();
});

watch(
  article,
  (newArticle) => {
    if (newArticle?.title) {
      document.title = `${newArticle.title} | College Entry`;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center">
        <div
          class="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-md border border-gray-100"
        >
          <svg
            class="animate-spin h-8 w-8 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p class="mt-4 text-lg font-medium text-gray-700">
            Loading article content...
          </p>
        </div>
      </div>

      <div v-else-if="errorMessage" class="text-center">
        <div
          class="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-md"
        >
          <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
        </div>
      </div>

      <div v-else-if="article" class="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        <main class="lg:col-span-2">
          <div
            class="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-gray-100"
          >
            <div
              class="flex justify-between items-center text-xs text-gray-500 mb-6 border-b pb-3"
            >
              <div class="flex items-center space-x-4">
                <span>Author</span>
                <span class="font-semibold text-red-600">
                  {{ article.admin?.name || "Unknown Author" }}</span
                >
                <span>|</span>
                <span>{{ formatPublishDate(article.createdAt) }}</span>
              </div>
            </div>

            <header class="mb-8">
              <h1
                class="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4"
              >
                {{ article.title }}
              </h1>

              <div v-if="article.image" class="mb-6">
                <img
                  :src="article.image"
                  alt="Article main image"
                  class="w-full h-auto object-contain rounded-lg shadow-md border border-gray-200"
                />
              </div>

              <p
                class="text-base text-gray-600 italic mb-4 p-4 bg-indigo-50 rounded-lg"
              >
                {{ article.caption }}
              </p>
            </header>

            <div
              class="article-content prose prose-lg prose-indigo max-w-none text-gray-800"
              v-html="article.content"
            ></div>

            <!-- Overview Section -->
            <div
              v-if="article.overview && article.overview.length"
              class="mt-10 space-y-6"
            >
              <h2 class="text-2xl font-bold text-gray-900 border-b pb-2">
                Overview
              </h2>

              <div
                v-for="(item, index) in article.overview"
                :key="index"
                class="bg-gray-50 p-5 rounded-lg border border-gray-200"
              >
                <h3 class="text-lg font-semibold text-red-700 mb-2">
                  {{ item.title }}
                </h3>

                <div
                  class="prose prose-indigo max-w-none text-gray-800"
                  v-html="item.description"
                ></div>
              </div>
            </div>

            <footer class="mt-8 pt-4 border-t border-gray-200">
              <p class="text-sm text-gray-400">
                Category:
                <span class="text-gray-600 font-medium">{{
                  article.category?.name || "Uncategorized"
                }}</span>
              </p>
            </footer>
          </div>
        </main>

        <div class="lg:col-span-1">
          <div class="sticky top-4 space-y-6">
            <div
              class="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center"
            >
              Sponsored
            </div>

            <div
              v-for="ad in adBanners"
              :key="ad.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group"
            >
              <a
                :href="ad.link || '#'"
                :target="ad.target === 'BLANK' ? '_blank' : '_self'"
                class="block relative"
              >
                <img
                  :src="ad.imageUrl"
                  :alt="ad.title"
                  class="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500 ease-in-out"
                />
              </a>
            </div>

            <div
              class="bg-blue-50 border border-blue-100 p-5 rounded-lg text-center"
            >
              <h4 class="font-bold text-gray-800 mb-2">Need Counselling?</h4>
              <p class="text-sm text-gray-600 mb-4">
                Get expert guidance for admission 2025.
              </p>
              <button
                @click="goToContactPage"
                class="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-600 py-10">
        <p>No article data available.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles for images within the dynamic content */
.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.08); /* Slightly lighter shadow for inline content */
}

.article-content {
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* Optional: Additional styling for paragraphs if 'prose' doesn't cover all cases. */
.article-content :deep(p) {
  margin-bottom: 1.25em;
}
</style>
