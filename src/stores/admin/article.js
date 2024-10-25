import { defineStore } from "pinia";
import { reactive } from "vue";
import { ref } from "vue";
// 写法1
// const usePage = defineStore("pageSize", {
//   state: () => ({
//     pageSize: 2, // 初始分页大小
//   }),
//   acitons: {
//     setPageSize(size) {
//       this.pageSize = size;
//     },
//   },
// });

// 写法2
// 定义pinia仓库，代码拆分
const usePage = defineStore("pageSize", () => {
  const pageSize = ref(2);

  const setPageSize = (size) => {
    pageSize.value = size;
  };

  return {
    pageSize,
    setPageSize,
  };
});

// 命名导出
export { usePage };
