<template>
  <div class="bg-white shadow rounded-xl p-6">
    <h3 class="font-semibold mb-4">Shortlisted Colleges</h3>

    <div v-if="colleges.length">
      <div
        v-for="college in colleges"
        :key="college.id"
        class="border-b py-3"
      >
        <h4 class="font-medium">{{ college.name }}</h4>
        <p class="text-sm text-gray-500">{{ college.location }}</p>
      </div>
    </div>

    <p v-else class="text-sm text-gray-500">
      No colleges shortlisted yet.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const colleges = ref([]);

onMounted(async () => {
  const token = sessionStorage.getItem("token");
  const res = await axios.get(
    import.meta.env.VITE_SHORTLISTED_COLLEGES_API,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  colleges.value = res.data.data;
});
</script>
