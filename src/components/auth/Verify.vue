<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
const Verify_APi = import.meta.env.VITE_VERIFY;

const route = useRoute();
const router = useRouter();

// State variables for the UI
const status = ref("verifying"); // States: 'verifying', 'success', 'error'
const message = ref("Please wait while we verify your account...");
const redirectTime = 3; // Seconds before redirecting

const verifyAccount = async () => {
  const token = route.query.token;

  if (!token || token.length < 10) {
    // Simple check for token existence
    status.value = "error";
    message.value = "Error: Verification token is missing or invalid.";
    return;
  }

  try {
    // 2. SIMULATE API CALL
    // -------------------------------------------------------------------
    // In a real application, replace this setTimeout block with:
    const response = await axios.post(`${Verify_APi}/${token}`);
    // -------------------------------------------------------------------

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2s API delay

    // Assume successful response for simulation
    const isSuccessful = response.status === 200;

    if (isSuccessful) {
      // 3. Handle Success
      status.value = "success";
      message.value = "Success! Your account has been verified.";

      // 4. Redirect after delay
      let countdown = redirectTime;
      const interval = setInterval(() => {
        countdown--;
        message.value = `Success! Your account has been verified. Redirecting to homepage in ${countdown} seconds...`;
        if (countdown === 0) {
          clearInterval(interval);

          router.replace("/");
        }
      }, 1000);
    } else {
      // Handle server-side failure (e.g., token expired, already verified)
      status.value = "error";
      message.value =
        "Verification failed. The link may be expired or already used.";
    }
  } catch (err) {
    // Handle network or other errors
    status.value = "error";
    message.value = `Verification failed due to a network error. Please try again.`;
    // console.error(err);
  }
};

onMounted(() => {
  verifyAccount();
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
  >
    <div
      class="bg-white p-8 rounded-xl shadow-2xl border-t-4 max-w-lg w-full text-center"
      :class="{
        'border-blue-500': status === 'verifying',
        'border-green-500': status === 'success',
        'border-red-500': status === 'error',
      }"
    >
      <div class="mb-6">
        <i
          v-if="status === 'verifying'"
          class="fas fa-sync fa-spin text-4xl text-blue-500"
        ></i>
        <i
          v-else-if="status === 'success'"
          class="fas fa-check-circle text-4xl text-green-500"
        ></i>
        <i
          v-else-if="status === 'error'"
          class="fas fa-times-circle text-4xl text-red-500"
        ></i>
      </div>

      <h1 class="text-2xl font-bold text-gray-800 mb-4">
        {{
          status === "verifying"
            ? "Verifying Account..."
            : status === "success"
            ? "Verification Successful!"
            : "Verification Failed"
        }}
      </h1>

      <p class="text-gray-600 mb-6">
        {{ message }}
      </p>

      <router-link v-if="status === 'error'" to="/">
        <button
          class="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150"
        >
          Go Back Home
        </button>
      </router-link>

      <router-link v-else-if="status === 'success'" to="/">
        <button
          class="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150"
        >
          Enter Site Now
        </button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles remain here */
</style>
