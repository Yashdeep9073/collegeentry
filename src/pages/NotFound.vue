<script setup></script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-white px-4">

    <!-- Logo -->
    <div class="flex items-center gap-3 mb-8">
      <img src="../assets/college-entry-image.svg" alt="College Entry Logo" class="h-[100px] w-auto" />
    </div>

    <!-- Error Image -->
    <div class="w-full max-w-xs sm:max-w-sm mb-8">
      <img src="../assets/error.svg" alt="404 Error" class="w-[390px] h-auto" />
    </div>

    <!-- Text Content -->
    <h1 class="text-3xl font-bold text-gray-900 mb-2 text-center">Page Not Found</h1>
    <p class="text-gray-600 text-center max-w-md mb-6">
      The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
    </p>

    <!-- Button -->
    <router-link to="/">
      <button
        class="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow hover:bg-orange-600 transition translate-y-0 hover:-translate-y-1"
      >
         Back to Home
      </button>
    </router-link>

    <!-- Footer -->
    <p class="text-gray-400 text-xs mt-10">
      © 2025 College Entry. All Rights Reserved.
    </p>
  </div>
</template>

<style scoped>
/* Optional custom tweaks */
</style>
