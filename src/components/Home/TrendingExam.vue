<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const FETCH_ALL_EXAM_CATEGORY = import.meta.env.VITE_FETCH_ALL_EXAM_CATEGORY;
const FETCH_ALL_EXAMS = import.meta.env.VITE_FETCH_ALL_EXAM;

const router = useRouter();

// State
const examCategories = ref([]);
const activeCategoryId = ref(null);

// Fetch categories + exams
const fetchExamData = async () => {
  try {
    const [catRes, examRes] = await Promise.all([
      axios.get(FETCH_ALL_EXAM_CATEGORY),
      axios.get(FETCH_ALL_EXAMS),
    ]);

    const categories = catRes.data.data || [];
    const exams = examRes.data.data || [];

    examCategories.value = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      exams: exams.filter((e) => e.category?.id === cat.id),
    }));

    // set first category active by default
    if (examCategories.value.length) {
      activeCategoryId.value = examCategories.value[0].id;
    }
  } catch (err) {
    console.error("Error fetching exam data:", err);
  }
};

onMounted(fetchExamData);

// Helpers
const setCategory = (id) => {
  activeCategoryId.value = id;
};

const activeCategory = () =>
  examCategories.value.find((c) => c.id === activeCategoryId.value);

function goToExam(exam) {
  const title = exam.fullName || exam.name || exam.shortName;

  if (!title) {
    console.error("Invalid exam object:", exam);
    return;
  }

  const slug = title.toLowerCase().replace(/\s+/g, "-");
  router.push(`/exam/${slug}`);
}
</script>

<template>
  <section class="py-14 bg-[#f5f4f1]">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Trending Exams
      </h2>

      <!-- ✅ CATEGORY CHIPS -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button
          v-for="cat in examCategories"
          :key="cat.id"
          @click="setCategory(cat.id)"
          class="px-5 py-2 rounded-full border text-sm transition"
          :class="
            activeCategoryId === cat.id
              ? 'bg-gradient-to-r from-[#E04A00] via-[#FF5C00] to-[#FFA040] text-white'
              : 'bg-white text-gray-600 border-red-400 hover:bg-red-50'
          "
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- ✅ EXAMS UNDER SELECTED CATEGORY -->
      <transition name="fade" mode="out-in">
        <div
          v-if="activeCategory()"
          :key="activeCategoryId"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
        >
          <div
            v-for="exam in activeCategory().exams"
            :key="exam.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-md p-5 text-center transition hover:-translate-y-1 cursor-pointer border"
            @click="goToExam(exam)"
          >
            <p class="text-gray-800 font-medium text-sm">
              {{ exam.shortName || exam.name }}
            </p>
          </div>
        </div>
      </transition>

      <!-- NO EXAMS -->
      <p
        v-if="activeCategory() && !activeCategory().exams.length"
        class="text-gray-500 mt-6"
      >
        No exams available for this category.
      </p>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
