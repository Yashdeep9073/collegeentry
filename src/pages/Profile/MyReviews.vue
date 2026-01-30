<template>
  <div class="bg-white shadow rounded-xl p-6">
    <h3 class="font-semibold mb-6 text-lg">My Reviews</h3>

    <div v-if="reviews.length" class="space-y-5">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="border rounded-xl p-5 hover:shadow-md transition"
      >
        <!-- HEADER -->
        <div class="flex justify-between items-center mb-2">
          <h4 class="font-semibold text-lg text-gray-800">
            {{ review.college?.name }}
          </h4>

          <div class="flex items-center gap-1 text-yellow-400">
            <span v-for="i in 5" :key="i">
              {{ i <= review.rating ? "★" : "☆" }}
            </span>
          </div>
        </div>

        <!-- DATE -->
        <p class="text-xs text-gray-400 mb-3">
          Reviewed on {{ formatDate(review.createdAt) }}
        </p>

        <!-- COMMENT -->
        <p class="text-sm text-gray-700 mb-4">
          {{ review.comment }}
        </p>

        <!-- DETAILS -->
        <div class="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
          <div
            v-for="res in review.responses"
            :key="res.id"
            class="flex justify-between bg-gray-50 px-3 py-2 rounded-lg"
          >
            <span class="font-medium">{{ formatLabel(res.question) }}</span>
            <span>{{ formatValue(res.answer?.value) }}</span>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-sm text-gray-500">
      You haven’t written any reviews yet.
    </p>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const reviews = ref([]);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatLabel = (text) =>
  text.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const formatValue = (value) => {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return value || "-";
};

onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(import.meta.env.VITE_API_READ_REVEIW, {
      headers: { Authorization: `Bearer ${token}` },
    });
    reviews.value = res.data.data;
  } catch (err) {
    console.error("Failed to fetch reviews", err);
  }
});
</script>
