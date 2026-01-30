<template>
  <div class="bg-blue-50 min-h-screen">
    <div
      class="max-w-[1400px] mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10"
    >
      <aside
        class="w-full lg:w-80 bg-white rounded-2xl shadow-xl p-6 lg:sticky lg:top-8 h-fit transition-all duration-300"
      >
        <h3
          class="text-xl font-bold text-gray-800 mb-6 flex items-center justify-between"
        >
          <span class="flex items-center gap-2">
            <svg
              class="w-6 h-6 text-[#ff4d4f]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0011 15.586V21h-2v-5.414a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              ></path>
            </svg>
            Filter Options
          </span>
        </h3>

        <div class="text-sm text-gray-500 mb-4">
          Showing
          <span class="font-semibold text-[#ff4d4f]">{{ paged.length }}</span>
          of
          <span class="font-semibold text-[#ff4d4f]">{{
            filtered.length
          }}</span>
          results
        </div>

        <div class="mb-6">
          <div class="relative">
            <input
              v-model="filters.search"
              @keyup.enter="applyFilters"
              placeholder="Search colleges, courses..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        <div class="space-y-6">
          <div class="filter-group">
            <h4
              class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between"
            >
              Stream / Course Type
              <button
                v-if="filters.stream.length > 0"
                @click="filters.stream = []"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="s in apiStreams"
                :key="s.id"
                class="flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer transition"
                :class="
                  filters.stream.includes(s.name)
                    ? 'bg-[#ff4d4f] text-white border-[#ff4d4f] shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-[#ffebeb] hover:text-[#ff4d4f]'
                "
              >
                <input
                  type="checkbox"
                  v-model="filters.stream"
                  :value="s.name"
                  class="hidden"
                />
                <span class="text-sm font-medium">{{ s.name }}</span>
              </label>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="filter-group">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">State</h4>
              <select
                v-model="filters.stateId"
                @change="filters.cityId = ''"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All States</option>
                <option
                  v-for="s in apiStates"
                  :key="s.id"
                  :value="String(s.id)"
                >
                  {{ s.name }}
                </option>
              </select>
            </div>

            <div class="filter-group">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">City</h4>
              <select
                v-model="filters.cityId"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Cities</option>
                <option
                  v-for="c in apiCities"
                  :key="c.id"
                  :value="String(c.id)"
                >
                  {{ c.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="filter-group">
            <h4
              class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between"
            >
              College Type
              <button
                v-if="filters.collegeType.length > 0"
                @click="filters.collegeType = []"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="type in ['Government', 'Private']"
                :key="type"
                @click="toggleValue('collegeType', type)"
                :class="btnClass(filters.collegeType, type)"
                class="px-4 py-2 rounded-full text-sm font-medium transition duration-200"
              >
                {{ type }}
              </button>
            </div>
          </div>

          <div class="filter-group">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">
              Minimum Rating
            </h4>
            <div class="flex gap-2 flex-wrap items-center">
              <button
                v-for="r in [5, 4, 3, 2, 1]"
                :key="r"
                @click="filters.rating = r"
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 transition',
                  filters.rating === r
                    ? 'bg-yellow-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-100',
                ]"
              >
                {{ r }}
                <svg
                  class="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 15l-5.878 3.09 1.123-6.545L.487 7.71a1 1 0 01.558-.337l6.574-.955L10 1.5l2.381 4.918 6.574.955a1 1 0 01.558.337l-4.758 4.635 1.123 6.545L10 15z"
                  />
                </svg>
              </button>
              <button
                @click="filters.rating = 0"
                class="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-gray-200 transition"
              >
                All
              </button>
            </div>
          </div>

          <div class="filter-group">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">
              Total Fee Range
            </h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="range in feeRanges"
                :key="range.label"
                @click="filters.feeRange = range"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium border transition duration-200',
                  filters.feeRange.label === range.label
                    ? 'bg-red-600 text-white border-red-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-white hover:border-red-50',
                ]"
              >
                {{ range.label }}
              </button>
            </div>
          </div>

          <!-- <div class="filter-group">
            <h4
              class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between"
            >
              Entrance Exam
              <button
                v-if="filters.exams.length > 0"
                @click="filters.exams = []"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </h4>
            <div
              class="space-y-2 max-h-40 overflow-y-auto pr-3 custom-scrollbar"
            >
              <label
                v-for="(e, i) in exams"
                :key="i"
                class="flex items-center gap-3 text-sm cursor-pointer py-1 hover:bg-blue-50 rounded-md px-2 transition"
              >
                <input
                  type="checkbox"
                  :value="e"
                  v-model="filters.exams"
                  class="form-checkbox text-[#ff4d4f] rounded h-4 w-4 border-gray-300 focus:ring-[#ff4d4f]"
                />
                <span class="text-gray-700">{{ e }}</span>
              </label>
            </div>
          </div> -->

          <div class="filter-group">
            <h4
              class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between"
            >
              Degree Type
              <button
                v-if="filters.degree"
                @click="filters.degree = ''"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="deg in visibleDegrees"
                :key="deg.value"
                @click="toggleValue('degree', deg.value)"
                :class="btnClass(filters.degree, deg.value)"
                class="px-4 py-2 rounded-full text-sm font-medium transition duration-200"
              >
                {{ deg.label }}
              </button>
            </div>

            <!-- Show More / Less -->
            <button
              v-if="DEGREE_OPTIONS.length > 4"
              @click="showAllDegrees = !showAllDegrees"
              class="mt-2 text-sm text-[#ff4d4f] hover:underline"
            >
              {{ showAllDegrees ? "Show Less" : "Show More" }}
            </button>
          </div>

          <div class="filter-group">
            <h4
              class="text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between"
            >
              Program Mode
              <button
                v-if="filters.programMode"
                @click="filters.programMode = ''"
                class="text-xs text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="mode in MODE_OPTIONS"
                :key="mode.value"
                @click="toggleValue('programMode', mode.value)"
                :class="btnClass(filters.programMode, mode.value)"
                class="px-4 py-2 rounded-full text-sm font-medium transition duration-200"
              >
                {{ mode.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex gap-3 mt-8 pt-4 border-t border-gray-200">
          <button
            @click="clearFilters"
            class="flex-1 border border-gray-300 text-gray-700 rounded-xl px-4 py-3 hover:bg-gray-100 transition duration-300"
          >
            Reset All
          </button>
        </div>
      </aside>

      <main class="flex-1 min-w-0">
        <div
          class="flex flex-wrap items-center justify-between mb-8 gap-4 pb-4 border-b-2 border-blue-200"
        >
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-extrabold text-gray-900">
              🎓 Top Colleges
            </h1>
          </div>

          <div class="flex items-center gap-3">
            <label class="text-base text-gray-700 font-medium">Sort By:</label>
            <select
              v-model="sortBy"
              @change="page = 1"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="relevance">Relevance</option>
              <option value="rating_desc">Rating: High to Low</option>
              <option value="fees_asc">Fees: Low to High</option>
              <option value="fees_desc">Fees: High to Low</option>
            </select>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-10">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4d4f]"
          ></div>
          <p class="mt-4 text-gray-600">Loading colleges...</p>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="text-center py-10 bg-white rounded-xl shadow-lg text-gray-600"
        >
          <p class="text-xl font-semibold mb-3">Error Loading Colleges 😞</p>
          <p>{{ error }}</p>
          <button
            @click="fetchColleges"
            class="mt-4 bg-[#ff4d4f] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#ff575a] transition duration-300"
          >
            Try Again
          </button>
        </div>

        <!-- Success State -->
        <div v-else class="space-y-6">
          <div
            v-for="college in paged"
            :key="college.id"
            class="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <div class="w-full md:w-64 flex-shrink-0">
              <img
                @click="goToCollege(college)"
                :src="college.image"
                :alt="college.name"
                class="w-full h-48 object-cover rounded-xl shadow-md"
              />
              <div class="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                <div class="text-xs text-gray-600 font-medium">
                  Annual Fee (Avg.)
                </div>
                <div class="text-xl font-bold text-red-600">
                  {{ formatFee(college.fees) }}
                </div>
              </div>
            </div>

            <div class="flex-1">
              <div
                class="flex flex-col sm:flex-row items-start justify-between gap-3"
              >
                <div>
                  <h2
                    @click="goToCollege(college)"
                    class="text-xl font-bold text-gray-900 hover:text-blue-600 transition cursor-pointer"
                  >
                    {{ college.name }}
                  </h2>
                  <p class="text-sm text-gray-500 mt-1">
                    📍 {{ college.city }}, {{ college.state }}
                    <span class="mx-2">•</span>
                    <span
                      :class="{
                        'text-green-600 font-medium':
                          college.type === 'Government',
                        'text-amber-600 font-medium':
                          college.type === 'Private',
                      }"
                      >{{ college.type }}</span
                    >
                  </p>
                </div>

                <div
                  class="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-full text-lg font-bold shadow-md"
                >
                  {{ college.rating }}
                  <svg
                    class="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 15l-5.878 3.09 1.123-6.545L.487 7.71a1 1 0 01.558-.337l6.574-.955L10 1.5l2.381 4.918 6.574.955a1 1 0 01.558.337l-4.758 4.635 1.123 6.545L10 15z"
                    />
                  </svg>
                </div>
              </div>

              <div class="mt-4 flex flex-wrap gap-2 items-center">
                <span class="tag-badge bg-blue-100 text-blue-800">
                  <span class="font-semibold">
                    {{ getDisplayStream(college) }}
                  </span>
                </span>

                <span class="tag-badge bg-gray-100 text-gray-700">
                  Degree: {{ getDisplayDegree(college) }}
                </span>

                <span class="tag-badge bg-gray-100 text-gray-700">
                  Mode: {{ getDisplayMode(college) }}
                </span>
              </div>

              <p class="mt-4 text-sm text-gray-600 line-clamp-3">
                {{ college.description }}
              </p>

              <div class="mt-6 flex items-center gap-4 flex-wrap">
                <button
                  @click="openApplyModal"
                  class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-base font-semibold transition shadow-lg shadow-red-500/50"
                >
                  Apply Now
                </button>
                <button
                  @click="goToCollege(college)"
                  class="border border-[#ff4d4f] text-[#ff4d4f] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-50 transition"
                >
                  View Details
                </button>
                <div class="ml-auto text-sm text-gray-500">
                  Est. Placement Rate:
                  <span class="font-bold text-green-600 text-lg"
                    >{{ college.placement }}%</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="filtered.length === 0"
            class="text-center py-10 bg-white rounded-xl shadow-lg text-gray-600"
          >
            <p class="text-xl font-semibold mb-3">No Colleges Found</p>
            <p>Try adjusting your filters or clearing your selections.</p>
          </div>
        </div>

        <div
          v-if="totalPages > 1"
          class="mt-10 flex flex-col sm:flex-row items-center justify-between flex-wrap gap-4"
        >
          <div class="text-base text-gray-700 font-medium">
            Showing Page
            <span class="font-bold text-[#ff4d4f]">{{ page }}</span> of
            <span class="font-bold text-[#ff4d4f]">{{ totalPages }}</span>
          </div>
          <div class="flex gap-2 flex-wrap justify-center">
            <button
              @click="prevPage"
              :disabled="page === 1"
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition"
            >
              ← Previous
            </button>
            <button
              v-for="p in paginationRange"
              :key="p"
              @click="page = p"
              :class="[
                'w-10 h-10 rounded-full font-semibold transition duration-200',
                page === p
                  ? 'bg-[#ff4d4f] text-white shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-50',
              ]"
            >
              {{ p }}
            </button>
            <button
              @click="nextPage"
              :disabled="page === totalPages"
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-100 transition"
            >
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
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
            :options="apiStreams"
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
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute(); // for reading query params

