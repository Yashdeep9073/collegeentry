<template>
  <section class="w-full bg-[#f5f4f2] py-16">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">

        <div
          v-for="(item, index) in stats"
          :key="index"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition"
        >
          <component :is="item.icon" class="w-10 h-10 text-blue-600 mb-3" />
          <p class="text-gray-600 text-sm font-medium">{{ item.label }}</p>
          <p class="text-2xl font-semibold text-gray-900 mt-1">{{ item.value }}</p>
        </div>

      </div>

      <div class="flex justify-center">
        <img src="../../assets/screen-mockup.webp" class="w-full max-w-[450px] drop-shadow-2xl" />
      </div>

    </div>
  </section>
</template>

<script>
import { ChatBubbleLeftRightIcon, StarIcon, BuildingLibraryIcon, UsersIcon, QuestionMarkCircleIcon, TrophyIcon } from "@heroicons/vue/24/solid";

export default {
  data() {
    return {
      stats: [
        { label: "Reviews", value: "245,961", icon: ChatBubbleLeftRightIcon },
        { label: "Ratings", value: "59,010", icon: StarIcon },
        { label: "Colleges", value: "42,057", icon: BuildingLibraryIcon },
        { label: "Users", value: "1,648,662", icon: UsersIcon },
        { label: "Questions", value: "202", icon: QuestionMarkCircleIcon },
        { label: "Competitions", value: "50+", icon: TrophyIcon }
      ]
    };
  }
};
</script>
