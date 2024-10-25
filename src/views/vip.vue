<template>
  <div>
    <!-- 共享的Header组件 -->
	    <Header/>

	    <!-- 渲染页面，根据不同的子路由加载不同子页面 -->
	    <router-view />

	    <!-- 共享的Footer组件 -->
	    <Footer/>
  </div>
</template>

<script setup>
//导入子组件
	  import Header from "@/components/common/header.vue"
	  import Footer from "@/components/common/footer.vue"
</script>
