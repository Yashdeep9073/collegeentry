<!-- <script setup>
import { ref, computed } from "vue";

// --- Data for LPU Course Fees 2025 Table ---
const courseFees = ref([
  {
    id: 1,
    course: "B.Tech (CSE)",
    fees: "₹10,04,242",
    duration: "4 Years",
    eligibility: "10+2 with 60% + LPUNEST/JEE Main",
  },
  {
    id: 2,
    course: "B.Pharm",
    fees: "₹9,60,000",
    duration: "4 Years",
    eligibility: "10+2 with 60% + LPUNEST/NEET",
  },
  {
    id: 3,
    course: "MBA",
    fees: "₹8,48,000",
    duration: "2 Years",
    eligibility: "Graduation with 55% + LPUNEST/CAT/MAT/XAT",
  },
  {
    id: 4,
    course: "BCA",
    fees: "₹5,80,000",
    duration: "3 Years",
    eligibility: "10+2 with 50% + LPUNEST",
  },
  {
    id: 5,
    course: "B.A. (Hons)",
    fees: "₹3,30,000",
    duration: "3 Years",
    eligibility: "10+2 with 50%",
  },
  {
    id: 6,
    course: "BBA",
    fees: "₹4,46,750",
    duration: "3 Years",
    eligibility: "10+2 with 50% + LPUNEST/NMAT",
  },
  {
    id: 7,
    course: "Ph.D. (Research)",
    fees: "₹1,40,000 (per sem)",
    duration: "3-6 Years",
    eligibility: "Master's degree + LPUNEST/NET/GATE",
  },
  {
    id: 8,
    course: "M.Tech",
    fees: "₹2,92,000",
    duration: "2 Years",
    eligibility: "B.Tech/B.E. with 60% + LPUNEST/GATE",
  },
]);

const faqs = ref([
  {
    id: 1,
    question: "Q: What is the IIT Madras fee for B.Tech?",
    answer:
      "A: The IIT Madras fee for B.Tech is **INR 8 Lakh**. It is the total tuition fees.",
    isOpen: false,
  },
  {
    id: 2,
    question: "Q: What is the IIT Madras fee for MBA?",
    answer: "A: The IIT Madras fee for MBA is **INR 8 Lakhs**.",
    isOpen: false,
  },
  {
    id: 3,
    question: "Q: What is the IIT Madras fee for M.Tech?",
    answer: "A: The IIT Madras fees structure for M.Tech is **INR 1 Lakh**.",
    isOpen: false,
  },
  {
    id: 4,
    question: "Q: Which entrance exams are accepted at IIT Madras?",
    answer:
      "A: For B.Tech admissions, IIT Madras accepts scores from the **JEE Main** and **JEE Advanced** exams. For M.Tech, **GATE** is required, and for the MBA program, **CAT** is accepted.",
    isOpen: false,
  },
  {
    id: 5,
    question: "Q: What is the IIT Madras fee for PhD?",
    answer: "A: The IIT Madras fee for PhD is **INR 15,000**.",
    isOpen: false,
  },
]);

// Function to toggle the open/close state of an FAQ item
const toggleFAQ = (id) => {
  faqs.value = faqs.value.map((faq) => ({
    ...faq,
    // Close all others, open the one clicked
    isOpen: faq.id === id ? !faq.isOpen : false,
  }));
};
const initialCoursesToShow = 5;
const showAllCourses = ref(false);

const displayedCourses = computed(() => {
  return showAllCourses.value
    ? courseFees.value
    : courseFees.value.slice(0, initialCoursesToShow);
});

const hasMoreCourses = computed(() => {
  return courseFees.value.length > initialCoursesToShow;
});

const toggleShowMoreCourses = () => {
  showAllCourses.value = !showAllCourses.value;
};

