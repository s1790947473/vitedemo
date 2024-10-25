<template>
  <div class="container">
    <!-- 顶部 Header -->
    <header class="header">
      Header
    </header>

    <!-- 左侧 Lefter -->
    <aside class="lefter">
      Lefter
    </aside>

    <!-- 右侧 Grid 布局 -->
    <section class="right-content">
      <div class="box">Box 1</div>
      <div class="box">Box 2</div>
      <div class="box large-box">Big Box</div> <!-- 大的Box -->
      <div class="box">Box 3</div>
      <div class="box">Box 4</div>
    </section>
  </div>
</template>

<script>

</script>

<style scoped>
/* 容器定义 */
.container {
  display: grid;
  grid-template-columns: 200px 1fr; /* 左侧固定宽度，右侧自适应 */
  grid-template-rows: 60px 1fr; /* 顶部固定高度，底部自适应 */
  height: 100vh; /* 占满整个视口 */
  grid-template-areas: 
    "header header"
    "lefter right-content";
}

/* 顶部 Header 样式 */
.header {
  grid-area: header;
  background-color: #42b983;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

/* 左侧 Lefter 样式 */
.lefter {
  grid-area: lefter;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

/* 右侧内容区域样式 */
.right-content {
  grid-area: right-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 默认两列布局 */
  grid-template-rows: repeat(2, 1fr); /* 三行布局 */
  gap: 10px; /* 子块之间的间距 */
  padding: 10px;
  background-color: #f5f5f5;
}

/* 普通 Box 样式 */
.box {
  background-color: #409EFF;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding: 20px;
  border-radius: 4px;
}

/* 大的 Box 样式 */
.large-box {
  grid-column: span 2; /* 默认大Box占两列 */
  font-size: 24px;
  padding: 40px;
}

/* 响应式布局：小屏幕（移动端） */
@media screen and (max-width: 768px) {
  .container {
    grid-template-columns: 1fr; /* 左侧隐藏，右侧自适应 */
    grid-template-rows: 60px 1fr;
    grid-template-areas: 
      "header"
      "right-content";
  }

  .lefter {
    display: none; /* 隐藏左侧 */
  }

  .right-content {
    grid-template-columns: 1fr; /* 单列布局 */
    grid-template-rows: repeat(5, auto); /* 五行布局，每个box占据一行 */
  }

  .large-box {
    grid-column: span 1; /* 大Box占一列 */
  }
}

/* 响应式布局：中等屏幕（PC端） */
@media screen and (min-width: 768px) and (max-width: 1200px) {
  .container {
    grid-template-columns: 200px 1fr; /* 左侧固定，右侧自适应 */
  }

  .right-content {
    grid-template-columns: repeat(2, 1fr); /* 两列布局 */
  }
}

/* 响应式布局：超宽屏幕（工厂的超宽屏幕） */
@media screen and (min-width: 1200px) {
  .container {
    grid-template-columns: 200px 1fr; /* 左侧固定，右侧自适应 */
  }

  .right-content {
    grid-template-columns: repeat(3, 1fr); /* 三列布局 */
    grid-template-areas:
      "box1 big-box box2"
      "box3 big-box box4";
  }

  .box:nth-child(1) {
    grid-area: box1;
  }

  .box:nth-child(2) {
    grid-area: box2;
  }

  .large-box {
    grid-area: big-box;
  }

  .box:nth-child(4) {
    grid-area: box3;
  }

  .box:nth-child(5) {
    grid-area: box4;
  }
}
</style>
