<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCourseStore } from "../../store/courseStore";

const store = useCourseStore();
const router = useRouter();
const route = useRoute();

const activeLevel = computed(() => store.activeDegree);

const navigateTo = (degree) => {
  store.setDegree(degree);

  if (degree === "ALL") {
    router.push(`/courses/${route.params.slug}`);
  } else {
    router.push(`/courses/${route.params.slug}/${degree.toLowerCase()}`);
  }
};
</script>

<template>
  <div class="w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">

      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        Browse {{ store.stream?.name }} Courses
      </h2>

      <div
        class="bg-white p-4 rounded-lg shadow-md border sticky top-[70px] z-40"
      >
        <nav class="flex space-x-6 overflow-x-auto">
          <button
            v-for="degree in store.degreeTypes"
            :key="degree"
            @click="navigateTo(degree)"
            :class="[
              activeLevel === degree
                ? 'border-red-600 text-red-600 font-bold'
                : 'border-transparent text-gray-700 hover:text-red-500',
              'uppercase px-1 py-2 border-b-2 text-sm transition'
            ]"
          >
            {{ degree }}
          </button>
        </nav>
      </div>

    </div>
  </div>
</template>
