<template id="statement.vue" >
  <div>
    <div
      id="dishNumByCategory"
      style=" width: 500px; height: 350px; float:left;margin-left:50px;}"
    ></div>
    <div
      id="priceRange"
      style=" width: 500px; height: 350px; float:left; margin-left:50px;}"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      priceRange: {
        title: { text: "菜品价格区间",left: "center" },
        tooltip: {},
        xAxis: {
          data: ["0~20元", "20~50元", "50~100元", "100元以上"],
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data: [],
          },
        ],
      },
      dishNumByCategory: {
        title: {
          text: "按分类统计菜品数量",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {

            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getPriceRange();
    this.getDishNumByCategory();
  },
  methods: {
    getPriceRange() {
      this.$http
        .get("http://localhost:8081/dish/priceRange")
        .then((res) => {
          this.priceRange.series[0].data = res.data.data.range;
          let myChart = this.$echarts.init(
            document.getElementById("priceRange")
          );
          myChart.setOption(this.priceRange);
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
    getDishNumByCategory() {
      this.$http
        .get("http://localhost:8081/category/dishNumByCategory")
        .then((res) => {
          this.dishNumByCategory.series[0].data = res.data.data.dishNumByCategory;
          let myChart = this.$echarts.init(
            document.getElementById("dishNumByCategory")
          );
          myChart.setOption(this.dishNumByCategory);
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
      
    },
  },
};
</script>
