<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
import Loader from "./components/Loader.vue";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useMediaStore } from "./store/mediaStore";

const route = useRoute();
const mediaStore = useMediaStore();

const showLoader = ref(true);

onMounted(async () => {
  // Show loader for 2 sec
  setTimeout(() => {
    showLoader.value = false;
  }, 1500);

  // Load media once app starts
  await mediaStore.fetchMedia();
});
</script>

<template>
  <Loader v-if="showLoader" />

  <template v-else>
    <NavBar v-if="!route.meta.hideLayout" />
    <router-view />
    <Footer v-if="!route.meta.hideLayout" />
  </template>
</template>
