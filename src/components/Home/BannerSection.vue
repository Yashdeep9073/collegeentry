<script setup>
import { ref, onMounted } from "vue";

// ✅ Import Local Images
import banner1 from "../../assets/slider3.webp";
import banner2 from "../../assets/2.webp";
import banner3 from "../../assets/5.webp";
import banner4 from "../../assets/6.webp";
import banner5 from "../../assets/1.webp";

const showModal = ref(false);

// ✅ Just use local images array
const images = ref([banner1, banner2, banner3, banner4,banner5]);
const currentIndex = ref(0);

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
  }, 4000);
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

  <div v-if="showModal" class="modal-page">
    <div class="modal-header">
      <input
        type="text"
        v-model="searchText"
        placeholder="Search Colleges, Courses, Exams"
      />
      <button class="search-btn"><i class="fa fa-search"></i>Search</button>
      <button class="close-btn" @click="closeModal">&times;</button>
    </div>

    <p class="hint">Type 3 or more characters for search results</p>

    <div class="section popular">
      <div class="section-header">
        <span class="icon">⭐</span>
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

<style>
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
  cursor: pointer;
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

/* ---------- Full Page Modal ---------- */
/* ---------- Full Page Modal ---------- */
.modal-page{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f3f2ef;
  padding: 80px 120px; /* For large screens */
  z-index: 2000;
  overflow-y: auto;
  box-sizing: border-box;
}
.modal-page::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
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
  margin-bottom: 10px;
}

.section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section ul li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.section ul li .type {
  color: #777;
  font-size: 14px;
}

/* ------------------------------------ */
/* RESPONSIVE FIXES                     */
/* ------------------------------------ */
@media (max-width: 768px) {
  .modal-page {
    padding: 20px;
  }

  .modal-header {
    flex-wrap: nowrap;
    margin-bottom: 10px;
  }

  .modal-header input {
    padding: 12px;
  }

  .search-btn {
    padding: 12px 18px;
  }

  .close-btn {
    margin-left: 8px;
    font-size: 24px;
  }

  .hint {
    margin: 10px 0 20px 0;
    text-align: center;
  }

  .section,
  .section ul {
    padding: 0 10px;
  }
}

@media (max-width: 500px) {


   .search-box {
    width: 90%;
    max-width: 100%;
    flex-direction: column; /* stack input + button */
    border-radius: 6px;
    overflow: visible;
  }

  .search-box input {
    width: 100%;
    padding: 14px;
    border-radius: 6px 6px 0 0;
  }

  .search-box button {
   display: none;
  }
  .modal-header {
    flex-wrap: wrap;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
    position: relative;
  }

  .modal-header input {
    width: 100%;
    border: none;
    padding: 10px 15px;
    border-radius: 4px 4px 0 0;
  }

  .search-btn {
    width: 100%;
    padding: 12px;
    border-radius: 0 0 4px 4px;
    order: 1;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2001;
  }
  

  .section ul li {
    flex-direction: column;
    gap: 5px;
  }



  
 
}
</style>

<!-- <script setup>
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
      .filter((item) => item.category === "MAIN_BANNER")
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
</script> -->
