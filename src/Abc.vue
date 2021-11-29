<template>
    <!-- <div> -->
    <div id="c1" class="index">
    </div>

      <!-- <div id="select">
        <el-select ref='selectLable' v-model="value" placeholder="选择上下游">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div> -->
     <!-- </div> -->
    
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
    }
  },
  mounted () {
    this.initGraph();
  },
  methods : {
      initGraph() {

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
              fontSize: 12,
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
                    refY: 6,
                    fontSize: 10,
                  },
                  portTypeLabel: {
                    ref: 'portBody',
                    refX: 95,
                    refY: 6,
                    fontSize: 10,
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
        container: document.getElementById('c1'),
        connecting: {
          router: {
            name: 'er',
            args: {
              offset: 25,
              direction: 'H',
            },
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#A2B1C3',
                  strokeWidth: 2,
                },
              },
            })
          },
        },
      });
       
        this.jsondata = require('../public/data/er-gf.json');
          const cells = []
          this.jsondata.forEach((item) => {
            if (item.shape === 'edge') {
              console.log('edge:',item)
              cells.push(graph.createEdge(item))
            } else {
              console.log('node:',item)
              cells.push(graph.createNode(item))
            }
          graph.resetCells(cells)
          graph.zoomToFit({ padding: 10, maxScale: 1 })
        })


      // fetch('../public/data/er-gf.json')
      // .then((response) => response.json())
      // .then((data) => {
      //   const cells = []
      //   data.forEach((item) => {
      //     if (item.shape === 'edge') {
      //       cells.push(graph.createEdge(item))
      //     } else {
      //       cells.push(graph.createNode(item))
      //     }
      //   })
      //   graph.resetCells(cells)
      //   graph.zoomToFit({ padding: 10, maxScale: 1 })
      // })  


      //  if (this.$refs.selectLable.selected.label === '上游'){
      //  if ('上游' === '上游'){
      //     this.jsondata.up.forEach((item)=>{
      //       let tabcol1 = item.t_tab + "." + item.t_col;
      //       let resRectNode1 = GetColRectDataGraph(item.t_tab,tabcol1,item.t_col,24,150);
      //       console.log("node:",resRectNode1);
      //       cells.push(graph.createNode(resRectNode1));

      //       let tabcol2 = item.s_tab + "." + item.s_col;
      //       let resRectNode2 = GetColRectDataGraph(item.s_tab,tabcol2,item.s_col,250,210);
      //       console.log("node:",resRectNode2);
      //       cells.push(graph.createNode(resRectNode2));

      //       let tabjoin = item.s_tab + "_" + item.t_tab;
      //       let resEdge = GetColEdgeDataGraph(tabjoin,item.s_tab,tabcol2,item.t_tab,tabcol1);
      //       console.log("resEdge:",resEdge);
      //       cells.push(graph.createEdge(resEdge));
      //     });


      //     graph.resetCells(cells)
      //     graph.zoomToFit({ padding: 10, maxScale: 1 })
      //   } 
      //   else { 
      //       console.log('jsondata:',this.jsondata.down) 
      //     }

      } // initGraph
  }
}
</script>


<style scoped>
#c1{
  /* background-color: coral; */
  width: 100%;
  height: 100%;
  top: 10px;
  margin: 0 auto;
}
</style>