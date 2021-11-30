<template>

      <div id="c4">  核心表数据量/表主键监控
      </div>
 
    
</template>


<script>
import { DagreLayout } from '@antv/layout';
import { GetColRectDataGraph,GetColEdgeDataGraph } from '@/utils/GetColDataGraph';


const LINE_HEIGHT = 24
const NODE_WIDTH = 150

export default {
  data(){
    return {
      jsondata:[],
      value: '选项2',
      selectLable: [],
      options:[
        {
          value: '选项1',
          label: '下游'
        }, {
          value: '选项2',
          label: '上游'
        }
      ],
      abc: [],
    }
  },
  mounted () {
    this.initReport4();
  },
  methods : {
      initReport4 () {
          // 'https://gw.alipayobjects.com/os/bmw-prod/d62448ea-1f58-4498-8f76-b025dd53e570.json',
        // const abc = require('../public/data/aaa.json');
        //     console.log("abc:",abc);
        //     const container = document.getElementById('c4');
        //     const s2DataConfig = {
        //       fields: {
        //         columns: ['province', 'city', 'type', 'price', 'cost'],
        //       },
        //       meta: [
        //         {
        //           field: 'province',
        //           name: '省份',
        //         },
        //         {
        //           field: 'city',
        //           name: '城市',
        //         },
        //         {
        //           field: 'type',
        //           name: '商品类别',
        //         },
        //         {
        //           field: 'price',
        //           name: '价格',
        //         },
        //         {
        //           field: 'cost',
        //           name: '成本',
        //         },
        //       ],
        //       abc,
        //     };
            
        //     const s2Options = {
        //       width: 600,
        //       height: 480,
        //       showSeriesNumber: true,
        //     };
        //     const s2 = new S2.TableSheet(container, s2DataConfig, s2Options);

        //     s2.render();
 
           
 
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
      width: 700,
      height: 400,
      showSeriesNumber: true,
    };
    const s2 = new S2.TableSheet(container, s2DataConfig, s2Options);

    s2.render();
  });


      // // let resTablejson = require('../public/data/table.json');
      // let resTablejson = [{"tablename":"abc","tab_num":"23000","tab_key":"bk_id","day_inc_num":"1000"}];
      // console.log('resTablejson:',resTablejson);
      // const container = document.getElementById('c4');
      // const s2DataConfig = {
      //     fields: {
      //       columns: ['tablename', 'tab_num', 'tab_key', 'day_inc_num'],
      //     },
      //     meta: [
      //       {
      //         field: 'tablename',
      //         name: '表名',
      //       },
      //       {
      //         field: 'tab_num',
      //         name: '数据量',
      //       },
      //       {
      //         field: 'tab_key',
      //         name: '该表主键',
      //       },
      //       {
      //         field: 'day_inc_num',
      //         name: '昨日新增量',
      //       }
      //     ],
      //     resTablejson,
      //   };
      // const s2Options = {
      //     width: 850,
      //     height: 400,
      //     showSeriesNumber: true,
      //   };
      //   const s2 = new S2.TableSheet(container, s2DataConfig, s2Options);
      //   s2.render();
  }
}
}
</script>


<style scoped>
 #c4 {
   background-color: cornflowerblue;
   margin-top: 88px;
   width: calc(60%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
   padding-left: 5px;
}

</style>