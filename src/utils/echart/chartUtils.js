/**
 * 生成通用的 ECharts 配置函数
 * @param {string} chartType 图表类型 ('line' 或 'bar')
 * @param {string[]} categories X轴数据
 * @param {number[]} seriesData Y轴数据
 * @param {string} title 图表标题
 * @returns {object} ECharts option
 */
// 封装通用的 ECharts 配置函数
export function generateEChartOption({
  chartType,
  categories,
  seriesData,
  title,
}) {
  return {
    title: {
      text: title,
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    // legend
    // toobox
    // dataview封装
    feature: {
      dataView: {
        show: true,
        readOnly: false,
        lang: ["数据视图", "关闭", "导出Excel"],
        optionToContent: function (opt) {
          // 将echart转为html表格形式
          // 该函数可以自定义列表为table，opt是给我们提供的原始数据的obj。 可打印出来数据结构查看
          var axisData = opt.yAxis[0].data; //坐标轴
          var series = opt.series; //折线图的数据

          // 创建表格头
          var tdHeads =
            '<td style="margin-top:10px; padding: 10px 15px">时间</td>'; //表头
          var tdBodys = "";
          series.forEach(function (item) {
            tdHeads += `<td style="padding:5px 15px">${item.name}</td>`;
          });

          // 创建表格内容
          var table = `<table border="1px" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center" id="table-content"><tbody><tr>${tdHeads} </tr>`;
          for (var i = 0, l = axisData.length; i < l; i++) {
            for (var j = 0; j < series.length; j++) {
              if (series[j].data[i] == undefined) {
                tdBodys += `<td>${"-"}</td>`;
              } else {
                tdBodys += `<td>${series[j].data[i]}</td>`;
              }
            }
            table += `<tr><td style="padding: 15px 20px">${axisData[i]}</td>${tdBodys}</tr>`;

            tdBodys = "";
          }
          table += "</tbody></table>";
          return table;
          // 到此已经将echart数据转为html表格形式
        },
        // 将echart数据内容回传给echart配置选项
        contentToOption: function () {
          var XLSX = require("xlsx");
          // 获取表格 DOM
          var et = XLSX.utils.table_to_book(
            document.getElementById("table-content")
          ); //此处传入table的DOM节点,问题出在utils上
          console.log(et);

          // 将表格数据转换为 Excel
          let etout = XLSX.write(et, {
            bookType: "xlsx",
            bookSST: true,
            type: "array",
          });
          try {
            FileSaver.saveAs(
              new Blob([etout], {
                type: "application/octet-stream",
              }),
              "设计产量.xlsx"
            ); //trade-publish.xlsx 为导出的文件名
          } catch (e) {
            // console.log(e, etout);
          }
          return etout;
        },
      },
    },
    xAxis: {
      type: "category",
      data: categories,
      boundaryGap: chartType === "bar" ? true : false, // 柱状图需要间隔
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: title,
        type: chartType, // 根据传入的 chartType 控制图表类型
        data: seriesData,
        smooth: chartType === "line", // 折线图平滑
        barWidth: chartType === "bar" ? "50%" : undefined, // 柱状图宽度
      },
    ],
  };
}
