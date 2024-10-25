<template>
    <el-dialog v-model="navStore.data.navAdd" draggable @close="close" width="600" title="添加导航">
        <el-form :model='data' label-width="80" ref="navAddRef" :rules="rules">
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
                <el-button type="primary" @click="add">添加</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import {useNav} from '@/stores/admin/nav.js'
import { ElMessage,ElMessageBox } from 'element-plus'
import {ref, reactive} from 'vue'
import TimeDR from '@/utils/time/timeutil'
import navApi from '@/api/navApi'

const time = TimeDR
const navAddRef = ref()

//---nav add与edit的数据源
const navStore = useNav()
const data = reactive({
    name: '',
    path: '',
    icon: '',
    sort: '0',
    status: '1'
})

//---add方法
const add = ()=>{
    //表单先校验
    navAddRef.value.validate((valid,fields)=>{
        if(!valid) return 
        // 设定nav具体数据
        let values = {
            parent_id: navStore.data.parentId,
            level:navStore.data.level,
            name: data.name,
            path: data.path,
            icon: data.icon,
            sort: data.sort,
            status: data.status,
            create_time: time.now()
        }

        // 添加api
        navApi.add(values).then((res)=>{
            if(!res.status){
                ElMessage.error(res.msg)
                return
            }  
            // add成功后关闭组件，父组件视图数据刷新
            ElMessage.success('导航添加成功')
            navStore.data.navAdd = false
            navStore.getNavList(values.parent_id )
        }).catch((err)=>{
            ElMessage.error('导航添加失败')
            console.log('导航添加失败:',err);
        })

    })
}

//---close时data清除，防止下一次add时保留上一次的数据
const close = () => { //关闭对话框
        data.name = ''
        data.path = ''
        data.icon = ''
        data.sort = '0'
        data.status = '1'
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
