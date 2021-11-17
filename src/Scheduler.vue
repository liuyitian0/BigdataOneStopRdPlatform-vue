<template>
  <el-container>
    <div class="navigation">
      <Navigation></Navigation>
    </div>
    <el-main class="main">
      <div id="c1">
      </div>
    </el-main>
  </el-container>
</template>


<script>
import Navigation from './components/navigation.vue';

// const graphscheduler = new X6.Graph({
//   container: document.getElementById('c1'),
//   grid: true,
// });

// graphscheduler.addNode({
//   x: 160,
//   y: 120,
//   width: 360,
//   height: 120,
//   shape: 'text-block',
//   text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
//   attrs: {
//     body: {
//       fill: '#efdbff',
//       stroke: '#9254de',
//       rx: 4,
//       ry: 4,
//     },
//   },
// });

export default {
  components: {
    Navigation,
  },
  mounted(){

  },
  data () {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
</style>  