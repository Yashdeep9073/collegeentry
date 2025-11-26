<script setup>
import { ref } from "vue";

const activeTab = ref("support");

const tabs = [
  { id: "support", name: "Support", icon: "fa-solid fa-headset" },
];

const supportContacts = [
  {
    type: "New Student",
    number: "+91-9870443528",
    icon: "fa-solid fa-user-plus",
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Get started with your educational journey",
  },
  {
    type: "Existing Student",
    number: "+91-7657999786",
    icon: "fa-solid fa-user-check",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Continued support for current students",
  },
  {
    type: "Email",
    contact: "info@collegeentry.in",
    icon: "fa-solid fa-envelope",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Send us your queries anytime",
  },
  {
    type: "Visit Us",
    timing: "10 AM to 7 PM",
    icon: "fa-solid fa-clock",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Walk-in consultation hours",
  },
  {
    type: "Book",
    service: "Home Visit",
    icon: "fa-solid fa-house-chimney",
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Personalized home consultation",
  },
];




const bookSession = () => {
  console.log("Booking career advice session");
  // Add booking logic here
  alert("Redirecting to booking page...");
};

const callNumber = (number) => {
  console.log("Calling:", number);
  // In a real app, this would trigger phone call
  alert(`Calling ${number}`);
};

const sendEmail = () => {
  console.log("Sending email");
  window.location.href = "mailto:info@collegeentry.in";
};
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Talk To Our Experts
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Get personalized guidance from our experienced education consultants
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <div class="space-y-8">
          <div class="flex flex-wrap gap-4 mb-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 font-semibold"
              :class="
                activeTab === tab.id
                  ? 'bg-white border-blue-500 text-blue-600 shadow-lg shadow-blue-200 scale-105'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-white'
              "
            >
              <i :class="[tab.icon, 'text-lg']"></i>
              {{ tab.name }}
            </button>
          </div>

          <transition name="fade" mode="out-in">
            <div v-if="activeTab === 'support'" key="support" class="space-y-6">
              <div
                v-for="contact in supportContacts"
                :key="contact.type"
                class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 group hover:-translate-y-1"
              >
                <div class="flex flex-wrap items-start gap-4 sm:flex-nowrap"> 
                  
                  <div
                    class="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    :class="contact.bgColor"
                  >
                    <i :class="[contact.icon, 'text-xl', contact.color]"></i>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-bold text-gray-800 mb-1">
                      {{ contact.type }}
                    </h3>
                    <p class="text-gray-600 mb-2">
                      {{
                        contact.number ||
                        contact.contact ||
                        contact.timing ||
                        contact.service
                      }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ contact.description }}
                    </p>
                  </div>
                  
                  <div class="flex-shrink-0 mt-4 sm:mt-0 ml-auto">
                    <button
                      v-if="contact.number"
                      @click="callNumber(contact.number)"
                      class="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <i class="fa-solid fa-phone text-sm"></i>
                    </button>
                    <button
                      v-else-if="contact.type === 'Email'"
                      @click="sendEmail"
                      class="bg-purple-500 text-white p-3 rounded-xl hover:bg-purple-600 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <i class="fa-solid fa-envelope text-sm"></i>
                    </button>
                    <button
                      v-else
                      class="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
                    >
                      <i class="fa-solid fa-calendar text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div
          class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl shadow-2xl p-8 lg:p-12 text-white relative overflow-hidden"
        >
          <div class="absolute inset-0 opacity-10">
            <div
              class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"
            ></div>
            <div
              class="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"
            ></div>
          </div>

          <div class="relative z-10">
            <div class="text-center lg:text-left">
              <div
                class="inline-flex items-center gap-3 bg-white/20 rounded-2xl px-4 py-2 mb-6"
              >
                <i class="fa-solid fa-phone-volume text-xl"></i>
                <span class="font-semibold">Need answers? Call us!</span>
              </div>

              <h2 class="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Our team of experts are available for you round the clock.
              </h2>

              <p class="text-blue-100 text-lg mb-8 opacity-90">
                Get personalized career guidance from experienced education
                consultants who understand your aspirations.
              </p>

              <div class="space-y-3 mb-8">
                <div class="flex items-center gap-3">
                  <i class="fa-solid fa-check-circle text-green-400"></i>
                  <span>Free 30-minute consultation</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fa-solid fa-check-circle text-green-400"></i>
                  <span>Personalized career roadmap</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fa-solid fa-check-circle text-green-400"></i>
                  <span>College admission guidance</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fa-solid fa-check-circle text-green-400"></i>
                  <span>Scholarship assistance</span>
                </div>
              </div>

              <button
                @click="bookSession"
                class="w-full bg-white text-blue-600 py-4 px-8 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3"
              >
                <i class="fa-solid fa-calendar-check"></i>
                Book Your 30 Mins Expert Career Advice
              </button>

              <div
                class="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 pt-8 border-t border-white/20"
              >
                <div class="text-center min-w-[70px]">
                  <div class="text-2xl font-bold">24/7</div>
                  <div class="text-blue-200 text-sm">Support</div>
                </div>
                <div class="text-center min-w-[70px]">
                  <div class="text-2xl font-bold">5000+</div>
                  <div class="text-blue-200 text-sm">Students Helped</div>
                </div>
                <div class="text-center min-w-[70px]">
                  <div class="text-2xl font-bold">98%</div>
                  <div class="text-blue-200 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive adjustments */
/* The main grid (lg:grid-cols-2) handles desktop/tablet scaling well. */
/* No specific media query needed here, as Tailwind classes are used directly. */

/* Hover effects enhancement */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>