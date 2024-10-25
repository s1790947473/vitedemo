import { defineStore } from "pinia";
import { reactive } from "vue";

// 定义pinia仓库，代码拆分
const useAdminStore = defineStore(
  "admin",
  () => {
    const data = reactive({
      name: "",
      token: "",
      expireDate: "", //过期日期
    });

    const save = (name, token, expireDate) => {
      data.name = name;
      data.token = token;
      data.expireDate = expireDate;
    };

    return {
      data,
      save,
    };
  },
  {
    persist: true, //持久化存储到 localStorage 中
  }
);
// 命名导出
export { useAdminStore };
