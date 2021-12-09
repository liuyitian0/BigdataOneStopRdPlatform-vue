<template>
  <div class="wrrap"> 

    <el-tabs type="border-card" v-model="activeName"  style="height: 100%;width: 100%">
      <el-tab-pane label="表血缘" name="first"  > 
        <input class="banner_input1" type="text" v-model.trim="message" placeholder="表名..." />
        <el-button  type="primary" class="banner_Btn1" @click="getTabLineagedata()"> 查看血缘 </el-button>
        <!-- <el-tooltip content="放大" effect="light">
          <el-button icon="el-icon-zoom-in" circle></el-button>
        </el-tooltip>
        <el-tooltip content="缩小" effect="light">
          <el-button icon="el-icon-zoom-out"  @click="zoomin()" circle></el-button>
        </el-tooltip> -->


        <i class="el-icon-location"> {{ tablabel }}</i>
        
        <div>
          <div id="container1"></div>
          <div ref="miniMapContainerRef" class="miniMap"></div>
        </div>
      </el-tab-pane>
       
      <el-tab-pane  label="字段血缘" name="second" > 
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

        <el-select ref='selectLevel' v-model="value_level" placeholder="选择层级">
          <el-option
            v-for="item in options_level"
            :key="item.value_level"
            :label="item.label_level"
            :value="item.value_level">
          </el-option>
        </el-select>

        <el-button type="primary" class="banner_Btn1" @click="getColLineagedata(tab,col)"> 查看血缘 </el-button>
        <i class="el-icon-location"> {{ tab }}.{{ col }} </i>

        <div >
          <div id="container2">
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane  label="补录/纠正" name="third" > 功能待上线中 ...
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import axios from "axios";
import { GetDataGraph } from '@/utils/GetDataGraph';
import { DagreLayout } from '@antv/layout';
import { GetColRectDataGraph,GetColEdgeDataGraph } from '@/utils/GetColDataGraph';

const LINE_HEIGHT = 32
const NODE_WIDTH = 300

