<script setup>
import { ref, onMounted } from "vue";

const API_URL_FETCH_WEBSITE_MEDIA = import.meta.env.VITE_FETCH_WEBSITE_MEDIA;
import { useMediaStore } from "../../store/mediaStore";
const mediaStore = useMediaStore();
const showModal = ref(false);

const images = ref([]);
const currentIndex = ref(0);

onMounted(async () => {
  try {
    const res = await fetch(API_URL_FETCH_WEBSITE_MEDIA);

    const result = await res.json();

    // Filter only BANNER images
    images.value = result.data
      .filter((item) => item.category === "BANNER")
      .map((item) => encodeURI(item.url));

    // If no banner returned, fallback to default
    if (images.value.length === 0) {
      images.value = [
        "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg",
      ];
    }

    setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % images.value.length;
    }, 4000);
  } catch (error) {
    console.log("Banner Fetch Error:", error);
  }
});

const tabs = ["Colleges", "Exams", "Courses"];
const activeTab = ref("Colleges");
const placeholderText = ref("Enter College Name");

function changeTab(tab) {
  activeTab.value = tab;
  placeholderText.value =
    tab === "Colleges"
      ? "Enter College Name"
      : tab === "Exams"
      ? "Enter Exam Name"
      : "Enter Course Name";
}

const searchText = ref("");
// function handleSearch() {
//   alert(`${activeTab.value} search: ${searchText.value}`);
// }
</script>

<template>
  <div
    v-if="images.length"
    class="banner"
    :style="`background-image: url('${images[currentIndex]}')`"
  >
    <div class="overlay">
      <h1>College Entry: One Platform. Endless Educational Possibilities</h1>

      <!-- Tabs -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: activeTab === tab }"
          @click="changeTab(tab)"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Search Box -->
      <div class="search-box">
        <input
          class="text-black"
          type="text"
          v-model="searchText"
          :placeholder="placeholderText"
        />
        <button>Search</button>
      </div>

      <div class="dots">
        <span
          v-for="(img, i) in images"
          :key="i"
          :class="{ active: currentIndex === i }"
          @click="currentIndex = i"
        ></span>
      </div>
    </div>
  </div>

  <!-- Optional: show loading state -->
  <div v-else class="banner-loading">Loading banners...</div>
</template>

<style>
.banner {
  height: 450px;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: background 0.5s ease-in-out;
}

.dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dots span {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  opacity: 0.6;
  cursor: pointer;
  transition: 0.3s;
}

.dots span.active {
  background: #ff4d4f;
  opacity: 1;
  transform: scale(1.15);
}
.overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  text-align: center;
  color: white;
  padding: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: bold;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 22px;
  border-radius: 6px;
  background: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  color: #333;
}

.tabs button.active {
  background: #0055ff;
  color: white;
}

/* Search box */
.search-box {
  display: flex;
  width: 60%;
  max-width: 600px;
  background: white;
  border-radius: 6px;
  overflow: hidden;
}

.search-box input {
  flex: 1;
  border: none;
  padding: 12px;
  font-size: 16px;
}

.search-box input:focus {
  outline: none;
}

.search-box button {
  background: #ff5c00;
  border: none;
  padding: 12px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
