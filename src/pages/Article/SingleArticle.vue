<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const slug = ref(route.params.slug);

// Ensure this environment variable is correctly set in your project
const API_URL = import.meta.env.VITE_FETCH_ALL_ARTICLE; 

const article = ref(null);
const loading = ref(true);
const errorMessage = ref(null);

const fetchArticle = async () => {
  if (!slug.value) return;

  loading.value = true;
  errorMessage.value = null;

  try {
    const res = await axios.get(`${API_URL}/${slug.value}`);
    // Check if data exists and assign it
    article.value = res.data.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    // Provide a more user-friendly message
    errorMessage.value = "Oops! We couldn't find this article or there was a server error.";
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
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric' 
    });
};
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div v-if="loading" class="text-center">
        <div class="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-md border border-gray-100">
          <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-4 text-lg font-medium text-gray-700">Loading article content...</p>
        </div>
      </div>

      <div v-else-if="errorMessage" class="text-center">
        <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-md">
          <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
        </div>
      </div>
      
      <div v-else-if="article" class="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        
        <main class="lg:col-span-2">
          <div class="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-gray-100">
            
            <div class="flex justify-between items-center text-xs text-gray-500 mb-6 border-b pb-3">
              <div class="flex items-center space-x-4">
                <span class="font-semibold text-indigo-600">{{ article.admin?.name || 'Unknown Author' }}</span>
                <span>|</span>
                <span>{{ formatPublishDate(article.createdAt) }}</span>
              </div>
             
            </div>

            <header class="mb-8">
              <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                {{ article.title }}
              </h1>
              
              <div v-if="article.image" class="mb-6">
                <img
                  :src="article.image"
                  alt="Article main image"
                  class="w-full max-h-80 object-cover rounded-lg shadow-md border border-gray-200"
                />
              </div>

              <p class="text-base text-gray-600 italic mb-4 p-4 bg-indigo-50 rounded-lg  ">
                {{ article.caption }}
              </p>
            </header>
            
            <div
              class="article-content prose prose-lg prose-indigo max-w-none text-gray-800"
              v-html="article.content"
            ></div>

            <footer class="mt-8 pt-4 border-t border-gray-200">
              <p class="text-sm text-gray-400">
                Category: <span class="text-gray-600 font-medium">{{ article.category?.name || 'Uncategorized' }}</span>
              </p>
            </footer>
          </div>
        </main>

        <aside class="lg:col-span-1 mt-8 lg:mt-0 space-y-8">
          
          <div class="bg-white rounded-xl shadow-lg border border-gray-100">
            <div class="flex border-b border-gray-200">
              <button class="flex-1 py-3 text-sm font-semibold border-b-2 border-indigo-600 text-indigo-600">Recent Articles</button>
              <button class="flex-1 py-3 text-sm font-semibold text-gray-500 hover:text-gray-700">Popular Articles</button>
            </div>
            
            <ul class="divide-y divide-gray-100 p-4">
              <li class="py-3 flex items-start space-x-3">
                <div class="w-16 h-12 bg-gray-200 rounded-md flex-shrink-0 "></div>
                <p class="text-sm text-gray-700 hover:text-indigo-600 cursor-pointer transition">
                  Karnataka 2nd PUC Toppers List 2024: Science, Arts, Commerce (Placeholder)
                </p>
              </li>
              <li class="py-3 flex items-start space-x-3">
                <div class="w-16 h-12 bg-gray-200 rounded-md flex-shrink-0 "></div>
                <p class="text-sm text-gray-700 hover:text-indigo-600 cursor-pointer transition">
                  Bihar Board 12th Topper List 2024: Science, Commerce, Arts (Placeholder)
                </p>
              </li>
              </ul>
          </div>

      
        </aside>
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

/* Optional: Additional styling for paragraphs if 'prose' doesn't cover all cases. */
.article-content :deep(p) {
  margin-bottom: 1.25em; 
}
</style>