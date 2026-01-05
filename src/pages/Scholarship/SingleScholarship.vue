<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const FETCH_SCHOLARSHIP_BY_NAME = import.meta.env
  .VITE_FETCH_ALL_SCHOLARSHIP_BY_TITLE;

const route = useRoute();
const slug = route.params.slug;
const actualName = slug.replace(/-/g, " ");

// Reactive Data State
const scholarshipData = ref({
  title: "",
  provider: "",
  description: "",
  iconUrl: "",
  lastDate: "",
  overview: [],
  eligibility: [],
  rewards: [],
  applicationProcess: [],
  selectionProcess: [],
  requiredDocuments: [],
  amounts: [],
});

const examHighlights = ref([]);

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const fetchExam = async () => {
  try {
    const res = await axios.get(
      `${FETCH_SCHOLARSHIP_BY_NAME}${encodeURIComponent(actualName)}`
    );

    // ✅ API returns SINGLE OBJECT now
    const data = res.data?.data;

    if (!data) {
      console.warn("No scholarship found for:", actualName);
      return;
    }

    scholarshipData.value = {
      title: data.title || "",
      provider: data.provider || "",
      description: data.description || "",
      iconUrl: data.image || "",
      lastDate: data.lastDate || "",
      overview: data.overview || [],
      eligibility: data.eligibility || [],
      rewards: data.rewards || [],
      applicationProcess: data.applicationProcess || [],
      selectionProcess: data.selectionProcess || [],
      requiredDocuments: data.requiredDocuments || [],
      amounts: data.amounts || [],
      categories: data.categories || [],
      region: data.region || "",
    };

    examHighlights.value = [
      { label: "Scholarship Name", value: data.title || "N/A" },
      { label: "Provider", value: data.provider || "N/A" },
      { label: "Region", value: data.region || "N/A" },
      { label: "Category", value: data.categories?.[0]?.name || "N/A" },
      { label: "Last Date to Apply", value: formatDate(data.lastDate) },
    ];
  } catch (err) {
    console.error("Error fetching scholarship:", err);
  }
};
watch(
  () => scholarshipData.value.title,
  (title) => {
    if (title) {
      document.title = `${title} | College Entry`;
    }
  },
  { immediate: true }
);

onMounted(() => {
  fetchExam();
});
</script>

<template>
  <div class="w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- HERO HEADER -->
      <!-- HERO HEADER -->
      <div
        class="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
      >
        <!-- Background Image -->
        <div class="absolute inset-0">
          <img
            v-if="scholarshipData.iconUrl"
            :src="scholarshipData.iconUrl"
            class="w-full h-full object-cover object-center scale-105"
            alt="Scholarship Banner"
          />
          <!-- Gradient Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/30"
          ></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 px-6 py-10 sm:px-10 sm:py-14">
          <div class="max-w-4xl">
            <!-- Tag -->
            <span
              class="inline-block mb-4 px-4 py-1 text-xs font-semibold tracking-wide uppercase bg-red-600/90 text-white rounded-full shadow"
            >
              Scholarship
            </span>

            <!-- Title -->
            <h1
              class="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white drop-shadow-md"
            >
              {{ scholarshipData.title }}
            </h1>

            <!-- Provider -->
            <p class="mt-4 text-sm sm:text-base text-gray-200">
              Offered by
              <span class="font-semibold text-white">
                {{ scholarshipData.provider }}
              </span>
            </p>

            <!-- Divider -->
            <div class="mt-6 w-16 h-1 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div
        class="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-10"
      >
        <section>
          <h3
            class="text-xl font-bold text-gray-800 mb-3 border-l-4 border-red-600 pl-3"
          >
            Description
          </h3>
          <div
            class="text-gray-700 leading-relaxed"
            v-html="scholarshipData.description"
          ></div>
        </section>

        <section class="pt-4">
          <h3 class="text-xl font-bold mb-4">Quick Highlights</h3>
          <div class="overflow-x-auto border border-gray-200 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <tbody>
                <tr
                  v-for="(item, index) in examHighlights"
                  :key="index"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td
                    class="px-6 py-3 text-sm font-semibold text-gray-900 w-1/3"
                  >
                    {{ item.label }}
                  </td>
                  <td class="px-6 py-3 text-sm text-gray-700 w-2/3">
                    {{ item.value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section v-if="scholarshipData.amounts?.length" class="pt-4">
          <h3 class="text-xl font-bold mb-4">Award Details</h3>
          <div class="overflow-x-auto border border-gray-200 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase"
                  >
                    Awarded To
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase"
                  >
                    Amount
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase"
                  >
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(amt, i) in scholarshipData.amounts" :key="i">
                  <td class="px-6 py-4 text-sm font-medium text-gray-800">
                    {{ amt.awardedTo }}
                  </td>
                  <td class="px-6 py-4 text-sm text-green-700 font-bold">
                    {{ amt.amount }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">
                    {{ amt.duration }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section v-if="scholarshipData.eligibility?.length">
          <h3 class="text-xl font-bold mb-4">Eligibility Criteria</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-700">
            <li v-for="item in scholarshipData.eligibility" :key="item">
              {{ item }}
            </li>
          </ul>
        </section>
        <section v-if="scholarshipData.applicationProcess?.length">
          <h3 class="text-xl font-bold mb-4">Application Process</h3>
          <ol class="list-decimal pl-5 space-y-2 text-gray-700">
            <li
              v-for="(step, i) in scholarshipData.applicationProcess"
              :key="i"
            >
              {{ step }}
            </li>
          </ol>
        </section>

        <section v-if="scholarshipData.selectionProcess?.length">
          <h3 class="text-xl font-bold mb-3">Selection Process</h3>
          <div class="bg-red-50 p-5 rounded-lg border border-red-100">
            <ul class="space-y-3">
              <li
                v-for="(step, i) in scholarshipData.selectionProcess"
                :key="i"
                class="flex gap-3 text-gray-700"
              >
                <span
                  class="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold"
                  >{{ i + 1 }}</span
                >
                {{ step }}
              </li>
            </ul>
          </div>
        </section>
        <section v-if="scholarshipData.requiredDocuments?.length">
          <h3 class="text-xl font-bold mb-4">Required Documents</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-700">
            <li v-for="(doc, i) in scholarshipData.requiredDocuments" :key="i">
              {{ doc }}
            </li>
          </ul>
        </section>
        <section v-if="scholarshipData.rewards?.length">
          <h3 class="text-xl font-bold mb-4">Rewards & Benefits</h3>
          <ul class="list-disc pl-5 space-y-2 text-gray-700">
            <li v-for="(reward, i) in scholarshipData.rewards" :key="i">
              {{ reward }}
            </li>
          </ul>
        </section>

        <section v-if="scholarshipData.overview?.length" class="space-y-6">
          <h3 class="text-2xl font-bold text-gray-800">Detailed Overview</h3>
          <div
            v-for="(item, index) in scholarshipData.overview"
            :key="index"
            class="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300"
          >
            <h4 class="text-lg font-bold text-gray-900 mb-2">
              {{ item.title }}
            </h4>
            <div class="text-gray-700" v-html="item.description"></div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Added styles for v-html content spacing */
:deep(p) {
  margin-bottom: 1rem;
}
</style>
