import { defineStore } from "pinia";
import { ref } from "vue";

const useCategory = defineStore("category", () => {
  // 获取类别列表的初始id
  const initCategoryId = ref("1");

  return {
    initCategoryId,
  };
});

// 命名导出，导出多个对象、变量
export { useCategory };
