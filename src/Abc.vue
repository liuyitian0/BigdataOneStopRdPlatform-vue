<template>
  <div id="container" />
</template>
<script>
import { DagreLayout } from "@antv/layout";
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
      // 1. 节点 nodes 和边 edges 字段 的 JSON 数据
      const nodes1 = {
        attrs: {
          label: {
            fontWeight: "bold",
            fill: "#ffffff",
            fontSize: 13,
          },
          rect: {
            strokeWidth: 2,
            stroke: "#FC5E13",
            fill: "#FC5E13",
          },
          text: {
            text: "dw_crm_supper_case_details",
          },
        },
        height: 32,
        id: "dw_crm_supper_case_details",
        label: "dw_crm_supper_case_details",
        position: {
          x: 100,
          y: 300,
        },
        shape: "er-rect",
        width: 300,
      };

      const nodes2 = {
        attrs: {
          label: { fontWeight: "bold", fill: "#ffffff", fontSize: 13 },
          rect: { strokeWidth: 2, stroke: "#FC5E13", fill: "#FC5E13" },
          text: { text: "mdp_vas_operation_date" },
        },
        height: 32,
        id: "mdp_vas_operation_date",
        label: "mdp_vas_operation_date",
        position: { x: 100, y: 500 },
        shape: "er-rect",
        width: 300,
      };

      const edges = {
        attrs: {
          line: {
            stroke: "#A2B1C3",
            strokeWidth: 2,
          },
        },
        id: "dw_crm_supper_case_details.mdp_vas_operation_date.consuming_time",
        shape: "edge",
        source: {
          cell: "dw_crm_supper_case_details",
          port: "rescue_record_date",
        },
        target: {
          cell: "mdp_vas_operation_date",
          port: "mdp_vas_operation_date.consuming_time",
        },
      };

      // let alldata = [nodes1, nodes2, edges];

      // 2. 渲染画布
      const graph = new X6.Graph({
        container: document.getElementById("container"),
        width: 1500,
        height: 1200,
      });

      // 3. 渲染我们的节点和边

      // const testLyt = new DagreLayout({
      //   type: "dagre",
      //   rankdir: "LR",
      //   align: "UR",
      //   ranksep: 300,
      //   nodesep: 190,
      //   controlPoints: true,
      // });

      // const ColLineagenewModel = testLyt.layout(data);

      // graph.fromJSON(alldata);
    },
  },
};
</script>


<style>
#container {
  background-color: blueviolet;
}
</style>
