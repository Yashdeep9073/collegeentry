import { defineStore } from "pinia";
import axios from "axios";

export const useCourseStore = defineStore("courseList", {
  state: () => ({
    stream: null,
    courses: [],
    activeDegree: "ALL",
    loading: false,
  }),

  getters: {
    // unique degree types from backend
    degreeTypes(state) {
      const types = new Set(state.courses.map((c) => c.degreeType));
      return ["ALL", ...types];
    },

    //filtered courses (tabs + search compatible)
    filteredCourses(state) {
      if (state.activeDegree === "ALL") return state.courses;

      return state.courses.filter(
        (course) => course.degreeType === state.activeDegree
      );
    },
  },

  actions: {
    async fetchStreamCourses(slug) {
      this.loading = true;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_COURSE_BY_STREAM_NAME}/${slug}`
        );

        this.stream = res.data.data.stream;
        this.courses = res.data.data.courses;
      } finally {
        this.loading = false;
      }
    },

    setDegree(degree) {
      this.activeDegree = degree;
    },
  },
});
