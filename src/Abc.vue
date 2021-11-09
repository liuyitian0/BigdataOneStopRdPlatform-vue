<template>
  <div class="wrrap">
    <div class="head">
      <el-button class="banner_Btn1" @click="getdata()"> 获取血缘 </el-button>
    </div>
    <div id="container" class="graph"></div>
  </div>
</template>

<script>
import { Graph } from '@antv/x6';
const data = {
  nodes: [
    {
      id: 'node1', 
      x: 40, 
      y: 500,     
      width: 200,   
      height: 40, 
      label: 'dcl_zssys_web_ply_base',
    },
    {
      id: 'node2',
      x: 310,   
      y: 100,    
      width: 300, 
      height: 40,
      label: 'dw_zssys_web_ply_tgt_obj_02_noact',
    },
    {
      id: 'node3',
      x: 320,   
      y: 200,      
      width: 300,   
      height: 40,  
      label: 'dw_zssys_web_ply_risk_qust_14', 
    },
    {
      id: 'node4', 
      x: 330,      
      y: 300,      
      width: 300,   
      height: 40,  
      label: 'dw_zssys_web_ply_base_cha_noact', 
    },
    {
      id: 'node5', 
      x: 340,      
      y: 400,      
      width: 300,   
      height: 40,  
      label: 'mdp_policy_policy_base', 
    },
    {
      id: 'node6', 
      x: 350,      
      y: 500,      
      width: 300,   
      height: 40,  
      label: 'mdp_salefee_accurued_policy_fee', 
    },
    {
      id: 'node7', 
      x: 350,      
      y: 600,      
      width: 300,   
      height: 40,  
      label: 'mdp_policy_latest_policy_base', 
    },
    {
      id: 'node8', 
      x: 350,      
      y: 700,      
      width: 300,   
      height: 40,  
      label: 'mdp_cusdm_journey', 
    },
    {
      id: 'node9', 
      x: 830,      
      y: 300,      
      width: 300,   
      height: 40,  
      label: 'mdp_cusdm_asset_details—9', 
    },
    {
      id: 'node10', 
      x: 800,      
      y: 500,      
      width: 300,   
      height: 40,  
      label: 'mdp_salefee_accurued_policy_fee(6-10)', 
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
      source: 'node1', 
      target: 'node4', 
    },
    {
      source: 'node1', 
      target: 'node5', 
    },
    {
      source: 'node1', 
      target: 'node6', 
    },
    {
      source: 'node1', 
      target: 'node7', 
    },
    {
      source: 'node1', 
      target: 'node8', 
    },
    {
      source: 'node4', 
      target: 'node9', 
    },
    {
      source: 'node6', 
      target: 'node10', 
    },
  ],
};

export default {
  name: "index",
  methods: {
    getdata () {
    this.init();
    },
    init() {
      const graph = new Graph({
        container: document.getElementById('container'),
      });
      graph.fromJSON(data)
    }
  }
}
</script>

<style scoped>
.wrrap {
  width: 100%;
  height: 100%;
  background-color: red;
}
.head {
  width: 100%;
  height: 48px;
  background-color:blue;
}
.graph {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: rgb(79, 89, 128);
}
.banner_Btn1 {
  margin-left: 500px;
}
</style>