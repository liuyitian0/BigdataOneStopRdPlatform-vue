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
import Graph from './components/Graph.vue';


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
  // background-color: #ccc;
  background-color: red;
  width: 100%;
  // color: #ffffff;
}
</style>