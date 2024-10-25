<template>

    <NavAdd></NavAdd>
    <NavEdit></NavEdit>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="{ path: '/admin/nav/list', query: { parent_id: 0 } }"
      >
        <el-icon><House /></el-icon>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="value in navStore.navList.path"
        :to="{ path: '/admin/nav/list', query: { parent_id: value.id } }"
        :key="value.id"
      >
        {{ value.name }}
      </el-breadcrumb-item>
      <!--       <el-breadcrumb-item>
          <a href="/home/category/list?parent_id="><el-icon><House /></el-icon></a>
        </el-breadcrumb-item> -->
      <!--       <el-breadcrumb-item v-for="value in data.path" :key="value.id" >
          <a :href= '`/home/category/list?parent_id=${value.id}`'>{{ value.name }}</a>
        </el-breadcrumb-item> -->
    </el-breadcrumb>
    <!-- 按钮 -->
    <el-button type="primary" @click="navAdd">添加导航</el-button>
    <!-- 表格 -->
    <el-table :data="navStore.navList.list" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名称">
        <!-- 插槽实现a链接 -->
        <template #default="scope">
            <router-link
            :to="{path: '/admin/nav/list',query: { parent_id: scope.row.id },}" class="blue">{{ scope.row.name }}</router-link>
        </template>
    </el-table-column>

<!-- 动态获取图标 -->
    <el-table-column prop="icon" label="图标" width="60">
            <template v-slot="scope">
                <el-icon v-if="scope.row.icon"><component :is="scope.row.icon" /></el-icon>
            </template>
        </el-table-column>

    <el-table-column prop="path" label="路径"/>

      <el-table-column prop="status" label="状态" width="80">
        <!-- 使用插槽对状态status属性进行转义 -->
        <template #default="scope">
          <span v-if="scope.row.status === '1'" class="green">显示</span>
          <span v-else class="orange">隐藏</span>
        </template>
      </el-table-column>

      <el-table-column prop="create_time" label="日期" width="200">
        <template #default="scope">
            {{ funcFormatDate(scope.row.create_time)}}
        </template>
      </el-table-column>
  
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button size="small" type="primary" @click="pageEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  <script setup>
import { ref,reactive, onMounted, onUpdated, watchEffect, provide } from "vue";
import { useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import axiosDR from "@/utils/axios/axiosDR";
import NavApi from '@/api/navApi.js'
import TimeDR from "@/utils/time/timeutil";
import {useNav} from '@/stores/admin/nav.js'
import NavAdd from '@/components/admin/nav/navAdd.vue'
import NavEdit from '@/components/admin/nav/navEdit.vue'


//---add、edit数据源，注意这是对象形式的导入
const navStore = useNav()
const route = useRoute(); // 本身就返回响应式数据
let parentId = route.query.parent_id || 0
const time = TimeDR

//---nav数据源，list是查询结果列表，path是对应的breadcrumb路径
// const data = reactive({
//   list: navStore.navList.list,
//   path: navStore.navList.path,
// });


//---导航add、edit
const navAdd=()=>{
    navStore.data.navAdd = true
}

const pageEdit = (row)=>{
  navStore.data.navEdit= true
  navStore.data.id = row.id
}

//---动态加载nav的列表项，依据route的parent_id
watchEffect(()=>{
    parentId = route.query.parent_id   
    funcUpdateData(parentId)
    // navStore.getNavList(parentId)
}, { flush: 'post' })

//---导航列表更新方法
const funcUpdateData=(parentId)=>{
  navStore.getNavList(parentId)
  navStore.update(navStore.navList.path, parentId)
    // NavApi.getListByParentId(parentId).then((res)=>{
    //   //数据清空时
    //   if(res.data === null){
    //     return 
    //   }
    //   if(!res.status){
    //     ElMessage.error(res.msg)
    //     return 
    //   }
    //   navStore.getNavList(parentId)
    //   //---获取当前导航列表，不适用navStore.getNavList()，避免重复调用api
    //   // navStore.navList.list = res.data.list
    //   // navStore.navList.path = res.data.path

    //   // 页面查询参数更新，用于add
    //   navStore.update(navStore.navList.path, parentId)
    //   // console.log(navStore.data);
    // }).catch((error)=>{
    //     ElMessage({
    //     type: 'error',
    //     message: '路由跳转失败'
    //     })
    // })
}


// 列表item删除-异步优化
const del = async (nav) => {
  try {
      await ElMessageBox.confirm("确认删除？", "标题", {
        type: "warning",
        confirmButtonText: "ok",
        cancelButtonText: "cancel",
      });

      let delResult = await NavApi.del(String(nav.id));
      if (!delResult.status) {
        ElMessage.error(delResult.msg);
        return;
      }
      ElMessage.success("删除成功");

      // 刷新视图
      navStore.getNavList(navStore.data.parentId)
  } catch (err) {
      ElMessage.error(err);
      console.log('删除失败',err);
  }
};

// 列表item删除-低配版，有2个异步，优化为async
const del_ = (row) => {
// row是item的id
// 删除
ElMessageBox.confirm("确认删除?", "标题", {
    type: "warning",
    confirmButtonText: "ok", // resolve
    cancelButtonText: "cancel",
})
    .then((res) => {
    NavApi.del(String(row.id))
        .then((res) => {
        console.log(res);
        if (!res.status) {
            ElMessage({
            type: "error",
            message: "删除失败",
            });
            return;
        }
        ElMessage({
            type: "success",
            message: "删除成功",
        });
        })
        .catch((error) => {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
        });
    })
    .catch((error) => {
    console.log(error);
    ElMessage({
        type: "error",
        message: "删除接口请求失败",
    });
    });
};


//---时间格式转换

const funcFormatDate = (time)=>{
    return time.slice(0,10)
}
</script>
