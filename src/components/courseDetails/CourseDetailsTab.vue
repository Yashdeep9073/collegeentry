<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const collegeSlug = route.params.slug;

const tabs = [
  { label: "courseName", path: "" },
  { label: "Syllabus and Subjects", path: "syllabus-subjects" },
  { label: "Job, Scop and Salary", path: "job-scop-salary" },
  { label: "Admission", path: "admission" },
  { label: "Fees", path: "fees" },
  { label: "Specialization", path: "specialization" },
  { label: "Placements", path: "placement" },
];

const getTabPath = (tabPath) => {
  return tabPath ? `/${collegeSlug}/${tabPath}` : `/${collegeSlug}`;
};

const isActive = (tabPath) => {
  const currentRoutePath = route.path;
  const fullTabPath = tabPath ? `/${collegeSlug}/${tabPath}` : `/${collegeSlug}`;
  return currentRoutePath === fullTabPath;
};
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
