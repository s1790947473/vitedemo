<template>
    <div>
        <!-- 使用props把实时数据分发给子组件 -->
        <pure class="fullScreen" v-if="fullPure" v-on:click.native="fullCancel('pure')" :data="svgData.pure"></pure>
    </div>
</template>


export default {
  data() {
    return {
      fullPure: false,        // 控制 pure 组件的显示
      svgData: {}             // 存储来自 WebSocket 的数据
    };
  },

  mounted() {
    this.initWebSocket();
  },


  methods: {
    // 1.初始化 WebSocket 连接
    initWebSocket() {
      const socket = new WebSocket('ws://your-backend-server');
      
      // 2.socket接收数据
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleDataUpdate(data);

        // 2.2使用vuex分发数据
        this.$store.dispatch('handleWebSocketData', data);
      };

    },
    
    // 3.处理接收到的数据
    handleDataUpdate(data) {
      this.svgData = data;            // 将获取到的数据存储在 svgData 中
    },

    fullCancel(view) {                // 取消全屏
      this[view] = false;
    }
  }
};
