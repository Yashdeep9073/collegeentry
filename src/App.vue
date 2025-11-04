<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useMediaStore } from "./store/mediaStore";

const route = useRoute();
const mediaStore = useMediaStore();

onMounted(async () => {
  // Load media once app starts
  await mediaStore.fetchMedia();
});
</script>

<template>
  <NavBar v-if="!route.meta.hideLayout" />
  <router-view />
  <Footer v-if="!route.meta.hideLayout" />
</template>
