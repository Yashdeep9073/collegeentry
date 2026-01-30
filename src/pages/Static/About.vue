<template>
  <section class="bg-gray-50 text-gray-800">
    <div class="relative py-40 md:py-52 overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
        :style="`background-image: url('${bannerImg}')`"
      >
        <div class="absolute inset-0 bg-black opacity-65"></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <h1
          class="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg animate-fade-in-down tracking-tight"
        >
          About Our College
        </h1>
        <p
          class="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-up font-light"
        >
          Empowering students with innovation, integrity, and excellence to
          shape a brighter future.
        </p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto py-16 px-6">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <img
          src="/counterSection/WhoWeAreImage.jpg"
          alt="Modern College Campus Building"
          class="rounded-3xl shadow-xl transform transition-transform duration-500 hover:scale-[1.02] object-cover w-full h-72 md:h-full"
        />

        <div>
          <h2 class="text-4xl font-bold mb-6 text-gray-900 leading-tight">
            Who We Are: A Legacy of Learning
          </h2>
          <p class="text-gray-700 leading-relaxed mb-4 text-lg">
            Founded in **1995**, our college has been a pioneer in delivering
            quality education, fostering an environment where innovation meets
            opportunity. Our mission is to shape the leaders of tomorrow through
            excellence in teaching, cutting-edge research, and dedicated
            community service.
          </p>
          <p class="text-gray-700 leading-relaxed text-lg">
            With **state-of-the-art infrastructure**, a globally recognized
            faculty, and a vibrant student life, we proudly stand among the top
            institutions committed to holistic development and student success.
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white py-16">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-12 text-gray-900">
          Our Guiding Principles: Mission & Vision
        </h2>
        <div class="grid md:grid-cols-2 gap-10 text-left">
          <div
            class="p-10 rounded-3xl shadow-lg border-l-8 border-red-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-center mb-4">
              <div class="bg-red-600 rounded-full p-3 mr-4">
                <svg
                  class="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.01 12.01 0 002.92 14.935c-.326 1.134-.14 2.365.345 3.517.204.492.298 1.05.298 1.625.042 1.488 1.127 2.656 2.766 2.656h6.772a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75H5.805C4.793 21 4 20.207 4 19.195v-2.09c0-1.42.593-2.822 1.625-3.854.71-.71.745-1.745.064-2.583a.75.75 0 01-.132-.234.75.75 0 01-.064-.47c.05-.152.17-.272.32-.32a.75.75 0 01.47-.064c.234.132.35.39.29.645-.045.195-.11.39-.195.585-.56.56-.81 1.34-.81 2.145v2.09c0 .762.618 1.38 1.38 1.38h6.772c1.639 0 2.724-1.168 2.766-2.656 0-.575-.094-1.133-.298-1.625-.485-1.152-.67-2.383-.345-3.517a12.01 12.01 0 001.38-7.994z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-red-800">Our Mission</h3>
            </div>
            <p class="text-gray-700 text-lg">
              To provide world-class education that inspires innovation,
              cultivates creativity, and builds a strong foundation for lifelong
              learning and professional success.
            </p>
          </div>
          <div
            class="p-10 rounded-3xl shadow-lg border-l-8 border-red-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-center mb-4">
              <div class="bg-red-600 rounded-full p-3 mr-4">
                <svg
                  class="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-red-800">Our Vision</h3>
            </div>
            <p class="text-gray-700 text-lg">
              To be a globally recognized institution renowned for academic
              excellence, groundbreaking research, and significant contributions
              to society through advanced technology and profound knowledge.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-12 text-gray-900">
          Key Milestones & Achievements
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-red-500"
          >
            <h3
              class="text-5xl font-extrabold text-red-700 mb-3 animate-pulse-on-hover"
            >
              25+
            </h3>
            <p class="text-gray-700 text-xl font-medium">
              Years of Academic Excellence
            </p>
          </div>
          <div
            class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-green-500"
          >
            <h3
              class="text-5xl font-extrabold text-green-700 mb-3 animate-pulse-on-hover"
            >
              10,000+
            </h3>
            <p class="text-gray-700 text-xl font-medium">
              Successful Alumni Worldwide
            </p>
          </div>
          <div
            class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-b-4 border-yellow-500"
          >
            <h3
              class="text-5xl font-extrabold text-yellow-700 mb-3 animate-pulse-on-hover"
            >
              150+
            </h3>
            <p class="text-gray-700 text-xl font-medium">
              Awards & Recognitions
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-12 text-gray-900">
          Meet Our Distinguished Faculty
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div
            v-for="(member, index) in faculty"
            :key="index"
            class="bg-gray-50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <img
              :src="member.image"
              :alt="`Portrait of ${member.name}`"
              class="w-32 h-32 mx-auto rounded-full object-cover mb-6 border-4 border-red-400 shadow-md"
            />
            <h3 class="text-2xl font-semibold text-gray-900 mb-1">
              {{ member.name }}
            </h3>
            <p class="text-red-700 font-medium text-lg mb-3">
              {{ member.role }}
            </p>
            <p class="text-gray-600 text-base leading-relaxed">
              {{ member.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// IMPORTANT: For the best results, replace 'about-us-page.png' with an image that has NO TEXT.
// For example, a picture of students on campus or a college building.
import bannerImg from "/counterSection/AboutOurCollege.png"; // Placeholder: Update this path!

const faculty = [
  {
    name: "Dr. Ananya Mehta",
    role: "Principal",
    image: "/MaleImage.jpg",
    description:
      "Leading the institution with a focus on innovation and excellence in education. Dr. Mehta champions interdisciplinary research and community engagement.",
  },
  {
    name: "Prof. Rajesh Sharma",
    role: "Head of Computer Science",
    image: "/MaleImage.jpg",
    description:
      "Dedicated to empowering students through cutting-edge research and mentorship in AI and Machine Learning.",
  },
  {
    name: "Dr. Neha Kapoor",
    role: "Dean of Academics",
    image: "/FemaleImage.jpg",
    description:
      "Striving to foster academic brilliance and holistic growth in students, overseeing curriculum development and faculty training.",
  },
];
</script>

<style>
/* Basic entrance animations for better feel */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out 0.2s forwards; /* Slight delay */
}

/* Pulse animation for achievements on hover */
.animate-pulse-on-hover {
  transition: transform 0.3s ease-in-out;
}
.animate-pulse-on-hover:hover {
  transform: scale(1.05);
}
</style>
