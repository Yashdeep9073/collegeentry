<script setup>
import { computed } from "vue";
import { useCollegeStore } from "../../../store/collegeNameStore";
import { useRouter } from "vue-router";

const collegeStore = useCollegeStore();
const router = useRouter();

const articles = computed(() => collegeStore.college?.articles || []);

const goToArticle = (slug) => {
  router.push(`/article/${slug}`);
};
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">📰 College Articles & News</h1>

    <!-- No articles fallback -->
    <div v-if="articles.length === 0" class="text-gray-500 text-center py-10">
      No articles available for this college.
    </div>

    <!-- Article Cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="article in articles"
        :key="article.id"
        class="bg-white rounded-lg border shadow-sm hover:shadow-md transition cursor-pointer"
        @click="goToArticle(article.slug)"
      >
        <img
          v-if="article.image"
          :src="article.image"
          class="w-full h-48 object-cover rounded-t-lg"
        />

        <div class="p-4">
          <span class="text-xs text-red-600 font-semibold">
            {{ article.category?.name }}
          </span>

          <h3 class="font-bold text-gray-800 mt-2 line-clamp-2">
            {{ article.title }}
          </h3>

          <p class="text-sm text-gray-600 mt-2 line-clamp-3">
            {{ article.caption }}
          </p>

          <div class="text-xs text-gray-400 mt-3">
            {{ new Date(article.createdAt).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
