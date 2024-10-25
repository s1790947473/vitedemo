<template>
  <div>
    <!-- -->
  </div>
</template>

<script setup>

</script>

<style  scoped>
@media screen and (max-width: 768px) {
  /* 小屏幕样式 */
  .sidebar {
    display: none;
  }
  .chart {
    width: 100%;
  }
}

@media screen and (min-width: 768px) and (max-width: 1200px) {
  /* 中等屏幕样式 */
  .dashboard {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1200px) {
  /* 大屏幕样式 */
  .dashboard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

</style>