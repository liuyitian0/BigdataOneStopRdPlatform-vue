<template>
 <div>
  <div id="container"></div>
 </div>
</template>

<script>

const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
      shape: 'ellipse',
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
  ],
};

export default {
  methods: {
  },
  mounted () {
  const graph = new X6.Graph({
    container: document.getElementById('container'),
    // width: 1800,
    // height: 800,
    // background: {
    //   color: '#fffbe6',
    // },
    // grid: {
    //   size: 10,      // 网格大小 10px
    //   visible: true, // 渲染网格背景
    // },
    // snapline: {
    //   enabled: true,
    // },
    // scroller: {
    //   enabled: true,
    //   className: 'my-scroller',
    //   pannable: true,
    // },
    // minimap: {
    //   enabled: true,
    //   container: minimapContainer,
    // },

    scroller: {
    enabled: true,
  },
  minimap: {
    enabled: true,
    container: minimapContainer,
    graphOptions: {
      async: true,
      getCellView(cell) {
        // 用指定的 View 替换节点默认的 View
        if (cell.isNode()) {
          return SimpleNodeView
        }
      },
      createCellView(cell) {
        // 在小地图中不渲染边
        if (cell.isEdge()) {
          return null
        }
      },
    }
  }
  
  });
  graph.fromJSON(data);
  // graph.zoom(0.8);
  
 }
}
</script>