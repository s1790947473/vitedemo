<template>
  <p>{{ user.name }}</p>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({ name: '', age: 0 });

const modifyUser = (newUser) => {
  user.value = { ...newUser };  // 修改子组件的 user 数据
};

defineExpose({ modifyUser });  // 向父组件暴露方法
</script>
