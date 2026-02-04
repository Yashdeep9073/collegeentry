<template>
  <header
    class="bg-gradient-to-r from-[#E04A00] via-[#FF5C00] to-[#FFA040] text-white shadow sticky top-0 z-50"
  >
    <nav
      class="max-w-[1300px] mx-auto flex items-center justify-between px-6 py-4"
    >
      <router-link
        to="/"
        class="flex items-center gap-2 font-bold text-xl cursor-pointer"
      >
        <img :src="logo" alt="Logo" class="h-10" @error="onLogoError" />
      </router-link>

      <ul class="hidden lg:flex items-center gap-6 text-sm font-medium">
        <router-link to="/colleges" class="hover:text-gray-200 cursor-pointer">
          Top Colleges
        </router-link>
        <router-link to="/courses" class="hover:text-gray-200 cursor-pointer"
          >Top Courses</router-link
        >
        <router-link to="/exams" class="hover:text-gray-200 cursor-pointer"
          >Entrance Exams</router-link
        >
        <router-link
          to="/scholarships"
          class="hover:text-gray-200 cursor-pointer"
          >Scholarships</router-link
        >
        <!-- <li class="hover:text-gray-200 cursor-pointer">Admission 2025</li> -->
        <router-link to="/article" class="hover:text-gray-200 cursor-pointer"
          >Article</router-link
        >
        <li class="relative group cursor-pointer">
          <span class="flex items-center hover:text-gray-200">
            Career Assessment
            <svg
              class="inline-block ml-1 w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
              fill="white"
              viewBox="0 0 20 20"
            >
              <path d="M5.23 7.21L10 12l4.77-4.79z" />
            </svg>
          </span>

          <ul
            class="absolute left-0 top-full bg-white text-gray-900 w-48 mt-3 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2"
          >
            <router-link
              to="/carrier-assessment-9th-10th"
              class="px-4 py-2.5 block hover:bg-orange-50 hover:text-[#FF5C00] cursor-pointer text-sm"
            >
              9th to 10th
            </router-link>
            <router-link
              to="/carrier-assessment-11th-12th"
              class="block px-4 py-2.5 hover:bg-orange-50 hover:text-[#FF5C00] cursor-pointer text-sm"
            >
              11th to 12th
            </router-link>
          </ul>
        </li>

        <li class="relative group cursor-pointer">
          <span class="flex items-center hover:text-gray-200">
            More
            <svg
              class="inline-block ml-1 w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
              fill="white"
              viewBox="0 0 20 20"
            >
              <path d="M5.23 7.21L10 12l4.77-4.79z" />
            </svg>
          </span>

          <ul
            class="absolute left-0 top-full bg-white text-gray-900 w-48 mt-3 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2"
          >
            <!-- <li
              class="px-4 py-2.5 hover:bg-orange-50 hover:text-[#FF5C00] cursor-pointer text-sm"
            >
              Boards
            </li> -->
            <router-link
              to="/contact-us"
              class="block px-4 py-2.5 hover:bg-orange-50 hover:text-[#FF5C00] cursor-pointer text-sm"
            >
              Contact Us
            </router-link>
            <router-link
              to="/about-us"
              class="block px-4 py-2.5 hover:bg-orange-50 hover:text-[#FF5C00] cursor-pointer text-sm"
            >
              About Us
            </router-link>
          </ul>
        </li>
      </ul>

      <div class="hidden lg:flex gap-3 items-center">
        <template v-if="!authStore.isAuthenticated">
          <button
            @click="openRegister"
            class="border border-white px-4 py-1.5 rounded-lg font-semibold cursor-pointer hover:bg-white hover:text-[#FF5C00] transition duration-200"
          >
            Register
          </button>

          <button
            @click="openLogin"
            class="bg-white text-[#FF5C00] px-4 py-1.5 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition duration-200"
          >
            Login
          </button>
        </template>

        <div v-else class="relative group cursor-pointer flex items-center">
          <span
            class="flex items-center text-sm font-semibold p-2 rounded-lg hover:bg-[#E05000]"
          >
            Hi, {{ authStore.user?.name?.split(" ")[0] }}

            <i class="fas fa-user-circle ml-2 text-xl"></i>
          </span>

          <ul
            class="absolute right-0 top-full bg-white text-gray-800 w-48 mt-2 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
          >
            <li
              @click="router.push('/profile')"
              class="px-4 py-2 hover:bg-red-50 text-black-600 cursor-pointer text-sm"
            >
              <i class="fas fa-user mr-2"></i> Profile
            </li>
            <li
              @click="router.push('/user-reveiw')"
              class="px-4 py-2 hover:bg-red-50 text-black-600 cursor-pointer text-sm"
            >
              <i class="fas fa-star mr-2"></i>
              Write a Reveiw
            </li>
            <li
              @click="
                authStore.logout();
                router.push('/');
              "
              class="px-4 py-2 hover:bg-red-50 text-black-600 cursor-pointer text-sm"
            >
              <i class="fas fa-sign-out-alt mr-2"></i> Logout
            </li>
          </ul>
        </div>
      </div>

      <RegisterModal
        :isOpen="showRegister"
        @close="showRegister = false"
        @submit="handleRegister"
        @switch-to-login="switchToLogin"
      />

      <LoginModal
        :isOpen="showLogin"
        @close="showLogin = false"
        @submit="loginUser"
        @switch-to-register="switchToRegister"
      />

      <div class="lg:hidden cursor-pointer" @click="toggleMobileMenu">
        <i v-if="!mobileOpen" class="fas fa-bars w-7 h-7"></i>
        <i v-else class="fas fa-times w-7 h-7"></i>
      </div>
    </nav>

    <!-- MOBILE MENU -->
    <div
      v-if="mobileOpen"
      class="bg-[#E05000] p-5 lg:hidden space-y-4 text-white"
    >
      <!-- Top Section -->
      <ul class="space-y-3 text-base font-medium">
        <router-link to="/colleges" class="block py-1">
          Top Colleges
        </router-link>

        <router-link to="/courses" class="block py-1">
          Top Courses
        </router-link>

        <router-link to="/exams" class="block py-1">
          Entrance Exams
        </router-link>

        <router-link to="/scholarships" class="block py-1">
          Scholarships
        </router-link>

        <li>
          <router-link to="/article" class="block py-1"> Article </router-link>
        </li>

        <!-- Career Assessment (Mobile Dropdown) -->
        <details class="bg-[#E45400] rounded-lg px-4 py-2">
          <summary
            class="cursor-pointer text-white text-sm flex justify-between items-center"
          >
            Career Assessment
            <i class="fas fa-chevron-down text-xs"></i>
          </summary>

          <div class="mt-3 space-y-2 pl-3">
            <router-link
              to="/carrier-assessment-9th-10th"
              class="block text-sm py-1"
            >
              9th to 10th
            </router-link>

            <router-link
              to="/carrier-assessment-11th-12th"
              class="block text-sm py-1"
            >
              11th to 12th
            </router-link>
          </div>
        </details>
      </ul>

      <!-- Divider -->
      <div class="border-t border-white/40"></div>

      <!-- LOGIN / REGISTER (Mobile) -->
      <ul class="space-y-2 text-sm font-medium">
        <!-- NOT LOGGED IN -->
        <template v-if="!authStore.isAuthenticated">
          <li
            class="py-2 cursor-pointer"
            @click="
              openRegister();
              mobileOpen = false;
            "
          >
            Register
          </li>

          <li
            class="py-2 cursor-pointer"
            @click="
              openLogin();
              mobileOpen = false;
            "
          >
            Login
          </li>
        </template>

        <!-- LOGGED IN -->
        <template v-else>
          <li
            class="py-2 cursor-pointer"
            @click="
              router.push('/profile');
              mobileOpen = false;
            "
          >
            <i class="fas fa-user mr-2"></i> Profile
          </li>
          <li
            class="py-2 cursor-pointer"
            @click="
              router.push('/user-reveiw');
              mobileOpen = false;
            "
          >
            <i class="fas fa-user mr-2"></i> Write Review
          </li>

          <li
            class="py-2 cursor-pointer text-red-200"
            @click="
              authStore.logout();
              router.push('/');
              mobileOpen = false;
            "
          >
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { useCompanySettingStore } from "../store/companySettingStore";

