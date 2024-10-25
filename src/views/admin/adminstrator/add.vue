<template>
<el-form label-width="80" style="width: 400px;">
        <el-form-item label="名称">
            <el-input v-model="data.name" placeholder="请填写名称" />
        </el-form-item>

        <el-form-item label="密码">
            <el-input v-model="data.password" show-password placeholder="请填写密码" />
        </el-form-item>

        <el-form-item label="邮箱">
            <el-input v-model="data.email" />
        </el-form-item>

        <el-form-item label="备注">
            <el-input type="textarea" v-model="data.remark" rows="4" />
        </el-form-item>

        <el-form-item label="性别">
            <el-radio-group v-model="data.gender" >
                <el-radio value="0"  >未知</el-radio>
                <el-radio value="1" >男</el-radio>
                <el-radio value="2">女</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="add">添加</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import {reactive} from 'vue'
import axiosDR from '@/utils/axios/axiosDR';
import { ElMessage } from 'element-plus';
import TimeDR from '@/utils/time/timeutil';

const data = reactive({
  name:'',
  password:'',
  email:'',
  remark:'',
  gender:'0',

})

// 添加user
const add = ()=>{
  if(data.name == ''){
    ElMessage.error('用户名不能为空')
    return
  }
  if(data.password == ''){
    ElMessage.error('密码不能为空')
    return
  }

  // 添加用户信息，额外包含一个时间
  data.create_time = TimeDR.now()

  console.log(data);

  axiosDR.postForm('api/adm/add', data).then(res=>{
    // 判断响应状态
    if(!res.status){
      ElMessage.error(res.msg)
      return 
    }

    ElMessage.success('用户添加成功')
  }).catch( error=>{
    console.log(error);
  })
}



// 重置表单
const reset =()=>{
  data = {
  name:'',
  password:'',
  email:'',
  remark:'',
  gender:'',
}
} 
</script>
