<template>
    <div class="dr-login">
        <el-form :model="data" :rules="rules" ref="elFormRef">
            <div class="title">
                DR_CMS
            </div>

            <el-form-item prop="name">
                <el-input :prefix-icon="User" v-model="data.name" />
            </el-form-item>

            <el-form-item prop="password">
                <el-input :prefix-icon="Lock" show-password v-model="data.password" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import '@/assets/admin/css/login.css'    // 登录表单样式
import { useAdminStore } from '@/stores/admin/admin';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { User,Lock } from '@element-plus/icons-vue' //图标
import axios from 'axios'
import { reactive, ref } from 'vue'

const adminStore = useAdminStore()
const router = useRouter()

// 绑定用户数据
const data = reactive({
    name: '',
    password: '',
})

// 实现点击登录时校验
const elFormRef = ref() //存储 <el-form> 组件实例的引用


// 登录函数
const login = ()=>{

    // 手动触发form校验
    elFormRef.value.validate((valid, fields)=>{
        // console.log("valid:",valid,"fields:",fields)
        if(!valid){
            return
        }

        // 校验通过则防访问
        axios.post('http://127.0.0.1:8008/api/adm/login',data).then((response)=>{
            // 首先检验响应码
            if(!response.data.status){
                ElMessage.error(response.data.msg)
                return
            }

            // 解码jwt的token
            let token = response.data.data.token
            let [headerBase64, payloadBase64, signBase64] = token.split('.')
            let payload = atob(payloadBase64) //base64 解码
            let payloadObj = JSON.parse(payload) //将 json 字符串转换为对象

            // token持久化到localstorage
            adminStore.save(payloadObj.name, token, payloadObj.expireDate)
            // console.log(adminStore.data);
            router.push('/admin')
        }).catch((err)=>{
            console.log(err)
        })
    })



}

//校验规则
const rules = {
    name: [
        { required: true, message: '请填写用户名', trigger: 'blur' },
        { min: 2, max: 10, message: '用户名长度限制[ 2 - 10 ]个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请填写密码', trigger: 'blur' }
    ]
}
</script>