const FETCH_ALL_COLLEGES_URL = import.meta.env.VITE_FETCH_COLLEGES_FILTER;
const VITE_ADD_LEAD = import.meta.env.VITE_ADD_LEAD_COLLEGE_API;

import { onMounted, computed, ref, watch, reactive } from "vue";
import { toast } from "vue3-toastify";
import axios from "axios";
/* ------------ Reactive Data ------------ */
const allColleges = ref([]);
const loading = ref(false);
const error = ref(null);

const apiStates = ref([]);
const apiCities = ref([]);

const exams = [
  "JEE Advanced",
  "JEE Main",
  "CAT",
  "BITSAT",
  "CUET",
  "MET",
  "NMAT",
  "SRMJEE",
  "None",
];
const DEGREE_OPTIONS = [
  { value: "BACHELORS", label: "Bachelors" },
  { value: "INTEGRATED", label: "Integrated" },
  { value: "MASTERS", label: "Masters" },
  { value: "DOCTORATE", label: "Doctorate" },
  { value: "DIPLOMA", label: "Diploma" },
  { value: "POSTGRADUATE_DIPLOMA", label: "Postgraduate Diploma" },
  { value: "CERTIFICATE", label: "Certificate" },
];

const MODE_OPTIONS = [
  { value: "ONLINE", label: "Online" },
  { value: "OFFLINE", label: "Offline" },
  { value: "DISTANCE", label: "Distance" },
];

