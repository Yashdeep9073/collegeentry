<template>
  <footer class="bg-gray-900 text-gray-300 py-10 md:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-12">
        <div>
          <div class="flex items-center mb-4">
            <img :src="Logo" alt="Logo" class="h-10" @error="onLogoError" />
          </div>

          <address class="not-italic text-sm space-y-1">
            <p>
              {{
                AddressLine ||
                "Office No: 36, Second Floor, D-185, Phase 8B,  Industrial Area, Sector 74,"
              }},
            </p>

            <span>{{ State || "Punjab" }},</span>
            <span>{{ city || "Mohali" }},</span>
            <span>{{ postalCode || "160055" }}</span>
          </address>

          <div class="flex space-x-4 mt-6">
            <!-- Facebook -->
            <a
              v-if="facebookUrl"
              :href="facebookUrl"
              target="_blank"
              aria-label="Facebook"
              class="hover:text-white transition duration-150"
            >
              <i class="fab fa-facebook-f"></i>
            </a>

            <!-- Instagram -->
            <a
              v-if="instagramUrl"
              :href="instagramUrl"
              target="_blank"
              aria-label="Instagram"
              class="hover:text-white transition duration-150"
            >
              <i class="fab fa-instagram"></i>
            </a>

            <!-- Twitter / X -->
            <a
              v-if="twitterUrl"
              :href="twitterUrl"
              target="_blank"
              aria-label="Twitter"
              class="hover:text-white transition duration-150"
            >
              <i class="fab fa-x-twitter"></i>
            </a>

            <!-- LinkedIn -->
            <a
              v-if="linkedinUrl"
              :href="linkedinUrl"
              target="_blank"
              aria-label="LinkedIn"
              class="hover:text-white transition duration-150"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>

            <!-- YouTube -->
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
        <div>
          <h4
            class="text-lg font-semibold text-white mb-4 uppercase border-b-2 border-orange-500 inline-block pb-1"
          >
            Top Colleges
          </h4>

          <ul class="space-y-2 text-sm">
            <li
              v-for="college in topColleges"
              :key="college.id"
              class="cursor-pointer hover:text-white transition duration-150"
              @click="goToCollege(college)"
            >
              {{ college.name }}
            </li>
          </ul>
        </div>
        <div>
          <h4
            class="text-lg font-semibold text-white mb-4 uppercase border-b-2 border-orange-500 inline-block pb-1"
          >
            Top Exams
          </h4>

          <ul class="space-y-2 text-sm">
            <li
              v-for="exam in topExams"
              :key="exam.id"
              class="cursor-pointer hover:text-white transition duration-150"
              @click="goToExam(exam)"
            >
              {{ exam.shortName || exam.name }}
            </li>

            <li v-if="!topExams.length && !isExamLoading" class="text-gray-400">
              No exams available
            </li>
          </ul>
        </div>

        <div v-for="(section, index) in footerLinks" :key="index">
          <h4
            class="text-lg font-semibold text-white mb-4 uppercase border-b-2 border-orange-500 inline-block pb-1"
          >
            {{ section.title }}
          </h4>
          <ul class="space-y-2 text-sm">
            <li v-for="link in section.links" :key="link.name">
              <router-link
                :to="link.url"
                class="hover:text-white transition duration-150"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-10 pt-6 text-center text-sm text-white">
      <hr class="mb-3" />
      &copy; 2026 {{ Name || "College Entry" }} | All Rights Reserved
    </div>

    <slot name="floating-buttons"></slot>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCollegeStore } from "../store/collegeStore";
import { useRouter } from "vue-router";
import axios from "axios";

import fallbackLogo from "../assets/white-logo.svg";

const onLogoError = (event) => {
  event.target.src = fallbackLogo;
};

import { useCompanySettingStore } from "../store/companySettingStore";
const router = useRouter();
const collegeStore = useCollegeStore();
const store = useCompanySettingStore();
const Name = computed(() => store.setting?.organizationName || "College Entry");
const Logo = computed(() => store.setting?.whiteLogo || fallbackLogo);
const AddressLine = computed(
  () => store.setting?.addressLine || "College Entry"
);
const Country = computed(() => store.setting?.country || "College Entry");
const State = computed(() => store.setting?.state || "College Entry");
const city = computed(() => store.setting?.city || "College Entry");
const postalCode = computed(() => store.setting?.postalCode || "College Entry");
const facebookUrl = computed(() => store.setting?.facebookUrl || "");
const instagramUrl = computed(() => store.setting?.instagramUrl || "");
const twitterUrl = computed(() => store.setting?.twitterUrl || "");
const linkedinUrl = computed(() => store.setting?.linkedinUrl || "");
const youtubeUrl = computed(() => store.setting?.youtubeUrl || "");
const FETCH_ALL_EXAMS = import.meta.env.VITE_FETCH_ALL_EXAM;

// 🔹 Exams state
const exams = ref([]);
const isExamLoading = ref(false);

onMounted(async () => {
  // Colleges (already present)
  if (!collegeStore.collegeList.length) {
    await collegeStore.fetchColleges();
  }

  // ✅ Fetch exams
  fetchExams();
});

const fetchExams = async () => {
  try {
    isExamLoading.value = true;
    const res = await axios.get(FETCH_ALL_EXAMS);
    exams.value = res.data?.data || [];
  } catch (err) {
    console.error("Failed to fetch exams", err);
  } finally {
    isExamLoading.value = false;
  }
};

// ✅ Only first 5 exams
const topExams = computed(() => exams.value.slice(0, 5));

// ✅ Top colleges (unchanged)
const topColleges = computed(() => {
  return Array.isArray(collegeStore.collegeList)
    ? collegeStore.collegeList.slice(0, 6)
    : [];
});

function goToCollege(college) {
  const slug = college.name.toLowerCase().replace(/\s+/g, "-");
  router.push(`/colleges/${slug}`);
}

function goToExam(exam) {
  const title = exam.fullName || exam.name || exam.shortName;

  if (!title) {
    console.error("Invalid exam object:", exam);
    return;
  }

  const slug = title.toLowerCase().replace(/\s+/g, "-");
  router.push(`/exam/${slug}`);
}

// Footer static links (without Top Exams)
const footerLinks = ref([
  {
    title: "Top Courses",
    links: [
      { name: "Architecture", url: "#" },
      { name: "Arts", url: "#" },
      { name: "Commerce", url: "#" },
      { name: "Computer", url: "#" },
      { name: "Design", url: "#" },
      { name: "Education", url: "#" },
    ],
  },
  {
    title: "Our Policies",
    links: [
      { name: "Advertise With Us", url: "#" },
      { name: "Terms & Conditions", url: "/terms-and-conditions" },
      { name: "Privacy Policy", url: "/privacy-policy" },
    ],
  },
]);
</script>

<style scoped></style>
