<script setup>
import { useRoute } from "vue-router";
// NOTE: Make sure Vue Router is installed and configured correctly.
const route = useRoute();

// IMPORTANT: Define the base path dynamically based on the current route
// For this example, we'll assume the base URL structure is /college-details/LPU-Phagwara
// You MUST ensure your router setup correctly captures the slug/id.
// For demonstration, we'll use a placeholder slug.
const collegeSlug = 'lovely-professional-university-lpu-jalandhar'; 

const tabs = [
  { label: "Info", path: "" }, // Info is usually the root path
  { label: "Courses & Fees", path: "courses-fees" },
  { label: "Admission", path: "admission" },
  { label: "Cut Off", path: "cutoff" },
  { label: "Reviews", path: "reviews" },
  { label: "Placements", path: "placements" },
  { label: "Result", path: "result" }, // Added 'Result' tab as per image
  { label: "Infrastructure", path: "infrastructure" },
  { label: "Gallery", path: "gallery" },
  { label: "Scholarship", path: "scholarship" },
  { label: "Ranking", path: "ranking" },
  { label: "Hostel", path: "hostel" },
  { label: "Articles & News", path: "articles" },
];

const getTabPath = (tabPath) => {
    // Correctly constructs the path for router-link
    // Adjust the base path structure if your actual setup is different
    return `/colleges/${collegeSlug}/${tabPath}`;
};

const isActive = (tabPath) => {
    const currentRoutePath = route.path;
    const fullTabPath = `/colleges/${collegeSlug}/${tabPath}`;

    if (tabPath === "") {
        // Special case for 'Info' tab (root of the college page)
        return currentRoutePath === `/colleges/${collegeSlug}` || currentRoutePath === fullTabPath;
    }
    
    // Check if the current route starts with the full tab path
    return currentRoutePath.startsWith(fullTabPath);
};
</script>

<template>
  <div class="bg-white border-b border-gray-200 shadow-md sticky top-0 overflow-x-auto">
    <div class="max-w-6xl mx-auto flex items-center gap-8 px-4 lg:px-6 whitespace-nowrap text-sm font-medium text-gray-600">
      
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
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>