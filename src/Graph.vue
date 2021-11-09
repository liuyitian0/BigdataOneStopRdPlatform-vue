<template>
  <div class="wrrap">
    <div class="head">
      <input class="banner_input1" type="text" v-model.trim="message" placeholder="dcl_zssys_web_ply_base" />
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
      shape: 'rect',
      id: 'node1', 
      x: 40, 
      y: 500,     
      width: 200,   
      height: 40, 
      attrs: {
        body: {
          fill: '#F39C12',
          stroke: '#000',
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'dcl_zssys_web_ply_base',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
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
      attrs: {
        body: {
          fill: '#2ECC71',
          stroke: '#000',
        },
        label: {
          text: 'dw_zssys_web_ply_base_cha_noact',
          fill: '#333',
          fontSize: 13,
        }
      }  
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
      attrs: {
        body: {
          fill: '#2ECC71',
          stroke: '#000',
        },
        label: {
          text: 'mdp_salefee_accurued_policy_fee',
          fill: '#333',
          fontSize: 13,
        }
      } 
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
      x: 780,      
      y: 540,      
      width: 300,   
      height: 40,  
      label: 'mdp_salefee_accurued_policy_fee(6-10)', 
    },
    {
      id: 'node11', 
      x: 950,      
      y: 650,      
      width: 300,
      height: 40,  
      label: 'mdp_salefee_accurued_policy_fee(11)', 
    },
    {
      id: 'node12', 
      x: 1000,      
      y: 750,      
      width: 300,   
      height: 40,  
      label: 'mdp_salefee_accurued_policy_fee(12)', 
    },
  ],

  edges: [
    {
      source: 'node1',  
      target: 'node2',
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
    {
      source: 'node1', 
      target: 'node3', 
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
    {
      source: 'node1', 
      target: 'node4', 
      attrs: {
        line: {
          stroke: 'orange',
        },
      }, 
    },
    {
      source: 'node1', 
      target: 'node5', 
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
    {
      source: 'node1', 
      target: 'node6', 
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
    {
      source: 'node1', 
      target: 'node7', 
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
    {
      source: 'node1', 
      target: 'node8', 
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
    {
      source: 'node4', 
      target: 'node9', 
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
    {
      source: 'node6', 
      target: 'node10', 
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
    {
      source: 'node10', 
      target: 'node11', 
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
    },
    {
      source: 'node11', 
      target: 'node12', 
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
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
}
.head {
  width: 100%;
  height: 58px;
  background-color: rgb(79, 89, 128);
}
.graph {
  height: 100%;
  width: 100%;
  background-color: rgb(79, 89, 128);
}
.banner_Btn1 {
  margin-left: 30px;
}
.banner_input1 {
  margin-left: 100px;
  margin-top: 10px;
  width: 300px;
  height: 36px;
  border-radius: 10px;
}
</style>