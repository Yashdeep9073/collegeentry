<template>
  <div class="bg-white shadow rounded-xl p-6">
    <h3 class="font-semibold mb-4">Basic Information</h3>

    <div v-if="user" class="grid md:grid-cols-2 gap-4 text-sm">
      <div>
        <p class="text-gray-500">Name</p>
        <p class="font-medium">{{ user.name }}</p>
      </div>

      <div>
        <p class="text-gray-500">Email</p>
        <p class="font-medium">{{ user.email }}</p>
      </div>

      <div>
        <p class="text-gray-500">Phone</p>
        <p class="font-medium">{{ user.phone || "-" }}</p>
      </div>
    </div>

    <p v-else class="text-sm text-gray-400">
      Loading profile information...
    </p>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    default: null,
  },
});
</script>
