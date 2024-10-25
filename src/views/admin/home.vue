<template>
    <div class="dr-home">/
    <Homeheader></Homeheader>
      <div class="main">
        <div class="side">
          <Homeside></Homeside>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!--  使用命名路由时
  <div class="left">
            <router-view name='add'></router-view>
          </div>
          <div class="right">
            <router-view name='list'></router-view>
          </div> 
        -->

        <!-- <div class="dr-home">
        <Homeheader />

        <div class="main">
            <Homeside />

            <div class="content">
                <router-view />
            </div>
        </div>        
    </div> -->
</template>

<script setup>
import '@/assets/admin/css/home.css' 
import Homeside from '@/components/admin/home/homeside.vue'
import Homeheader from '@/components/admin/home/homeheader.vue';

</script>
