<template>
<div id="app">
    <h1>Mock and Real Backend Example</h1>
    <div>
      <h2>ECharts Data (Mock):</h2>
      <pre>{{ echartData }}</pre>
    </div>

    <div>
      <h2>Real Backend User Profile:</h2>
      <pre>{{ realUserProfile }}</pre>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'; // 确保正确引入 axios

const echartData = ref(null)
const realUserProfile = ref(null)

// 定义请求数据的函数
const fetchEchartData = async () => {
    try {
    const response = await axios.get('/mockApi/post');
    console.log('echartdata', response)

    echartData.value = response.data;

    } catch (error) {
    console.error('Error fetching ECharts data:', error);
    }
};
// 请求真实后端的用户信息
const fetchRealUserProfile = async () => {
    try {
    const response = await axios.get('/api/post');
    realUserProfile.value = response;
    } catch (error) {
    console.error('Error fetching real user profile:', error);
    }
};

// 使用 onMounted 生命周期钩子在组件挂载后请求数据
onMounted(() => {
    fetchEchartData();
    // fetchRealUserProfile();
});



</script>
