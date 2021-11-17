<template>
  <el-container class="indexWrap">
    <div class="navigation">
      <Navigation></Navigation>
    </div>
    <div class="tree">
      <Tree @getCurrentNode="getCurrentNode"></Tree>
    </div>
      <Graph ref="childGraph" :tablabel="tablabel"></Graph>
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
      tablabel: null,
    };
  },
  methods: {
    getCurrentNode(treelabel){
      this.$refs.childGraph.init(treelabel);
      this.tablabel = treelabel;
    }
  }

};
</script>

<style lang="scss">
</style>