<script setup>
import { ref } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

import { computed } from "vue";
import { useCompanySettingStore } from "../../store/companySettingStore";

const store = useCompanySettingStore();
const logo = computed(() => store.setting?.favicon || "/college-entry.svg");
// ✅ Props
const { isOpen } = defineProps({
  isOpen: Boolean,
});
import { useRouter } from "vue-router";
const router = useRouter();

//  Emits
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

function goToTermsAndConditions() {
  emit("close");
  router.push("/terms-and-conditions");
}
// ✅ Submit form
const submitForm = () => {
  emit("submit", form.value);
};

// Function to switch to login, wrapped for clarity
const switchToLogin = () => {
  emit("switch-to-login");
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-[2000]"
  >
    <div
      class="form_container relative animate-[fadeIn_.3s] overflow-y-auto max-h-[99vh]"
    >
      <button
        @click="$emit('close')"
        class="absolute right-4 top-4 text-gray-500 cursor-pointer hover:text-black text-xl"
      >
        ✕
      </button>

      <div class="logo_container">
        <img :src="logo" alt="logo" class="h-full w-full p-2" />
      </div>

      <div class="title_container">
        <p class="title">Create Your Account</p>
        <span class="subtitle"
          >Get started with our app, just create an account and enjoy the
          experience.</span
        >
      </div>

      <div class="w-full space-y-3">
        <div class="input_container">
          <label class="input_label" for="name_field">Full Name</label>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-width="1.5"
              stroke="#141B34"
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              stroke="#141B34"
              d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              stroke="#141B34"
              d="M7 17.5C7.91721 15.6025 9.80517 14.3333 12 14.3333C14.1948 14.3333 16.0828 15.6025 17 17.5"
            ></path>
          </svg>
          <input
            v-model="form.name"
            type="text"
            placeholder="Full Name"
            class="input_field"
            id="name_field"
          />
        </div>

        <div class="input_container">
          <label class="input_label" for="email_field">Email</label>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="1.5"
              stroke="#141B34"
              d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
            ></path>
            <path
              stroke-linejoin="round"
              stroke-width="1.5"
              stroke="#141B34"
              d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
            ></path>
          </svg>
          <input
            v-model="form.email"
            type="email"
            placeholder="name@mail.com"
            class="input_field"
            id="email_field"
          />
        </div>

        <div class="input_container">
          <label class="input_label" for="phone_field">Phone Number</label>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-width="1.5"
              stroke="#141B34"
              d="M14.954 18.918C14.155 18.846 13.355 18.784 12.56 18.732C10.74 18.61 8.998 18.423 7.322 17.864C5.165 17.135 3.39 15.698 2.373 13.629C1.356 11.56 1.139 9.172 1.954 6.84C2.651 4.78 3.966 3.016 5.617 1.838C6.67 1.109 7.824 0.65 9.013 0.44C11.535 0.007 14.225 0.384 16.653 1.58C18.435 2.455 20.04 3.91 21.144 5.69C21.722 6.643 22.083 7.697 22.257 8.783"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              stroke="#141B34"
              d="M22 13V22M22 13L15.42 13C12.448 13 11 14.475 11 17.425V18.575C11 21.525 12.448 23 15.42 23H22V13Z"
            ></path>
          </svg>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="Phone Number"
            class="input_field"
            id="phone_field"
          />
        </div>

        <div class="input_container">
          <label class="input_label" for="password_field">Password</label>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-width="1.5"
              stroke="#141B34"
              d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
            ></path>
            <path
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="1.5"
              stroke="#141B34"
              d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
            ></path>
            <path
              fill="#141B34"
              d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L14.2603 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"
            ></path>
          </svg>
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="input_field"
            id="password_field"
          />
          <button
            type="button"
            @click="togglePassword"
            class="absolute right-3 top-1/2 translate-y-2 text-gray-500 hover:text-black"
            style="z-index: 100"
          >
            <EyeIcon v-if="!showPassword" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <button
        @click.prevent="submitForm"
        title="Register"
        type="submit"
        class="sign-in_btn p-2"
      >
        <span>Register</span>
      </button>

      <p class="text-center text-sm text-gray-600">
        Already have an account?
        <span
          class="text-[#ff7f00] cursor-pointer hover:underline"
          @click="switchToLogin"
        >
          Login
        </span>
      </p>

      <p @click="goToTermsAndConditions" class="note">
        Terms of use &amp; Conditions
      </p>
    </div>
  </div>
</template>

--- ## 💅 Custom Styles for Registration Form Below are the styles needed for
the new design. Note that I've adjusted the primary button color
(`.sign-in_btn`) to match your header's orange (`#FF5C00`) for consistency, as
done in the Login modal conversion. ```css
<style scoped>
/* --- STYLES FOR NEW DESIGN --- */
.form_container {
  width: fit-content;
  height: fit-content;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 50px 40px 20px 40px;
  background-color: #ffffff;
  box-shadow: 0px 106px 42px rgba(0, 0, 0, 0.01),
    0px 59px 36px rgba(0, 0, 0, 0.05), 0px 26px 26px rgba(0, 0, 0, 0.09),
    0px 7px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 11px;
  font-family: "Inter", sans-serif;
}
.form_container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
/* Override to make it responsive */
@media (max-width: 640px) {
  .form_container {
    width: 90vw; /* Take most of the screen width on mobile */
    max-width: 400px;
  }
}

.logo_container {
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  background: linear-gradient(
    180deg,
    rgba(248, 248, 248, 0) 50%,
    #f8f8f888 100%
  );
  border: 1px solid #f7f7f8;
  filter: drop-shadow(0px 0.5px 0.5px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  border-radius: 11px;
}

.title_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #212121;
}

.subtitle {
  font-size: 0.725rem;
  max-width: 80%;
  text-align: center;
  line-height: 1.1rem;
  color: #8b8e98;
}

.input_container {
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.icon {
  width: 20px;
  position: absolute;
  z-index: 99;
  left: 12px;
  bottom: 9px;
}

.input_label {
  font-size: 0.75rem;
  color: #8b8e98;
  font-weight: 600;
}

.input_field {
  width: 100%;
  height: 40px;
  padding: 0 0 0 40px;
  border-radius: 7px;
  outline: none;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}

.sign-in_btn {
  width: 100%;
  height: 40px;
  border: 0;
  /* Changed background to your brand orange */
  background: linear-gradient(90deg, #d83e00, #ff6a00, #ffb15a);
  border-radius: 7px;
  outline: none;
  color: #ffffff;
  cursor: pointer;
}

.note {
  font-size: 0.75rem;
  color: #8b8e98;
  text-decoration: underline;
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
