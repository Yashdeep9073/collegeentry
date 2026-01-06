<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useCourseStore } from "../../store/CourseDetailsStore";

const route = useRoute();
const courseStore = useCourseStore();

const slug = route.params.slug;

/* ---------------- ACTIVE ROUTE CHECK ---------------- */
const isActive = (tabPath) => {
  const current = route.path;
  const fullPath = tabPath ? `/${slug}/${tabPath}` : `/${slug}`;
  return current === fullPath;
};

const getTabPath = (tabPath) => (tabPath ? `/${slug}/${tabPath}` : `/${slug}`);

/* ---------------- DYNAMIC TABS ---------------- */
const tabs = computed(() => {
  const tabsArr = [];

  
  if (courseStore.courseDetails?.overview) {
    tabsArr.push({
      label: "Course Details",
      path: "",
    });
  }

  
  if (
    courseStore.course?.[0]?.syllabus &&
    courseStore.course[0].syllabus.length > 0
  ) {
    tabsArr.push({
      label: "Syllabus and Subjects",
      path: "syllabus-subjects",
    });
  }

  
  if (
    courseStore.course?.[0]?.jobOpportunities &&
    courseStore.course[0].jobOpportunities.length > 0
  ) {
    tabsArr.push({
      label: "Job, Scope & Salary",
      path: "job-scop-salary",
    });
  }

  return tabsArr;
});
</script>

<template>
  <div
    class="bg-white border-b border-gray-200 shadow-md sticky top-0 overflow-x-auto"
  >
    <div
      class="max-w-6xl mx-auto flex items-center gap-8 px-4 lg:px-6 whitespace-nowrap text-sm font-medium text-gray-600"
    >
      <router-link
        v-for="tab in tabs"
        :key="tab.path"
        :to="getTabPath(tab.path)"
        class="py-3 border-b-2 border-transparent hover:text-black transition duration-150 relative group"
        :class="{
          'text-red-600 font-semibold': isActive(tab.path),
        }"
      >
        {{ tab.label }}
        <span
          class="absolute bottom-[-2px] left-0 w-full h-[3px] bg-red-600 transition-transform duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100"
          :class="{
            'scale-x-100': isActive(tab.path),
          }"
        ></span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* Custom style to hide the scrollbar on the tabs on webkit browsers (Chrome, Safari) 
   while still allowing horizontal scrolling on small screens. */
div::-webkit-scrollbar {
  display: none;
}

/* For Firefox */
.overflow-x-auto {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
