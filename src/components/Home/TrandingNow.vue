<script setup>
import { ref } from "vue";

const trendingList = ref([
  "BSTC Colleges in Rajasthan 2025",
  "CLAT 2026 Exam Dates Released",
  "Colleges for 60 to 70 Percentile in JEE Main 2025",
  "Colleges for 80 to 90 Percentile 2025",
  "Top MBA Colleges without CAT",
  "Best Engineering Colleges with Low Fees"
]);

// Duplicate list for seamless infinite scroll
const scrollingList = [...trendingList.value, ...trendingList.value];
</script>

<template>
  <div class="trending-container">
    <h2>Trending Now</h2>

    <div class="marquee">
      <div class="track">
        <span v-for="(item, index) in scrollingList" :key="index">
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trending-container {
  padding: 30px 0;
  text-align: center;
}

.trending-container h2 {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;
}

/* Outer Wrapper */
.marquee {
  width: 100%;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
}

/* Moving Content */
.track {
  display: inline-flex;
  gap: 45px;
  animation: scroll 25s linear infinite;
}

/* Items */
.track span {
  font-size: 18px;
  color: #155DFC;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: 0.2s;
}

.track span:hover {
  color: #ff4d4f;
}

/* Smooth Infinite Slide Animation */
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
