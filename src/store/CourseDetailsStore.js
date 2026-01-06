// CourseDetailsStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useCourseStore = defineStore("courseDetails", {
  state: () => ({
    course: null,          // array
    courseDetails: null,   // object
    loading: false,
    error: null,
    currentSlug: null,
  }),

  actions: {
    async fetchCourseBySlug(slug) {
      if (this.course && this.currentSlug === slug) return;

      this.loading = true;
      this.error = null;
      this.currentSlug = slug;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_COURSE_BY_NAME_SEARCH}/${slug}`
        );

        const data = res.data.data; // ARRAY

        this.course = data;
        this.courseDetails = data?.[0]?.courseDetails?.[0] || null;
      } catch (err) {
        this.error = "Failed to load course";
      } finally {
        this.loading = false;
      }
    },

    clearCourse() {
      this.course = null;
      this.courseDetails = null;
      this.currentSlug = null;
    },
  },
});
