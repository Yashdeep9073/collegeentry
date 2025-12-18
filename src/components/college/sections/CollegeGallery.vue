<template>
  <div class="college-gallery py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-3">
        Campus Gallery
      </h1>

      <div
        v-if="mediaGallery && mediaGallery.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="(image, index) in mediaGallery"
          :key="index"
          class="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:scale-[1.02]"
        >
          <a :href="image" target="_blank" rel="noopener noreferrer">
            <img
              :src="image"
              :alt="`Image of ${university.shortName} Campus - ${index + 1}`"
              class="w-full h-64 object-cover"
              loading="lazy"
            />
          </a>
        </div>
      </div>

      <div v-else class="text-center py-12 bg-white rounded-xl shadow-lg">
        <p class="text-xl font-medium text-gray-500">
          <i class="fas fa-camera text-4xl text-blue-400 mb-3"></i><br />
          No media gallery images are currently available for
          {{ university.name }}.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCollegeStore } from "../../../store/collegeNameStore";

const collegeStore = useCollegeStore();
const university = computed(() => collegeStore.college);

// Safely extract the media gallery array from the university object
const mediaGallery = computed(
  () => university.value?.details?.mediaGallery || []
);
</script>

<style scoped></style>
