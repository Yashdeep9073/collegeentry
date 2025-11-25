<template>
  <div class="page-container font-sans text-gray-800">
    
    <div class="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
        :style="`background-image: url('${bannerImg}')`"
      ></div>

      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      <div class="absolute inset-0 flex flex-col justify-end items-center pb-12 md:pb-20">
        <div class="flex flex-col sm:flex-row gap-4 w-full max-w-lg px-4">
          <button class="flex-1 px-6 py-3.5 bg-white/90 backdrop-blur-sm text-gray-800 font-semibold rounded-full hover:bg-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#ff7f56] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Sample Report
          </button>
          <button class="flex-1 px-6 py-3.5 bg-[#ff7f56] text-white font-bold rounded-full hover:bg-[#e66e49] hover:shadow-orange-500/50 hover:shadow-xl transition-all duration-300 shadow-lg transform hover:-translate-y-1">
            Buy Now
          </button>
        </div>
      </div>
    </div>

    <section class="py-16 bg-gray-50 border-b border-gray-200">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800">What Students Say</h2>
          <div class="w-16 h-1 bg-[#ff7f56] mx-auto mt-2 rounded"></div>
        </div>

        <div class="bg-white shadow-xl shadow-gray-200/50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center border border-gray-100 hover:border-orange-100 transition-colors">
          <div class="shrink-0 relative">
            <div class="absolute inset-0 bg-orange-200 rounded-full blur-lg opacity-50 transform translate-y-2"></div>
            <img
              src="/BannerImageforassessment.png"
              class="relative w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white shadow-md"
              alt="Student Success Story"
            />
          </div>

          <div class="flex-1 text-center md:text-left">
            <div class="flex justify-center md:justify-start text-yellow-400 text-lg mb-3 gap-1">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p class="text-gray-600 text-lg leading-relaxed italic mb-6">
              "College Entry' career assessment test was a game changer. It helped me gain clarity about my strengths and interests exactly when I was confused about my future path."
            </p>
            <div>
              <p class="font-bold text-gray-900 text-lg">Manrose</p>
              <p class="text-[#ff7f56] font-medium text-sm">Class X Student</p>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-8 gap-3">
          <button class="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-[#ff7f56] transition-colors"></button>
          <button class="w-8 h-2.5 rounded-full bg-[#ff7f56] shadow-sm"></button>
          <button class="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-[#ff7f56] transition-colors"></button>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-center text-2xl md:text-3xl font-bold text-red-700 mb-12">
          How we are helping 100+ students like you!
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="group flex flex-col h-full bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
             <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
            
            <h3 class="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wide">
              Explore Your Strengths <br/> & Interest
            </h3>
            <ul class="space-y-4 mb-8 flex-grow">
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                Identify skills, traits, and improvement areas.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                Get a comprehensive 15-page career report.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                Gain career insights with psychometric assessment.
              </li>
            </ul>
            <button class="w-full py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition shadow-md">
              Start Your Psychometric
            </button>
          </div>

          <div class="group flex flex-col h-full bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
            
            <h3 class="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wide">
              Expert Career <br/> Counselling
            </h3>
            <ul class="space-y-4 mb-8 flex-grow">
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                Top tier career experts.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                Diverse industry experience.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                Tailored one on one guidance.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                Personalised sessions for the perfect career fit.
              </li>
            </ul>
            <button class="w-full py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition shadow-md">
              Schedule Your Expert
            </button>
          </div>

          <div class="group flex flex-col h-full bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
            
            <h3 class="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wide">
              Your Career <br/> Roadmap
            </h3>
            <ul class="space-y-4 mb-8 flex-grow">
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                Discover over 550 career opportunities.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                Track your progress with career dashboards.
              </li>
              <li class="flex items-start gap-3 text-sm text-gray-600">
                <span class="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                Access a directory of colleges, exams & scholarships.
              </li>
            </ul>
            <button class="w-full py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition shadow-md">
              Explore Career Paths Now
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-orange-50/50">
      <div class="max-w-5xl mx-auto px-4 text-center">
        
        <h2 class="text-2xl md:text-3xl font-bold text-red-700 mb-3">
          Interested in learning about the career assessment test?
        </h2>
        <p class="text-gray-600 mb-12">
          Check out our sample report and see how our assessment benefits you!
        </p>

        <div class="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
          
          <div class="flex gap-4">
            <div class="flex flex-col items-center gap-2">
              <div class="w-14 h-14 rounded-full bg-[conic-gradient(at_center,_#ec4899_0deg_90deg,_#facc15_90deg_180deg,_#3b82f6_180deg_270deg,_#a855f7_270deg_360deg)] shadow-lg"></div>
              <span class="text-xs font-medium text-gray-500">Aptitude</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="w-14 h-14 rounded-full bg-[conic-gradient(at_center,_#ef4444_0deg_120deg,_#f43f5e_120deg_240deg,_#6366f1_240deg_360deg)] shadow-lg"></div>
              <span class="text-xs font-medium text-gray-500">Personality</span>
            </div>
             <div class="flex flex-col items-center gap-2">
              <div class="w-14 h-14 rounded-full bg-[conic-gradient(at_center,_#eab308_0deg_160deg,_#ec4899_160deg_360deg)] shadow-lg"></div>
              <span class="text-xs font-medium text-gray-500">Interests</span>
            </div>
            <div class="flex flex-col items-center gap-2">
               <div class="w-14 h-14 rounded-full bg-[conic-gradient(at_center,_#f43f5e_0deg_90deg,_#8b5cf6_90deg_200deg,_#facc15_200deg_360deg)] shadow-lg"></div>
              <span class="text-xs font-medium text-gray-500">Learnings</span>
            </div>
          </div>

          <div class="flex flex-col gap-4 text-left">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="text-gray-700 font-medium">Trusted by over 100+ students.</span>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div class="flex flex-col">
                <span class="text-gray-700 font-medium">Industry's best reliability score of 0.8!</span>
                <span class="text-xs text-gray-500">(Cronbach Alpha)</span>
              </div>
            </div>
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