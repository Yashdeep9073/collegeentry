<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">My Profile</h1>
        <p class="text-sm text-gray-500">Manage your account & activities</p>
      </div>

      <button @click="logoutUser" class="text-red-600 text-sm font-medium">
        Logout
      </button>
    </div>

    <!-- USER CARD -->
    <div class="bg-white shadow rounded-xl p-6 mb-8">
      <div class="flex items-center gap-4">
        <div
          class="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold"
        >
          {{ authStore.userInitials }}
        </div>

        <div>
          <h2 class="font-semibold text-lg">{{ authStore.user?.name }}</h2>
          <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
          <p class="text-sm text-gray-500">{{ authStore.user?.phone }}</p>
        </div>
      </div>
    </div>

    <!-- TABS -->
    <div class="flex gap-6 border-b mb-6">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        class="pb-2 text-sm font-medium"
        :class="
          activeTab === tab
            ? 'border-b-2 border-orange-500 text-orange-600'
            : 'text-gray-500'
        "
      >
        {{ tab }}
      </button>
    </div>

    <!-- TAB CONTENT -->
    <div>
      <ProfileInfo
        v-if="activeTab === 'Profile' && authStore.user"
        :user="authStore.user"
      />

      <ShortlistedColleges v-if="activeTab === 'Shortlisted Colleges'" />
      <MyReviews v-if="activeTab === 'My Reviews'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

import MyReviews from "./MyReviews.vue";
import ShortlistedColleges from "./ShortlistedColleges.vue";
import ProfileInfo from "./ProfileInfo.vue";
import { useAuthStore } from "../../store/useAuthStore";

const router = useRouter();

const authStore = useAuthStore();

const tabs = ["Profile", "Shortlisted Colleges", "My Reviews"];
const activeTab = ref("Profile");

const logoutUser = () => {
  authStore.logout();
  router.push("/");
};

onMounted(() => {
  authStore.fetchUser();
});
</script>
