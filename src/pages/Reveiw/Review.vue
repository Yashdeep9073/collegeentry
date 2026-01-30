<!-- <template>
  <div class="min-h-screen bg-slate-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      
      <div class="text-center mb-10">
        <h1 class="text-3xl font-extrabold text-slate-900">Write Your College Review</h1>
        <p class="text-slate-500 mt-2">Help thousands of students make the right choice!</p>
      </div>

      <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        
        <div class="flex border-b border-slate-100 bg-slate-50/50">
          <div v-for="step in 3" :key="step" 
               :class="['flex-1 py-4 px-2 text-center text-xs font-bold uppercase tracking-wider transition-all', 
                        currentStep >= step ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400']">
            Step {{ step }}: {{ step === 1 ? 'Personal' : step === 2 ? 'Academic' : 'The Review' }}
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 md:p-12">
          
          <div v-if="currentStep === 1" class="space-y-6 animate-in fade-in duration-500">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700">Full Name</label>
                <input v-model="formData.name" type="text" placeholder="Mayank Goyal" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700">Email Address</label>
                <input v-model="formData.email" type="email" placeholder="name@example.com" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700">Select College</label>
                <select v-model="formData.college" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="">Choose your institution...</option>
                  <option v-for="c in colleges" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700">Course / Degree</label>
                <input v-model="formData.course" type="text" placeholder="e.g. B.Tech CSE" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
          </div>

          <div v-if="currentStep === 2" class="space-y-6 animate-in slide-in-from-right duration-500">
            <div class="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-6">
              <p class="text-sm text-amber-800 font-medium leading-relaxed">
                💡 Tip: Mentioning your entrance exam score helps other students understand the cut-offs!
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700">Admission Year</label>
                <select v-model="formData.admissionYear" class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                  <option v-for="year in [2024, 2023, 2022, 2021]" :key="year">{{ year }}</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700">Entrance Exam (If any)</label>
                <input v-model="formData.exam" type="text" placeholder="JEE, CAT, GATE..." class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
              </div>
            </div>

            <div class="space-y-4 pt-4">
              <p class="text-sm font-semibold text-slate-700">Did you opt for the Hostel?</p>
              <div class="flex space-x-4">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" value="yes" v-model="formData.hostel" class="text-indigo-600 focus:ring-indigo-500" />
                  <span class="text-slate-600">Yes, I stayed on campus</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" value="no" v-model="formData.hostel" class="text-indigo-600 focus:ring-indigo-500" />
                  <span class="text-slate-600">No, Day scholar</span>
                </label>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 3" class="space-y-6 animate-in slide-in-from-right duration-500">
            <div class="text-center py-4">
              <p class="text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Overall Rating</p>
              <div class="flex justify-center space-x-2">
                <button v-for="star in 5" :key="star" @click.prevent="formData.rating = star"
                        :class="['text-4xl transition-colors', formData.rating >= star ? 'text-amber-400' : 'text-slate-200']">
                  ★
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-700">Your Detailed Experience</label>
              <textarea v-model="formData.review" rows="5" placeholder="What was the faculty like? How are the placements? Talk about the campus life..." 
                        class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
              <p class="text-right text-xs text-slate-400">{{ formData.review.length }} / 500 characters</p>
            </div>
          </div>

          <div class="mt-12 flex justify-between items-center">
            <button v-if="currentStep > 1" @click.prevent="currentStep--" 
                    class="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all">
              Previous
            </button>
            <div v-else></div> <button v-if="currentStep < 3" @click.prevent="currentStep++" 
                    class="bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
              Save & Next
            </button>
            <button v-else type="submit" 
                    class="bg-green-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all">
              Submit Review
            </button>
          </div>
        </form>
      </div>

      <p class="text-center mt-8 text-slate-400 text-sm italic">
        Powered by your College Listing Project • 2026
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const currentStep = ref(1);
const colleges = ['IIT Delhi', 'BITS Pilani', 'Mumbai University', 'SRM University', 'VIT Vellore'];

const formData = reactive({
  name: '',
  email: '',
  college: '',
  course: '',
  admissionYear: 2024,
  exam: '',
  hostel: 'no',
  rating: 0,
  review: ''
});

const handleSubmit = () => {
  if (formData.rating === 0 || formData.review.length < 10) {
    alert('Please provide a rating and a brief review!');
    return;
  }
  alert('Form Submitted Successfully! 🎉\nCheck Console for Data.');
  console.log('Review Payload:', JSON.stringify(formData, null, 2));
};
</script>

<style scoped>
/* Smooth Step Transitions */
.animate-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> -->

