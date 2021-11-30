<template>
  <el-container>
    <div class="navigation">
      <Navigation></Navigation>
    </div>
 
  <el-main>
    <div class="title">
       <h1>调度全息图</h1>
      <el-link class="href1" type="primary" href="http://10.30.64.240:12345/dolphinscheduler/ui/#/home" >进入调度系统</el-link>
    </div>
    <div id="c0">
      <div id="c1"> 调度任务概述
      </div>
      <div id="c2"> 调度运行时常/周
      </div>
      <div id="c3"> 任务错误列表
      </div>
    </div>

    <div class="c00">
      <div id="c4">  核心表数据量/表主键监控
    </div>
    </div>
    <div class="c00">
      <div id="c5"> 慢任务Top 10 (负责人)
      </div>
    </div>
    <div class="c000">
      <div id="c6"> 目前定时 Flow 列表
      </div>
      <div id="c7">
      </div>
      <div id="c8">
      </div>
      <div id="c9"> 排班调整
      </div>
    </div>
    <div>
      <div id="c10">
        <el-link type="primary" href="http://10.30.64.240:12345/dolphinscheduler/ui/#/home" >进入调度系统</el-link>
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
    this.initReport1();
    this.initReport5();
    this.initReport2();
    this.initReport4();
  },
  data () {
    return {
      data: [],
      resTablejson: {},
    };
  },
  methods: {
    initReport1 (){
     
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

    },
    initReport2 () {
      const Report2data = [{ year: '1991', value: 3 },
              { year: '1992', value: 4 },
              { year: '1993', value: 3.5 },
              { year: '1994', value: 5 },
              { year: '1995', value: 4.9 },
              { year: '1996', value: 6 },
              { year: '1997', value: 7 },
              { year: '1998', value: 9 },
              { year: '1999', value: 13 },
            ];
      const chart = new G2.Chart({
          container: 'c2',
          autoFit: true,
          height: 500,
        });
      chart.data(Report2data);
      chart.scale({
            year: {
              range: [0, 1],
            },
            value: {
              min: 0,
              nice: true,
            },
          });

      chart.tooltip({
          showCrosshairs: true, // 展示 Tooltip 辅助线
          shared: true,
        });

      chart.line().position('year*value').label('value');
      chart.point().position('year*value');

      chart.render();

    },
    initReport4 () {
        fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/d62448ea-1f58-4498-8f76-b025dd53e570.json',
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data:",data);
        const container = document.getElementById('c4');
        const s2DataConfig = {
          fields: {
            columns: ['province', 'city', 'type', 'price', 'cost'],
          },
          meta: [
            {
              field: 'province',
              name: '省份',
            },
            {
              field: 'city',
              name: '城市',
            },
            {
              field: 'type',
              name: '商品类别',
            },
            {
              field: 'price',
              name: '价格',
            },
            {
              field: 'cost',
              name: '成本',
            },
          ],
          data,
        };
        
        const s2Options = {
          width: 848,
          height: 418,
          showSeriesNumber: true,
        };
        const s2 = new S2.TableSheet(container, s2DataConfig, s2Options);

        s2.render();
      });

    },
    initReport5 () {
      const Report5data = [
          { type: '汽车', value: 34 },
          { type: '建材家居', value: 85 },
          { type: '住宿旅游', value: 103 },
          { type: '交通运输与仓储邮政', value: 142 },
          { type: '建筑房地产', value: 251 },
          { type: '教育', value: 367 },
          { type: 'IT 通讯电子', value: 491 },
          { type: '社会公共管理', value: 672 },
          { type: '医疗卫生', value: 868 },
          { type: '金融保险', value: 1234 },
        ];
        const chart = new G2.Chart({
          container: 'c5',
          autoFit: true,
          height: 500,
        });
        chart.data(Report5data);
        chart.scale({
          value: {
            max: 1400,
            min: 0,
            alias: ' ',
          },
        });
        chart.axis('type', {
          title: null,
          tickLine: null,
          line: null,
        });

        chart.axis('value', {
          label: null,
          title: {
            offset: 30,
            style: {
              fontSize: 16,
              fontWeight: 350,
            },
          },
        });
        chart.legend(false);
        chart.coordinate().transpose();
        chart
          .interval()
          .position('type*value')
          .size(26)
          .label('value', {
            style: {
              fill: '#8d8d8d',
            },
            offset: 10,
          });
        chart.interaction('element-active');
        chart.render();

    },
  } //methods
};
</script>

<style scoped>

.title {
  width: 99%;
  /* background-color: khaki; */
  display: flex;
}

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
   /* background-color: darkkhaki; */
   margin-top: 48px;
   width: calc(25%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c2 {
   margin-top: 48px;
   /* background-color:beige; */
   width: calc(50%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c3 {
   margin-top: 48px;
   background-color:coral;
   width: calc(25%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 400px;
}
#c4 {
   /* background-color: cornflowerblue; */
   margin-top: 88px;
   width: calc(50%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
   padding-left: 5px;
}


#c5 {
   /* background-color:mistyrose; */
   margin-top: 88px;
   width: calc(49%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c6 {
   margin-top: 58px;
   padding-left: 10px;
   background-color:darkturquoise;
   width: calc(25%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 230px;
}

#c7 {
   margin-top: 58px;
   background-color:dodgerblue;
   width: calc(25%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c8 {
   margin-top: 58px;
   background-color:lightskyblue;
   width: calc(25%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c9 {
   margin-top: 58px;
   background-color:rosybrown;
   width: calc(24%);
   height: 450px;
   float: left; 
   text-align:center;
   line-height: 230px;
}
#c10 {
   /* background-color:lightpink; */
   width: calc(100%);
   height: 90px;
   float: left;
   text-align: center;
   font-size: 48px;
   padding-top: initial;
   margin-bottom: 100px;
}
</style>  