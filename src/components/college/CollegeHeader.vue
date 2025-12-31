<template>
  <section
    v-if="university"
    class="relative w-full bg-center bg-cover bg-no-repeat"
    :style="{ backgroundImage: `url(${university?.details?.thumbnail})` }"
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
                {{ university?.admin?.name }}
                <i class="fas fa-check-circle text-blue-500 text-xs"></i>
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
            class="px-5 py-2.5 text-center text-sm font-semibold border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
          >
            <i class="fas fa-balance-scale mr-1"></i> Compare
          </router-link>

          <button
            @click="openApplyModal"
            class="px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-white font-semibold shadow-lg hover:brightness-110 transition"
          >
            <i class="fas fa-paper-plane mr-1"></i> Apply Now
          </button>

          <button
            @click="openApplyModal"
            class="px-5 py-2.5 border border-white text-white rounded-lg hover:bg-white hover:text-black transition font-semibold"
          >
            <i class="fas fa-download mr-1"></i> Download Brochure
          </button>
        </div>
      </div>
    </div>
  </section>

  <div
    v-if="isApplyModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    @click.self="closeApplyModal"
  >
    <div
      class="relative flex modal-scroll flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
    >
      <button
        @click="closeApplyModal"
        class="absolute top-4 right-4 z-20 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        class="hidden md:flex md:w-5/12 bg-red-600 p-8 text-white flex-col justify-center relative overflow-hidden"
      >
        <div
          class="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-red-500 rounded-full opacity-50"
        ></div>
        <div class="relative z-10">
          <div class="text-4xl mb-6 text-center">
            <img src="../../assets/college-university-student.png" alt="" />
          </div>
          <h2 class="text-2xl font-bold mb-6 leading-tight italic text-center">
            Invest in Your Future: Get Help with Your Registration Today
          </h2>
          <ul class="space-y-4 text-sm">
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle mt-1 text-red-300"></i>
              <p>Get Expert Help to Apply to Your Dream College!</p>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle mt-1 text-red-300"></i>
              <p>Stay up-to-date with Exam Notification and News</p>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="w-full md:w-7/12 p-8 md:p-12 max-h-[90vh] overflow-y-auto hide-scrollbar"
      >
        <h3 class="text-2xl font-bold text-gray-900 mb-6 leading-tight">
          Apply Now
        </h3>

        <form @submit.prevent="submitLead" class="space-y-4">
          <div class="relative">
            <span
              class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
            >
              <i class="fas fa-user text-sm"></i>
            </span>
            <input
              v-model="formState.name"
              type="text"
              placeholder="Name *"
              required
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            />
            <p v-if="errors.name" class="text-xs text-red-500 mt-1">
              {{ errors.name }}
            </p>
          </div>

          <div class="relative">
            <span
              class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
            >
              <i class="fas fa-envelope text-sm"></i>
            </span>
            <input
              v-model="formState.email"
              type="email"
              placeholder="Email Address"
              class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            />
            <p v-if="errors.email" class="text-xs text-red-500 mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div class="flex gap-2">
            <div
              class="flex items-center gap-2 border border-gray-200 px-3 bg-gray-50 text-gray-600 text-sm"
            >
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="India"
                class="w-6 h-5 object-cover"
              />
              <span>+91</span>
            </div>

            <input
              v-model="formState.phone"
              type="tel"
              placeholder="Mobile Number *"
              required
              class="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 outline-none"
            />
            <p v-if="errors.phone" class="text-xs text-red-500 mt-1">
              {{ errors.phone }}
            </p>
          </div>

          <Multiselect
            v-model="formState.streamId"
            :options="streams"
            label="name"
            track-by="id"
            placeholder="Search Stream Interested"
            :searchable="true"
            :close-on-select="true"
            :allow-empty="true"
            class="multiselect-custom"
          />
          <p v-if="errors.streamId" class="text-xs text-red-500">
            {{ errors.streamId }}
          </p>

          <Multiselect
            v-model="formState.degreeType"
            :options="levels"
            label="name"
            track-by="id"
            placeholder="Search Level Interested"
            :searchable="true"
            :close-on-select="true"
            :allow-empty="true"
            class="multiselect-custom"
          />

          <p v-if="errors.degreeType" class="text-xs text-red-500">
            {{ errors.degreeType }}
          </p>

          <p class="text-[11px] text-gray-500">
            By proceeding forward, I agree to CollegeEntry
            <span
              class="text-red-600 cursor-pointer hover:underline"
              @click="goToTermsAndConditions"
              >Terms & Conditions</span
            >
          </p>

          <button
            :disabled="isSubmitting"
            type="submit"
            class="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.01] shadow-lg disabled:opacity-50"
          >
            <span v-if="isSubmitting"
              ><i class="fas fa-spinner fa-spin mr-2"></i>Processing...</span
            >
            <span v-else>Next</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { useCollegeStore } from "../../store/collegeNameStore";
