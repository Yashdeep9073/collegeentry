<script setup>
import { onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useCollegeStore } from "../../store/collegeStore";
import fallbackImage from "../../assets/college-image.avif";
import { useRouter } from "vue-router";
const router = useRouter();

const collegeStore = useCollegeStore();

onMounted(async () => {
  await collegeStore.fetchColleges();
});

function goToCollege(college) {
  const slug = college.name.toLowerCase().replace(/\s+/g, "-"); // convert name → slug
  router.push(`/colleges/${slug}`);
}
</script>

<template>
  <div class="featured-container">
    <div class="section-header">
      <span></span>
      <h2>Popular Colleges</h2>
      <span></span>
    </div>

    <!-- Loading State -->
    <div v-if="collegeStore.loading" class="loading">Loading colleges...</div>

    <!-- Error State -->
    <div v-else-if="collegeStore.error" class="error">
      Failed to load colleges: {{ collegeStore.error }}
    </div>

    <!-- Slider (only if data available) -->
    <Swiper
      v-else
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
        v-for="(college, index) in collegeStore.collegeList"
        :key="college.id || index"
      >
       <div class="college-card" @click="goToCollege(college)">
          <img
            :src="college.details.thumbnail || fallbackImage"
            class="college-img"
            :alt="college.name"
          />
          <h3>{{ college.name }}</h3>
          <p class="location">{{ college.location }}</p>
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

.loading,
.error {
  text-align: center;
  font-size: 16px;
  color: #555;
  margin-top: 20px;
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