import axios from "axios";
import { useRouter } from "vue-router";
// Replaced Heroicons imports with Font Awesome icons for consistency
// import { Bars3Icon, XMarkIcon } from "@heroicons/vue/16/solid";
import RegisterModal from "../components/auth/RegisterModal.vue";
import LoginModal from "../components/auth/LoginModal.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const store = useCompanySettingStore();
const logo = computed(() => store.setting?.whiteLogo || "/college-entry.svg");
// Authentication State
const user = ref({ name: null, email: null }); // Holds user details if logged in
const mobileOpen = ref(false);
const showRegister = ref(false);
const showLogin = ref(false);

// API Endpoints
const API_URL_REGISTER = import.meta.env.VITE_REGISTER;
const API_URL_LOGIN = import.meta.env.VITE_LOGIN;
import { useAuthStore } from "../store/useAuthStore";
const authStore = useAuthStore();

import fallbackLogo from "../assets/white-logo.svg";

const onLogoError = (event) => {
  event.target.src = fallbackLogo;
};

onMounted(() => {
  authStore.fetchUser();
});

// --- Modal Functions ---
const openRegister = () => {
  showLogin.value = false;
  showRegister.value = true;
};

const openLogin = () => {
  showRegister.value = false;
  showLogin.value = true;
};

const switchToLogin = () => {
  showRegister.value = false;
  showLogin.value = true;
};

const switchToRegister = () => {
  showLogin.value = false;
  showRegister.value = true;
};

const toggleMobileMenu = () => {
  mobileOpen.value = !mobileOpen.value;
};

const goHomeWithHash = () => {
  router.push("/");
};

// 2. Handle Login
const loginUser = async (formData) => {
  try {
    const res = await axios.post(API_URL_LOGIN, formData);
    const token = res.data.token;

    localStorage.setItem("token", token);
    await authStore.fetchUser();

    showLogin.value = false;
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed. Try again.");
  }
};

// 3. Handle Register
const handleRegister = async (formData) => {
  try {
    const res = await axios.post(API_URL_REGISTER, formData);
    toast.success(
      "Registration Successful! Please check your email to verify.",
    );
    showRegister.value = false;
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Registration failed. Try again.",
    );
  }
};

// 4. Logout Function
</script>

<style scoped>
/* Optional custom tweaks */
.router-link-active {
  font-weight: 600; /* Bolder for active link */
  /* You could also add a subtle underline or border here */
}
</style>
