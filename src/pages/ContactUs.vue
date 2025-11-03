<script setup>
import { ref } from "vue";

// Form fields state
const fullName = ref("");
const emailAddress = ref("");
const mobileNumber = ref("");
const message = ref("");

// Function to handle form submission
const handleSubmit = () => {
  // In a real application, you would send this data to your backend
  console.log({
    fullName: fullName.value,
    emailAddress: emailAddress.value,
    mobileNumber: mobileNumber.value,
    message: message.value,
  });
  alert("Form submitted! (Check console for data)");
  // Optionally clear form fields
  fullName.value = "";
  emailAddress.value = "";
  mobileNumber.value = "";
  message.value = "";
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
          <div class="mt-8 lg:mt-0"><img src="../assets/contactUsDesktop.png" alt="" /></div>
          <div class="mt-8 flex space-x-4">
            <a
              href="#"
              class="text-gray-300 hover:text-white transition duration-200 text-2xl"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              class="text-gray-300 hover:text-white transition duration-200 text-2xl"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              class="text-gray-300 hover:text-white transition duration-200 text-2xl"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              class="text-gray-300 hover:text-white transition duration-200 text-2xl"
            >
              <i class="fab fa-linkedin-in"></i>
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
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
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
            <a
              href="mailto:info@collegeentry.in"
              class="text-blue-600 hover:underline"
              >info@collegeentry.in</a
            >
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
              Academic Counselor: 9870443528
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
              href="mailto:info@collegeentry.in"
              class="text-purple-600 hover:underline"
              >info@collegeentry.in</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add custom styles here if needed */
</style>
