<template>
  <footer class="bg-gray-900 text-gray-300 py-10 md:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-12">
        <div>
          <div class="flex items-center mb-4">
            <img src="../assets/white-logo.svg" alt="" />
          </div>

          <address class="not-italic text-sm space-y-1">
            <p>Office No: 36, Second Floor, D-185, Phase 8B,</p>
            <p>Industrial Area, Sector 74, Sahibzada</p>
            <p>Ajit Singh Nagar, Punjab 160055</p>
          </address>

          <div class="flex space-x-4 mt-6">
            <a
              target="_blank"
              href="https://www.facebook.com/collegeentryofficial"
              aria-label="Facebook"
              class="hover:text-white transition duration-150"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <!-- <a
              href="#"
              aria-label="Twitter"
              class="hover:text-white transition duration-150"
            >
              <i class="fab fa-x-twitter"></i>
            </a> -->
            <a
              target="_blank"
              href="https://www.instagram.com/collegeentry2025/"
              aria-label="Instagram"
              class="hover:text-white transition duration-150"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <!-- <a
              href="#"
              aria-label="LinkedIn"
              class="hover:text-white transition duration-150"
            >
              <i class="fab fa-linkedin-in"></i>
            </a> -->
          </div>
        </div>

        <div v-for="(section, index) in footerLinks" :key="index">
          <h4
            class="text-lg font-semibold text-white mb-4 uppercase border-b-2 border-orange-500 inline-block pb-1"
          >
            {{ section.title }}
          </h4>
          <ul class="space-y-2 text-sm">
            <li v-for="link in section.links" :key="link.name">
              <router-link
                :to="link.url"
                class="hover:text-white transition duration-150"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-10 pt-6 text-center text-sm text-white">
      <hr class="mb-3" />
      &copy; 2025 College Entry | All Rights Reserved
    </div>

    <slot name="floating-buttons"></slot>
  </footer>
</template>

<script setup>
import { ref, computed } from "vue";

// Dynamic year for copyright

// Link Data Structure
const footerLinks = ref([
  {
    title: "Top College",
    links: [
      { name: "Motherhood University", url: "#" },
      { name: "Graphic Era Hill University", url: "#" },
      { name: "Sanskaram University", url: "#" },
      { name: "Sharda University", url: "#" },
      { name: "Tulas Institute", url: "#" },
      { name: "KR Mangalam University", url: "#" },
    ],
  },
  {
    title: "Top Courses",
    links: [
      { name: "Architecture", url: "#" },
      { name: "Arts", url: "#" },
      { name: "Commerce", url: "#" },
      { name: "Computer", url: "#" },
      { name: "Design", url: "#" },
      { name: "Education", url: "#" },
    ],
  },
  {
    title: "Top Exams",
    links: [{ name: "JEE Advanced", url: "#" }],
  },
  {
    title: "Our Policies",
    links: [
      { name: "Advertise With Us", url: "#" },
      { name: "Terms & Conditions", url: "/terms-and-conditions" },
      { name: "Privacy Policy", url: "/privacy-policy" },
    ],
  },
]);
</script>

<style scoped></style>
