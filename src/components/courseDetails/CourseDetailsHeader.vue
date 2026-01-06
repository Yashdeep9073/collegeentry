<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCourseStore } from "../../store/CourseDetailsStore";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import axios from "axios";
import { onMounted, computed, ref, reactive } from "vue";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();

/* ENV */
const VITE_ADD_LEAD = import.meta.env.VITE_ADD_LEAD_COLLEGE_API;
const VITE_FETCH_STREAM = import.meta.env.VITE_FETCH_ALL_STREAM;

/* FETCH COURSE */
onMounted(() => {
  courseStore.fetchCourseBySlug(route.params.slug);
  fetchStreams();
});

/* COMPUTED DATA */
const course = computed(() => courseStore.course?.[0] || null);
const details = computed(() => courseStore.courseDetails);
const stream = computed(() => course.value?.stream || null);
const courseIcon = computed(() => stream.value?.icon || null);
const brochureUrl = computed(() => course.value?.brochureUrl || null);

/* BROCHURE */
const downloadBrochure = () => {
  if (!brochureUrl.value) return;
  window.open(brochureUrl.value, "_blank", "noopener");
};

/* APPLY MODAL */
const isApplyModalOpen = ref(false);
const isSubmitting = ref(false);

const openApplyModal = () => {
  isApplyModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeApplyModal = () => {
  isApplyModalOpen.value = false;
  document.body.style.overflow = "";
  Object.assign(formState, {
    name: "",
    phone: "",
    email: "",
    streamId: "",
    degreeType: "",
  });
};

/* TERMS */
const goToTermsAndConditions = () => {
  closeApplyModal();
  router.push("/terms-and-conditions");
};

/* STREAMS */
const streams = ref([]);
async function fetchStreams() {
  try {
    const res = await axios.get(VITE_FETCH_STREAM);
    streams.value = res.data.data || [];
  } catch {
    toast.error("Failed to load streams");
  }
}

/* DEGREE LEVELS */
const levels = [
  { id: "BACHELORS", name: "Bachelors" },
  { id: "MASTERS", name: "Masters" },
  { id: "DOCTORATE", name: "Doctorate" },
  { id: "DIPLOMA", name: "Diploma" },
];

/* FORM */
const formState = reactive({
  name: "",
  phone: "",
  email: "",
  streamId: "",
  degreeType: "",
});

const errors = reactive({
  name: "",
  phone: "",
  streamId: "",
  degreeType: "",
});

/* VALIDATION */
function validateForm() {
  Object.keys(errors).forEach((k) => (errors[k] = ""));

  if (formState.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
    return false;
  }

  if (!/^[6-9]\d{9}$/.test(formState.phone)) {
    errors.phone = "Enter valid 10-digit Indian number";
    return false;
  }

  if (!formState.streamId) {
    errors.streamId = "Select a stream";
    return false;
  }

  if (!formState.degreeType) {
    errors.degreeType = "Select degree level";
    return false;
  }

  return true;
}

/* SUBMIT */
async function submitLead() {
  if (!validateForm()) {
    toast.error("Please fix the errors");
    return;
  }

  isSubmitting.value = true;

  try {
    await axios.post(VITE_ADD_LEAD, {
      name: formState.name,
      phone: formState.phone,
      email: formState.email,
      streamId: formState.streamId.id,
      degreeType: formState.degreeType.id,
      courseId: course.value?.id,
    });

    toast.success("Enquiry sent successfully");
    setTimeout(closeApplyModal, 1200);
  } catch {
    toast.error("Failed to submit enquiry");
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div v-if="course" class="w-full bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8"
      >
        <!-- HEADER -->
        <div
          class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        >
          <!-- LEFT SECTION -->
          <div class="flex items-start gap-4">
            <!-- ICON -->
            <div
              class="p-3 rounded-xl bg-red-50 border border-red-200 flex-shrink-0"
            >
              <img
                v-if="courseIcon"
                :src="courseIcon"
                class="w-10 h-10 object-contain"
                alt="Course Icon"
              />
            </div>

            <!-- TITLE -->
            <div>
              <h1
                class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight"
              >
                <span class="text-red-600">{{ course.name }}</span>
              </h1>

              <p class="mt-1 text-sm sm:text-base text-gray-600 max-w-xl">
                Eligibility :
                {{ details?.eligibility || "Course Details & Eligibility" }}
              </p>
            </div>
          </div>

          <!-- ACTION BUTTONS -->
          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              @click="openApplyModal"
              class="w-full sm:w-auto border border-red-500 text-red-600 font-medium px-6 py-2.5 rounded-lg hover:bg-red-50 transition"
            >
              Apply Now
            </button>

            <button
              v-if="brochureUrl"
              @click="downloadBrochure"
              class="w-full sm:w-auto bg-red-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <i class="fas fa-download"></i>
              Detailed Guide
            </button>

            <button
              v-else
              disabled
              class="w-full sm:w-auto bg-gray-200 text-gray-500 px-6 py-2.5 rounded-lg cursor-not-allowed"
            >
              Brochure Not Available
            </button>
          </div>
        </div>

        <!-- METRICS -->
        <div
          class="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-sm text-gray-700"
        >
          <div
            class="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full"
          >
            ⏱ <span class="font-medium">Duration:</span>
            {{ course.duration }}
          </div>

          <div
            class="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full"
          >
            ₹ <span class="font-medium">Avg Fees:</span>
            {{ course.averageFees }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-10 text-gray-500">Loading course...</div>
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
