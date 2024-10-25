<template>
  <div class="resize-container" ref="resizeContainer">
    111
    <div ref="echartsContainer" class="chart-container"></div>
    <div class="resize-handle" @mousedown="startResizing"></div> <!-- 拖动手柄 -->
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const resizeContainer = ref(null);
    const echartsContainer = ref(null);
    let chartInstance = null;
    let isResizing = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // 初始化图表
    const initChart = () => {
      chartInstance = echarts.init(echartsContainer.value);
      const option = {
        title: { text: '示例图表' },
        xAxis: { data: ['A', 'B', 'C', 'D', 'E'] },
        yAxis: {},
        series: [{ type: 'bar', data: [5, 20, 36, 10, 10] }]
      };
      chartInstance.setOption(option);
    };

    // 监听鼠标拖动以改变容器大小
    const startResizing = (event) => {
      isResizing = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      document.addEventListener('mousemove', resizeContainerFunc);
      document.addEventListener('mouseup', stopResizing);
    };

    const resizeContainerFunc = (event) => {
      if (isResizing) {
        const dx = event.clientX - lastMouseX;
        const dy = event.clientY - lastMouseY;

        const container = resizeContainer.value;
        const newWidth = container.offsetWidth + dx;
        const newHeight = container.offsetHeight + dy;

        container.style.width = newWidth + 'px';
        container.style.height = newHeight + 'px';

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;

        chartInstance.resize(); // 图表自适应调整大小
      }
    };

    const stopResizing = () => {
      isResizing = false;
      document.removeEventListener('mousemove', resizeContainerFunc);
      document.removeEventListener('mouseup', stopResizing);
    };

    // 组件挂载时初始化图表
    onMounted(() => {
      initChart();
    });

    // 组件卸载时清理事件
    onUnmounted(() => {
      if (chartInstance) chartInstance.dispose();
      document.removeEventListener('mousemove', resizeContainerFunc);
      document.removeEventListener('mouseup', stopResizing);
    });

    return {
      resizeContainer,
      echartsContainer,
      startResizing
    };
  }
};
</script>

<style scoped>
.resize-container {
  position: relative;
  width: 400px;
  height: 300px;
  border: 1px solid #ccc;
  resize: both;
}

.chart-container {
  width: 100%;
  height: 100%;
}

.resize-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  bottom: 0;
  cursor: se-resize; /* 鼠标样式为拖动手柄样式 */
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
