<template>
    <div id="c1">
    </div>
</template>


<script>
// import { Graph } from '@antv/x6'
import { DagreLayout } from '@antv/layout';

export default {
  data(){
    return {

    }
  },
  mounted () {
    this.initGraph();
  },
  methods : {
    initGraph() {
    const graph = new X6.Graph({
      container: document.getElementById('c1'),
      width: 600,
      height: 400,
      snapline: true,
      background: {
        color: '#ff00ff',
      }
    });

    const model = {
          nodes: [
            {
              id: 'node1',
            }, {
              id: 'node2',
            },
             {
              id: 'node3',
            },
             {
              id: 'node4',
            },
             {
              id: 'node5',
            },
             {
              id: 'node6',
            },
             {
              id: 'node7',
            },
          ],
          edges: [
            {
              source: 'node1',
              target: 'node2',
            },
            {
              source: 'node1',
              target: 'node3',
            },
            {
              source: 'node2',
              target: 'node4',
            },
            {
              source: 'node2',
              target: 'node5',
            },
            {
              source: 'node6',
              target: 'node1',
            },
            {
              source: 'node7',
              target: 'node1',
            },
          ],
    };
    const dagreLayout = new DagreLayout({
      type: 'dagre',
      rankdir: 'LR',
      align: 'UR',
      ranksep: 50,
      nodesep: 15,
      controlPoints: true,
    });
    const newModel = dagreLayout.layout(model);
    graph.fromJSON(newModel);

    },
  }
  
}
</script>