export default {
  name: "index",
  props: ['tablabel'],
  data(){
    return{
      message: null,
      jsondata: [],
      jsonERdata: {},
      node: [],
      edge: [],
      alldata:{},
      resdata:{},
      activeName: '',
      tab: "added_cmp_crm_ddsupplier_feeback",
      col: "use_date",
      value: '选项1',
      value_level: '2',
      selectLable: [],
      selectLevel: [],
      options:[
        {
          value: '选项1',
          label: '下游'
        }, {
          value: '选项2',
          label: '上游'
        }
      ],
      options_level:[
        {
          value_level: '1',
          label_level: '1层'
        },{
          value_level: '2',
          label_level: '2层'
        },{
          value_level: '3',
          label_level: '3层'
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
      this.canvnsCol(this.tab,this.col,this.$refs.selectLable.selected.label,this.$refs.selectLevel.selected.value);
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

      } //if
    },
    recursiveColUP(tab,col,graph){
       this.jsonERdata = {}; this.resEdge = {}; 
      this.tabjoin = null;  this.tabcol1 = null;
      this.resRectNode1 =null;this.resRectNode2 =null;
      let cells = []; let reObj = new Map();
      this.jsonERdata = require('../../public/data/er.json');
      this.jsonERdata.forEach((tables)=>{

       if( tables.name === tab){ 
              tables.up.forEach((item)=>{
                console.log("item",item)
                if(col === item.t_col){
                  reObj.set(item.s_tab, item.s_col);
                  let tabcol1 = item.t_tab + "." + item.t_col;
                  let resRectNode1 = GetColRectDataGraph(item.t_tab,tabcol1,item.t_col,500,40);
                  cells.push(graph.createNode(resRectNode1));

                  let tabcol2 = item.s_tab + "." + item.s_col;
                  let resRectNode2 = GetColRectDataGraph(item.s_tab,tabcol2,item.s_col,10,650);
                  cells.push(graph.createNode(resRectNode2));

                  let tabjoin = item.s_tab + "_" + item.t_tab;
                  let resEdge = GetColEdgeDataGraph(tabjoin,item.s_tab,tabcol2,item.t_tab,tabcol1);
                  cells.push(graph.createEdge(resEdge));
                }
              });
              // console.log("reObj:",reObj);
      }  //if
      }) //forEach
     return [reObj,cells]
    },
    recursiveColDOWN(tab,col,graph){
      this.jsonERdata = {}; this.resEdge = {}; 
      this.tabjoin = null;  this.tabcol1 = null;
      this.resRectNode1 =null;this.resRectNode2 =null;
      let cells = []; let reObj = new Map();
      // this.jsonERdata = require('../../public/data/er.json');
    //  fetch('http://n41400z379.zicp.vip/added_cmp_crm_ddsupplier_feeback',{
    //                         header:{  
    //                             'Content-Type': "application/x-www-form-urlencoded",
    //                             'Access-Control-Allow-Origin': '*'
    //                           },  
    //                       })
    //       .then( res => res.Json())
    //       .then( tables =>{ console.log(tables)} ) 
    //   .catch( error => console.log( error ))

    axios.get('/getCol').then((res) => {
        console.log(res)
    })

      //  if( tables.name === tab){ 
      //         tables.down.forEach((item)=>{
      //           if(col === item.s_col){
      //             reObj.set(item.t_tab, item.t_col);
      //             let tabcol1 = item.t_tab + "." + item.t_col;
      //             let resRectNode1 = GetColRectDataGraph(item.t_tab,tabcol1,item.t_col,500,40);
      //             cells.push(graph.createNode(resRectNode1));

      //             let tabcol2 = item.s_tab + "." + item.s_col;
      //             let resRectNode2 = GetColRectDataGraph(item.s_tab,tabcol2,item.s_col,10,650);
      //             cells.push(graph.createNode(resRectNode2));

      //             let tabjoin = item.s_tab + "_" + item.t_tab;
      //             let resEdge = GetColEdgeDataGraph(tabjoin,item.s_tab,tabcol2,item.t_tab,tabcol1);
      //             cells.push(graph.createEdge(resEdge));
      //           }
      //         });
      //         // console.log("reObj:",reObj);
      // }  //if

     return [reObj,cells]
    },

    canvnsCol(tab,col,selectlabel,selectlevel) {
      this.jsonERdata = {}; this.resEdge = {}; let resNext= []; let NextObj = {} 
      X6.Graph.registerPortLayout(
        'erPortPosition',
        (portsPositionArgs) => {
          return portsPositionArgs.map((_, index) => {
            return {
              position: {
                x: 0,
                y: (index + 1) * LINE_HEIGHT,
              },
              angle: 0,
            }
          })
        },
        true,
      )

      X6.Graph.registerNode(
        'er-rect',
        {
          inherit: 'rect',
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            rect: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#5F95FF',
            },
            label: {
              fontWeight: 'bold',
              fill: '#ffffff',
              fontSize: 14,
            },
          },
          ports: {
            groups: {
              list: {
                markup: [
                  {
                    tagName: 'rect',
                    selector: 'portBody',
                  },
                  {
                    tagName: 'text',
                    selector: 'portNameLabel',
                  },
                  {
                    tagName: 'text',
                    selector: 'portTypeLabel',
                  },
                ],
                attrs: {
                  portBody: {
                    width: NODE_WIDTH,
                    height: LINE_HEIGHT,
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#EFF4FF',
                    magnet: true,
                  },
                  portNameLabel: {
                    ref: 'portBody',
                    refX: 6,
                    refY: 8,
                    fontSize: 16,
                  },
                  portTypeLabel: {
                    ref: 'portBody',
                    refX: 250,
                    refY: 8,
                    fontSize: 14,
                  },
                },
                position: 'erPortPosition',
              },
            },
          },
        },
        true,
      )

      const graph = new X6.Graph({
        container: document.getElementById('container2'),
        connecting: {
          router: {
            name: 'er',
            args: {
              offset: 25,
              direction: 'H',
            },
          },
          createEdge() {
            return new X6.Shape.Edge({
              attrs: {
                line: {
                  stroke: '#A2B1C3',
                  strokeWidth: 2,
                },
              },
            })
          },
        },
        width: 4600,
        height: 4600,
        snapline: true,
        background: {
          color: '#ffffff',
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: false, // 渲染网格背景
        },
        scroller: {
          enabled: true,
          pageVisible: true,
          pageBreak: true,
          pannable: true,
        }
      });
       
      let cells = []; let i =1;
      if (selectlabel === '上游'){
 
        resNext =  this.recursiveColUP(tab,col,graph);
        if(resNext.size != 0 ) {
          NextObj = resNext[0];
          cells = resNext[1];
          for (i=1; i<selectlevel; i++ ){
            for (let [key, value] of NextObj) {    //遍历出下一层
                // console.log(key, value);       
                resNext =  this.recursiveColUP(key,value,graph);
                NextObj = resNext[0];
                // console.log("resNext[1]:",resNext[1])
                for( let i of resNext[1]) {
                  cells.push(i)
                }
            }
          }; //for
        }else{
          console.log("No Col Lineage")
        }; //if

      }else{
 
        resNext =  this.recursiveColDOWN(tab,col,graph);
        if(resNext.size != 0 ) {
          NextObj = resNext[0];
          cells = resNext[1];
          for (i=1; i<selectlevel; i++ ){
            for (let [key, value] of NextObj) {    //遍历出下一层
                // console.log(key, value);       
                resNext =  this.recursiveColDOWN(key,value,graph);
                NextObj = resNext[0];
                // console.log("resNext[1]:",resNext[1])
                for( let i of resNext[1]) {
                  cells.push(i)
                }
            }
          }; //for
        }else{
          console.log("No Col Lineage")
        }; //if
      }
      console.log("endcelles:", cells)

      graph.resetCells(cells);


    }, //canvnsCol
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
  /* margin-top: 5px; */
  width: 280px;
  height: 36px;
  border-radius: 10px;
}
.banner_input1_col {
  margin-left: 10px;
  width: 150px;
  height: 36px;
  border-radius: 10px;
}

.el-icon-location {
  margin-left: 100px;
  font-size: 18px;
  font-weight: bold;
  color: green;
}
.el-select {
  margin-left:10px;
  width: 126px;
}

#container2 {
  /* background-color: coral; */
  width: 1400px;
  height: 760px;
  /* top: 10px; */
  /* margin: 0 auto; */
}

.el-tabs__content{
  padding: 1px;
  background-color: lime;
}

/* #pane-first.el-tab-pane {
  padding: 0px;
  background-color: magenta;
  margin-top: 1px;
} */

</style>