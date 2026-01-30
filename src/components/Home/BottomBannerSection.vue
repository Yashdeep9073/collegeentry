<template>
  <section class="w-full bg-[#f5f4f2] py-16">
    <div
      class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
    >
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in stats"
          :key="index"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition"
        >
          <!-- Image instead of Icon -->
          <img :src="item.image" class="w-12 h-12 object-contain mb-3" alt="" />

          <p class="text-gray-600 text-sm font-medium">
            {{ item.label }}
          </p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">
            {{ item.value }}
          </p>
        </div>
      </div>

      <div class="flex justify-center">
        <img
          src="/counterSection/Laptopimage.png"
          class="w-full max-w-[450px] drop-shadow-2xl"
        />
      </div>
    </div>
  </section>
</template>

<script>
import reviewsImg from "/counterSection/Reviews.png";
import ratingsImg from "/counterSection/Rating.png";
import collegesImg from "/counterSection/Colleges.png";
import usersImg from "/counterSection/Users.png";
import questionsImg from "/counterSection/Questions.png";
import competitionsImg from "/counterSection/Competitions.png";

export default {
  data() {
    return {
      stats: [
        { label: "Reviews", value: "245,961", image: reviewsImg },
        { label: "Ratings", value: "59,010", image: ratingsImg },
        { label: "Colleges", value: "42,057", image: collegesImg },
        { label: "Users", value: "1,648,662", image: usersImg },
        { label: "Questions", value: "202", image: questionsImg },
        { label: "Competitions", value: "50+", image: competitionsImg },
      ],
    };
  },
};
</script>
