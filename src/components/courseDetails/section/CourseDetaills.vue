<script setup>
import { computed } from "vue";
import { useCourseStore } from "../../../store/CourseDetailsStore";

const courseStore = useCourseStore();

/* ---------------- DATA MAPPING ---------------- */
// Based on your JSON: course is data[0], details is courseDetails[0]
const course = computed(() => courseStore.course?.[0] || null);
const details = computed(() => course.value?.courseDetails?.[0] || null);

const authorName = "CollegeEntry Expert";

/* ---------------- FORMATTING HELPERS ---------------- */
const formatCurrency = (val) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
};

/* ---------------- TABLE OF CONTENTS ---------------- */
const tableOfContents = computed(() => {
  const toc = [];
  if (details.value?.overview)
    toc.push({ title: "What is this Course?", anchor: "#overview" });
  toc.push({ title: "Course Statistics", anchor: "#quick-summary" });
  if (details.value?.eligibility)
    toc.push({ title: "Eligibility Criteria", anchor: "#eligibility" });
  if (details.value?.learningOutcomes?.length)
    toc.push({ title: "Learning Outcomes", anchor: "#learning-outcomes" });
  if (details.value?.skillsGained?.length)
    toc.push({ title: "Skills Gained", anchor: "#skills" });
  if (details.value?.futureScope)
    toc.push({ title: "Future Scope", anchor: "#future-scope" });
  return toc;
});
const adminName = computed(
  () => course.value?.admin?.name || "CollegeEntry Expert"
);
</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50" v-if="course && details">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:sticky lg:top-20"
        >
          <h4 class="font-bold text-lg text-gray-800 mb-3">
            Table of Contents
          </h4>
          <ul class="space-y-2 text-gray-700 font-medium text-sm">
            <li v-for="item in tableOfContents" :key="item.anchor">
              <a
                :href="item.anchor"
                class="flex items-center hover:text-red-600 transition-colors"
              >
                <i class="fas fa-caret-right text-red-600 mr-2"></i>
                {{ item.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-8">
        <div
          class="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex items-center space-x-3 mb-8">
            <img
              :src="`https://placehold.co/40x40/003366/ffffff?text=${
                adminName?.charAt(0) || 'A'
              }`"
              class="w-10 h-10 rounded-full border"
            />

            <div class="text-sm">
              <p class="font-semibold text-gray-900">{{ adminName }}</p>
              <p class="text-xs text-blue-600">Verified Expert</p>
            </div>
          </div>

          <div id="overview" class="space-y-4 text-gray-700 leading-relaxed">
            <h2 class="text-2xl font-bold text-gray-900">
              What is {{ course.name }}?
            </h2>
            <div v-html="details.overview" class="prose max-w-none"></div>
          </div>

          <div id="quick-summary" class="mt-10">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              {{ course.name }} Course Details
            </h3>
            <div class="overflow-hidden border border-gray-200 rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50 w-1/3"
                    >
                      Degree
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ course.degreeType }}
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50"
                    >
                      Duration
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ course.duration }}
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50"
                    >
                      Age Limit
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      Minimum {{ details.age }} years
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50"
                    >
                      Subjects Required
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900 capitalize">
                      {{ details.subjectsRequired }}
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50"
                    >
                      Minimum Percentage
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ details.minimumPercentage }}%
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50"
                    >
                      Average Fees
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ formatCurrency(course.averageFees) }}
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 bg-gray-50"
                    >
                      Top Recruiters
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900 capitalize">
                      {{ details.topRecruiters }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div id="eligibility" class="mt-10 pt-8 border-t">
            <h2 class="text-xl font-bold text-gray-800 mb-4">
              Eligibility Criteria
            </h2>
            <p class="text-gray-700 mb-4 font-medium">
              {{ details.eligibility }}
            </p>
            <div class="space-y-4">
              <div
                v-for="(item, i) in details.eligibilityCriteria"
                :key="i"
                class="bg-blue-50/50 p-4 rounded-lg border border-blue-100"
              >
                <h4
                  class="font-bold text-gray-900 mb-1 text-sm uppercase tracking-tight"
                >
                  {{ item.title }}
                </h4>
                <p class="text-sm text-gray-600 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="details.learningOutcomes?.length"
            id="learning-outcomes"
            class="mt-10 pt-8 border-t"
          >
            <h2 class="text-xl font-bold text-gray-800 mb-4">
              Learning Outcomes
            </h2>
            <div class="grid gap-4">
              <div
                v-for="(outcome, i) in details.learningOutcomes"
                :key="i"
                class="p-5 border border-gray-100 rounded-xl bg-gray-50/50"
              >
                <div class="flex items-start">
                  <span
                    class="flex-shrink-0 w-6 h-6 bg-red-600 text-white text-xs rounded-full flex items-center justify-center mr-3 mt-1"
                    >{{ i + 1 }}</span
                  >
                  <div>
                    <h4 class="font-bold text-gray-800">{{ outcome.title }}</h4>
                    <p class="text-sm text-gray-600 mt-2 leading-relaxed">
                      {{ outcome.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="details.skillsGained?.length"
            id="skills"
            class="mt-10 pt-8 border-t"
          >
            <h2 class="text-xl font-bold text-gray-800 mb-4">Skills Gained</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(skill, i) in details.skillsGained"
                :key="i"
                class="bg-red-50 text-red-600 border border-red-100 px-4 py-1.5 rounded-full text-sm font-medium"
              >
                {{ skill.skill }}
              </span>
            </div>
          </div>

          <div
            v-if="details.futureScope"
            id="future-scope"
            class="mt-10 pt-8 border-t"
          >
            <h2 class="text-xl font-bold text-gray-800 mb-3">Future Scope</h2>
            <div class="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
              <p class="leading-relaxed">{{ details.futureScope }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="flex flex-col items-center justify-center min-h-[400px] text-gray-500"
  >
    <div
      class="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mb-4"
    ></div>
    <p>Loading comprehensive course details...</p>
  </div>
</template>

<style scoped>
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}
/* Ensure the table doesn't break layout on mobile */
table {
  border-collapse: collapse;
}
</style>
