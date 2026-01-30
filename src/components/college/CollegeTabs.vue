<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const collegeSlug = route.params.slug;

// All tabs
import { computed } from "vue";
import { useCollegeStore } from "../../store/collegeNameStore";

const collegeStore = useCollegeStore();

const tabs = computed(() => {
  const baseTabs = [
    { label: "Info", path: "" },
    // { label: "Courses & Fees", path: "courses-fees" },
    // { label: "Admission", path: "admission" },
    // { label: "Cut Off", path: "cutoff" },
    // { label: "Reviews", path: "reviews" },
    // { label: "Placements", path: "placements" },
    // { label: "Result", path: "result" },
    // { label: "Infrastructure", path: "infrastructure" },
    // { label: "Scholarship", path: "scholarship" },
    // { label: "Ranking", path: "ranking" },
    // { label: "Hostel", path: "hostel" },
  ];

  // ✅ Show Articles tab ONLY if articles exist

  if (collegeStore.college?.rankings?.length > 0) {
    baseTabs.push({ label: "Ranking", path: "ranking" });
  }
  if (collegeStore.college?.courses?.length > 0) {
    baseTabs.push({ label: "Courses & Fees", path: "courses-fees" });
  }
  if (collegeStore.college?.articles?.length > 0) {
    baseTabs.push({ label: "Articles & News", path: "articles" });
  }
  if (collegeStore.college?.details.mediaGallery?.length > 0) {
    baseTabs.push({ label: "Gallery", path: "gallery" });
  }

  return baseTabs;
});

// Build full path per tab
const getTabPath = (tabPath) => {
  return tabPath
    ? `/colleges/${collegeSlug}/${tabPath}`
    : `/colleges/${collegeSlug}`;
};

// Determine if a tab is active
const isActive = (tabPath) => {
  const current = route.path;

  // Info tab (root)
  if (tabPath === "") {
    return current === `/colleges/${collegeSlug}`;
  }

  return current.startsWith(`/colleges/${collegeSlug}/${tabPath}`);
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
