<template>
 <div>
  <div>
    <el-button style="margin:10px 280px" type="primary" @click="zoomOut()">zoomOut</el-button>
    <el-button type="primary" @click="zoomIn()">zoomIn</el-button>
  </div>
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
    zoomOut () {
      graph.translate(-80, -40);
    },
    zoomIn (){
      graph.zoom(-0.2);
    },
  },
  mounted () {
  const graph = new X6.Graph({
    container: document.getElementById('container'),
    width: 1800,
    height: 800,
    background: {
      color: '#fffbe6',
    },
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
    },
  });
  graph.fromJSON(data);
  // graph.zoom(0.8);
 }
}
</script>