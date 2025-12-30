<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

import fallbackImage from "../../assets/college-image.avif"; // fallback image

import { useRouter } from "vue-router";
const router = useRouter();

const API_URL_FETCH_ARTICLE = import.meta.env.VITE_FETCH_ALL_ARTICLE;

const articles = ref([]);

const fetchArticle = async () => {
  try {
    const response = await axios.get(API_URL_FETCH_ARTICLE);
    articles.value = response.data.data;
  } catch (error) {
    console.error("Error fetching Article:", error);
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
  <div class="featured-container">
    <div class="section-header">
      <h2>Latest Articles</h2>
    </div>

    <Swiper
      v-if="articles.length > 0"
      :modules="[Navigation, Autoplay]"
      class="college-slider"
      :slides-per-view="4"
      :space-between="25"
      :loop="true"
      :speed="800"
      :autoplay="{ delay: 2000, disableOnInteraction: false }"
      :navigation="{ nextEl: '.btn-next', prevEl: '.btn-prev' }"
      :breakpoints="{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }"
    >
      <SwiperSlide
        v-for="(article, index) in articles.slice(0, 10)"
        :key="article.id || index"
      >
        <div class="college-card mb-1 mt-1" @click="goToArticle(article)">
          <img
            :src="article.image || fallbackImage"
            class="college-img"
            alt="article image"
          />
          <h3>{{ article.title }}</h3>
          <p class="location">{{ article.category?.name || "General" }}</p>
        </div>
      </SwiperSlide>
    </Swiper>

    <div v-else class="loading">No Articles Available</div>
  </div>
</template>

<style scoped>
.featured-container {
  text-align: center;
  padding: 50px 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  width: 100%;
}

.section-header span {
  flex-grow: 1;
  height: 1px;
  background-color: #dcdcdc;
}

.section-header h2 {
  margin: 0 20px;
  font-size: 28px;
  font-weight: 600;
}

.college-slider {
  width: 90%;
  margin: auto;
}

/* College Card */
.college-card {
  /* Set a fixed height for consistency */
  height: 320px; /* Adjust this value as needed based on your design */

  /* Make it a Flex container to control vertical alignment */
  display: flex;
  flex-direction: column; /* Stack items vertically */
  justify-content: flex-start; /* Align content from the top */

  background: #fff;
  border-radius: 12px;
  overflow: hidden; /* Crucial: Hides content that exceeds the fixed height */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  cursor: pointer; /* Added cursor to signal clickability */
}

.college-card:hover {
  transform: translateY(-6px);
}

.college-img {
  width: 100%;
  height: 200px;
}

h3 {
  /* Enforce a fixed height for the heading area */
  height: 48px; /* Should accommodate 2-3 lines of text (e.g., 2 lines * 24px line-height) */

  margin-top: 12px;
  font-size: 18px;
  font-weight: 600;
  padding: 0 10px; /* Add some horizontal padding */

  /* Text Truncation for multiple lines (Cross-Browser) */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
}

.location {
  font-size: 14px;
  color: #777;
  margin-bottom: 15px;
  padding: 0 10px; /* Match horizontal padding with h3 */
  /* This ensures the location is always at the bottom of the content area */
}

.loading,
.error {
  text-align: center;
  color: #666;
  font-size: 16px;
  margin-top: 20px;
}
</style>
