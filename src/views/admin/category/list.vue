<template>
  <!-- category add、edit-->
  <CategoryAdd></CategoryAdd>
  <CategoryEdit></CategoryEdit>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      :to="{ path: '/admin/category/list', query: { parent_id: 0 } }"
    >
      <el-icon><House /></el-icon>
    </el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="value in data.path"
      :to="{ path: '/admin/category/list', query: { parent_id: value.id } }"
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
  <el-button type="primary" @click="pageAdd">添加类别</el-button>

  <!-- 表格 -->
  <el-table :data="data.list" border>
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="名称">
      <!-- 插槽实现a链接 -->
      <template #default="scope">
        <router-link
          :to="{
            path: '/admin/category/list',
            query: { parent_id: scope.row.id },
          }"
          class="blue"
          >{{ scope.row.name }}</router-link
        >
      </template>
    </el-table-column>

    <el-table-column prop="status" label="状态" width="80">
      <!-- 使用插槽对状态status属性进行转义 -->
      <template #default="scope">
        <span v-if="scope.row.status === '1'" class="green">显示</span>
        <span v-else class="orange">隐藏</span>
      </template>
    </el-table-column>
    <el-table-column prop="create_time" label="日期" width="200" />

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
import CategoryApi from "@/api/categoryApi";
import axiosDR from "@/utils/axios/axiosDR";
import CategoryAdd from '@/components/admin/category/categoryAdd.vue'
import CategoryEdit from "@/components/admin/category/categoryEdit.vue";

// 数据源，list是查询结果列表，path是对应的breadcrumb路径
const data = reactive({
  // list: [ {id:'1', name:'类别', parent_id:'0',create_time:'2024-03-22'}],
  list: [],
  path: [],
});
const route = useRoute(); // 本身就返回响应式数据
let parentId = route.query.parent_id || 0


// 1.category添加功能传参，跨组件
const provideData = reactive({
  id:0,                 
  level: 1 ,
  name:'',
  parentId,
  pageAdd: false,
  pageEdit: false,
})
// 2.子组件调用更新父组件视图
const provideFuncGetList = ()=>{
  CategoryApi.getListByParentId(route.query.parent_id).then((res)=>{
    if(!res.status){
      ElMessage.error(res.msg)
      return 
    }
    data.list = res.data.list
    data.path = res.data.path
  }).catch((error)=>{
    ElMessage({
      type: 'error',
      message: '路由跳转失败'
    })
  })
}


// 类别add、edit
const pageAdd=()=>{
  provideData.pageAdd = true
}

const pageEdit = (row)=>{
  // console.log(row);
  provideData.id = row.id
  provideData.pageEdit = true
}

// 初次加载时获取数据显示，watcheffect包含了初次挂载情况
/* onMounted(() => {
  CategoryApi.getListByParentId(parentId)
    .then((res) => {
      // console.log(res);
      // 检验响应状态
      if (!res.status) {
        ElMessage.error(res.msg);
        return;
      }
      data.list = res.data.list;
      data.path = res.data.path;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}); */


/** 更新路由router-link
 *  思路：通过判断当前路由的变化，即parent_id参数的变化之后,可使用watch、onUpdated，以下都尝试
 */
// 优选watcheffect自动监听,组件挂载时就执行一次
watchEffect(()=>{
  // if (isFirstLoad) {
  //   isFirstLoad = false;  // 第一次加载时跳过
  //   return;
  // }
  // route本身是响应式数据，注意这里parentId不是，所以下边要传给providedata.parentid
  // 不要直接provideData.parentId赋值，因为写在watcheffect中的响应式数据都会变监听，
  // route.query.parent_id变化时，子组件内已经接收到了，providedata也被接收，下文在此修改了providedata.level，导致providetata在子组件内接收2次，不好
  parentId = route.query.parent_id        
  

  CategoryApi.getListByParentId(route.query.parent_id).then((res)=>{
    if(!res.status){
      ElMessage.error(res.msg)
      return 
    }
    data.list = res.data.list
    data.path = res.data.path
    
    // 视图切换时更新level
/*     if(data.path == null){
      provideData.level = 1
    }else{
      provideData.level = data.path.length +1
    }
    provideData.parentId = parentId */

    // provideData.level = data.path.length +1             // 有异常,以下正确，但是发现parentid传值不对
    provideData.level = data.path === null? 1: data.path.length+1  
    provideData.parentId = parentId                        // 必须加这个
    // console.log('level',provideData.level );
  }).catch((error)=>{
    ElMessage({
      type: 'error',
      message: '路由跳转失败'
    })
  })
}, { flush: 'post' })
provide('provideDataKey',provideData)
provide('provideFuncGetList', provideFuncGetList)

// 次选onupdated
/* onUpdated(()=>{
  // 查询参数变化，则进行跳转
  if(parentId !== route.query.parent_id){ 
    parentId = route.query.parent_id
    CategoryApi.getListByParentId(parentId).then((res)=>{
      if(!res.status){
        ElMessage.error(res.msg)
      }
      // 接口调用success
      data.list = res.data.list
      data.path = res.data.path
    }).catch((error)=>{
      ElMessage({
        type: 'error',
        message: error
      })
    })
  }
}) */



// 列表item删除-异步优化
const del = async (user) => {
  try {
    await ElMessageBox.confirm("确认删除？", "标题", {
      type: "warning",
      confirmButtonText: "ok",
      cancelButtonText: "cancel",
    });

    let delResult = await CategoryApi.del(String(user.id));
    if (!delResult.status) {
      ElMessage.error(delResult.msg);
      return;
    }
    ElMessage.success("删除成功");

    // 刷新视图
    CategoryApi.getListByParentId(route.query.parent_id).then((res)=>{
    if(!res.status){
      ElMessage.error(res.msg)
      return 
    }
    data.list = res.data.list
    data.path = res.data.path

  }).catch((error)=>{
    ElMessage({
      type: 'error',
      message: '路由跳转失败'
    })
  })
  } catch (err) {
    ElMessage.error(err);
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
      CategoryApi.del(String(row.id))
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
</script>
