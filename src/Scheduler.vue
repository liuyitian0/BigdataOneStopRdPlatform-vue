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
      <div id="c3"> 错误任务
      </div>
    </div>

    <div class="c00">
      <div id="c5"> 慢任务Top 10 (负责人)
      </div>
    </div>
    <div class="c00">
      <div id="c4">  核心表数据量/表主键监控
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
    this.initReport2();
    this.initReport3();
    this.initReport4();
    this.initReport5();
  },
  data () {
    return {
      data: [],
      resTablejson:Promise,
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
      const Report2data = [
              { year: '2021/05', value: 4 },
              { year: '2021/06', value: 14 },
              { year: '2021/07', value: 15 },
              { year: '2021/08', value: 26 },
              { year: '2021/09', value: 29 },
              { year: '2021/10', value: 32 },
              { year: '2021/11', value: 38 },
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
    initReport3 () {
      const Report3data = [
          { type: 'dw_zssys_web_clm_bank', value: 35000},
          { type: 'mdp_claim_clmntf_clmreg', value: 35000},
          { type: 'mdp_jg_ffmxb', value: 35000},
          { type: 'dw_cshop_rbac_user', value: 35000},
          { type: 'dw_zsclm_c_diagnose', value: 35000},
          { type: 'dcl_wxc_cshop_activity_excel_reward', value: 35000},
          { type: 'mdp_jg_east_bdxsryglb', value: 35000},
          { type: 'dcl_wxc_cshop_token_user_ext_info', value: 35000},
          { type: 'dw_zszfb_web_ply_day', value: 35000},
          { type: 'mdp_jg_east_zcxxb', value: 35000 }
        ];
 
    const chart = new G2.Chart({
          container: 'c3',
          autoFit: true,
          height: 400,
          padding: [20, 0, 50, 250],
        });
        chart.data(Report3data);
        chart.scale({
          value: {
            max: 50000,
            min: 0,
            alias: ' ',
          },
        });
        // chart.axis('name', {
        //   tickLine: null,
        //   line: null,
        // });
        chart.axis('value', {
          label: null,
          title: {
            offset: 30,
            style: {
              fontWeight: 60,
              fontSize: 12,
            },
          },
          grid: null,
        });
        chart.legend(false);
        chart.coordinate('rect').transpose();
        chart
          .interval()
          .position('type*value')
          .color('#FF0000')
          .size(26)
          // .label('value', {
          //   style: {
          //     fill: '#8d8d8d',
          //   },
            // offset: 10,
            // content: (originData) => {
            //   return (originData.value + '').replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            // },
          // });

        // chart.annotation().text({
        //   top: true,
        //   position: ['椅子', 'min'],
        //   content: '家具',
        //   style: {
        //     fill: '#c0c0c0',
        //     fontSize: 12,
        //     fontWeight: '300',
        //     textAlign: 'center',
        //   },
        //   offsetX: -70,
        //   rotate: Math.PI * -0.5
        // });
        // chart.annotation().text({
        //   top: true,
        //   position: ['电话', 'min'],
        //   content: '技术',
        //   style: {
        //     fill: '#c0c0c0',
        //     fontSize: 12,
        //     fontWeight: '300',
        //     textAlign: 'center',
        //   },
        //   offsetX: -70,
        //   rotate: Math.PI * -0.5
        // });
        // chart.annotation().text({
        //   top: true,
        //   position: ['笔', 'min'],
        //   content: '办公用品',
        //   style: {
        //     fill: '#c0c0c0',
        //     fontSize: 12,
        //     fontWeight: '300',
        //     textAlign: 'center',
        //   },
        //   offsetX: -70,
        //   rotate: Math.PI * -0.5
        // });
        // chart.annotation().line({
        //   start: ['-20%', '33.2%'],
        //   end: ['100%', '33.2%'],
        //   style: {
        //     stroke: '#c0c0c0',
        //     lineDash: [2, 2],
        //   },
        // });
        // chart.annotation().line({
        //   start: ['-20%', '66.8%'],
        //   end: ['100%', '66.8%'],
        //   style: {
        //     stroke: '#c0c0c0',
        //     lineDash: [2, 2],
        //   },
        // });
        chart.interaction('element-active');

        chart.render();

    },
    initReport4 () {
      // fetch('https://gw.alipayobjects.com/os/bmw-prod/d62448ea-1f58-4498-8f76-b025dd53e570.json')
      // .then((res) => res.json())
      // .then((data) => {
      //   console.log("data:",data);

      let resTablejson = require('../public/data/abc.json');
       console.log('resTablejson:',resTablejson);

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
          resTablejson,
        };
        
        const s2Options = {
          width: 848,
          height: 418,
          showSeriesNumber: true,
        };
        const s2 = new S2.TableSheet(container, s2DataConfig, s2Options);

        s2.render();
      // });


    },
    initReport5 () {
      const Report5data = [
          { type: 'dw_zssys_web_clm_ply_base(乔峰)', value: 34 },
          { type: 'dw_zssys_web_ply_ent_tgt_01(奥巴马)', value: 85 },
          { type: 'dw_zssys_web_prd_prod(灭霸)', value: 103 },
          { type: 'dw_zssys_web_ply_ent_tgt_obj_noact(小新)', value: 142 },
          { type: 'dw_zszfb_web_ply_day(张无忌)', value: 251 },
          { type: 'mdp_channel_salesperson_basic(郭靖)', value: 367 },
          { type: 'mdp_vhlobj_renewal_already(令狐冲)', value: 491 },
          { type: 'mdp_jg_zyyxsxzrxzyyxbdkzxxb(风青杨)', value: 672 },
          { type: 'dcl_cem_t_cem_bill_detaildata(东方不败)', value: 868 },
          { type: 'dcl_east_typ_basecode(逍遥子)', value: 1234 },
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
   width: calc(35%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c2 {
   margin-top: 48px;
   /* background-color:beige; */
   width: calc(35%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c3 {
   margin-top: 50px;
   /* background-color:coral; */
   width: calc(30%);
   height: 460px;
   float: left;
   text-align: center;
   line-height: 30px;
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