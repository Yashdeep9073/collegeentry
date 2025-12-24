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

  // Prevent duplicate WhatsApp widget
  if (window.CreateWhatsappChatWidget) return;

  const script = document.createElement("script");
  script.src =
    "https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?86687";
  script.async = true;

  script.onload = () => {
    window.CreateWhatsappChatWidget({
      enabled: true,
      chatButtonSetting: {
        backgroundColor: "#2ACA45",
        ctaText: "",
        borderRadius: "25",
        marginLeft: "20",
        marginBottom: "30",
        marginRight: "20",
        position: "left",
      },
      brandSetting: {
        brandName: "NVindia",
        brandSubTitle: "Typically replies within a day",
        brandImg: "/admin/logo/fav-print.jpg",
        welcomeText: "Hi there!\nHow can I help you?",
        messageText: "Hello, I have a question about {{page_link}}",
        backgroundColor: "#2ACA45",
        ctaText: "Start Chat",
        borderRadius: "25",
        autoShow: false,
        phoneNumber: "919870443528",
      },
    });
  };

  document.body.appendChild(script);
});
</script>

<template>
  <NavBar v-if="!route.meta.hideLayout" />
  <router-view />

  <Footer v-if="!route.meta.hideLayout" />
</template>
