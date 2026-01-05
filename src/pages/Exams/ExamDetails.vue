<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const VITE_EXAM_BY_NAME = import.meta.env.VITE_FETCH_EXAM_BY_NAME;
const iconUrl = ref("");
const officialWebsite = ref("");

const route = useRoute();
const slug = route.params.slug;

// Convert slug into actual readable name for backend API
const actualName = slug.replace(/-/g, " ");

// Header Dynamic Data
const examName = ref("");
const examFullName = ref("");
const courseIconClass = ref("fas fa-flask text-4xl");

// Static Author & Body Content
const authorName = ref("Shristi T");
const aboutText = ref({});
const overview = ref([]);

// New: Exam Highlights
const examHighlights = ref([]);
const courseOffered = ref([]);

// Fetch Exam / College by Name
const fetchExam = async () => {
  try {
    const res = await axios.get(
      `${VITE_EXAM_BY_NAME}${encodeURIComponent(actualName)}`
    );

    const data = res.data.data;

    // Only update header fields (NOT UI)
    examName.value = data.shortName || data.name || "N/A";
    examFullName.value = data.name || "";

    if (data.category?.icon) {
      iconUrl.value = data.category.icon; // store the image URL
    } else {
      // fallback icon
      courseIconClass.value = "fas fa-flask text-4xl";
    }
    officialWebsite.value = data.officialWebsite || "";

    // If overview text exists
    if (data.description) {
      aboutText.value = data.description;
    }
    examHighlights.value = [
      { label: "Exam Name", value: data.name || "N/A" },
      { label: "Short Name", value: data.shortName || "N/A" },
      { label: "Exam Level", value: data.level || "N/A" },
      { label: "Mode of Exam", value: data.mode || "N/A" },
      { label: "Official Website", value: data.officialWebsite || "N/A" },
    ];

    overview.value = data.overview || [];

    courseOffered.value = data.courseOffered || [];
  } catch (err) {
    console.error("Error fetching exam by name:", err);
  }
};

onMounted(() => {
  fetchExam();
});

watch(
  examName,
  () => {
    if (examName.value) {
      document.title = `${examName.value} | College Entry`;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <div
        class="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200"
      >
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div class="flex items-start sm:items-center space-x-4 flex-grow">
            <div class="p-3 rounded-xl bg-red-100 border-2 border-red-300">
              <img
                v-if="iconUrl"
                :src="iconUrl"
                class="w-10 h-10 object-contain"
              />

              <i v-else :class="courseIconClass" class="text-red-600"></i>
            </div>

            <div>
              <h1
                class="text-xl sm:text-2xl font-extrabold text-gray-800 leading-tight"
              >
                <span class="text-red-700">{{ examName }}</span
                >:
                {{ examFullName }}
              </h1>
            </div>
          </div>

          <div class="flex space-x-3 w-full sm:w-auto justify-end">
            <a
              :href="officialWebsite"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center space-x-2 py-2.5 px-5 border border-red-400 text-red-600 font-semibold rounded-lg shadow-sm hover:bg-red-50 transition"
            >
              <span>Apply Now</span>
              <i class="fas fa-file-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-8"
      >
        <div class="space-y-4 text-gray-700 leading-relaxed">
          <h3 class="text-xl font-bold">Description</h3>
          <p v-html="aboutText"></p>
        </div>

        <div class="pt-4 border-t border-gray-200">
          <h3 class="text-xl font-bold mb-4">Exam Highlights</h3>
          <div
            class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <tbody>
                <tr
                  v-for="(item, index) in examHighlights"
                  :key="index"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td
                    class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3"
                  >
                    {{ item.label }}
                  </td>
                  <td class="px-6 py-3 text-sm text-gray-700 w-2/3 break-words">
                    <a
                      v-if="item.label === 'Official Website'"
                      :href="'https://' + item.value"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-red-600 hover:text-red-800 hover:underline"
                    >
                      {{ item.value }}
                    </a>
                    <span v-else>{{ item.value }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Course Offered Section -->
        <div class="pt-4 border-t border-gray-200">
          <h3 class="text-xl font-bold mb-4">Courses Offered</h3>

          <div
            class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-sm font-bold text-gray-900"
                  >
                    Stream
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-bold text-gray-900"
                  >
                    Courses
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(item, index) in courseOffered"
                  :key="index"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td class="px-6 py-3 text-sm font-medium text-gray-800">
                    {{ item.Stream }}
                  </td>
                  <td class="px-6 py-3 text-sm text-gray-700">
                    {{ item.Courses }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Overview Section -->
        <div class="pt-6 border-t border-gray-300">
          <h3 class="text-2xl font-bold mb-4">Overview</h3>

          <div v-for="(item, index) in overview" :key="index" class="mb-8">
            <!-- Title -->
            <h4 class="text-xl font-semibold text-gray-900 mb-2">
              {{ item.title }}
            </h4>

            <!-- Description HTML -->
            <div
              class="text-gray-700 leading-relaxed"
              v-html="item.description"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-blue-100 {
  background-color: #e6f0ff;
}
</style>
