import { defineStore } from "pinia";
import { reactive } from "vue";
import navApi from "@/api/navApi";
import { ElMessage } from "element-plus";

const useNav = defineStore("nav", () => {
  const data = reactive({
    id: 0,
    level: 1,
    parentId: 1,
    navAdd: false,
    navEdit: false,
  });
  //---传参顺序绝对不能修改
  const update = (path, parentId) => {
    if (path === null) {
      data.level = 1;
    } else {
      data.level = path.length + 1;
    }
    data.parentId = parentId;
    // console.log("navStore为：", data);
  };

  //---导航当前list
  const navList = reactive({
    list: [],
    path: [],
  });
  //api获取导航当前list
  const getNavList = (parentId) => {
    /*     优化待定try {
      navApi.getListByParentId(parentId).then((res) => {
        if (!res.status) {
          ElMessage.error(res.msg);
          return;
        }
        navList.list = res.data.list;
        navList.path = res.data.path;
      });
    } catch (err) {
      ElMessage.error("获取当前导航列表失败");
      console.log("获取当前导航列表失败:", err);
    } */
    navApi
      .getListByParentId(parentId)
      .then((res) => {
        if (!res.status) {
          //数据为空时
          // if (res.data == null) {
          //   navList.list = [];
          //   return;
          // }
          ElMessage.error(res.msg);
          return;
        }
        navList.list = res.data.list;
        navList.path = res.data.path;
      })
      .catch((err) => {
        ElMessage.error("获取当前导航列表失败");
        console.log("获取当前导航列表失败:", err);
      });
  };
  return {
    data,
    update,
    navList,
    getNavList,
  };
});

// 默认导出，相当于到处{useNav: useNav}
export { useNav };
