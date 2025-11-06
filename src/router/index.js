import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/Home/HomePage.vue";
import AllColleges from "../pages/Colleges/AllColleges.vue";
import CollegePage from "../pages/Colleges/CollegePage.vue";
import CollegeCourses from "../components/college/sections/CollegeCourses.vue";
import CollegeAdmission from "../components/college/sections/CollegeAdmission.vue";
import CollegeCutoff from "../components/college/sections/CollegeCutoff.vue";
import CollegeReviews from "../components/college/sections/CollegeReviews.vue";
import CollegePlacements from "../components/college/sections/CollegePlacements.vue";
import CollegeInfrastructure from "../components/college/sections/CollegeInfrastructure.vue";
import CollegeGallery from "../components/college/sections/CollegeGallery.vue";
import CollegeScholarship from "../components/college/sections/CollegeScholarship.vue";
import CollegeRanking from "../components/college/sections/CollegeRanking.vue";
import CollegeHostel from "../components/college/sections/CollegeHostel.vue";
import CollegeArticles from "../components/college/sections/CollegeArticles.vue";
import CollegeInfo from "../components/college/sections/CollegeInfo.vue";
import CollegeResult from "../components/college/sections/CollegeResult.vue";
import Diploma from "../components/courses/section/Diploma.vue";
import Bachelors from "../components/courses/section/Bachelors.vue";
import Masters from "../components/courses/section/Masters.vue";
import Doctorate from "../components/courses/section/Doctorate.vue";
import Certificate from "../components/courses/section/Certificate.vue";
import IntegratedDegree from "../components/courses/section/IntegratedDegree.vue";
import AllCoursesBySlug from "../pages/Courses/AllCoursesBySlug.vue";
import AllCoursess from "../components/courses/section/AllCoursess.vue";
import AllCourses from "../pages/Courses/AllCourses.vue";
import CourseDetails from "../pages/Courses/CourseDetails.vue";
import CourseDetaills from "../components/courseDetails/section/CourseDetaills.vue";
import SyllabusAndSubjects from "../components/courseDetails/section/SyllabusAndSubjects.vue";
import JobSalery from "../components/courseDetails/section/JobSalery.vue";
import Admission from "../components/courseDetails/section/Admission.vue";
import Specializations from "../components/courseDetails/section/Specializations.vue";
import Fees from "../components/courseDetails/section/Fees.vue";
import Placement from "../components/courseDetails/section/Placement.vue";
import AllExams from "../pages/Exams/AllExams.vue";

import NotFound from "../pages/NotFound.vue";
import Verify from "../components/auth/Verify.vue";
import ContactUs from "../pages/ContactUs.vue";
import Scholarship from "../pages/Scholarship/Scholarship.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: { title: "College Entry " },
  },
  {
    path: "/colleges",
    name: "College",
    component: AllColleges,
    meta: { title: "Top Colleges in India 2025" },
  },
  { path: "/courses", component: AllCourses },
  { path: "/exams", component: AllExams },
  { path: "/scholarships", component: Scholarship },
  { path: "/verify-email", name: "VerifyEmail", component: Verify },
  { path: "/contact-us", name: "ContactUs", component: ContactUs },

  {
    path: "/colleges/:slug",
    component: CollegePage,
    children: [
      { path: "", component: CollegeInfo }, // default tab
      { path: "courses-fees", component: CollegeCourses },
      { path: "admission", component: CollegeAdmission },
      { path: "cutoff", component: CollegeCutoff },
      { path: "reviews", component: CollegeReviews },
      { path: "placements", component: CollegePlacements },
      { path: "infrastructure", component: CollegeInfrastructure },
      { path: "gallery", component: CollegeGallery },
      { path: "scholarship", component: CollegeScholarship },
      { path: "result", component: CollegeResult },
      { path: "ranking", component: CollegeRanking },
      { path: "hostel", component: CollegeHostel },
      { path: "articles", component: CollegeArticles },
    ],
  },
  {
    path: "/courses/:slug",
    component: AllCoursesBySlug,
    children: [
      { path: "", component: AllCoursess }, // default tab
      { path: "diploma", component: Diploma },
      { path: "bachelors", component: Bachelors },
      { path: "masters", component: Masters },
      { path: "doctorate", component: Doctorate },
      { path: "certificate", component: Certificate },
      { path: "integrated-degree", component: IntegratedDegree },
    ],
  },
  {
    path: "/:slug",
    component: CourseDetails,
    children: [
      { path: "", component: CourseDetaills }, // default tab
      { path: "syllabus-subjects", component: SyllabusAndSubjects },
      { path: "job-scop-salary", component: JobSalery },
      { path: "admission", component: Admission },
      { path: "specialization", component: Specializations },
      { path: "fees", component: Fees },
      { path: "placement", component: Placement },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { hideLayout: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // if user uses browser back/forward button, restore position
    if (savedPosition) {
      return savedPosition;
    } else {
      // always scroll to top
      return { top: 0 };
    }
  },
});

export default router;
