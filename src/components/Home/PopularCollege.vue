<script setup>
import { onMounted, computed } from "vue"; // 👈 Import computed
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

// 🎯 NEW COMPUTED PROPERTY: Sorts colleges by ranking (lowest number first)
const sortedColleges = computed(() => {
  // 1. Create a shallow copy of the list to avoid mutating the original store state.
  const colleges = [...collegeStore.collegeList];

  // 2. Sort the list by the 'ranking' inside the 'details' object.
  return colleges.sort((a, b) => {
    // Handle potential missing or null rankings by treating them as a very high number (Infinity), 
    // which pushes them to the end of the list.
    const rankA = a.details?.ranking || Infinity;
    const rankB = b.details?.ranking || Infinity;

    // Sort Ascending (a - b) means the lowest number (best rank) comes first.
    return rankA - rankB;
  }).slice(0, 10); // Keep the slice here to only show the top 10 ranked colleges.
});
</script>

<template>
  <div class="featured-container">
    <div class="section-header">
      <h2>Popular Colleges</h2>
    </div>

    <div v-if="collegeStore.loading" class="loading">Loading colleges...</div>

    <div v-else-if="collegeStore.error" class="error">
      Failed to load colleges: {{ collegeStore.error }}
    </div>

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
        v-for="(college, index) in sortedColleges" :key="college.id || index"
      >
        <div class="college-card" @click="goToCollege(college)">
          <img
            :src="college.details.thumbnail || fallbackImage"
            class="college-img"
            alt="college image"
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
  object-fit: cover;
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
