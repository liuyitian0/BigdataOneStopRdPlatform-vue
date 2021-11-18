<template>
  <div class="wrrap"> 
    <div class="operate">
      <input class="banner_input1" type="text" v-model.trim="message" placeholder="请输入表名..." />
      <el-button class="banner_Btn1" @click="getLineagedata()"> 获取血缘 </el-button>
      <el-tooltip content="放大" effect="light">
        <el-button icon="el-icon-zoom-in" circle></el-button>
      </el-tooltip>
        <!-- <div class="tool" @click="mapZoom('+')" title="放大视图">
          <i class="el-icon-zoom-in"></i>
        </div>
        <div class="tool" @click="mapZoom('-')" title="缩小视图">
          <i class="el-icon-zoom-out"></i>
        </div>
        <div class="tool" @click="mapZoom()" title="重置视图">
          <i class="el-icon-full-screen"></i>
        </div> -->

      <el-tooltip content="缩小" effect="light">
        <el-button icon="el-icon-zoom-out"  @click="zoomin()" circle></el-button>
      </el-tooltip>
      <el-tooltip content="自动布局" effect="light">
        <el-button icon="el-icon-bangzhu" circle></el-button>
      </el-tooltip>
      <el-tooltip content="适应画布" effect="light">
        <el-button icon="el-icon-money" circle></el-button>
      </el-tooltip>
      <el-tooltip content="全屏" effect="light">
        <el-button icon="el-icon-full-screen" circle></el-button>
      </el-tooltip>
      <span class="span" >当前表: {{ tablabel }} </span>
    </div>
    <div>
      <div id="container"></div>
      <div ref="miniMapContainerRef" class="miniMap"></div>
    </div>
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
      graph: null,
      // ix: 700,
      // iy: 700,
    }
  },
  mounted(){
  },
  watch:{
    // tablabel:{
    //   immediate:true,
    //   handler(value){
    //     let tablabel=this.tablabel;
    //     if(tablabel.length() > 0){
    //      this.init(tablelable);
    //     }
    //   }
    // }
  },
  methods: {
    getLineagedata () {
      this.init(this.message);
      this.tablabel = this.message;
    },
    mapZoom(type) {
      if (type == '+') {
        this.graph.zoom(0.1)
        this.graph_zoom += 0.1
      } else if (type == '-') {
        this.graph.zoom(-0.1)
        this.graph_zoom -= 0.1
      } else {
        this.graph.zoom(
          this.graph_zoom <= 0 ? Math.abs(this.graph_zoom) : -this.graph_zoom
        )
        this.graph.centerContent() //画布居中
        this.graph_zoom = 0
      }
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
              container: document.getElementById('container'),
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
  }
}
</script>

<style scoped>
.wrrap {
  width: 100%;
  height: 100%;
  background-color:#ffffff;
}
.head {
  width: 100%;
  height: 58px;
  background-color: #ffffff;
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
  margin-left: 30px;
  margin-top: 10px;
  width: 300px;
  height: 36px;
  border-radius: 10px;
}
.span {
  margin-left: 300px;
  font-size:20px;
  font-weight: bold;
  color: green;
}
</style>