const showAllDegrees = ref(false);

const visibleDegrees = computed(() => {
  return showAllDegrees.value ? DEGREE_OPTIONS : DEGREE_OPTIONS.slice(0, 4); // show first 4 initially
});

const feeRanges = [
  { label: "Under ₹50K", min: 0, max: 50000 },
  { label: "₹50K – ₹3L", min: 50000, max: 300000 },
  { label: "₹3L – ₹10L", min: 300000, max: 1000000 },
  { label: "Above ₹10L", min: 1000000, max: 9999999 },
];

/* ------------ Reactive Filters ------------ */
const filters = ref({
  search: "",
  stream: [],
  stateId: "",
  cityId: "",
  collegeType: [],
  degree: [],
  programMode: [],
  exams: [],
  feeRange: { label: "All", min: 0, max: 9999999 },
  rating: 0,
});

const levels = ref([
  { id: "Bachelors", name: "Bachelors" },
  { id: "Masters", name: "Masters" },
  { id: "Doctorate", name: "Doctorate" },
  { id: "Diploma", name: "Diploma" },
]);

const sortBy = ref("relevance");
const page = ref(1);
const perPage = ref(5);
const MAX_PAGES_TO_SHOW = 5;

/* ------------ API Integration ------------ */
async function fetchColleges() {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(FETCH_ALL_COLLEGES_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch colleges: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data.data)) {
      // Transform API data to match our component structure
      allColleges.value = data.data.map((college) => {
        const parsedFee = parseFeeRange(college.feesRange);

        return {
          id: college.id,
          name: college.name,
          stateId: college.state?.id ? String(college.state.id) : "",
          cityId: college.city?.id ? String(college.city.id) : "",
          state: college.state?.name || "",
          city: college.city?.name || "",
          stream: college.streams || [],

          type: mapOwnershipToType(college.ownership),
          degree: college.degreeTypes || [],
          // degreeTypes: college.degreeTypes || [],
          // exam: "None",
          programMode: college.modes || [],

          // 🔥 FIXED LOGIC
          fees: parsedFee ?? generateRandomFee(),

          rating: college.details?.rating || generateRandomRating(),
          placement: generateRandomPlacement(),

          image:
            college.details?.image ||
            "https://images.unsplash.com/photo-1562774053-701939374585",

          description:
            college.description ||
            generateDescription(college.name, college.ownership),
        };
      });
    } else {
      throw new Error("Invalid data format received from API");
    }
  } catch (err) {
    console.error("Error fetching colleges:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

/* ------------ Helper Functions ------------ */
function extractState(location) {
  if (!location) return "Unknown";
  const parts = location.split(",");
  return parts[parts.length - 1].trim();
}

function extractCity(location) {
  if (!location) return "Unknown";
  const parts = location.split(",");
  return parts[0].trim();
}
function goToCollege(college) {
  const slug = college.name.toLowerCase().replace(/\s+/g, "-"); // convert name → slug
  router.push(`/colleges/${slug}`);
}
function mapOwnershipToType(ownership) {
  if (ownership === "GOVERNMENT") return "Government";
  if (ownership === "PRIVATE") return "Private";
  return ownership; // fallback
}
watch(
  () => route.query.city,
  (city) => {
    if (city) {
      filters.value.city = city;
      filters.value.search = city; // optional but powerful
      applyFilters();
    }
  },
  { immediate: true },
);

function generateRandomFee() {
  // Generate random fee between 50,000 and 20,00,000
  return Math.floor(Math.random() * 1950000) + 50000;
}

function generateRandomRating() {
  // Generate random rating between 3.0 and 5.0
  return (Math.random() * 2 + 3).toFixed(1);
}

function generateRandomPlacement() {
  // Generate random placement between 60% and 95%
  return Math.floor(Math.random() * 35) + 60;
}

function generateDescription(name, ownership) {
  const type = ownership === "PRIVATE" ? "private" : "government";
  return `${name} is a renowned ${type} institution offering quality education with modern facilities and experienced faculty. The college provides a conducive learning environment for students to excel in their chosen fields.`;
}

const formatFee = (n) => {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + "Cr / year";
  if (n >= 100000) return "₹" + (n / 100000).toLocaleString() + "L / year";
  return "₹" + n.toLocaleString() + " / year";
};

const btnClass = (arrOrVal, val) => {
  const isSelected = Array.isArray(arrOrVal)
    ? arrOrVal.includes(val)
    : arrOrVal === val;

  return isSelected
    ? "bg-[#ff4d4f] text-white shadow-md"
    : "bg-gray-100 text-gray-700 hover:bg-[#ffebeb] hover:text-[#ff4d4f]";
};

function toggleValue(key, val) {
  const arr = filters.value[key];
  if (Array.isArray(arr)) {
    const i = arr.indexOf(val);
    i === -1 ? arr.push(val) : arr.splice(i, 1);
  } else {
    filters.value[key] = filters.value[key] === val ? "" : val;
  }
  applyFilters();
}

/* ------------ Computed Filter Logic ------------ */
const filtered = computed(() => {
  let list = allColleges.value.slice();

  const f = filters.value;
  const q = f.search?.toLowerCase()?.trim();

  // 1. Search
  if (q) {
    list = list.filter((c) =>
      [c.name, c.city, c.state, ...(c.stream || []), c.description]
        .filter(Boolean)
        .some((field) => field.toString().toLowerCase().includes(q)),
    );
  }

  if (f.stateId !== "") {
    list = list.filter((c) => c.stateId === f.stateId);
  }

  if (f.cityId !== "") {
    list = list.filter((c) => c.cityId === f.cityId);
  }

  // 2. Multi-select filters
  if (f.stream.length) {
    list = list.filter((c) => c.stream.some((s) => f.stream.includes(s)));
  }
  if (f.collegeType.length) {
    list = list.filter((c) => f.collegeType.includes(c.type));
  }
  if (f.exams.length) list = list.filter((c) => f.exams.includes(c.exam));

  // 3. Single-select filters

  if (f.degree.length) {
    list = list.filter((c) => c.degree.some((d) => f.degree.includes(d)));
  }
  if (f.programMode.length) {
    list = list.filter((c) =>
      c.programMode.some((m) => f.programMode.includes(m)),
    );
  }

  // 4. Fee Range
  if (f.feeRange && f.feeRange.label !== "All") {
    list = list.filter(
      (c) => c.fees >= f.feeRange.min && c.fees <= f.feeRange.max,
    );
  }

  // 5. Rating
  if (f.rating > 0) list = list.filter((c) => Math.floor(c.rating) >= f.rating);

  // 6. Sort
  if (sortBy.value === "rating_desc") list.sort((a, b) => b.rating - a.rating);
  else if (sortBy.value === "fees_asc") list.sort((a, b) => a.fees - b.fees);
  else if (sortBy.value === "fees_desc") list.sort((a, b) => b.fees - a.fees);

  console.log("COLLEGES:", allColleges.value);
  console.log("FILTERED:", list);
  console.log("FILTERS:", filters.value);

  return list;
});
console.table(
  allColleges.value.map((c) => ({
    id: c.id,
    stateId: c.stateId,
    cityId: c.cityId,
  })),
);

/* ------------ Pagination Computed ------------ */
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / perPage.value)),
);