import { useRoute } from "vue-router";
import { onMounted, computed, ref, watch, reactive } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
const router = useRouter();

const VITE_ADD_LEAD = import.meta.env.VITE_ADD_LEAD_COLLEGE_API;
const VITE_FETCH_STREAM = import.meta.env.VITE_FETCH_ALL_STREAM;
const route = useRoute();
const collegeStore = useCollegeStore();
const slug = route.params.slug;
const collegeName = slug.replace(/-/g, " ");

const streams = ref([]);
const isStreamLoading = ref(false);

function goToTermsAndConditions() {
  closeApplyModal();
  router.push("/terms-and-conditions");
}
const fetchStreams = async () => {
  try {
    isStreamLoading.value = true;
    const res = await axios.get(VITE_FETCH_STREAM);

    // assuming API returns array like [{ id, name }]
    streams.value = res.data.data || [];
  } catch (error) {
    console.error("Error fetching streams:", error);
  } finally {
    isStreamLoading.value = false;
  }
};

onMounted(() => {
  collegeStore.fetchCollegeByName(collegeName);
});

const university = computed(() => collegeStore.college);

watch(university, (val) => {
  if (val && val.name) {
    document.title = `${val.name} | Admission 2025`;
  }
});

// Modal & Form State
const isApplyModalOpen = ref(false);
const isSubmitting = ref(false);
const submitMessage = ref(null);

const levels = ref([
  { id: "Bachelors", name: "Bachelors" },
  { id: "Masters", name: "Masters" },
  { id: "Doctorate", name: "Doctorate" },
  { id: "Diploma", name: "Diploma" },
]);

const formState = reactive({
  name: "",
  phone: "",
  email: "",
  streamId: "",
  degreeType: "",
  college_name: collegeName,
});

const errors = reactive({
  name: "",
  phone: "",
  streamId: "",
  degreeType: "",
});
const validateForm = () => {
  let isValid = true;

  // Reset errors
  errors.name = "";
  errors.phone = "";
  errors.streamId = "";
  errors.degreeType = "";

  // Name validation
  if (!formState.name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  } else if (formState.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
    isValid = false;
  }

  // Phone validation (Indian numbers)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!formState.phone) {
    errors.phone = "Mobile number is required";
    isValid = false;
  } else if (!phoneRegex.test(formState.phone)) {
    errors.phone = "Enter a valid 10-digit Indian number";
    isValid = false;
  }

  // Stream validation
  if (!formState.streamId) {
    errors.streamId = "Please select a stream";
    isValid = false;
  }

  // Degree validation
  if (!formState.degreeType) {
    errors.degreeType = "Please select degree level";
    isValid = false;
  }

  return isValid;
};

const openApplyModal = () => {
  isApplyModalOpen.value = true;
  document.body.style.overflow = "hidden";

  if (!streams.value.length) {
    fetchStreams();
  }
};

const closeApplyModal = () => {
  isApplyModalOpen.value = false;
  document.body.style.overflow = "";
  Object.assign(formState, {
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    degreeType: "",
    streamId: "",
  });
  submitMessage.value = null;
};

const submitLead = async () => {
  if (!validateForm()) {
    toast.error("Please fix the errors in the form");
    return;
  }

  isSubmitting.value = true;

  try {
    // ✅ Transform data for backend
    const payload = {
      ...formState,
      degreeType: formState.degreeType?.id || "",
      streamId: formState.streamId?.id || null,
    };

    const response = await axios.post(VITE_ADD_LEAD, payload);

    toast.success(response.data?.message || "Enquiry sent successfully!");
    setTimeout(() => closeApplyModal(), 1500);
  } catch (error) {
    // ✅ Handle Zod / validation errors properly
    if (error.response?.data?.errors) {
      error.response.data.errors.forEach((err) => {
        const field = err.path?.[0];
        if (field && errors[field] !== undefined) {
          errors[field] = err.message;
        }
        toast.error(err.message);
      });
    } else {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out;
}
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE & Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}



@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
