<template>
    <splide :options="{ type: 'loop', autoplay: true }">
      <splide-slide v-for="image in images" :key="image">
        <img :src="image" class="w-full h-auto" />
      </splide-slide>
    </splide>
  </template>
  
  <script>
  import { Splide, SplideSlide } from '@splidejs/vue-splide';
  import image1 from '../assets/img1.jpg';
  import image2 from '../assets/img2.jpg';
  import image3 from '../assets/img3.jpg';
  import image4 from '../assets/img4.jpg';
  import image5 from '../assets/img5.jpg';
  
  export default {
    components: {
      Splide,
      SplideSlide,
    },
    data() {
      return {
        images: [image1, image2, image3, image4, image5],
      };
    },
  };
  </script>
  
  <style scoped>
  img {
    border-radius: 10px;
  }
  </style>
  