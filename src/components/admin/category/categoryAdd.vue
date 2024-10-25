<template>
    <el-dialog v-model="injectData.pageAdd" draggable>
    
        <el-form :model="data" label-width="80" :rules="rules" ref="categoryAddRef">
            <el-form-item prop="name" label="名称">
                <el-input v-model="data.name" placeholder="请输入名称"></el-input>
            </el-form-item>

            <el-form-item prop="sort" label="排序">
                <el-input v-model="data.sort"></el-input>
            </el-form-item>
    
            <el-form-item prop="status" label="状态">
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
import { toRefs,ref, reactive, inject, watchEffect, watch } from "vue";
import CategoryApi from "@/api/categoryApi";
import { ElMessage } from "element-plus";
import TimeDR from "@/utils/time/timeutil";

// inject category数据
const injectData = inject("provideDataKey");
// console.log('inject数据',injectData);   // 正常

// 获取更新父组件视图的方法
const injectFuncGetList = inject('provideFuncGetList')

// 监听inject数据的变化
// watchEffect(()=>{
//     console.log('inject数据更新了:', parentId, level );
// })

// 监听 provideData 的变化
/* watch(() => injectData.parentId, (newVal, oldVal) => {
  console.log(`parentId changed from ${oldVal} to ${newVal}`);
}) */

// 如果需要监听整个 provideData 对象的变化，也可以这样：
// 深度监听所有嵌套属性的变化
/* watch(injectData, (newVal, oldVal) => {
  console.log('injectData changed: ', newVal);
}, { deep: true });  */

// form数据
const data = reactive({
    name: "",
    sort: "0",
    status: "1",
});


// category添加实现
const categoryAddRef = ref(); // 存储form实例
const add = () => {
    // 校验form
    categoryAddRef.value.validate((valid, fields) => {
        // console.log('valid, fields',valid, fields);
        if (!valid) return;

        // 补充必需字段
        data.parent_id= injectData.parentId,
        data.level= injectData.level,
        data.create_time= TimeDR.now()
        // console.log('添加类别',data);

        // 校验通过则添加数据
        CategoryApi.add(data)
            .then((res) => {
                if (!res.status) {
                    console.log(res);
                    ElMessage.error(res.msg);
                    return;
                }
                ElMessage.success("添加成功");

                // 关闭dialog，刷新视图(父组件传递func)
                injectData.pageAdd = false
                injectFuncGetList()
            })
            .catch((error) => {
                console.log(error);
            });
    });
};

// prop关联校验规则
const rules = {
    // message是输出到控制台的
    name: [
        { required: true, message: "类别名称不能为空", trigger: "blur" },
        { min: 1, max: 10, message: "长度在1-10之间", trigger: "blur" },
    ],
    sort: [{ required: true, message: "不能为空", trigger: "blur" }],
    status: [{ required: true, message: "不能为空", trigger: "blur" }],
};
</script>
