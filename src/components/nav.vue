<template>
  <div>
    <h3>nav底层组件</h3>  
    跨组件对象{{web}} {{user}}
    跨组件函数
    <button @click="injectUserAdd">添加user</button>
  </div>
</template>

<script setup>
    import {inject} from 'vue'

    const [web,user] = inject('provideWeb')
    const injectUserAdd = inject('provideFuncUserAdd')
</script>
