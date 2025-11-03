<script setup>
import { ref } from 'vue';

// --- Data for Nested Table of Contents (Based on image_120c22.png) ---
const syllabusTOC = ref([
    { 
        title: 'BSc Syllabus: Overview', 
        anchor: '#bsc-overview', 
        children: [] 
    },
    { 
        title: 'BSc Syllabus for Top Specialization', 
        anchor: '#bsc-specialization-syllabus', 
        children: [
            { title: 'BSc Mathematics Syllabus', anchor: '#bsc-maths' },
            { title: 'BSc Computer Science Syllabus', anchor: '#bsc-cs' },
            { title: 'BSc Physics Syllabus', anchor: '#bsc-physics' },
            { title: 'BSc Chemistry Syllabus', anchor: '#bsc-chemistry' },
            { title: 'BSc Zoology Syllabus', anchor: '#bsc-zoology' },
        ] 
    },
    { 
        title: 'BSc Subjects - Core and Elective', 
        anchor: '#bsc-subjects', 
        children: [] 
    },
]);

// --- Data for Author/Intro Block (Reused from previous context) ---
const authorName = ref('Shristi T');
</script>

<template>
  <div class="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50">

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-3 space-y-8">
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-start space-x-3 mb-4 border-b pb-3">
                <img 
                    src="https://placehold.co/40x40/003366/ffffff?text=ST" 
                    alt="Author Avatar" 
                    class="w-10 h-10 rounded-full object-cover border-2 border-blue-500 flex-shrink-0"
                />
                <div class="text-sm pt-1">
                    <p class="font-semibold text-gray-900">{{ authorName }}</p>
                    <p class="text-xs text-blue-600 font-medium">Verified Expert</p>
                </div>
            </div>

            <div class="space-y-4 text-gray-700 leading-relaxed mb-6">
                <p>
                    The BSc syllabus in India includes a combination of courses in the chosen field of study such as Physics, Chemistry, Maths, Zoology, Botany, Computer Science, Nursing, Microbiology, and more. The Bachelor of Science course curriculum is structured **over six semesters** providing students with an extensive understanding of the theoretical and practical coursework.
                </p>
                <p>
                    The B.Sc subjects are offered as **core** and **elective** courses. Core courses include **12 papers** with four from each of three disciplines chosen. Elective subjects allow specialization, with **6 papers** selected from disciplines of interest. In addition, students can undertake Ability Enhancement Courses and Skill Enhancement Courses.
                </p>
                <p>
                    The B.Sc course structure is based on the **UGC recommendation** and the syllabus structure differs depending on the institutions and chosen specialization. Some of the popular BSc courses offered by colleges in India include BSc Mathematics, BSc Physics, BSc Chemistry, BSc Computer Science, BSc Zoology, BSc Biotechnology, and more.
                </p>
            </div>

            <div class="border border-gray-300 p-4 rounded-lg shadow-inner">
                <h4 class="font-bold text-lg text-gray-800 mb-3 flex items-center justify-between">
                    Table of Contents
                </h4>
                <ul class="space-y-2 text-gray-700 font-medium text-sm">
                    <li v-for="item in syllabusTOC" :key="item.anchor">
                        <a :href="item.anchor" class="flex items-center hover:text-red-600 transition duration-150">
                            <i class="fas fa-caret-right text-red-600 mr-2 flex-shrink-0"></i>
                            {{ item.title }}
                        </a>
                        <ul v-if="item.children.length" class="pl-6 pt-1 space-y-1">
                            <li v-for="child in item.children" :key="child.anchor">
                                <a :href="child.anchor" class="flex items-center text-gray-600 hover:text-red-600 transition duration-150">
                                    <i class="fas fa-caret-right text-red-400 mr-2 flex-shrink-0"></i>
                                    {{ child.title }}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            
            <div class="mt-8 space-y-8">
                
                <section id="bsc-overview">
                    <h3 class="text-xl font-bold text-gray-800 mb-3">BSc Syllabus: Overview</h3>
                    <p class="text-gray-700 leading-relaxed">
                        The BSc syllabus followed in most institutions in India is based on the recommendations made by the **UGC**. The syllabus of BSc is designed to provide students with a comprehensive knowledge in science and related subjects while providing avenues for specialization in various fields of science.
                    </p>
                    <p class="text-gray-700 leading-relaxed mt-3">
                        The BSc syllabus is divided into **majors** and **minors** through a blend of core and elective courses. The BSc curriculum includes practical learning experiences including laboratory work, research projects, and internships.
                    </p>
                </section>

                <section id="bsc-specialization-syllabus">
                    <h3 class="text-xl font-bold text-gray-800 mb-3">BSc Syllabus for Top Specialization</h3>
                    <p class="text-gray-700 leading-relaxed">
                        Detailed syllabus for major specializations (Mathematics, Computer Science, Physics, Chemistry, and Zoology) would be listed in separate sub-sections below.
                    </p>
                    <h4 class="text-lg font-semibold text-gray-800 mt-4" id="bsc-maths">BSc Mathematics Syllabus</h4>
                    <p class="text-gray-600 text-sm">Content for Mathematics syllabus goes here...</p>
                    <h4 class="text-lg font-semibold text-gray-800 mt-4" id="bsc-cs">BSc Computer Science Syllabus</h4>
                    <p class="text-gray-600 text-sm">Content for Computer Science syllabus goes here...</p>
                    </section>
                
                <section id="bsc-subjects">
                    <h3 class="text-xl font-bold text-gray-800 mb-3">BSc Subjects - Core and Elective</h3>
                    <p class="text-gray-700 leading-relaxed">
                        A detailed breakdown of the 12 core papers and 6 elective papers mentioned in the introduction would be presented here, possibly in a table format.
                    </p>
                </section>

            </div>
            
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles remain here */
</style>