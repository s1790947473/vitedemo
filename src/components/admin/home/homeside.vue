<!-- <template>
  <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffdo4b"> -->
    <!-- 管理员 -->
    <!-- <el-sub-menu index="home">
      <template #title>
          <el-icon><UserFilled /></el-icon>管理员
      </template>
      <el-menu-item-group>
          <el-menu-item index="/home/administrator/add">添加管理员</el-menu-item>
          <el-menu-item index="/home/administrator/list">管理员列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu> -->

    <!-- 类别管理 -->
    <!-- <el-menu-item index="/home/category/list?parent_id=0">
        <el-icon><Files/></el-icon>类别管理
    </el-menu-item> -->

    <!-- 文章管理 -->
    <!-- <el-sub-menu index='article'>
      <template #title>
        <el-icon><Document /></el-icon>文章管理
      </template>
      <el-menu-item-group>
          <el-menu-item index="/home/article/list">文章列表</el-menu-item>
          <el-menu-item index="/home/article/add">添加文章</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu> -->

    <!-- 导航管理 -->
    <!-- <el-menu-item index="/home/nav/list?parent_id=0">
        <el-icon><Files/></el-icon>导航管理
    </el-menu-item>
  </el-menu>
</template> -->

<template>
  <div class="side">
    <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <!-- 模板定义 -->
      <template v-for="item in data.list " :key="item.path">
        <!-- 没有子菜单时 -->
        <el-menu-item v-if="item.children===null" :index="item.path" >
          <el-icon><component :is="item.icon"/> </el-icon>{{item.name}}
        </el-menu-item>

        <!-- 包含子菜单时 -->
        <el-sub-menu v-else  :index="item.path" >
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>{{item.name}}
          </template>

          <el-menu-item-group>
            <template v-for="child in item.children"  :key="child.path">
              <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
            </template>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import navApi from '@/api/navApi';
import { ElMessage } from 'element-plus';
import { reactive, onMounted } from 'vue';


const data = reactive({
  list:[],
})

onMounted(()=>{
  navApi.getAll().then((res)=>{
    if(!res.status){
      // ElMessage.error('侧边栏获取失败')
      return 
    }
    data.list = res.data
  }).catch((err)=>{
    ElMessage.error('侧边栏获取失败')
    console.log('侧边栏获取失败',err);
  })
})
</script>
