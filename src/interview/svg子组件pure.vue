<template>
  <div>
    <svg>
      <circle :cx="data[0]" :cy="data[1]" :r="data[2]"></circle>
      <!-- 使用传递的数据来更新 SVG -->
    </svg>
  </div>
</template>

<script>
export default {
  // 接收父组件传递的实时数据
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  // 使用后vuex获取子组件数据
  computed: {
    ...mapState({
      data: state => state.svgData.pure
    })
  },

  // 监听子组件内数据变化
  watch: {
    data(newData) {
      this.updateSvg(newData);
    }
  },


  methods: {
    updateSvg(data) {
      // 根据传入的 data 更新 SVG 的状态
      console.log('Updating SVG with data:', data);
      // 假设 SVG 中某个元素要反映 data 数组中的值
      // 可以使用 document.querySelector 或 Vue 模板绑定更新
    }
  }
};
</script>
