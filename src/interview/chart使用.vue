<template>

    <MyChart
      chart-type="line"
      :categories="['Mon', 'Tue', 'Wed']"
      :series-data="[120, 200, 150]"
      title="Line Chart Example"
      :onClick="handleLineChartClick"
      :onMouseOver="handleLineChartMouseOver"
    />

    <!-- 柱状图 -->
    <MyChart
      chart-type="bar"
      :categories="['Jan', 'Feb', 'Mar']"
      :series-data="[100, 150, 80]"
      title="Bar Chart Example"
      :onClick="handleBarChartClick"
    />
</template>

<script setup>
import MyChart from '@/interview/myEchart.vue';

// 定义echart的点击、悬浮事件
const handleLineChartClick = (params)=>{
    alert(`You clicked on ${params.name} in Line Chart with value: ${params.value}`);
}


</script>
