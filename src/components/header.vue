<template>
  <div>
    <h3>header</h3>
    <Nav></Nav>
  </div>
</template>

<script setup>
  import Nav from './nav.vue'

  const props = defineProps(['name', 'url'])

  // console.log(props)
</script>
