// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    svgData: {}
  },

  mutations: {
    updateSvgData(state, data) {
      state.svgData = data;
    }
  },

  actions: {
    
    // 处理 WebSocket 数据的 action
    handleWebSocketData({ commit }, data) {
      commit('updateSvgData', data);
    }
  }
});
