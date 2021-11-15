<template>
  <el-container>
    <div class="navigation">
      <Navigation></Navigation>
    </div>
    <el-main class="main">
 
      <div id="c1">
      </div>

      <div id="c2">
      </div>

    </el-main>
  </el-container>
</template>


<script>
import Navigation from './components/navigation.vue';

 
export default {
  components: {
    Navigation,
  },
  mounted(){

  //  const data = [
  //     { genre: 'Sports', sold: 275 },
  //     { genre: 'Strategy', sold: 115 },
  //     { genre: 'Action', sold: 120 },
  //     { genre: 'Shooter', sold: 350 },
  //     { genre: 'Other', sold: 150 }
  //   ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
  //   // Step 1: 创建 Chart 对象
  //   const chart = new G2.Chart({
  //     container: 'c1', // 指定图表容器 ID
  //     forceFit: true,
  //     width : 600, // 指定图表宽度
  //     height : 300 // 指定图表高度
  //   });
  //   // Step 2: 载入数据源
  //   chart.source(data);
  //   // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
  //   chart.interval().position('genre*sold').color('genre')
  //   // Step 4: 渲染图表
  //   chart.render();
 
//  const data = [
//   { year: '2021-11-10', 总任务量: 3 },
//   { year: '2021-11-11', 总任务量: 4 },
//   { year: '2021-11-12', 总任务量: 4 },
//   { year: '2021-11-13', 总任务量: 5 },
//   { year: '2021-11-14', 总任务量: 5 },
//   { year: '2021-11-15', 总任务量: 16 },

// ];
// const line = new Line('c1', {
//   data,
//   xField: 'year',
//   yField: '总任务量',
//   label: {},
//   point: {
//     size: 5,
//     shape: 'diamond',
//     style: {
//       fill: 'white',
//       stroke: '#5B8FF9',
//       lineWidth: 2,
//     },
//   },
//   tooltip: { showMarkers: false },
//   state: {
//     active: {
//       style: {
//         shadowBlur: 4,
//         stroke: '#000',
//         fill: 'red',
//       },
//     },
//   },
//   interactions: [{ type: 'marker-active' }],
// });
// line.render();


  },
  data () {
    return {
    };
  },
  methods: {
  }

};
</script>

<style scoped>
.main {
  background-color: rgb(245, 244, 244);
}


.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>  