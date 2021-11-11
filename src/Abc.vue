<template>
  <div>
    <el-button type="primary" @click="getdata()"> get数据 </el-button>
    <br>
    <br>
    <br>
    <span  style="color:red"> {{res}}</span>
  </div>
</template>


<script>
var jsondata = require('../public/data/base.json')
export default {
  data (){
    return {
      res : null,
    }
  },
  methods: {
    getdata(){
      this.res = jsondata[1];
    }
  },
}
</script>
