<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { computed } from "vue";
import { useCompanySettingStore } from "../store/companySettingStore";

const API_URL = import.meta.env.VITE_ADD_CONTACT_API;
const store = useCompanySettingStore();
const email = computed(() => store.setting?.email || "College Entry");
const phone = computed(() => store.setting?.contactNumber || "College Entry");
const facebookUrl = computed(() => store.setting?.facebookUrl || "");
const instagramUrl = computed(() => store.setting?.instagramUrl || "");
const twitterUrl = computed(() => store.setting?.twitterUrl || "");
const linkedinUrl = computed(() => store.setting?.linkedinUrl || "");
const youtubeUrl = computed(() => store.setting?.youtubeUrl || "");
// Form fields
const fullName = ref("");
const emailAddress = ref("");
const mobileNumber = ref("");
const message = ref("");

const loading = ref(false);

// Submit handler
const handleSubmit = async () => {
  loading.value = true;

  try {
    await axios.post(API_URL, {
      name: fullName.value,
      email: emailAddress.value,
      phone: mobileNumber.value,
      message: message.value,
    });

    toast.success("Thanks! Message sent successfully ");

    // reset fields
    fullName.value = "";
    emailAddress.value = "";
    mobileNumber.value = "";
    message.value = "";
  } catch (error) {
    if (error.response?.data?.errors) {
      toast.error("Please correct the highlighted fields ");
    } else {
      toast.error("Something went wrong. Try again later ");
    }
  }

  loading.value = false;
};
</script>

<template>
  <div class="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-12">
      <div
        class="bg-white rounded-lg shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
      >
        <div
          class="bg-[#24355A] text-white p-8 lg:p-12 flex flex-col justify-between relative"
        >
          <div>
            <h2 class="text-3xl font-bold mb-3">Drop Us A Line</h2>
            <p class="text-gray-200 text-lg">
              Counselling, Queries, Feedback - we're here for it all
            </p>
          </div>
          <div class="mt-8 lg:mt-0">
            <img src="../assets/contactUsDesktop.png" alt="" />
          </div>
          <div class="mt-8 flex space-x-4">
            <a
              v-if="facebookUrl"
              :href="facebookUrl"
              target="_blank"
              class="text-gray-300 hover:text-white transition duration-200 text-2xl"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              v-if="twitterUrl"
              :href="twitterUrl"
              target="_blank"
              class="text-gray-300 hover:text-white transition duration-200 text-2xl"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              v-if="instagramUrl"
              :href="instagramUrl"
              target="_blank"
              class="text-gray-300 hover:text-white transition duration-200 text-2xl"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              v-if="linkedinUrl"
              :href="linkedinUrl"
              target="_blank"
              class="text-gray-300 hover:text-white transition duration-200 text-2xl"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a
              v-if="youtubeUrl"
              :href="youtubeUrl"
              target="_blank"
              aria-label="YouTube"
              class="hover:text-white transition duration-150"
            >
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div class="p-8 lg:p-12 flex flex-col justify-center">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="fullName" class="sr-only">Full Name</label>
              <input
                type="text"
                id="fullName"
                v-model="fullName"
                placeholder="Full Name"
                class="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150"
                required
              />
            </div>
            <div>
              <label for="emailAddress" class="sr-only">Email Address</label>
              <input
                type="email"
                id="emailAddress"
                v-model="emailAddress"
                placeholder="Email Address"
                class="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150"
                required
              />
            </div>
            <div>
              <label for="mobileNumber" class="sr-only">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                v-model="mobileNumber"
                placeholder="Mobile Number"
                class="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150"
                required
              />
            </div>
            <div>
              <label for="message" class="sr-only">Type a message...</label>
              <textarea
                id="message"
                v-model="message"
                placeholder="Type a message..."
                rows="5"
                class="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150"
                required
              ></textarea>
            </div>
            <div class="text-right">
              <button
                type="submit"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm bg-gradient-to-r from-[#E04A00] via-[#FF5C00] to-[#FFA040] text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-xl p-8 lg:p-10">
        <h3 class="text-2xl font-bold text-gray-800 mb-8 text-center">
          We'd love to hear from you
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
          >
            <div class="flex justify-center mb-4">
              <i class="fas fa-briefcase text-4xl text-blue-600"></i>
            </div>
            <h4 class="text-lg font-semibold text-gray-800 mb-2">
              Business Related Queries
            </h4>
            <a :href="'mailto:' + email" class="text-blue-600 hover:underline">
              {{ email }}
            </a>
          </div>

          <div
            class="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
          >
            <div class="flex justify-center mb-4">
              <i class="fas fa-users text-4xl text-green-600"></i>
            </div>
            <h4 class="text-lg font-semibold text-gray-800 mb-2">
              Counselling Related Queries
            </h4>

            <p class="text-gray-600 text-sm mt-1">
              Academic Counselor: {{ phone }}
            </p>
          </div>

          <div
            class="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition duration-200"
          >
            <div class="flex justify-center mb-4">
              <i class="fas fa-handshake text-4xl text-purple-600"></i>
            </div>
            <h4 class="text-lg font-semibold text-gray-800 mb-2">
              Want to work with us?
            </h4>
            <a
              :href="'mailto:' + email"
              class="text-purple-600 hover:underline"
            >
              {{ email }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add custom styles here if needed */
</style>
