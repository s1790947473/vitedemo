<template>
    <el-dialog v-model="navStore.data.navEdit" draggable @close="close" width="600" title="编辑导航">
        <el-form :model='data' label-width="80" ref="navEditRef" :rules="rules">
            <el-form-item label="名称" prop="name">
                <el-input v-model="data.name" placeholder="请填写名称" />
            </el-form-item>

            <el-form-item label="路径" prop="path">
                <el-input v-model="data.path" placeholder="请填写路径" />
            </el-form-item>

            <el-form-item label="图标" prop="icon">
                <el-input v-model="data.icon" />
            </el-form-item>

            <el-form-item label="排序" prop="sort">
                <el-input v-model="data.sort" />
            </el-form-item>

            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="data.status">
                    <el-radio value="1">显示</el-radio>
                    <el-radio value="0">隐藏</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="edit">编辑</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import {useNav} from '@/stores/admin/nav.js'
import { ElMessage,ElMessageBox } from 'element-plus'
import {ref, reactive, onUpdated} from 'vue'
import TimeDR from '@/utils/time/timeutil'
import navApi from '@/api/navApi'

const time = TimeDR
const navEditRef = ref()

//---nav add与edit的数据源
const navStore = useNav()
const data = reactive({
    name: '',
    path: '',
    icon: '',
    sort: '0',
    status: '1'
})

//---组件更新时，自动获取对应数据
onUpdated(()=>{
    //优化：只在组件显示时启用
    if(!navStore.data.navEdit ) return 

    navApi.getById(navStore.data.id).then((res)=>{
        if(!res.status){
            ElMessage.error(res.msg)
            return
        }
        //简单数据，分别赋值
        // data.name  =res.data.name
        // data.path  =res.data.path
        // data.icon  =res.data.icon
        // data.sort  =res.data.sort
        // data.status  =res.data.status
        //方法2复杂数据assign
        Object.assign(data, res.data)
    }).catch(err => {
        ElMessage.error('编辑数据获取失败')
        console.log("编辑数据获取失败:", err)
    }) 
})

//---edit
const edit=()=>{
    navEditRef.value.validate((valid,fields)=>{
        if(!valid) return 

        let values={
            name: data.name,
            id:  navStore.data.id.toString(),
            icon: data.icon,
            sort: data.sort,
            status: data.status,
            update_time: time.now()
        }
        navApi.edit(values).then((res)=>{
            if(!res.status){
                ElMessage.error(res.msg)
                return
            }
            ElMessage.success('导航数据编辑成功')
            //关闭组件显示，更新数据
            navStore.data.navEdit = false
            navStore.getNavList(navStore.data.parentId)
        }).catch(err => {
            ElMessage.error('编辑数据失败')
            console.log("编辑数据失败:", err)
        }) 
    })




}

const close=()=>{
    navStore.data.navEdit = false
}

const rules = {
    name: [
        { required: true, message: "导航名称不能为空", trigger: "blur" },
        { min: 1, max: 10, message: "长度在1-10之间", trigger: "blur" },],
    path: [
    ],
    icon: [
    ],
    sort:[
    ],
    status:[
    ],
}
</script>
