<template>
    <el-form label-width="80" style="width: 400px;" ref="articleAddRef" :model="data" :rules="rules">
        <el-form-item label="类别" prop="category_id">
            <el-select v-model="data.category_id" placeholder="请选择">
                <!-- :value="String(value.id)" 强制转换为字符串类型  -->
                <el-option v-for="value in category.list" :value="String(value.id)" :label="value.level_padding + value.name" :key="value.id" />
            </el-select>
        </el-form-item>

        <el-form-item label="标题" prop="title">
            <el-input v-model="data.title" placeholder="请填写标题" />
        </el-form-item>

        <el-form-item label="作者" prop="author">
            <el-input v-model="data.author" />
        </el-form-item>

        <el-form-item label="作者网站" prop="url">
            <el-input v-model="data.url" />
        </el-form-item>

        <el-form-item label="缩略图">
            <!-- https://element-plus.org/zh-CN/component/upload.html#api -->
            <el-upload :action="`${apiUrl}/api/article/uploadImg`"
                :before-upload="beforeUpload"  
                :on-success="uploadSuccess"
                :show-file-list="false" >
                <img v-if="data.thumbnail" :src="data.thumbnail" style="width: 180px;" />
                <el-icon v-else><Plus /></el-icon>
            </el-upload>
        </el-form-item>

        <el-form-item label="内容" style="width: 1000px;" prop="content">
            <!-- 原始textarea -->
            <!-- <el-input type='textarea' v-model='data.content' rows='4'></el-input> -->
            <div class="wangEditor">
                <!-- 原始富文本 -->
                <!-- <Toolbar class="toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" />
                <Editor class="content" v-model="data.content" :defaultConfig="editorConfig" @onCreated="editorInit" /> -->
                <Toolbar class="toolbar" :editor="editorRef" :defaultConfig="wangEditor.toolbarConfig" />
                <Editor class="content" v-model="data.content" :defaultConfig="wangEditor.editorConfig" @onCreated="editorInit" />
            </div>
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
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import {ref, reactive, onMounted,onBeforeUnmount, shallowRef} from 'vue'
import CategoryApi from '@/api/categoryApi';
import ArticleApi from '@/api/articleApi';
import TimeDR from '@/utils/time/timeutil';
import { ElMessage } from 'element-plus';
import {useCategory} from '@/stores/admin/category'
// wangeditor ---start
import "@wangeditor/editor/dist/css/style.css" // 导入 wangeditor 样式
import '@/assets/admin/css/wangEditor.css' //导入自定义样式
import wangEditor from '@/assets/admin/js/wangEditor.js' //导入自定义配置
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'  // 默认编辑器工具
// import { createEditor, createToolbar } from '@wangeditor/editor'   //自定义富文本配置


const editorRef = shallowRef() //shallowRef 仅提供一层浅层的响应性, 而 ref 那提供深层嵌套的响应性

// --- 创建默认富文本编辑器
/* const toolbarConfig = {}
const editorConfig = {} */

// 自定义富文本配置
// const editor = createEditor({selector: '#editor-container'})
// 创建工具栏
// const toolbar = createToolbar({editor,selector: '#toolbar-container'})

// 辑器初始化完成时的回调函数
const editorInit = (editor) => { 
        editorRef.value = editor
}
// 组件卸载时销毁编辑器
onBeforeUnmount(() => { 
    const editor = editorRef.value
    if (editor) {
        editor.destroy()
    }
})
// --- end

//---缩略图
const apiUrl = import.meta.env.VITE_API_URL
// 上传文件校验
const beforeupload = (file)=>{
    if (file.type !== 'image/jpeg') {
        ElMessage.error('请上传 jpg 格式图片')
        return false
    }

    if (file.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过2MB')
        return false
    }
    // 返回false或者 Promise 且被 reject，则停止上传。
    return true
}
// 上传成功
const uploadSuccess = (result)=>{
    data.thumbnail = apiUrl + "/" + result.data.filePath
}


// add数据，与数据库对应
const data = reactive({
    category_id:'',
    title:'',
    author:'',
    url:'',
    thumbnail:'',   // 缩略图
    sort:'',
    status:'',
})

// 下拉框，显示类别
const category = reactive({
    list:[],
})

// 获取全局的category状态
// 组件加载时获取类别数据
const initCategoryId = useCategory()
onMounted(()=>{
    // 接口请求数据
    CategoryApi.getAllById(initCategoryId.initCategoryId).then((res)=>{
        if(!res.status){
            ElMessage.error(res.msg)
            console.log(res);
            return
        }
        // 获取数据
        category.list = res.data
    }).catch((error)=>{
        ElMessage.error('类别获取异常')
        console.log('类别获取异常:',error);
    })
})


// add article表单提交,rules校验
const articleAddRef = ref()
const add = ()=>{
    // 可选：手动触发表单校验,设定rules
    articleAddRef.value.validate( (valid,fields)=>{
        if(!valid) return

        // 校验通过
        // ElMessage('校验通过')
        data.create_time = TimeDR.now()
        ArticleApi.add(data).then((res)=>{
            if(!res.status){
                ElMessage.error(res.msg)
                return
            }
            ElMessage.success('添加成功')
        }).catch((error)=>{
            ElMessage.error('添加失败')
            console.log('添加失败',error);
        })
    })

}
const rules ={
    category_id:[
        {required:true, message:'类别不可为空', trigger:'blur'},],
    title:[
        {required:true, message:'标题不可为空', trigger:'blur'},
        { min: 1, max: 10, message: "长度在1-10之间", trigger: "blur" },],
    author:[
        {required:true, message:'作者不可为空', trigger:'blur'}],
    url:[
        {required:true, message:'网站不可为空', trigger:'blur'}],
    sort:[
        {required:true, message:'排序不可为空', trigger:'blur'}],
}




//重置
const reset = () => {
    data.category_id = ''
    data.title = ''
    data.author = '邓瑞'
    data.url = 'dengruicode.com'
    data.thumbnail = ''
    data.content = ''
    data.sort = '0'
    data.status = '1'
}

// 富文本编辑


</script>