const paged = computed(() => {
  if (page.value > totalPages.value) page.value = totalPages.value;
  if (page.value < 1) page.value = 1;

  const start = (page.value - 1) * perPage.value;
  return filtered.value.slice(start, start + perPage.value);
});

const paginationRange = computed(() => {
  const range = [];
  const total = totalPages.value;
  const current = page.value;
  const max = MAX_PAGES_TO_SHOW;

  if (total > 0) range.push(1);

  let start = Math.max(
    2,
    current - Math.floor(max / 2) + (max % 2 === 0 ? 0 : 1),
  );
  let end = Math.min(total - 1, current + Math.floor(max / 2));

  if (current < Math.floor(max / 2) + 2) {
    end = Math.min(total - 1, max - 1);
  }
  if (current > total - Math.floor(max / 2) - (max % 2 === 0 ? 1 : 0)) {
    start = Math.max(2, total - max + 2);
  }

  if (start > 2) range.push("...");
  for (let i = start; i <= end; i++) {
    if (i > 1 && i < total) range.push(i);
  }
  if (end < total - 1) range.push("...");

  if (total > 1 && !range.includes(total)) range.push(total);

  return range
    .filter((p) => p !== "...")
    .map((p) => (typeof p === "number" ? p : "..."));
});

/* ------------ Controls ------------ */
function applyFilters() {
  page.value = 1;
}

