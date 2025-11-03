<script setup>
import { useRoute } from "vue-router";

import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useMediaStore } from "./store/mediaStore";
import { onMounted } from "vue";

const route = useRoute();

const mediaStore = useMediaStore();

onMounted(() => {
  mediaStore.fetchMedia();
});
</script>

<template>
  <NavBar v-if="!route.meta.hideLayout" />
  <router-view></router-view>
  <Footer v-if="!route.meta.hideLayout" />
</template>

<style scoped></style>
