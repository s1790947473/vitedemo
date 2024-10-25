<template>
  <div>
    <h1>1</h1>
    <h1>2</h1>
    <h1>3</h1>
    <h1>4</h1>
    <h1>5</h1>
    <h1>6</h1>
      <div v-for="image in images" :key="image.id">
      <img v-lazy="image.url" alt="Lazy Loaded Image" /> <!-- 修改为 img 标签 -->
      </div>
    <!-- <img v-lazy="'@/assets/img/3.png '" alt="Lazy Loaded Image" /> -->
  </div>
</template>

<script setup>
import {ref} from 'vue'



const images = ref([
    { id: 1, url: '/src/assets/img/3.png' },
    { id: 2, url: '/src/assets/img/dier.png' },
    { id: 3, url: '/src/assets/img/honor.png' },
    { id: 4, url: '/src/assets/img/honor1.png' },
    { id: 5, url: '/src/assets/img/new.png' },
    { id: 6, url: '/src/assets/img/new1.png' },
])




</script>
