<template>
  <div class="wrrap"> 

    <el-tabs type="border-card" v-model="activeName"  style="height: 100%;" >
      <el-tab-pane label="表血缘" name="first" style="height: 100%;" > 
        <input class="banner_input1" type="text" v-model.trim="message" placeholder="表名..." />
        <el-button class="banner_Btn1" @click="getTabLineagedata()"> 获取血缘 </el-button>
        <el-tooltip content="放大" effect="light">
          <el-button icon="el-icon-zoom-in" circle></el-button>
        </el-tooltip>
        <el-tooltip content="缩小" effect="light">
          <el-button icon="el-icon-zoom-out"  @click="zoomin()" circle></el-button>
        </el-tooltip>


        <i class="el-icon-location"> {{ tablabel }}</i>
        
        <div>
          <div id="container1"></div>
          <div ref="miniMapContainerRef" class="miniMap"></div>
        </div>
      </el-tab-pane>
       
      <el-tab-pane label="字段血缘" name="second" style="height: 100%;"> 
        <input class="banner_input1" type="text" v-model.trim="tab" placeholder="表名..." />
        <input class="banner_input1_col" type="text" v-model.trim="col" placeholder="字段列..." />

        <el-select ref='selectLable' v-model="value" placeholder="选择上下游">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-button class="banner_Btn1" @click="getColLineagedata(tab,col)"> 获取血缘 </el-button>
        <!-- <el-tooltip content="放大" effect="light">
          <el-button icon="el-icon-zoom-in" circle></el-button>
        </el-tooltip>
        <el-tooltip content="缩小" effect="light">
          <el-button icon="el-icon-zoom-out"  @click="zoomin()" circle></el-button>
        </el-tooltip> -->


        <i class="el-icon-location"> {{ tab }}.{{ col }} </i>
        <div>
          <div id="container2"></div>
          <div ref="miniMapContainerRef" class="miniMap"></div>
        </div>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>

import { GetDataGraph } from '@/utils/GetDataGraph';
import { DagreLayout } from '@antv/layout';

export default {
  name: "index",
  props: ['tablabel'],
  data(){
    return{
      message: null,
      jsondata: [],
      node: [],
      edge: [],
      alldata:{},
      resdata:{},
      activeName: '',
      tab: null,
      col: null,
      value: '选项1',
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
    }
  },
  created() {
    this.activeName = "first"
  }, 
  mounted(){
  },
  methods: {
    getTabLineagedata () {
      this.init(this.message);
      this.tablabel = this.message;
    },
    getColLineagedata (tab,col) {
      this.canvnsCol(this.tab,this.col,this.$refs.selectLable.selected.label);
      // console.log("slabel",this.$refs.selectLable.selected.label)
    },
    init(tablelable) {
      this.alldata = {}; this.node = [];  this.edge = []; this.jsondata = [];
      this.graph = {}; this.miniMapContainerRef = null; this.newModel = {};
      //调用公共方法,获取单个表的数据
      this.jsondata = require('../../public/data/base.json');
      this.jsondata.forEach((item,index)=>{
        if (item.name === tablelable) {
          this.resdata = item.value ;
          this.resdata.forEach( (subitem,index) => {
          this.node.push(GetDataGraph(subitem.s,subitem.t)[0]);
          this.edge.push(GetDataGraph(subitem.s,subitem.t)[1]);
          });
        }
      });
      this.alldata.nodes=this.node;
      this.alldata.edges=this.edge;
      if(this.alldata.nodes.length != 0) {
        const miniMapContainerRef = this.$refs.miniMapContainerRef;
        const graph = new X6.Graph({
              container: document.getElementById('container1'),
              width: 4600,
              height: 4600,
              snapline: true,
              background: {
                color: '#ffffff',
              },
              grid: {
                size: 10,      // 网格大小 10px
                visible: true, // 渲染网格背景
              },
              scroller: {
                enabled: true,
                pageVisible: true,
                pageBreak: true,
                pannable: true,
              },
              minimap: {
                enabled: true,
                container: miniMapContainerRef,
              },
              // rotating: {
              //   enabled: true, // 是否开启节点旋转
              //   grid: 45 // 每次旋转15度
              // },
        });

        const dagreLayout = new DagreLayout({
          type: 'dagre',
          rankdir: 'LR',
          align: 'UR',
          ranksep: 100,
          nodesep: 20,
          controlPoints: true,
        });
        const newModel = dagreLayout.layout(this.alldata);
        
        graph.fromJSON(newModel);
        // graph.centerContent()
        // graph.centerContent({ padding: { rigth: 100 }})
        // graph.centerContent();
        // console.log("alldata:",this.alldata)
      } //if
    },
    canvnsCol(tab,col,selectlabel) {
      this.alldata = {}; this.node = [];  this.edge = []; this.jsondata = [];this.resdata = {};
      this.graph = {}; this.miniMapContainerRef = null; this.newModel = {};
      //调用公共方法,获取单个表的数据
      this.jsondata = require('../../public/data/tab_col.json');
      this.jsondata.forEach((item,index)=>{
        
        if(item.name === tab && selectlabel === '上游') {
          this.resdata = item.up ;
        } else {
          this.resdata = item.down;
        };
        // console.log('selectlabel',selectlabel);
        // console.log('resdata',this.resdata);
        this.resdata.forEach( (subitem,index) => {
          this.node.push(GetDataGraph(subitem.s,subitem.t)[0]);
          this.edge.push(GetDataGraph(subitem.s,subitem.t)[1]);
        });

      });
      // this.alldata.nodes=this.node;
      // this.alldata.edges=this.edge;
      // if(this.alldata.nodes.length != 0) {
      //   const miniMapContainerRef = this.$refs.miniMapContainerRef;
      //   const graph = new X6.Graph({
      //         container: document.getElementById('container2'),
      //         width: 4600,
      //         height: 4600,
      //         snapline: true,
      //         background: {
      //           color: '#ffffff',
      //         },
      //         grid: {
      //           size: 10,      // 网格大小 10px
      //           visible: true, // 渲染网格背景
      //         },
      //         scroller: {
      //           enabled: true,
      //           pageVisible: true,
      //           pageBreak: true,
      //           pannable: true,
      //         },
      //         minimap: {
      //           enabled: true,
      //           container: miniMapContainerRef,
      //         },
      //   });

      //   const dagreLayout = new DagreLayout({
      //     type: 'dagre',
      //     rankdir: 'LR',
      //     align: 'UR',
      //     ranksep: 100,
      //     nodesep: 20,
      //     controlPoints: true,
      //   });
      //   const newModel = dagreLayout.layout(this.alldata);
        
      //   graph.fromJSON(newModel);
      // } //if
    },

  }
}
</script>

<style scoped>
.wrrap {
  width: 100%;
  height: 100%;
  background-color:#ffffff;
}
.miniMap {
  position: fixed;
  z-index: 999;
  bottom: 35px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  width: 240px;
}

.banner_Btn1 {
  margin-left: 30px;
}
.banner_input1 {
  margin-left: 10px;
  margin-top: 5px;
  width: 280px;
  height: 36px;
  border-radius: 10px;
}
.banner_input1_col {
  margin-left: 10px;
  margin-top: 5px;
  width: 150px;
  height: 36px;
  border-radius: 10px;
}

.el-icon-location {
  margin-left: 200px;
  font-size: 20px;
  font-weight: bold;
  color: green;
}
.el-select {
  margin-left:10px;
  width: 126px;
}
</style>