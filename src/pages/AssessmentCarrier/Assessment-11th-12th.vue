<template>
  <div class="page-container font-sans text-gray-800">
    <div
      class="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group"
    >
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
        :style="`background-image: url('${bannerImg}')`"
      ></div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
      ></div>

      <div
        class="absolute inset-x-0 bottom-10 md:bottom-20 flex justify-center z-10 px-4"
      >
        <button
          class="flex items-center gap-2 px-8 py-4 bg-[#ff7f56] text-white text-lg font-bold rounded-full shadow-lg hover:bg-[#e66e49] hover:shadow-orange-500/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
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
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          Chat With Expert
        </button>
      </div>
    </div>

    <section class="py-12 bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h3
          class="text-xl md:text-2xl font-bold text-[#b91c1c] mb-10 leading-relaxed"
        >
          Our students have successfully joined prestigious
          <br class="hidden md:block" />
          universities in
          <span class="relative inline-block">
            India
            <svg
              class="absolute -bottom-2 left-0 w-full h-2 text-yellow-400"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                stroke-width="3"
                fill="none"
              />
            </svg>
          </span>
        </h3>

        <div
          class="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        >
          <img
            src="/DYPatil.webp"
            alt="SRM University"
            class="h-12 md:h-16 object-contain"
          />

          <img
            src="/DYPatil.webp"
            alt="Bharati Vidyapeeth"
            class="h-16 md:h-20 object-contain"
          />

          <img
            src="/DYPatil.webp"
            alt="UPES"
            class="h-10 md:h-14 object-contain"
          />

          <img
            src="/DYPatil.webp"
            alt="AIIMS"
            class="h-16 md:h-20 object-contain rounded-full"
          />

          <img
            src="/DYPatil.webp"
            alt="Army Law College"
            class="h-16 md:h-20 object-contain"
          />
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50 border-b border-gray-200">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
            What Students Say
          </h2>
          <div class="w-16 h-1 bg-[#ff7f56] mx-auto mt-2 rounded"></div>
        </div>

        <div
          class="bg-white shadow-xl shadow-gray-200/50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center border border-gray-100 hover:border-orange-100 transition-colors"
        >
          <div class="shrink-0 relative">
            <div
              class="absolute inset-0 bg-orange-200 rounded-full blur-lg opacity-50 transform translate-y-2"
            ></div>
            <img
              src="/counterSection/WhatStudentsSay.png"
              class="relative w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white shadow-md"
              alt="Student Success Story"
            />
          </div>

          <div class="flex-1 text-center md:text-left">
            <div
              class="flex justify-center md:justify-start text-yellow-400 text-lg mb-3 gap-1"
            >
              <span>★</span><span>★</span><span>★</span><span>★</span
              ><span>★</span>
            </div>
            <p class="text-gray-600 text-lg leading-relaxed italic mb-6">
              "College Entry' career assessment test was a game changer. It
              helped me gain clarity about my strengths and interests exactly
              when I was confused about my future path."
            </p>
            <div>
              <p class="font-bold text-gray-900 text-lg">Manrose</p>
              <p class="text-[#ff7f56] font-medium text-sm">Class X Student</p>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-8 gap-3">
          <button
            class="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-[#ff7f56] transition-colors"
          ></button>
          <button
            class="w-8 h-2.5 rounded-full bg-[#ff7f56] shadow-sm"
          ></button>
          <button
            class="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-[#ff7f56] transition-colors"
          ></button>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <h2
          class="text-center text-2xl md:text-3xl font-bold text-red-700 mb-12"
        >
          How we are helping 100+ students like you!
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="group flex flex-col h-full bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"
            ></div>

            <h3
              class="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wide"
            >
              Explore Your Strengths <br />
              & Interest
            </h3>
            <ul class="space-y-4 mb-8 flex-grow">
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                ></span>
                Identify skills, traits, and improvement areas.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                ></span>
                Get a comprehensive 15-page career report.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                ></span>
                Gain career insights with psychometric assessment.
              </li>
            </ul>
            <button
              class="w-full py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition shadow-md"
            >
              Start Your Psychometric
            </button>
          </div>

          <div
            class="group flex flex-col h-full bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"
            ></div>

            <h3
              class="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wide"
            >
              Expert Career <br />
              Counselling
            </h3>
            <ul class="space-y-4 mb-8 flex-grow">
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                ></span>
                Top tier career experts.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                ></span>
                Diverse industry experience.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                ></span>
                Tailored one on one guidance.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                ></span>
                Personalised sessions for the perfect career fit.
              </li>
            </ul>
            <button
              class="w-full py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition shadow-md"
            >
              Schedule Your Expert
            </button>
          </div>

          <div
            class="group flex flex-col h-full bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"
            ></div>

            <h3
              class="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wide"
            >
              Your Career <br />
              Roadmap
            </h3>
            <ul class="space-y-4 mb-8 flex-grow">
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                ></span>
                Discover over 550 career opportunities.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                ></span>
                Track your progress with career dashboards.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span
                  class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                ></span>
                Access a directory of colleges, exams & scholarships.
              </li>
            </ul>
            <button
              class="w-full py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition shadow-md"
            >
              Explore Career Paths Now
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="py-24 bg-white relative overflow-hidden">
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50 -z-10"
      ></div>

      <div
        class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <div class="w-full md:w-1/2 text-center md:text-left">
          <h2
            class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#b91c1c] mb-8 leading-tight"
          >
            Struggling with the complicated college applications for your
            children.
          </h2>
          <button
            class="px-8 py-4 bg-[#b91c1c] text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#8f1616] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Consult With An Expert Counsellor
          </button>
        </div>

        <div
          class="w-full md:w-1/2 relative flex justify-center items-center mt-10 md:mt-0"
        >
          <div
            class="absolute -left-6 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-[#b91c1c] rounded-full shadow-lg z-0"
          ></div>
          <div
            class="absolute right-4 -bottom-4 w-16 h-16 bg-[#b91c1c] rounded-full shadow-lg z-10"
          ></div>

          <div
            class="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-8 border-white shadow-2xl overflow-hidden z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Mother and daughter consulting"
              class="w-full h-full object-cover"
            />
          </div>

          <div
            class="absolute top-0 right-0 md:right-8 bg-[#2d2d2d] text-white px-5 py-3 rounded-full flex items-center gap-3 shadow-2xl z-20 border-2 border-white transform rotate-3 hover:rotate-0 transition-transform cursor-default"
          >
            <div
              class="bg-[#b91c1c] rounded-full p-1 w-6 h-6 flex items-center justify-center font-bold text-xs"
            >
              X
            </div>
            <div class="text-xs font-bold leading-tight tracking-wide">
              <span class="text-lg block">50+</span>
              APPLICATIONS
            </div>
          </div>

          <div
            class="absolute top-10 left-10 md:left-20 bg-white text-[#b91c1c] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg z-20 animate-bounce"
          >
            ??
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import bannerImg from "/BannerImageforassessment.png";
</script>

<style scoped>
.page-container {
  -webkit-font-smoothing: antialiased;
}
</style>
