<template>
  <div>
    <div ref="echartsContainer" class="chart-container"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';
import { generateEChartOption } from '@/utils/echart/chartUtils.js';// 通用的 option 函数
import { useEChartEvents } from '@/utils/echart/chartEvent'; // 引入封装的事件处理
export default {
  props: {
    chartType: {
      type: String,
      default: 'line' // 默认折线图
    },
    categories: {
      type: Array,
      required: true
    },
    seriesData: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    onClick: Function, // 允许父组件传入自定义点击事件
    onMouseOver: Function // 允许父组件传入自定义悬浮事件
  },
  setup(props) {
    const echartsContainer = ref(null);
    let chartInstance = null;
    let unregisterEvents = null; // 用于存储注销事件的函数
    
    // 初始化图表
    const initChart = () => {
      chartInstance = echarts.init(echartsContainer.value);

      const option = generateEChartOption(
        props.chartType,
        props.categories,
        props.seriesData,
        props.title
      );

      chartInstance.setOption(option);

      // 使用封装的事件处理函数，注册事件
      unregisterEvents = useEChartEvents(chartInstance, {
        onClick: props.onClick,
        onMouseOver: props.onMouseOver
      });
    };

    // 组件挂载时初始化
    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      // 组件卸载时注销事件和销毁图表实例
      if (unregisterEvents) unregisterEvents();
      if (chartInstance) chartInstance.dispose();
    });

    return {
      echartsContainer
    };
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  position: relative;
}
</style>
