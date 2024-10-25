<!-- 管理员列表显示
  访问API获取管理员用户
-->
<template>
  <el-table :data="data.list" border>
    <el-table-column prop="id" label="ID" width="60"/>
    <el-table-column prop="name" label="名称"/>
    <el-table-column prop="email" label="邮箱"/>
    <el-table-column prop="remark" label="备注"/>

    <el-table-column label="操作" width="150">
      <template #default="scope">   
        <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
        <el-button size="small" @click="deleteUser( scope.row)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script setup>
import {reactive,onMounted} from 'vue'
import axiosDR from '@/utils/axios/axiosDR';
import { ElMessage,ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';


const router = useRouter()
const data =  reactive({
  list: [],
  /* 初期使用静态数据模拟   
  list:[
    { id:'1', name:'阿文', email:'', remark:'dengruicode.com', create_time:'2024-04-08'},
    { id:'2',name:'luna', email:'', remark:'www.dengruicode.com',create_time:'2023-04-08'},
  ] */
})

onMounted(() => {
  getUser()
});

// edit-User
const edit = (row)=>{
  // 路由传参跳转
  router.push({path: '/admin/administrator/edit', query:{id: row.id}})
}

// 获取用户列表
const getUser = ()=>{
  axiosDR.get('api/adm/list').then( (res)=>{
  // console.log(res);
  // 检验响应状态
  if (!res.status){
    ElMessage.error(res.msg)
    return 
  }

  data.list = res.data.list
}).catch( error=>{
  console.log(error);
})

}

// 删除用户的一般方法
const userDeleteUnusual = (user)=>{
  // 删除前确认,使用messageBox的confirm，模拟了windows的confirm
  ElMessage.confirm('确认删除?','标题',{
    type: 'warning',
    confirmButtonText: 'ok',
    cancelButtonText:'cancel'
  }).then(()=>{  
    // 调用删除接口
    ElMessage({
      type: 'success',
      message: '成功删除'
    })
  }).catch(()=>{
    // 删除失败提示
    ElMessage({
      type: 'error',
      message: '删除失败'
    }) 
  })

}

// 删除用户
const deleteUser = async (user) => {
        try {
            await ElMessageBox.confirm('确认删除?', '标题',{
                type: 'warning',
                confirmButtonText: '确认',
                cancelButtonText: '取消',             // 取消时，promise为rejected          
            })
            //删除
            let delResult = await axiosDR.post('/api/adm/del',{id: String(user.id)})
            if(!delResult.status){
                ElMessage.error(delResult.msg)
                return
            }
            //重新获取列表
            getUser()
        } catch (err) {                 // 相当于promise的catch
            console.log("err:", err)
        }
}



</script>
