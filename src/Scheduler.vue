<template>
  <el-container>
    <div class="navigation">
      <Navigation></Navigation>
    </div>
 
  <el-main>
    <h1>调度全息图</h1>
    <el-divider></el-divider>

    <div id="c0">
      <div id="c1">
      </div>
      <div id="c2">
      </div>
      <div id="c3">
      </div>
      <div id="c4">
      </div>
    </div>
    <!-- <el-divider>aaa</el-divider> -->

    <div>
      <div id="c5">
      </div>
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
    this.initReport();
  },
  data () {
    return {
      data: [],
    };
  },
  methods: {
    initReport (){
     
      const chartdata = [
        { item: '总任务', count: 40, percent: 0.4 },
        { item: '昨新增', count: 21, percent: 0.21 },
        { item: '昨下线', count: 17, percent: 0.17 },
        { item: '成功', count: 13, percent: 0.13 },
        { item: '失败', count: 9, percent: 0.09 },
      ];

      const chart = new G2.Chart({
        container: 'c1',
        autoFit: true,
        height: 500,
        
      });

      chart.data(chartdata);

      chart.coordinate('theta', {
        radius: 0.85
      });

      chart.scale('percent', {
        formatter: (val) => {
          val = val * 100 + '%';
          return val;
        },
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart.axis(false); // 关闭坐标轴
      const interval = chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', {
          offset: -40,
          style: {
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
            fill: '#fff',
          },
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent,
          };
        })
        .style({
          lineWidth: 1,
          stroke: '#fff',
        });
      chart.interaction('element-single-selected');
      chart.render();

      // 默认选择
      // interval.elements[0].setState('selected', true);

    }
  } //methods
};
</script>

<style scoped>

 h1 {
    font-size: 28px;
    text-align: center;
    letter-spacing: 2px;
    margin: 5px auto;
    };

#c0 {
  width: 100%;
  height: 100%;
  float: left;
}

#c1 {
   background-color: darkkhaki;
   width: calc(25%);
   height: 400px;
   float: left;

}
#c2 {
   background-color:darkcyan;
   width: calc(25%);
   height: 400px;
   float: left;

}
#c3 {
   background-color:coral;
   width: calc(25%);
   height: 400px;
   float: left;

}
#c4 {
   background-color:goldenrod;
   width: calc(25%);
   height: 400px;
   float: left;
}

#c5 {
   background-color:darkseagreen;
   width: calc(25%);
   height: 400px;
   float: left;
}
 
</style>  