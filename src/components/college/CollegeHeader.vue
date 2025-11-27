<script setup>
import { useCollegeStore } from "../../store/collegeNameStore";
import { useRoute } from "vue-router";
import { onMounted, computed, ref, watch, reactive } from "vue"; // <-- Added 'reactive'
import axios from "axios"; // Ensure axios is installed and imported

// API URL from environment variable
const VITE_ADD_LEAD = import.meta.env.VITE_ADD_LEAD_COLLEGE_API;

const route = useRoute();
const collegeStore = useCollegeStore();

const slug = route.params.slug;

// Convert slug → Normal Name: "punjab-university" → "punjab university"
const collegeName = slug.replace(/-/g, " ");

// --- COLLEGE DATA FETCHING ---

// Fetch data on page load
onMounted(() => {
  collegeStore.fetchCollegeByName(collegeName);
});

// For easy usage in template
const university = computed(() => collegeStore.college);

watch(university, (val) => {
  if (val && val.name) {
    document.title = `${val.name} | Admission, Courses, Fees & More`;
  }
});

// --- MODAL AND FORM STATE MANAGEMENT ---

const isApplyModalOpen = ref(false);
const isSubmitting = ref(false); // Replaces 'loading' for clarity
const submitMessage = ref(null); // Stores success/error message for display

const formState = reactive({
  // Used 'reactive' for the form object
  name: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  country: "",
  degree_type: "", // Harmonized with snake_case for potential API use
  message: "",
  college_name: collegeName, // Added college name for the lead data
});

const openApplyModal = () => {
  isApplyModalOpen.value = true;
  document.body.style.overflow = "hidden"; // Prevents background scroll
};

const closeApplyModal = () => {
  isApplyModalOpen.value = false;
  document.body.style.overflow = ""; // Re-enable background scroll

  // Reset form state and messages on close
  Object.assign(formState, {
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    country: "",
    degree_type: "",
    message: "",
  });
  submitMessage.value = null;
};

// --- LEAD SUBMISSION LOGIC ---

