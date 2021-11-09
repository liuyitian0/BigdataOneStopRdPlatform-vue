<template>
  <el-container class="indexWrap">
    <div class="navigation">
      <Navigation></Navigation>
    </div>
    <div class="tree">
      <Tree></Tree>
    </div>
    <div class="right-main">
      <Graph></Graph>
    </div>
  </el-container>
</template>


<script>
import Navigation from './components/navigation.vue';
import Tree from './components/Tree.vue';
import Graph from './Graph.vue';


export default {
  components: {
    Navigation,
    Tree,
    Graph,
  },
  data () {
    return {
      message: '',
      data: null,
    };
  },

};
</script>

<style lang="scss">
.right-main {
  background-color: rgb(79, 89, 128);
  width: 100%;
  color: #ffffff;
}
.banner {
  padding: 10px, 10px;
}
.banner_Btn1 {
  border-radius: 5px;
}
.banner_input1 {
  margin: 20px 40px 10px;
  width: 280px;
  height: 36px;
  border-radius: 10px;
}
.canvas {
  text-align: center;
  font-size: 18px;
}
</style>