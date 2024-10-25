<template>
  <div>
    <h3>footer</h3>
    <button @click="add">userAdd</button>
  </div>
</template>

<script setup>
  const emits = defineEmits(['getweb', 'userAdd'])
  emits('getweb', {name: 'szw',  url:'baidu.com'})

  const add = ()=>{
    emits('userAdd', 10)
  }
</script>
