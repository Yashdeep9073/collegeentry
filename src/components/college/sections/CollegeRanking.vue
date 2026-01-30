<script setup>
import { computed, ref } from "vue";
import { useCollegeStore } from "../../../store/collegeNameStore";

const collegeStore = useCollegeStore();

const rankings = computed(() => {
  return (
    collegeStore.college?.rankings?.filter((r) => r.toBeDisplayed) || []
  );
});

const activeRow = ref(null);

const toggleCriteria = (id) => {
  activeRow.value = activeRow.value === id ? null : id;
};
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">

    <!-- Page Title -->
    <div>
      <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-3">
    College Rankings
      </h1>
      <p class="text-gray-600 mt-1">
        Official rankings published by reputed organizations
      </p>
    </div>

    <!-- Desktop Table -->
    <div class="hidden md:block bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

      <table class="min-w-full divide-y divide-gray-200">

        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">
              Publisher
            </th>
            <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase">
              Rank
            </th>
            <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase">
              Year
            </th>
            <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase">
              Details
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">

          <template v-for="ranking in rankings" :key="ranking.id">

            <!-- Main Row -->
            <tr class="hover:bg-gray-50 transition">

              <!-- Publisher -->
              <td class="px-6 py-4 flex items-center gap-3">
                <img
                  v-if="ranking.publisherLogo"
                  :src="ranking.publisherLogo"
                  class="w-8 h-8 rounded-full object-cover border"
                />
                <div>
                  <p class="font-semibold text-gray-800">
                    {{ ranking.publisher }}
                  </p>
                </div>
              </td>

              <!-- Rank -->
              <td class="px-6 py-4 text-center">
                <span
                  class="px-4 py-1 rounded-full bg-red-100 text-red-700 font-bold text-sm"
                >
                  #{{ ranking.ranking }}
                </span>
              </td>

              <!-- Year -->
              <td class="px-6 py-4 text-center text-gray-700 font-medium">
                {{ ranking.year }}
              </td>

              <!-- Button -->
              <td class="px-6 py-4 text-center">
                <button
                  @click="toggleCriteria(ranking.id)"
                  class="text-blue-600 hover:underline text-sm font-semibold"
                >
                  {{ activeRow === ranking.id ? "Hide" : "View" }} Criteria
                </button>
              </td>
            </tr>

            <!-- Expanded Criteria -->
            <tr v-if="activeRow === ranking.id">
              <td colspan="4" class="bg-gray-50 px-6 py-4">

                <div class="space-y-4">

                  <div
                    v-for="(item, index) in ranking.criteria"
                    :key="index"
                    class="bg-white p-4 rounded-lg border shadow-sm"
                  >
                    <h4 class="font-bold text-gray-800 mb-1">
                      {{ item.title }}
                    </h4>
                    <p class="text-gray-600 text-sm">
                      {{ item.description }}
                    </p>
                  </div>

                </div>

              </td>
            </tr>

          </template>

        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-5">

      <div
        v-for="ranking in rankings"
        :key="ranking.id"
        class="bg-white rounded-xl shadow border border-gray-200 p-5 space-y-4"
      >

        <div class="flex items-center gap-3">
          <img
            v-if="ranking.publisherLogo"
            :src="ranking.publisherLogo"
            class="w-10 h-10 rounded-full border"
          />
          <div>
            <p class="font-bold text-gray-800">
              {{ ranking.publisher }}
            </p>
            <p class="text-sm text-gray-500">
              Year: {{ ranking.year }}
            </p>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <span class="bg-red-100 text-red-700 font-bold px-4 py-1 rounded-full">
            Rank #{{ ranking.ranking }}
          </span>

          <button
            @click="toggleCriteria(ranking.id)"
            class="text-blue-600 font-semibold text-sm"
          >
            {{ activeRow === ranking.id ? "Hide" : "View" }} Criteria
          </button>
        </div>

        <div v-if="activeRow === ranking.id" class="space-y-3 pt-2">

          <div
            v-for="(item, index) in ranking.criteria"
            :key="index"
            class="bg-gray-50 p-3 rounded-lg border"
          >
            <p class="font-semibold text-gray-800 text-sm">
              {{ item.title }}
            </p>
            <p class="text-gray-600 text-sm">
              {{ item.description }}
            </p>
          </div>

        </div>
      </div>
    </div>

    <!-- No Ranking -->
    <div
      v-if="!rankings.length"
      class="bg-white p-10 rounded-xl border text-center text-gray-500"
    >
      No ranking data available for this college.
    </div>

  </div>
</template>
