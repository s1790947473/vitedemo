<template>
    <!-- 工具栏 -->
    <el-button-group size="small">
        <el-button type="primary" @click="toolAdd">
            <el-icon><Plus /></el-icon>
        </el-button>

        <el-button type="primary" @click="toolEdit">
            <el-icon><Edit /></el-icon>
        </el-button>

        <el-button type="primary" @click="toolDel">
            <el-icon><Delete /></el-icon>
        </el-button>
    </el-button-group>

    <!-- 表格 -->
    <el-table :data="data.list" @selection-change="selectionChange" border>
        <!-- 多选框 -->
        <el-table-column type="selection" width="55" />

        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" width="200" />
        <el-table-column prop="url" label="网址" width="200" />
        <el-table-column prop="status" label="状态" width="80">
            <template #default="scope">
                <span v-if="scope.row.status === '1'" class="green">显示</span>
                <span v-else class="orange">隐藏</span>
            </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="create_time" label="日期" width="150" />

        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
                <el-button size="small" @click="del(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination layout=" prev, pager, next, jumper, total" :current-page="page" :page-size="pageSize" :total="total" @current-change="currentChange" />
</template>

<script setup>
import {ref, reactive, inject, onMounted, watch} from 'vue'
// 命名模块的导入，使用{}
import {usePage} from '@/stores/admin/article'
import { ElMessage, ElMessageBox } from 'element-plus'
import ArticleApi from '@/api/articleApi'
import { useRouter,useRoute } from 'vue-router'

const router = useRouter()
const pageStore = usePage()

const data = reactive({
    list:[]
    // list:[{id:1, title:'书名1111', url:'www.baidu.com', sort:'0', create_time: '2023-06-25'}]
})

// 接口参数
const page = ref(1)  // @param 当前页数
const total = ref(20) // @param 总记录数
// onMounted(()=>{
//     let pageSize = pageStore.pageSize
//     // let pageSize = Number(import.meta.env.VITE_PAGE_SIZE)
// })

let pageSize = Number(import.meta.env.VITE_PAGE_SIZE)  // @param 每页显示记录数，为什么放在env文件中
// let pageSize = pageStore.pageSize
// console.log(pageSize);

// 初始加载page内容
onMounted(()=>{
    funcPageList()
})
// page内容获取-封装
const funcPageList= ()=>{
    ArticleApi.getByList(page.value,pageSize).then((res)=>{
        // console.log(res);
        // 空数组情况，当删除最后一个数据
        if(res.data == null){
            total.value = 0
            data.list = []
            return 
        }
        if(!res.status) return 
        // 获取res
        data.list = res.data.list
        // console.log('res',res.data);
        // console.log('data',data);
        total.value - res.data.pages.total

    }).catch((error)=>{
        ElMessage.error('article获取异常')
        console.log('article获取异常',error);
    })
}

// 文章删除-一般方法
const _del= async (row)=>{
    // 确认删除
    await ElMessageBox.confirm('确认删除？','标题',{
        type: 'warning',
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel'
    }).then((resolve)=>{
        // 调用删除接口
        articleApi.del({id: row.id}).then((res)=>{
            if(!res.status) return 
            funcPageList
        }).catch((error)=>{
        ElMessage.error('article删除异常')
        console.log('article删除异常',error);
        })
    }).catch((error)=>{
        // 异常处理
    })
}
const funcDel = async(id)=>{
    try {
        await ElMessageBox.confirm('确认删除？','标题',{
        type: 'warning',
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel'
        })
        let res = await articleApi.del(id)
        // console.log(res);
        if (!res.status) {
            return 
        }
        // 重新获取数据，考虑该页只有1个数据和多个数据情况
        if(data.list.length === 1 && page.value >1){
            page.value -= 1
        }else if(page.value > 1 && data.list.length >1){
            funcPageList()
        }else{
            // 第1页
            funcPageList()
        }

    } catch (error) {
        ElMessage({
            type: 'warning',
            message: '删除异常'
        })
        console.log('article删除异常',error);
    }
}

//---编辑
const edit=(row)=>{
    router.push({ path:'/admin/article/edit', query:{id: String(row.id)} } )
}

//---文章删除-优化异步
const del = async (row)=>{
    funcDel(String(row.id))
}

//---多选框数据
let selectionArr = []
//---多选article
const selectionChange = (data)=>{
    // 重置
    selectionArr = []
    data.forEach((item)=>{
        selectionArr.push(item.id)
    })
}

//---编辑-工具栏(仍然是单挑数据操作)
const toolEdit = ()=>{
    if(selectionArr.length == 0){
        ElMessage.error("请勾选需要编辑记录")
        return
    }
    if(selectionArr.length != 1){
        ElMessage.error("请勾选单条记录")
        return
    }
    router.push({path:'/home/article/edit', query:{id:String(selectionArr)} })
}



// 多选删除
const toolDel = ()=>{
    if(selectionArr.length === 0 ){
        ElMessage.error('请勾选要删除的数据')
        return 
    }
    // 调用删除方法
    funcDel(String(selectionArr))
}


// 分页器
const currentChange = (newPage)=>{
    page.value = newPage
    // 优化为watch监听，业务解耦
    // funcPageList(page, pageSize)
    ElMessage(`当前页为${page.value}`)
}
watch(page,(newPage, oldPage)=>{
    if(newPage != oldPage){
        funcPageList(newPage, pageSize)
    }

})



</script>
