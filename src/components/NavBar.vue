<template>
  <header class="bg-[#FF5C00] text-white shadow sticky top-0 z-50">
    <nav
      class="max-w-[1300px] mx-auto flex items-center justify-between px-6 py-4"
    >
      <div
        class="flex items-center gap-2 font-bold text-xl cursor-pointer"
        @click="goHomeWithHash"
      >
        <img src="../assets/white-logo.svg" alt="logo" class="h-10" />
      </div>

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
        <li class="hover:text-gray-200 cursor-pointer">Admission 2025</li>
        <li class="hover:text-gray-200 cursor-pointer">News</li>

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
        class="absolute left-0 top-full bg-white text-gray-900 w-48 mt-3 rounded-lg shadow-2xl  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2"
    >
        <li class="px-4 py-2.5 hover:bg-orange-50 hover:text-[#FF5C00] cursor-pointer text-sm ">
            Boards
        </li>
        <router-link
            to="/contact-us"
            class="block px-4 py-2.5 hover:bg-orange-50 hover:text-[#FF5C00] cursor-pointer text-sm "
        >
            Contact Us
        </router-link>
        <li class="px-4 py-2.5 hover:bg-orange-50 hover:text-[#FF5C00] cursor-pointer text-sm">
            About Us
        </li>
    </ul>
</li>
      </ul>

      <div class="hidden lg:flex gap-3 items-center">
        <template v-if="!user.name">
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
            Hi, {{ user.name.split(" ")[0] }}
            <i class="fas fa-user-circle ml-2 text-xl"></i>
          </span>

          <ul
            class="absolute right-0 top-full bg-white text-gray-800 w-48 mt-2 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
          >
            <li
              @click="logoutUser"
              class="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer text-sm"
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

    <div v-if="mobileOpen" class="bg-[#E05000] p-4 lg:hidden">
      <ul class="space-y-3 text-sm font-medium">
        <router-link to="/colleges" class="block py-1"
          >Top Colleges</router-link
        >
        <router-link to="/courses" class="block py-1">Top Courses</router-link>
        <router-link to="/exams" class="block py-1">Entrance Exams</router-link>
        <router-link to="/scholarships" class="block py-1"
          >Scholarships</router-link
        >
        <li class="py-1">Admission 2025</li>
        <li class="py-1">News</li>
        <li class="py-1 border-t mt-2 pt-2">Register / Login</li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
// Replaced Heroicons imports with Font Awesome icons for consistency
// import { Bars3Icon, XMarkIcon } from "@heroicons/vue/16/solid";
import RegisterModal from "../components/auth/RegisterModal.vue";
import LoginModal from "../components/auth/LoginModal.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();

// Authentication State
const user = ref({ name: null, email: null }); // Holds user details if logged in
const mobileOpen = ref(false);
const showRegister = ref(false);
const showLogin = ref(false);

// API Endpoints
const API_URL_REGISTER = import.meta.env.VITE_REGISTER;
const API_URL_LOGIN = import.meta.env.VITE_LOGIN;
const API_GET_USER_DETAILS = import.meta.env.VITE_GET_USER_DETAILS_API;

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
  setTimeout(() => {
    window.history.replaceState(null, "", "/#");
  }, 50);
};

// --- API & Auth Functions ---

// 1. Fetch user details on component load/login
const getUserDetails = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    user.value = { name: null, email: null }; // Ensure user state is empty
    return;
  }

  try {
    const res = await axios.get(API_GET_USER_DETAILS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Update the reactive user state with required data
    const userData = res.data.data;
    user.value = {
      name: userData.name || "User", // Fallback name
      email: userData.email,
    };
  } catch (err) {
    console.log("User fetch failed or token invalid:", err);
    // Clear invalid token and log out if fetching fails
    sessionStorage.removeItem("token");
    user.value = { name: null, email: null };
  }
};

// 2. Handle Login
const loginUser = async (formData) => {
  try {
    const res = await axios.post(API_URL_LOGIN, formData);
    const token = res.data.token;

    sessionStorage.setItem("token", token);
    toast.success("Login Successful!");
    showLogin.value = false;

    await getUserDetails(); // Fetch user details and update UI
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed. Try again.");
  }
};

// 3. Handle Register
const handleRegister = async (formData) => {
  try {
    const res = await axios.post(API_URL_REGISTER, formData);
    toast.success(
      "Registration Successful! Please check your email to verify."
    );
    showRegister.value = false;
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Registration failed. Try again."
    );
  }
};

// 4. Logout Function
const logoutUser = () => {
  sessionStorage.removeItem("token");
  user.value = { name: null, email: null }; // Clear user state
  toast.info("You have been logged out", {
    position: "top-center",
    autoClose: 1000,
  });
  router.push("/"); // Redirect to homepage
};

onMounted(() => {
  // Check for existing session token and fetch user details when the component mounts
  getUserDetails();
});
</script>

<style scoped>
/* Optional custom tweaks */
.router-link-active {
  font-weight: 600; /* Bolder for active link */
  /* You could also add a subtle underline or border here */
}
</style>
