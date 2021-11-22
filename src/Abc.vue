<template>
    <div id="c1" class="index">
    </div>
</template>


<script>
import { DagreLayout } from '@antv/layout';



const LINE_HEIGHT = 24
const NODE_WIDTH = 150

export default {
  data(){
    return {
      jsondata:[],
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
                fill: '#FFFFFF',
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

        // fetch('../public/data/er.json')
        // .then((response) => response.json())
        // .then((data) => {
        //   const cells = []
        //   data.forEach((item ) => {
        //     if (item.shape === 'edge') {
        //       cells.push(graph.createEdge(item))
        //     } else {
        //       cells.push(graph.createNode(item))
        //     }
        //   })
        //   graph.resetCells(cells);
        //   graph.zoomToFit({ padding: 10, maxScale: 1 });
        // });

        this.jsondata = require('../public/data/er.json');
        const  cells = [];
        this.jsondata.forEach((data) => {
          if(data.shape === 'edge') {
            cells.push(graph.createEdge(data));
          } else {
            cells.push(graph.createNode(data));
          }
        });
        console.log('cels:',cells);
        graph.resetCells(cells);
        graph.zoomToFit({ padding: 10, maxscale: 1 });
      
      } // initGraph
  }
}
</script>


<style scoped>
</style>