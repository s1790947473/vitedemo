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
            <el-radio-group v-model="data.gender">
                <el-radio value="0">未知</el-radio>
                <el-radio value="1">男</el-radio>
                <el-radio value="2">女</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="edit">编辑</el-button>
            <el-button @click="back">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import axiosDR from '@/utils/axios/axiosDR';
import { ElMessage } from 'element-plus';
import { onMounted, reactive } from 'vue';
import { useRoute,useRouter } from 'vue-router';

// 接受路由参数，主要是id
const routes = useRoute()
const router = useRouter()
const query_id = routes.query.id

Object.prototype[Symbol.iterator] = function(){
    return Object.values(this)[Symbol.iterator]()       
} 
// 页面加载时显示user的默认信息
onMounted(()=>{
    axiosDR.get(`api/adm/getById?id=${query_id}`).then(res=>{
        if(!res.status){
            ElMessage.error(res.msg)
            return
        }

        // 对象结构左侧只能是变量，不能是对象的属性
        // {data.name, data.email, data.gender, data.remark} = res.data
        const { name, email, gender, remark } = res.data;
        data.name = name;
        data.email = email;
        data.gender = String(gender) ;
        data.remark = remark;

    }).catch(error=>{
        console.log(error);
    })
})

//数据
const data = reactive({
    name: '',
    password: '',
    email: '',
    gender: '0',
    remark: '',
})


// edit
const edit = ()=>{

    if(data.name ==''){
        ElMessage.error('名称不能为空')
        return 
    }

    if(data.password ==''){
        delete data.password //删除属性
    }

    // 获取参数
    data.id = query_id
    // 传给后端
    axiosDR.post('api/adm/edit', data).then(res=>{
        // 先判断http状态
        if(!res.status){
            ElMessage.error(res.msg)
            return 
        }

        ElMessage.success('edit成功啦!')
    }).catch(error=>{
        console.log(error);
    })
}

// back返回上一页
const back = ()=>{
    router.back()
    // router.go(-1)   作用一致
}
</script>
