<template>
  <div class="wrrap">
    <div class="head">
      <input class="banner_input1" type="text" v-model.trim="message" placeholder="请输入表名..." />
      <el-button class="banner_Btn1" @click="getdata()"> 获取血缘 </el-button>
      <el-tooltip content="放大">
        <el-button icon="el-icon-zoom-in" @click="zoomOut" circle></el-button>
      </el-tooltip>
      <el-tooltip content="缩小">
        <el-button icon="el-icon-zoom-out" @click="zoomIn" circle></el-button>
      </el-tooltip>
      <el-tooltip content="自动布局">
        <el-button icon="el-icon-bangzhu" circle></el-button>
      </el-tooltip>
      <el-tooltip content="适应画布">
        <el-button icon="el-icon-money" circle></el-button>
      </el-tooltip>
      <el-tooltip content="全屏">
        <el-button icon="el-icon-full-screen" circle></el-button>
      </el-tooltip>
    </div>
    <div id="container" class="graph">
    </div>
  </div>
</template>

<script>

import GraphTS from '../Graph/index';

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
      attrs: {
        body: {
          fill: '#FFFFFF',
          stroke: '#000',
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'dw_zssys_web_ply_tgt_obj_02_noact',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
    },
    {
      id: 'node3',
      x: 320,   
      y: 200,      
      width: 300,   
      height: 40,  
      attrs: {
        body: {
          fill: '#FFFFFF',
          stroke: '#000',
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'dw_zssys_web_ply_risk_qust_14',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
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
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'dw_zssys_web_ply_base_cha_noact',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
    },
    {
      id: 'node5', 
      x: 340,      
      y: 400,      
      width: 300,   
      height: 40,
      attrs: {
        body: {
          fill: '#FFFFFF',
          stroke: '#000',
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'mdp_policy_policy_base',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
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
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'mdp_salefee_accurued_policy_fee',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        }
      } 
    },
    {
      id: 'node7', 
      x: 350,      
      y: 600,      
      width: 300,   
      height: 40,  
      attrs: {
        body: {
          fill: '#FFFFFF',
          stroke: '#000',
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'mdp_policy_latest_policy_base',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
    },
    {
      id: 'node8', 
      x: 350,      
      y: 700,      
      width: 300,   
      height: 40,  
      attrs: {
        body: {
          fill: '#FFFFFF',
          stroke: '#000',
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'mdp_cusdm_journey',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
    },
    {
      id: 'node9', 
      x: 830,      
      y: 300,      
      width: 300,   
      height: 40,   
      attrs: {
        body: {
          fill: '#FFFFFF',
          stroke: '#000',
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'mdp_cusdm_asset_details—9',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
    },
    {
      id: 'node10', 
      x: 780,      
      y: 540,      
      width: 300,   
      height: 40,  
      attrs: {
        body: {
          fill: '#2ECC71',
          stroke: '#000',
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'mdp_salefee_accurued_policy_fee(6-10)',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
    },
    {
      id: 'node11', 
      x: 950,      
      y: 650,      
      width: 300,
      height: 40,  
      attrs: {
        body: {
          fill: '#2ECC71',
          stroke: '#000',
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'mdp_salefee_accurued_policy_fee(11)',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      },
    },
    {
      id: 'node12', 
      x: 1000,      
      y: 750,      
      width: 300,   
      height: 40,  
      attrs: {
        body: {
          fill: '#FFFFFF',
          stroke: '#000',
          rx: 22,
          ry: 22,
        },
        label: {
          text: 'mdp_salefee_accurued_policy_fee(12)',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          fontVariant: 'small-caps',
        },
      }, 
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
  data(){
    return{
      message: 'dcl_zssys_web_ply_base',
    }
  },
  methods: {
    getdata (e) {
      this.init();
    },
    init(value) {
      var graph = new X6.Graph({
        container: document.getElementById('container'),
      });
      graph.fromJSON(data)
    },
    zoomOut() {
      GraphTS.zoomOut();
    },
    zoomIn() {
      GraphTS.zoomIn();
    },
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
  background-color: #fff;
  /* background-color: rgb(79, 89, 128); */
}
.graph {
  height: 100%;
  width: 100%;
  background-color: #fff;
  /* background-color: red; */
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