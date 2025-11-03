<script setup>
import { ref } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

// ✅ Props & Emits
const { isOpen } = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close", "submit", "switch-to-register"]);

// ✅ Reactive form
const form = ref({
  email: "",
  password: "",
});

// ✅ Password visibility toggle
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// ✅ Submit
const submitLogin = () => {
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
        class="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      <!-- Logo -->
      <div class="text-center mb-4">
        <img src="/logo.svg" alt="logo" class="h-10 mx-auto" />
      </div>

      <!-- Heading -->
      <h2 class="text-center text-black text-xl font-bold mb-4">
        Login to Your Account
      </h2>

     

      

      <!-- Login Form -->
      <div class="space-y-3">
        <input
          v-model="form.email"
          type="email"
          placeholder="Email Address"
          class="input"
        />

        <!-- Password Input with Eye Icon -->
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

      <!-- Login Button -->
      <button
        @click="submitLogin"
        class="bg-orange-500 hover:bg-orange-600 text-white font-medium w-full py-2 rounded-md mt-4"
      >
        Login
      </button>

      <!-- Switch to Register -->
      <p class="text-center text-sm mt-4 text-gray-600">
        New here?
        <span
          class="text-[#ff7e00] cursor-pointer hover:underline"
          @click="$emit('switch-to-register')"
        >
          Create Account
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

/* consistent with RegisterModal */
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
