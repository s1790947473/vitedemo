
<template>
   <div class="header">
       <div class="title">
           <div class="logo">
              <el-icon><MostlyCloudy /></el-icon>
           </div>
           <div class="text">
              <a href="/admin">阿文编程</a>
           </div>
       </div>

       <div class="info">
           <div class="admin">
               <div class="name">
                  <span>{{adminStore.data.name}}</span><el-icon><Bell /></el-icon>
              </div>
               <div class="logout" @click="logout">
                  退出
              </div>
           </div>
       </div>
   </div>
</template>


<script setup>
import {useAdminStore} from '@/stores/admin/admin'
import { useRouter } from 'vue-router';
import Localstorage from '@/utils/localstorage/Localstorage';


const router = useRouter()
const adminStore = useAdminStore()

const logout = ()=>{
    Localstorage.remove('admin')
    router.push('/login')
}

</script>
