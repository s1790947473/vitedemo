<template>
  <div>
    <h1>WebSocket 实时数据展示</h1>

    <h2>Numbers</h2>
    <ul v-for="(num,index) in data.numbers" :key=" 'number'+index">
      <li>
        {{num}}
      </li>
    </ul>

    <h2>letters</h2>
    <ul v-for="(letter,index) in data.letters" :key=" 'letter'+index">
      <li>
      {{letter}}
      </li>
    </ul>

    <h2>users</h2>
    <ul v-for="(user, index) in data.users" :key="user.id">
      <li>
{{user.name}} | {{user.age}}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 接收json数据
const data = ref({
  numbers: [],
  letters: [],
  users: []
});


const message = ref('等待接收数据...'); // 用于显示接收到的 WebSocket 数据
let socket;

// 1.创建 WebSocket 连接并处理消息
const connectWebSocket = () => {
  socket = new WebSocket('ws://localhost:8088'); // 连接到本地的 WebSocket 服务器

  socket.onopen = () => {
    console.log('WebSocket 连接成功');
  };

  socket.onmessage = (event) => {
    const receivedData = JSON.parse(event.data); // 解析接收到的 JSON 对象
    data.value = receivedData; // 更新页面显示的数据
  };

  socket.onclose = () => {
    console.log('WebSocket 连接已关闭');
  };

  socket.onerror = (error) => {
    console.error('WebSocket 发生错误:', error);
  };
};


// 在组件挂载时连接 WebSocket
onMounted(() => {
  connectWebSocket(); 
});


// 在组件卸载前关闭 WebSocket 连接
onBeforeUnmount(() => {
  if (socket) {
    socket.close(); 
  }
});
</script>