<template>
  <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
    <h1 class="text-2xl font-bold text-center mb-6">
      Write Your College Review
    </h1>

    <!-- USER INFO -->
    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <input disabled :value="authStore.user?.name" class="input" />
      <input disabled :value="authStore.user?.email" class="input" />
      <input disabled :value="authStore.user?.phone" class="input" />
      <input placeholder="Referral Code (Optional)" class="input" />
    </div>

    <!-- COLLEGE INFO -->
    <div class="grid md:grid-cols-2 gap-4 mb-6">
      <Multiselect
        v-model="form.college"
        :options="collegeStore.collegeList"
        label="name"
        track-by="id"
        placeholder="Search College / University"
        :searchable="true"
        :close-on-select="true"
        :allow-empty="true"
        class="multiselect-custom"
      />

      <select v-model="form.course" class="input">
        <option value="">Select Course</option>
        <option>B.Tech</option>
        <option>BCA</option>
        <option>MBA</option>
      </select>

      <select v-model="form.admissionYear" class="input">
        <option value="">Admission Year</option>
        <option v-for="y in years" :key="y">{{ y }}</option>
      </select>

      <input
        v-model="form.fees"
        placeholder="Total Tuition Fees (Per Year)"
        class="input"
      />
    </div>

    <!-- ENTRANCE EXAM -->
    <div class="mb-6">
      <p class="label">Did you clear any entrance exam?</p>
      <label
        ><input type="radio" v-model="form.examCleared" value="yes" />
        Yes</label
      >
      <label class="ml-4"
        ><input type="radio" v-model="form.examCleared" value="no" /> No</label
      >

      <select
        v-if="form.examCleared === 'yes'"
        v-model="form.exam"
        class="input mt-2"
      >
        <option value="">Select Exam</option>
        <option>JEE</option>
        <option>CUET</option>
        <option>CAT</option>
      </select>
    </div>

    <!-- HOSTEL -->
    <div class="mb-6">
      <p class="label">Did you opt for hostel?</p>
      <label
        ><input type="radio" v-model="form.hostel" value="yes" /> Yes</label
      >
      <label class="ml-4"
        ><input type="radio" v-model="form.hostel" value="no" /> No</label
      >

      <input
        v-if="form.hostel === 'yes'"
        v-model="form.hostelFees"
        placeholder="Hostel Fees per year"
        class="input mt-2"
      />
    </div>

    <!-- PLACEMENTS -->
    <div class="mb-6">
      <p class="label">Does your college provide placements?</p>
      <label
        ><input type="radio" v-model="form.placement" value="yes" /> Yes</label
      >
      <label class="ml-4"
        ><input type="radio" v-model="form.placement" value="no" /> No</label
      >

      <input
        v-if="form.placement === 'yes'"
        v-model="form.package"
        placeholder="Average Package per year"
        class="input mt-2"
      />
    </div>

    <!-- REVIEW TEXT -->
    <div class="mb-4">
      <textarea
        v-model="form.review"
        maxlength="488"
        rows="5"
        class="input"
        placeholder="Write your honest college experience..."
      ></textarea>
      <p class="text-xs text-gray-500 mt-1">
        Character limit {{ 488 - form.review.length }}
      </p>
    </div>

    <!-- STAR RATING -->
    <div class="mb-6">
      <p class="label mb-2">Overall Rating</p>
      <StarRating v-model="form.rating" />
    </div>

    <!-- ACTION -->
    <button
      @click="submitReview"
      class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
    >
      Save & Next
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StarRating from "./StarRating.vue";
import { useAuthStore } from "../../store/useAuthStore";
import axios from "axios";
import { useCollegeStore } from "../../store/collegeStore";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
const collegeStore = useCollegeStore();

const router = useRouter();

onMounted(async () => {
  if (!collegeStore.collegeList.length) {
    await collegeStore.fetchColleges();
  }
});

const authStore = useAuthStore();

const years = Array.from({ length: 8 }, (_, i) => 2018 + i);

const form = ref({
  college: null,
  course: "",
  admissionYear: "",
  fees: "",
  examCleared: "",
  exam: "",
  hostel: "",
  hostelFees: "",
  placement: "",
  package: "",
  review: "",
  rating: 0,
});
import { computed } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const selectedCollegeId = computed(() => {
  return form.value.college?.id || null;
});

const submitReview = async () => {
  if (!selectedCollegeId.value) {
    toast.error("Please select a college");
    return;
  }

  try {
    const payload = {
      collegeId: selectedCollegeId.value,
      rating: form.value.rating,
      comment: form.value.review,
      responses: {
        admissionYear: form.value.admissionYear,
        course: form.value.course,
        fees: form.value.fees,
        examCleared: form.value.examCleared === "yes",
        exam: form.value.exam,
        hostel: form.value.hostel === "yes",
        hostelFees: form.value.hostelFees,
        placement: form.value.placement === "yes",
        package: form.value.package,
      },
    };

    await axios.post(import.meta.env.VITE_API_CREATE_REVEIW, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    goToHome();
    toast.success("Review submitted successfully!");
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to submit review");
  }
};

const goToHome = () => {
  router.push("/");
};
onMounted(() => {
  authStore.fetchUser();
});
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}
.label {
  font-weight: 600;
  margin-bottom: 4px;
}
</style>
