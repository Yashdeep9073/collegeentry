<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { ref, onMounted } from "vue";
import media from "../../assets/c4.jpg";
import { computed } from "vue";
import { useCompanySettingStore } from "../../store/companySettingStore";
const API_URL_FETCH_WEBSITE_MEDIA = import.meta.env.VITE_FETCH_WEBSITE_MEDIA;

const swiperInstance = ref(null);
const certificateImages = ref([]);

onMounted(async () => {
  try {
    const res = await fetch(API_URL_FETCH_WEBSITE_MEDIA);
    const result = await res.json();

    // Filter only CERTIFICATE images
    certificateImages.value = result.data
      .filter((item) => item.category === "CERTIFICATION")
      .map((item) => encodeURI(item.url));
  } catch (err) {
    console.error("CERTIFICATE images fetch failed:", err);
  }
});
const store = useCompanySettingStore();
const Name = computed(() => store.setting?.organizationName || "College Entry");
const onSwiper = (swiper) => (swiperInstance.value = swiper);
const slidePrev = () => swiperInstance.value?.slidePrev();
const slideNext = () => swiperInstance.value?.slideNext();

if (certificateImages.value.length === 0) {
  certificateImages.value = [media];
}
</script>

<template>
  <div class="py-16 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-10">{{ Name }} in Media</h2>

    <div class="relative w-[90%] mx-auto">
      <Swiper
        @swiper="onSwiper"
        :modules="[Navigation, Autoplay]"
        :loop="true"
        :space-between="25"
        :autoplay="{ delay: 2000, disableOnInteraction: false }"
        :breakpoints="{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }"
      >
        <SwiperSlide v-for="(img, index) in certificateImages" :key="index">
          <div
            class="relative rounded-xl overflow-hidden shadow-md hover:scale-[1.03] transition duration-300 cursor-pointer mb-1 mt-1"
          >
            <img :src="img" class="w-full h-64 object-contain" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
.nav-btn {
  width: 48px;
  height: 48px;
  background: #ffffffcc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: 0.3s;
  border: none;
  outline: none;
}
.nav-btn:hover {
  background: #ff4f5a;
  color: white;
  transform: scale(1.12);
}
</style>
