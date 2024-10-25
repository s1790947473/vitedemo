import Mock from "mockjs";

//  模拟 ECharts 数据接口
Mock.mock("http://localhost:5173/mockApi/post", {
  chartType: "bar",
  data: [10, 20, 30, 40, 50],
});
