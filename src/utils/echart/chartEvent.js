// 封装 ECharts 的事件处理
export function useEChartEvents(chartInstance, options = {}) {
  // 默认的事件回调函数
  const defaultHandlers = {
    click: (params) => {
      console.log("Clicked:", params);
    },
    mouseover: (params) => {
      console.log("Mouse Over:", params);
    },
  };

  // 使用传入的自定义事件处理程序，或者使用默认的
  const clickHandler = options.onClick || defaultHandlers.click;
  const mouseOverHandler = options.onMouseOver || defaultHandlers.mouseover;

  // 注册 ECharts 事件
  chartInstance.on("click", clickHandler);
  chartInstance.on("mouseover", mouseOverHandler);

  // 返回注销事件的函数（以便在组件销毁时调用）
  return () => {
    chartInstance.off("click", clickHandler);
    chartInstance.off("mouseover", mouseOverHandler);
  };
}
