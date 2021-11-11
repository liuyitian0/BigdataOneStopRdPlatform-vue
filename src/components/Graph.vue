<template>
  <div class="wrrap"> 
    <div class="operate">
      <input class="banner_input1" type="text" v-model.trim="message" placeholder="请输入表名..." />
      <el-button class="banner_Btn1" @click="getdata()"> 获取血缘 </el-button>
      <el-tooltip content="放大" effect="light">
        <el-button icon="el-icon-zoom-in" circle></el-button>
      </el-tooltip>
      <el-tooltip content="缩小" effect="light">
        <el-button icon="el-icon-zoom-out" circle></el-button>
      </el-tooltip>
      <el-tooltip content="自动布局" effect="light">
        <el-button icon="el-icon-bangzhu" circle></el-button>
      </el-tooltip>
      <el-tooltip content="适应画布" effect="light">
        <el-button icon="el-icon-money" circle></el-button>
      </el-tooltip>
      <el-tooltip content="全屏" effect="light">
        <el-button icon="el-icon-full-screen" circle></el-button>
      </el-tooltip>
      <p>treeLabel:*{{ tablabel }}*</p>
    </div>
    <div>
      <div id="container"></div>
      <div ref="miniMapContainerRef" class="miniMap"></div>
    </div>
  </div>
</template>

<script>


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
  props: {
    tablabel: String,
  },
  data(){
    return{
      message: null,
    }
  },
  methods: {
    getdata (e) {
      this.init();
    },
    init(value) {
      const miniMapContainerRef = this.$refs.miniMapContainerRef
      const graph = new X6.Graph({
        container: document.getElementById('container'),
        width: 3600,
        height: 3600,
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
        }

      });
      graph.fromJSON(data)
    },
    // 放大
    // zoominfn() {
    //   this.graph.zoom(0.1);
    //   this.canzoomout = true;
    // },
  }
}
</script>

<style scoped>
.wrrap {
  width: 100%;
  height: 100%;
  background-color:#ffffff;
}
.head {
  width: 100%;
  height: 58px;
  background-color: #ffffff;
}
.miniMap {
  position: fixed;
  z-index: 333;
  bottom: 15px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.banner_Btn1 {
  margin-left: 30px;
}
.banner_input1 {
  margin-left: 30px;
  margin-top: 10px;
  width: 300px;
  height: 36px;
  border-radius: 10px;
}
</style>