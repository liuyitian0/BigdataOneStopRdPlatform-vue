<template>
  <div class="indexpage">
    <div class="head">
      <div class="head-1">head-1</div>
      <div class="head-2">head-2</div>
      <div class="head-3">head-3</div>
      <div class="head-4">head-4</div>
    </div>

    <div class="content">
      <div class="content-1">content-left</div>
      <div class="content-2">content-mid</div>
      <div class="content-3">content-right</div>
    </div>
  </div>
</template>


<script>
export default {
  data() {},
  methods: {},
};
</script>


<style scoped>
.indexpage {
  width: 100%;
}

.head {
  width: 100%;
  /* background-color: cadetblue; */
  display: flex;
  /* background-color: aquamarine; */
}
.content {
  width: 100%;
  margin: 35px 0 0 25px;
  display: flex;
  /* background-color: burlywood; */
}

.head-1 {
  margin: 20px 0 0 25px;
  padding-top: 6px;
  width: 430px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border: 0.1px ridge rgb(6, 7, 7);
  /* background-color: azure; */
}
.head-2 {
  margin: 20px 0 0 5px;
  padding-top: 6px;
  width: 430px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border: 0.1px ridge rgb(6, 7, 7);
  /* border: 1.5px ridge rgb(11, 12, 12); */
  /* background-color: rgb(160, 235, 235); */
}
.head-3 {
  margin: 20px 0 0 5px;
  padding-top: 6px;
  width: 480px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border: 0.1px ridge rgb(6, 7, 7);
  /* border: 1.5px ridge rgb(3, 3, 3); */
  /* background-color: rgb(212, 224, 141); */
}
.head-4 {
  margin: 20px 0 0 5px;
  padding-top: 6px;
  width: 480px;
  height: 230px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border: 0.1px ridge rgb(6, 7, 7);
  /* border: 1.5px ridge rgb(6, 6, 7); */
  /* background-color: rgb(129, 157, 216); */
}

.content-1 {
  margin: 20px 0 0 5px;
  padding-top: 6px;
  width: 530px;
  height: 410px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border: 0.1px ridge rgb(6, 7, 7);
  /* border: 1.5px ridge rgb(6, 6, 7); */
  /* background-color: rgb(203, 217, 248); */
}
.content-2 {
  margin: 20px 0 0 25px;
  padding-top: 6px;
  width: 720px;
  height: 410px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border: 0.1px ridge rgb(6, 7, 7);
  /* border: 1.5px ridge rgb(6, 6, 7);
  background-color: rgb(227, 234, 248); */
}

.content-3 {
  margin: 20px 0 0 25px;
  padding-top: 6px;
  width: 530px;
  height: 410px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border: 0.1px ridge rgb(6, 7, 7);
  /* border: 1.5px ridge rgb(6, 6, 7);
  background-color: rgb(227, 234, 248); */
}
</style>