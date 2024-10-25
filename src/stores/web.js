// stores/counter.js
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

// 选项式写法，了解一下
export const useCounterStore = defineStore("counter", {
  state: () => count,
  actions: {
    increment() {
      this.count++;
    },
  },
});

// 组合式,export暴露仓库
export const useWebStore = defineStore(
  "web",

  // setup写法
  () => {
    const web = reactive({
      title: "阿文编程",
      url: "hhhh.com",
    });

    const users = ref(10);

    const userAdd = () => {
      users.value++;
    };

    return {
      users,
      web,
      userAdd,
    };
  },
  {
    persist: true,
  }
);
