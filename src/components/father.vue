<template>
  <Son ref="childRef" />
  <button @click="callChildMethod">调用子组件方法</button>
</template>

<script setup>
import { ref } from 'vue';
import Son from './son.vue';

const childRef = ref(null);  // 用 ref 引用子组件实例
const userData = ref({ name: 'Alice', age: 25 });

const callChildMethod = () => {
  if (childRef.value) {
    childRef.value.modifyUser(userData.value);  // 调用子组件方法并传递父组件的数据
  }
};
</script>