// --- Data for Fee Payment Guidelines Section ---
const paymentGuidelines = ref([
  "Candidates must pay the fee as per the guidelines provided in the admission letter.",
  "Fee can be paid online through the university portal using Net Banking, Credit Card, or UPI.",
  "A **late payment fine of ₹500/day** may apply after the stipulated due date.",
  "**Installment options** are available, but a detailed schedule must be adhered to.",
  "All fees are subject to revision by the university management.",
  "Hostel and Mess charges are separate from the tuition fee and must be paid as per the hostel circular.",
]);
</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8">
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3
        class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200"
      >
        💰 LPU Course Fees 2025
      </h3>

      <div class="overflow-x-auto">
        <table
          class="min-w-full divide-y divide-gray-200 border border-gray-200"
        >
          <thead class="bg-blue-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
              >
                Course
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
              >
                Total Fees (Approx)
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
              >
                Duration
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider hidden sm:table-cell"
              >
                Eligibility
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="course in displayedCourses" :key="course.id">
              <td
                class="px-6 py-3 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline cursor-pointer"
              >
                {{ course.course }}
              </td>
              <td
                class="px-6 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold"
              >
                {{ course.fees }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                {{ course.duration }}
              </td>
              <td
                class="px-6 py-3 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell"
              >
                {{ course.eligibility }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-center">
                <button
                  class="px-3 py-1 text-xs font-medium text-red-600 border border-red-400 rounded-md hover:bg-red-50 transition duration-150"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="hasMoreCourses" class="text-center pt-4">
        <button
          @click="toggleShowMoreCourses"
          class="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out text-sm"
        >
          {{ showAllCourses ? "Show Less Courses" : "Show More Courses" }}
        </button>
      </div>
    </div>

    <hr class="border-gray-200" />

    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3
        class="text-xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200"
      >
        📝 LPU Fee Payment Guidelines
      </h3>

      <div class="space-y-3">
        <div
          v-for="(guideline, index) in paymentGuidelines"
          :key="index"
          class="flex items-start"
        >
          <i
            class="fas fa-check-circle text-green-500 mr-3 mt-1 flex-shrink-0"
          ></i>
          <p
            class="text-gray-700 text-base leading-relaxed"
            v-html="guideline"
          ></p>
        </div>
      </div>
    </div>
    <div class="space-y-6 p-4 sm:p-6 lg:p-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3
          class="text-xl font-bold text-gray-800 mb-5 border-b pb-3 border-gray-200"
        >
          ❓ FAQs on IIT Madras Courses and Fees
        </h3>

        <div class="divide-y divide-gray-200">
          <div v-for="faq in faqs" :key="faq.id" class="py-3">
            <button
              @click="toggleFAQ(faq.id)"
              class="w-full flex justify-between items-center text-left text-base font-medium text-gray-800 hover:text-blue-600 focus:outline-none transition duration-150"
            >
              <span>{{ faq.question }}</span>
              <svg
                :class="{
                  'rotate-180 text-blue-600': faq.isOpen,
                  'text-gray-500': !faq.isOpen,
                }"
                class="w-5 h-5 ml-2 transform transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <div
              v-if="faq.isOpen"
              class="mt-2 pr-4 transition-all duration-300 ease-in-out"
            >
              <p
                class="text-sm text-gray-700 border-l-4 border-red-500 pl-4 py-2"
                v-html="faq.answer"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any specific styles here, or rely on global Tailwind imports */
</style> -->

<script setup>
import { computed, ref } from "vue";
import { useCollegeStore } from "../../../store/collegeNameStore";
import { useRouter } from "vue-router";

const collegeStore = useCollegeStore();
const router = useRouter();

const courses = computed(() => {
  return collegeStore.college?.courses || [];
});

/* Filters (optional but ready) */
const selectedMode = ref("ALL");
const selectedDegree = ref("ALL");

const filteredCourses = computed(() => {
  return courses.value.filter((c) => {
    const modeOk =
      selectedMode.value === "ALL" || c.modeOfOperation === selectedMode.value;

    const degreeOk =
      selectedDegree.value === "ALL" || c.degreeType === selectedDegree.value;

    return modeOk && degreeOk;
  });
});

const goToApply = (course) => {
  // later connect with lead / form page
  router.push("/contact-us");
};
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-3">
        📚 Courses Offered
      </h1>
      <p class="text-gray-600 mt-1">
        Explore all programs with complete fee structure & admission details
      </p>
    </div>

    <!-- Filters -->
    <div
      class="bg-white p-5 rounded-xl shadow border border-gray-200 flex flex-col sm:flex-row gap-4"
    >
      <select
        v-model="selectedMode"
        class="border rounded-lg px-4 py-2 text-sm focus:outline-none"
      >
        <option value="ALL">All Modes</option>
        <option value="ONLINE">Online</option>
        <option value="OFFLINE">Offline</option>
      </select>

      <select
        v-model="selectedDegree"
        class="border rounded-lg px-4 py-2 text-sm focus:outline-none"
      >
        <option value="ALL">All Degree Types</option>
        <option value="INTEGRATED">Integrated</option>
        <option value="UG">UG</option>
        <option value="PG">PG</option>
        <option value="DIPLOMA">Diploma</option>
      </select>
    </div>

    <!-- Courses List -->
    <div class="space-y-6">
      <div
        v-for="course in filteredCourses"
        :key="course.id"
        class="bg-white rounded-2xl shadow border border-gray-200 p-6 hover:shadow-lg transition"
      >
        <!-- Top Section -->
        <div class="flex flex-col md:flex-row justify-between gap-6">
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-gray-800">
              {{ course.name }}
            </h2>

            <div class="flex flex-wrap gap-3 text-sm text-gray-600">
              <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {{ course.degreeType }}
              </span>

              <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {{ course.modeOfOperation }}
              </span>

              <span
                class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
              >
                Duration: {{ course.duration }} Years
              </span>
            </div>
          </div>

          <!-- Fees Box -->
          <div
            class="bg-red-50 border border-red-100 rounded-xl px-6 py-4 text-center"
          >
            <p class="text-sm text-gray-600">Average Fees</p>
            <p class="text-2xl font-bold text-red-600">₹{{ course.fees }}</p>
          </div>
        </div>

        <!-- Details Grid -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 text-sm"
        >
          <div>
            <p class="font-semibold text-gray-700">Eligibility</p>
            <p class="text-gray-600">{{ course.eligibility }}</p>
          </div>

          <div>
            <p class="font-semibold text-gray-700">Seats Available</p>
            <p class="text-gray-600">{{ course.seatsAvailable }}</p>
          </div>

          <div>
            <p class="font-semibold text-gray-700">Admission Process</p>
            <p class="text-gray-600">{{ course.admissionProcess }}</p>
          </div>

          <div>
            <p class="font-semibold text-gray-700">Start Date</p>
            <p class="text-gray-600">{{ course.startDate }}</p>
          </div>

          <div>
            <p class="font-semibold text-gray-700">End Date</p>
            <p class="text-gray-600">{{ course.endDate }}</p>
          </div>
        </div>

        <!-- Description -->
        <div class="mt-5">
          <p class="font-semibold text-gray-700 mb-1">Course Description</p>
          <p class="text-gray-600 text-sm leading-relaxed">
            {{ course.description }}
          </p>
        </div>

        <!-- Action -->
        <div class="mt-6 flex justify-end">
          <button
            class="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!filteredCourses.length"
      class="bg-white p-10 rounded-xl border text-center text-gray-500"
    >
      No courses found for selected filters.
    </div>
  </div>
</template>