const getDisplayStream = (college) => {
  const selected = filters.value.stream;

  // If user selected streams → show matching stream
  if (selected.length) {
    const match = college.stream.find((s) => selected.includes(s));
    return match || college.stream[0]; // fallback
  }

  // Otherwise show first stream by default
  return college.stream[0] || "";
};
const getDisplayDegree = (college) => {
  const selected = filters.value.degree;

  const degreeValue = selected.length
    ? college.degree.find((d) => selected.includes(d))
    : college.degree[0];

  if (!degreeValue) return "";

  const found = DEGREE_OPTIONS.find((d) => d.value === degreeValue);

  return found ? found.label : degreeValue;
};
const getDisplayMode = (college) => {
  const selected = filters.value.programMode;

  const modeValue = selected.length
    ? college.programMode.find((m) => selected.includes(m))
    : college.programMode[0];

  if (!modeValue) return "";

  const found = MODE_OPTIONS.find((m) => m.value === modeValue);

  return found ? found.label : modeValue;
};

function clearFilters() {
  filters.value = {
    search: "",
    stream: [],
    stateId: "",
    cityId: "",
    collegeType: [],
    degree: [],
    programMode: [],

    exams: [],
    feeRange: { label: "All", min: 0, max: 9999999 },
    rating: 0,
  };
  sortBy.value = "relevance";
  page.value = 1;
}

