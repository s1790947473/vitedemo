<script setup>
  import { ref, reactive,provide,onMounted } from "vue";
  import Header from "./components/header.vue";
  import Footer from "./components/footer.vue";
  import Nimingslot  from './components/nimingslot.vue' 
  import Jumingslot from './components/jumingslot.vue'
  import ZuoyongyuSlot from "./components/zuoyongyuSlot.vue";
  import {useWebStore} from '../src/stores/web'

  const web = reactive({
    name: 'hhhh',
    url: 'hhhh.com'
  })

  const user = ref(0)

  // 子传父
  const emitGetweb = (data)=>{
  //  console.log(data)  获得子组件传参
    web.name = data.name
    web.url = data.url
  }
  const emitsUserAdd = (data)=>{
    user.value += data
  }

  // 
  const userAdd = ()=>{
    user.value += 11
  }

  // 跨层级
  provide('provideWeb', [web, user])
  provide('provideFuncUserAdd', userAdd)



  // eventBus事件总线，第三方库
  const eventBus = reactive({
  events: {},
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
});

  //pinia仓库
  const webStore = useWebStore()

</script>


<template>
  <Header name="szw" url="szw.com"></Header>
  <Footer @getweb="emitGetweb" @userAdd="emitsUserAdd"></Footer>
  {{web.name}} - {{web.url}}
  <!-- 如果使用JS访问user的值，就要用.valus，在vue视图中访问时，vue会自动解包，就不用。value了 -->
  {{user}}
  <hr>匿名插槽
  <Nimingslot>
    <p>这是匿名插槽内容</p>
  </Nimingslot>
    <hr>具名插槽
    <Jumingslot>
      <template v-slot:url>
        <!-- <template #:url>  简写形式-->  
        <p>这是具名插槽</p>
      </template>
    </Jumingslot>

    <hr>作用域插槽
    <ZuoyongyuSlot>
      <template #url="data">
        {{data.title}}
      </template>
    </ZuoyongyuSlot>

    <hr>pinia仓库<br>
    url：&nbsp;{{webStore.web.url}} <br>
    user: {{webStore.users}} <br>
    <button @click="webStore.userAdd">添加用户</button>
</template>

<style scoped></style>
