<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

/* ---------------- ROUTER ---------------- */
const router = useRouter();

/* ---------------- STATE ---------------- */
const courses = ref([]);
const activeCourseId = ref(null);
const loading = ref(false);

/* ---------------- API ---------------- */
const API_ALL_COURSE = import.meta.env.VITE_COURSE_BY_COURSE;

/* ---------------- FETCH COURSES ---------------- */
const fetchCourses = async () => {
  try {
    loading.value = true;
    const res = await axios.get(API_ALL_COURSE);
    courses.value = res.data.data || [];

    // select first course by default
    if (courses.value.length) {
      activeCourseId.value = courses.value[0].id;
    }
  } catch (error) {
    console.error("Failed to fetch courses", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCourses);

/* ---------------- COMPUTED ---------------- */
const activeCourse = computed(() =>
  courses.value.find((c) => c.id === activeCourseId.value)
);

/* ---------------- HELPERS ---------------- */
const setCourse = (id) => {
  activeCourseId.value = id;
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/* ---------------- NAVIGATION ---------------- */
const goToCourse = (course) => {
  router.push(`/${slugify(course.name)}`);
};
</script>

<template>
  <section class="py-14 bg-white">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        Trending Courses
      </h2>

      <!-- 🔄 Loading -->
      <div v-if="loading" class="text-gray-500 py-10">
        Loading courses...
      </div>

      <!-- ❌ Empty -->
      <div v-else-if="!courses.length" class="text-gray-500 py-10">
        No courses available
      </div>

      <!-- ✅ COURSE CHIPS -->
      <div
        v-else
        class="flex flex-wrap justify-center gap-3 mb-10"
      >
        <button
          v-for="course in courses"
          :key="course.id"
          @click="setCourse(course.id)"
          class="px-5 py-2 rounded-full border text-sm transition"
          :class="
            activeCourseId === course.id
              ? 'bg-gradient-to-r from-[#E04A00] via-[#FF5C00] to-[#FFA040] text-white'
              : 'bg-white text-gray-600 border-red-400 hover:bg-red-50'
          "
        >
          {{ course.name }}
        </button>
      </div>

      <!-- ✅ COURSE CARDS -->
      <transition name="fade" mode="out-in">
        <div
          v-if="activeCourse"
          :key="activeCourse.id"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
        >
          <div
            class="bg-white rounded-lg shadow-sm hover:shadow-md p-5 text-center transition hover:-translate-y-1 border cursor-pointer"
            @click="goToCourse(activeCourse)"
          >
            <p class="text-gray-800 font-semibold text-sm mb-1">
              {{ activeCourse.name }}
            </p>

            <p class="text-xs text-gray-500">
              {{ activeCourse.degreeType }}
            </p>

            <p class="text-xs text-gray-400 mt-1">
              Duration: {{ activeCourse.duration }}
            </p>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
