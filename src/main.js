import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import axios from "axios";
import Mock from "mockjs";
// import lazyload from "./utils/directive/lazyload";

//整体导入 ElementPlus 组件库
import ElementPlus from "element-plus"; //导入 ElementPlus 组件库的所有模块和功能
import "element-plus/dist/index.css"; //导入 ElementPlus 组件库所需的全局 css 样式
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; //导入 ElementPlus 组件库中的所有图标
import zhCn from "element-plus/dist/locale/zh-cn.mjs"; //导入 ElementPlus 组件库的中文语言包

//Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 1.创建pinia实例
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // 持久化的pinia

// 根据环境启用 Mock.js
/*
if (process.env.NODE_ENV === "development") {
  import("./mock/test.js") // 动态导入 Mock.js 文件
    .then(() => {
      console.log("Mock data loaded");
    })
    .catch((err) => {
      console.error("Failed to load mock data", err);
    });
}
*/

// 配置 Axios 的基础 URL
/*
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173/"
    : "http://jsonplaceholder.typicode.com";
*/

// createApp(App).mount('#app')
const app = createApp(App);

// 全局注册自定义指令
// app.directive("lazy", lazyload);

// 2.引入pinia
app.use(pinia);
// 3.Vue中注册各个组件
app.use(router);

//注册 ElementPlus 组件库中的所有图标到全局 Vue 应用中
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, {
  //将 ElementPlus 插件注册到 Vue 应用中
  locale: zhCn, // 设置 ElementPlus 组件库的区域语言为中文简体
});

//全局前置守卫
/*
router.beforeEach((to, from, next) => {
  //   console.log("to:", to); //即将进入的路由的信息
  //   console.log("from:", from); //当前即将离开的路由信息

  next(); // 进入下一页面
  /*
        if(to.name == "history"){
            next(false) //拦截
        }else{
            next() //继续
        }
    
});
*/

app.mount("#app");

// 查看默认环境变量
// console.log(import.meta.env);
/*
    {
        "BASE_URL": "/",
        "DEV": true,
        "MODE": "development",
        "PROD": false,
        "SSR": false
    }
*/
