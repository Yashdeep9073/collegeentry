<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const VITE_FETCH_COURSE_BY_STREAM = import.meta.env.VITE_COURSE_BY_STREAM;

const courseStreams = ref([]);
const searchInput = ref("");

const searchResults = ref([]);
const isSearching = ref(false);

// const trendingCourses = ref(["BBA", "BCA", "M.Des", "BDes", "BSc"]);

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const fetchStreamCourses = async () => {
  try {
    const res = await axios.get(VITE_FETCH_COURSE_BY_STREAM);

    courseStreams.value = res.data.data.map((stream) => ({
      id: stream.id,
      name: stream.name,
      slug: slugify(stream.name),
      icon: stream.icon,
      courses: stream.courses.map((course) => ({
        id: course.id,
        name: course.name,
        slug: slugify(course.name),
        degreeType: course.degreeType,
      })),
    }));

    buildFlatCourseList(); // ✅ important
  } catch (error) {
    console.error("Failed to fetch streams & courses", error);
  }
};

onMounted(fetchStreamCourses);

const goToCourseDetails = (courseSlug) => {
  router.push(`/${courseSlug}`);
};

const goToStreamCourses = (streamSlug) => {
  router.push(`/courses/${streamSlug}`);
};

const allCoursesFlat = ref([]);

const buildFlatCourseList = () => {
  allCoursesFlat.value = courseStreams.value.flatMap((stream) =>
    stream.courses.map((course) => ({
      ...course,
      streamName: stream.name,
      streamSlug: stream.slug,
    }))
  );
};

const searchCourses = () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchResults.value = [];
    return;
  }

  isSearching.value = true;

  searchResults.value = allCoursesFlat.value.filter((course) =>
    course.name.toLowerCase().includes(query)
  );

  isSearching.value = false;
};

const goToCourse = (course) => {
  router.push(`/${course.slug}`);
  searchResults.value = [];
  searchInput.value = "";
};
</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">
    <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div class="flex w-full flex-col sm:flex-row sm:space-x-4 relative">
        <!-- SEARCH INPUT -->
        <div class="flex-grow relative mb-4 sm:mb-0">
          <input
            v-model="searchInput"
            @input="searchCourses"
            type="text"
            placeholder="Search for a Course"
            class="w-full px-5 py-3 border border-gray-300 rounded-lg"
            style="height: 50px"
          />

          <!-- SEARCH RESULTS -->
          <div
            v-if="searchResults.length > 0"
            class="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl w-full z-50 max-h-60 overflow-y-auto"
          >
            <ul class="divide-y divide-gray-100">
              <li
                v-for="course in searchResults"
                :key="course.id"
                class="px-4 py-2 hover:bg-red-50 cursor-pointer"
                @click="goToCourse(course)"
              >
                <i
                  class="fa-solid fa-magnifying-glass text-red-500 text-xs mr-2"
                ></i>
                <span class="text-sm font-medium">
                  {{ course.name }}
                </span>
                <span class="text-xs text-gray-500 ml-2">
                  ({{ course.streamName }})
                </span>
              </li>
            </ul>
          </div>

          <!-- NO RESULTS -->
          <div
            v-if="searchInput && searchResults.length === 0 && !isSearching"
            class="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow p-3 text-gray-600 w-full z-50 text-sm"
          >
            <i class="fa-solid fa-circle-exclamation mr-2 text-red-500"></i>
            No courses found matching "{{ searchInput }}".
          </div>
        </div>

        <!-- SEARCH BUTTON -->
        <button
          class="sm:w-auto w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800 transition duration-150 shadow-md flex-shrink-0"
          style="height: 50px"
        >
          Search
        </button>
      </div>
    </div>

    <hr class="border-gray-200" />

    <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3
        class="text-xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200"
      >
        🧭 Explore course by stream
      </h3>

      <p class="text-gray-700 text-sm leading-relaxed mb-6">
        Deciding what course students want to pursue in India is a very
        important and difficult decision in every student's life. Courses in
        India are available in students in many streams and subjects, making it
        possible for the aspirants to pursue their dream careers.
      </p>

      <!-- <div class="text-center mb-6">
        <button
          class="text-blue-600 hover:text-blue-800 font-medium py-1 px-4 text-sm"
        >
          Show More
        </button>
      </div> -->

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="stream in courseStreams"
          :key="stream.id"
          class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm transition duration-300 hover:shadow-lg hover:border-blue-300"
        >
          <!-- HEADER -->
          <div class="flex items-center space-x-3 mb-4 border-b pb-3">
            <img
              v-if="stream.icon"
              :src="stream.icon"
              class="w-8 h-8 object-contain"
            />
            <i v-else class="fas fa-graduation-cap text-3xl text-blue-600"></i>

            <h4 class="text-lg font-semibold text-gray-800">
              {{ stream.name }}
            </h4>
          </div>

          <!-- COURSES -->
          <div class="flex flex-wrap gap-2 mb-3">
            <button
              v-for="course in stream.courses"
              :key="course.id"
              @click="goToCourseDetails(course.slug)"
              class="px-3 py-1 text-xs font-medium text-gray-700 border border-gray-400 rounded-md hover:bg-gray-100 transition duration-150"
            >
              {{ course.name }}
            </button>

            <span
              v-if="!stream.courses.length"
              class="text-xs text-gray-400 italic"
            >
              No courses available
            </span>
          </div>

          <!-- VIEW ALL -->
          <div class="mt-3 text-center">
            <button
              @click="goToStreamCourses(stream.slug)"
              class="text-sm font-medium text-blue-600 hover:underline"
            >
              View All {{ stream.name }} Courses
            </button>
          </div>
        </div>
      </div>

      <!-- <div class="mt-8 text-center">
        <button
          class="bg-gradient-to-r from-[#E04A00] via-[#FF5C00] to-[#FFA040] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-150"
        >
          <i class="fas fa-caret-down mr-2"></i> View All Streams
        </button>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
/* Add any specific styles here, or rely on global Tailwind imports */
</style>
