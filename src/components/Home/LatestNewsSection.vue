<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { onMounted, ref } from "vue";
import axios from "axios";
const FETCH_NEWS_API = import.meta.env.VITE_FETCH_NEWS;

const news = ref([]);

const fetchNews = async () => {
  try {
    const response = await axios.get(FETCH_NEWS_API);
    news.value = response.data.data;
  } catch (error) {
    console.error("Error fetching News:", error);
  }
};

onMounted(fetchNews);
</script>

<template>
  <div class="featured-container">
    <div class="section-header">
      
      <h2>Latest News</h2>
   
    </div>

    <Swiper
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
      <SwiperSlide v-for="(news, index) in news" :key="index">
        <div class="college-card">
          <img :src="news.image" class="college-img" />

          <h3>{{ news.title }}</h3>
          <p class="location">{{ news.caption }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
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
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}
.college-card:hover {
  transform: translateY(-6px);
}

.college-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

h3 {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 600;
}

.location {
  font-size: 14px;
  color: #777;
  margin-bottom: 15px;
}

.custom-buttons {
  position: relative;
}
.btn-prev,
.btn-next {
  position: absolute;
  top: -60px;
  background: #fff;
  border: none;
  font-size: 25px;
  font-weight: bold;
  padding: 10px 16px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.25);
  transition: 0.3s;
}
.btn-prev:hover,
.btn-next:hover {
  background: #f26c6c;
  color: #fff;
}
.btn-prev {
  left: 10%;
}
.btn-next {
  right: 10%;
}

@media (max-width: 640px) {
  .btn-prev,
  .btn-next {
    top: -45px;
    font-size: 20px;
    padding: 8px 12px;
  }
  .college-img {
    height: 160px;
  }
}
</style>
