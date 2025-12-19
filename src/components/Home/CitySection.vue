<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";   // ✅ important
import "swiper/css/pagination";   // ✅ important if we add dots later
import { Navigation, Autoplay } from "swiper/modules";
import { ref } from "vue";
import cityImage from "../../assets/download.jpg";
import mumbai from "../../assets/mumbai.jpg";
import bangalore from "../../assets/bangalore.avif";
import chennai from "../../assets/chennai.avif";
import pune from "../../assets/pune.avif";


const swiperInstance = ref(null);

const cities = [
  { name: "Bangalore", image: bangalore },
  { name: "Chennai", image: chennai },
  { name: "Delhi", image: cityImage },
  { name: "Mumbai", image: mumbai },
  { name: "Pune", image: pune },
];
const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};


const slidePrev = () => swiperInstance.value?.slidePrev();
const slideNext = () => swiperInstance.value?.slideNext();
</script>

<template>
  <div class="py-16 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-10">
      Select Your Dream College In Your Desired City
    </h2>

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
          1024: { slidesPerView: 4 }
        }"
      >
        <SwiperSlide v-for="(city, index) in cities" :key="index">
          <div class="relative rounded-xl overflow-hidden shadow-md hover:scale-[1.03] transition duration-300 cursor-pointer">
            <img :src="city.image" class="w-full h-64 object-cover" />
            <div class="absolute inset-0 bg-[rgba(0,0,0,0.35)] flex justify-center items-center">
              <p class="text-white font-semibold text-xl drop-shadow-lg">{{ city.name }}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- <div class="absolute top-1/2 left-0 right-0 px-4 flex justify-between -translate-y-1/2 z-10">
        <button @click="slidePrev" class="nav-btn">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button @click="slideNext" class="nav-btn">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div> -->

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
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
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




















<!-- <script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation"; // ✅ important
import "swiper/css/pagination"; // ✅ important if we add dots later
import { Navigation, Autoplay } from "swiper/modules";
import { onMounted, ref } from "vue";
import cityImage from "../../assets/download.jpg";
import axios from "axios";
const API_URL_FETCH_CITIES = import.meta.env.VITE_FETCH_ALL_CITIES;
const swiperInstance = ref(null);

const cities = ref([]);

const fetchCities = async () => {
  try {
    const response = await axios.get(API_URL_FETCH_CITIES);
    cities.value = response.data.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};

onMounted(fetchCities);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const slidePrev = () => swiperInstance.value?.slidePrev();
const slideNext = () => swiperInstance.value?.slideNext();
</script> -->



