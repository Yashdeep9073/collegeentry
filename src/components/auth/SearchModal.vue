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

    images.value = result.data
      .filter((item) => item.category === "BANNER")
      .map((item) => encodeURI(item.url));

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
const popular = ref([
  { name: "FDDI AIST", type: "Exam" },
  { name: "MAH MArch CET", type: "Exam" },
  { name: "Lucknow University Entrance Exam", type: "Exam" },
  { name: "HPU B.Ed Entrance Exam", type: "Exam" },
  { name: "BCA [Bachelor of Computer Application]", type: "Course" },
  { name: "Master's in City Planning (MCP)", type: "Course" },
]);

function openSearchModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}


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
      <div class="search-box" @click="openSearchModal">
        <input
          class="text-black"
          type="text"
          v-model="searchText"
          :placeholder="placeholderText"
          readonly
        />
        <button @click.stop="openSearchModal">
          <i class="fa fa-search"></i> Search
        </button>
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

  <!-- Full Page Search Modal -->
  <div v-if="showModal" class="modal-page">
    <div class="modal-header">
      <input
        type="text"
        v-model="searchText"
        placeholder="Search Colleges, Courses, Exams"
      />
      <button class="search-btn">Search</button>
      <button class="close-btn" @click="closeModal">&times;</button>
    </div>

    <p class="hint">Type 3 or more characters for search results</p>

  

    <div class="section popular">
      <div class="section-header">
      
        <strong>Popular Searches</strong>
      </div>
      <ul>
        <li v-for="(p, index) in popular" :key="index">
          <span>{{ p.name }}</span>
          <span class="type">{{ p.type }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* ---------- Banner ---------- */
.banner {
  height: 450px;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: background 0.5s ease-in-out;
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

/* ---------- Tabs ---------- */
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

/* ---------- Search Box ---------- */
.search-box {
  display: flex;
  width: 60%;
  max-width: 600px;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
}

.search-box input {
  flex: 1;
  border: none;
  padding: 12px;
  font-size: 16px;
}

.search-box button {
  background: #ff5c00;
  border: none;
  padding: 12px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

/* ---------- Full Page Modal ---------- */
.modal-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f3f2ef;
  padding: 80px 120px;
  z-index: 2000;
  overflow-y: auto;
  box-sizing: border-box;
}

.modal-header {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 20px auto;
}

.modal-header input {
  flex: 1;
  padding: 14px 16px;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.search-btn {
  background: #ff5c5c;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 0 4px 4px 0;
  font-weight: bold;
  cursor: pointer;
}

.close-btn {
  background: none;
  border: none;
  font-size: 26px;
  margin-left: 12px;
  cursor: pointer;
  color: #444;
}

.hint {
  color: #666;
  margin: 10px auto 30px auto;
  font-size: 15px;
  max-width: 1100px;
}

/* ---------- Sections ---------- */
.section {
  max-width: 1100px;
  margin: 0 auto 40px auto;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  margin-bottom: 10px;
}

.section-header .clear {
  margin-left: auto;
  color: #ff5c5c;
  cursor: pointer;
  font-size: 14px;
}

.section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section ul li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  font-size: 15px;
}

.section ul li:first-child {
  border-top: none;
}

.type {
  color: #777;
  font-size: 14px;
}
</style>
