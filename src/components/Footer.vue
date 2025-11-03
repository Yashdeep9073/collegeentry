<script setup>
</script>

<template>
  <footer class="bg-[#1D2A44] text-white">
    
    <!-- Top Section -->
    <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

      <!-- Logo -->
      <div class="flex items-center gap-3">
        <img
          src="../assets/college-entry.svg"
          alt="logo"
          class="h-10 w-auto"
        />
      </div>

      <!-- Social -->
      <div class="flex items-center gap-4 text-white">
        <span class="text-sm">Connect with us</span>

        <a href="#" class="hover:text-blue-300 transition">
          <i class="fa-brands fa-facebook text-xl"></i>
        </a>
        <a href="#" class="hover:text-blue-300 transition">
          <i class="fa-brands fa-x-twitter text-xl"></i>
        </a>
        <a href="#" class="hover:text-blue-300 transition">
          <i class="fa-brands fa-instagram text-xl"></i>
        </a>
        <a href="#" class="hover:text-blue-300 transition">
          <i class="fa-brands fa-linkedin text-xl"></i>
        </a>
        <a href="#" class="hover:text-blue-300 transition">
          <i class="fa-brands fa-youtube text-xl"></i>
        </a>
      </div>

      <!-- Contact Info -->
      <div class="flex items-center gap-6 text-sm">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-phone"></i> +91-9870443528, 7657999786
        </div>
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-envelope"></i>  info@collegeentry.in
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-gray-600"></div>

    <!-- Bottom Menu -->
    <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
      <div class="flex gap-6">
        <a href="#" class="hover:text-gray-300">About Us</a>
        <a href="#" class="hover:text-gray-300">Contact Us</a>
        <a href="#" class="hover:text-gray-300">Privacy Policy</a>
        <a href="#" class="hover:text-gray-300">Terms & Conditions</a>
      </div>

      <p class="mt-4 md:mt-0 text-gray-300">
© 2025 College Entry | All Rights Reserved

      </p>
    </div>

  </footer>
</template>

<style scoped>
</style>
