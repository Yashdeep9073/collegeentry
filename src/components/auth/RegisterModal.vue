<script setup>
import { ref } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
const REGISTER_URL = import.meta.env.VITE_REGISTER;

// ✅ Props
const { isOpen } = defineProps({
  isOpen: Boolean,
});

// ✅ Emits
const emit = defineEmits(["close", "submit", "switch-to-login"]);

// ✅ Form state
const form = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
});

// ✅ Password visibility toggle
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// ✅ Submit form
const submitForm = () => {
  emit("submit", form.value);
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-[2000]"
  >
    <div
      class="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative animate-[fadeIn_.3s]"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute right-4 top-4 text-gray-500 cursor-pointer hover:text-black text-xl"
      >
        ✕
      </button>

      <!-- Logo -->
      <div class="text-center mb-4">
        <img src="/logo.svg" alt="logo" class="h-10 mx-auto" />
      </div>

      <h2 class="text-center text-xl text-black font-bold mb-4">
        Create Your Account
      </h2>

      <!-- Form -->
      <div class="space-y-3">
        <input
          v-model="form.name"
          type="text"
          placeholder="Full Name"
          class="input"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email Address"
          class="input"
        />
        <input
          v-model="form.phone"
          type="tel"
          placeholder="Phone Number"
          class="input"
        />

        <!-- Password with Eye -->
        <div class="relative">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="input pr-10"
          />
          <button
            type="button"
            @click="togglePassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <EyeIcon v-if="!showPassword" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Register Button -->
      <button
        @click="submitForm"
        class="bg-orange-500 hover:bg-orange-600 text-white font-medium w-full py-2 rounded-md mt-4"
      >
        Register
      </button>

      <!-- Switch to Login -->
      <p class="text-center text-black text-sm mt-4">
        Already have an account?
        <span
          class="text-[#ff7f00] cursor-pointer hover:underline"
          @click="$emit('switch-to-login')"
        >
          Login
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.input {
  @apply w-full border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-black transition;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