const prevPage = () => {
  if (page.value > 1) page.value--;
};

const nextPage = () => {
  if (page.value < totalPages.value) page.value++;
};

/* ------------ Lifecycle ------------ */
onMounted(() => {
  fetchColleges();
  fetchStates();
  fetchStreams();
});

const openApplyModal = () => {
  isApplyModalOpen.value = true;
  document.body.style.overflow = "hidden";

  if (!apiStreams.value.length) {
    fetchStreams();
  }
};

function goToTermsAndConditions() {
  closeApplyModal();
  router.push("/terms-and-conditions");
}
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
  degreeType: "",
  streamId: "",
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
    degreeType: "",
    streamId: "",
  });
  submitMessage.value = null;
};

const VITE_FETCH_STREAM = import.meta.env.VITE_FETCH_ALL_STREAM;
const VITE_FETCH_STATES = import.meta.env.VITE_FETCH_ALL_STATES;
const VITE_FETCH_CITY_BY_STATE_ID = import.meta.env.VITE_FETCH_CITIES_BY_STATE;

const apiStreams = ref([]);
const isStreamLoading = ref(false);

const fetchStreams = async () => {
  try {
    isStreamLoading.value = true;
    const res = await axios.get(VITE_FETCH_STREAM);

    // assuming API returns array like [{ id, name }]
    apiStreams.value = res.data.data || [];
  } catch (error) {
    console.error("Error fetching streams:", error);
  } finally {
    isStreamLoading.value = false;
  }
};
watch(
  () => filters.value.stateId,
  async (stateId) => {
    filters.value.cityId = "";
    apiCities.value = [];

    if (stateId === "") return;

    try {
      const res = await axios.get(`${VITE_FETCH_CITY_BY_STATE_ID}${stateId}`);
      apiCities.value = res.data.data || [];
    } catch (err) {
      console.error("Failed to fetch cities", err);
    }
  },
);

function parseFeeRange(feesRange) {
  if (!feesRange || typeof feesRange !== "string") return null;

  // Example: "3444444444 - 3444444444"
  const parts = feesRange.split("-").map((v) => Number(v.trim()));

  if (parts.length === 2 && !isNaN(parts[0])) {
    // Return average fee
    return Math.round((parts[0] + parts[1]) / 2);
  }

  return null;
}

const fetchStates = async () => {
  try {
    const res = await axios.get(VITE_FETCH_STATES);
    apiStates.value = res.data.data || [];
  } catch (err) {
    console.error("Failed to fetch states", err);
  }
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
          "Something went wrong. Please try again.",
      );
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.modal-scroll::-webkit-scrollbar {
  display: none;
}

.modal-scroll {
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}
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