const submitLead = async () => {
  // Basic Validation
  if (!formState.name || !formState.phone) {
    toast.error("Full Name and Phone Number are required!", {
      autoClose: 2500,
    });

    submitMessage.value = {
      type: "error",
      text: "Full Name and Phone Number are required.",
    };

    return;
  }

  isSubmitting.value = true;
  submitMessage.value = null;

  try {
    const payload = {
      ...formState,
      degree_type: formState.degree_type || "N/A",
    };

    const response = await axios.post(VITE_ADD_LEAD, payload);

    if (response.status === 200 || response.status === 201) {
      toast.success("Lead submitted successfully!", {
        autoClose: 2000,
      });

      submitMessage.value = {
        type: "success",
        text: "✅ Your enquiry has been submitted successfully.",
      };

      setTimeout(() => closeApplyModal(), 2000);
    } else {
      toast.error(response.data.message || "Submission failed!", {
        autoClose: 2500,
      });

      submitMessage.value = {
        type: "error",
        text: "Submission failed. Try again!",
      };
    }
  } catch (error) {
    console.log("Submission Error:", error);

    toast.error("Network Error! Please check your connection.", {
      autoClose: 3000,
    });

    submitMessage.value = {
      type: "error",
      text: " Network error. Please try again.",
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section
    v-if="university"
    class="relative w-full bg-center bg-cover bg-no-repeat"
    :style="{
      backgroundImage: `url(${university?.details?.thumbnail})`,
    }"
  >
    <div class="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

    <div class="relative max-w-6xl mx-auto px-4 lg:px-6 py-12 text-white">
      <div class="text-xs flex items-center gap-1.5 mb-4 opacity-90">
        <a href="/" class="hover:text-yellow-300">Home</a>
        <span>/</span>
        <a href="#" class="hover:text-yellow-300">Colleges</a>
        <span>/</span>
        <span class="font-semibold truncate">{{ university?.name }}</span>
      </div>

      <div class="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
        <div class="flex-1">
          <h1
            class="text-3xl md:text-4xl font-extrabold leading-snug drop-shadow-lg"
          >
            {{ university?.name }} – Admission 2025, Courses, Fees, Cutoff,
            Placement, Ranking
          </h1>

          <div class="mt-4 space-y-4">
            <div class="flex flex-wrap items-center gap-6 text-sm">
              <span class="flex items-center gap-2 font-medium">
                <i class="fas fa-map-marker-alt text-red-400"></i>
                {{ university?.location }}
              </span>

              <span
                class="flex items-center gap-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"
              >
                <i class="fas fa-star"></i>
                {{ university?.details?.rating || "N/A" }} ({{
                  university?.totalReviews || 0
                }}
                Reviews)
              </span>
            </div>

            <div class="flex flex-wrap gap-6 text-xs opacity-90">
              <span class="flex items-center gap-2">
                <img
                  :src="university?.admin?.image"
                  alt="Admin Image"
                  class="w-6 h-6 rounded-full object-cover border border-white/30"
                />
                Authored by {{ university?.admin?.name }}
              </span>

              <span class="flex items-center gap-2">
                <i class="fas fa-clock"></i>
                Updated
                {{ new Date(university?.createdAt).toLocaleDateString() }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
          <router-link
            to="/college-compare"
            class="px-5 py-2.5 w-full sm:w-auto text-sm font-semibold border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
          >
            <i class="fas fa-balance-scale mr-1"></i>
            Compare Colleges
          </router-link>

          <button
            @click="openApplyModal"
            class="px-5 py-2.5 w-full sm:w-auto rounded-lg bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-white font-semibold shadow-lg hover:brightness-110 transition"
          >
            <i class="fas fa-paper-plane mr-1"></i>
            Apply Now
          </button>

          <button
            @click="openApplyModal"
            class="px-5 py-2.5 w-full sm:w-auto border border-white text-white rounded-lg hover:bg-white hover:text-black transition font-semibold"
          >
            <i class="fas fa-download mr-1"></i>
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="text-center py-10 text-gray-500">
    Loading college data...
  </section>

  <div
    v-if="isApplyModalOpen"
    class="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    @click.self="closeApplyModal"
  >
    <div
      class="modal-scroll bg-white rounded-xl shadow-2xl w-[95%] max-w-md relative transform scale-100 transition-transform duration-300 max-h-[90vh] overflow-y-auto"
    >
      <div
        class="sticky top-0 bg-white z-10 flex justify-between items-center p-5 border-b border-gray-100"
      >
        <h2 class="text-xl font-extrabold text-gray-800">
          <i class="fas fa-user-graduate mr-2 text-orange-500"></i>
          Admission Enquiry
        </h2>

        <button
          @click="closeApplyModal"
          class="text-gray-400 hover:text-red-500 text-2xl transition-colors"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="p-6">
        <div
          v-if="submitMessage"
          :class="[
            'p-3 mb-4 rounded-lg font-medium',
            submitMessage.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700',
          ]"
        >
          {{ submitMessage.text }}
        </div>

        <p class="text-sm text-gray-600 mb-2">
          Get instant callback and free counseling from our experts. .
        </p>

        <form @submit.prevent="submitLead" class="space-y-4">
          <div class="space-y-2">
            <div class="relative">
              <input
                type="text"
                v-model="formState.name"
                placeholder="Full Name *"
                required
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>

            <div class="relative">
              <input
                type="tel"
                v-model="formState.phone"
                placeholder="Phone Number *"
                required
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>

            <div class="relative">
              <input
                type="email"
                v-model="formState.email"
                placeholder="Email Address"
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="relative">
              <input
                type="text"
                v-model="formState.city"
                placeholder="City"
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-city absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>

            <div class="relative">
              <input
                type="text"
                v-model="formState.state"
                placeholder="State"
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>

            <div class="relative">
              <input
                type="text"
                v-model="formState.country"
                placeholder="Country"
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-globe absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>

            <div class="relative">
              <input
                type="text"
                v-model="formState.degree_type"
                placeholder="Degree Type "
                class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
              <i
                class="fas fa-graduation-cap absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              ></i>
            </div>
          </div>

          <div class="relative">
            <textarea
              v-model="formState.message"
              placeholder="Your Specific Query/Message"
              rows="3"
              class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150 resize-none"
            ></textarea>
            <i
              class="fas fa-comment-dots absolute left-3 top-4 text-gray-400"
            ></i>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin mr-2"></i> Submitting...
            </span>
            <span v-else> Request Free Counseling </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-scroll::-webkit-scrollbar {
  display: none;
}

.modal-scroll {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
