<template>
  <div class="indexpage">
    <div class="head">
      <div class="head-1">
        <img src="@/assets/icon/table.png" alt="/" style="margin: 15px" />
        <div>
          <span>找表</span>
        </div>
      </div>
      <div class="head-2">
        <img src="@/assets/icon/field.png" alt="/" />
        <div>
          <span>找字段</span>
        </div>
      </div>
      <div class="head-3">
        <img src="@/assets/icon/indic.png" alt="/" style="margin: 15px" />
        <div>
          <span>找指标</span>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="content-1">
        <img src="@/assets/icon/report.png" alt="/" style="margin: 35px" />
        <div>
          <span>找报表</span>
        </div>
      </div>
      <div class="content-2">
        <img src="@/assets/icon/api-1.png" alt="/" />
        <div>
          <span>找服务</span>
        </div>
      </div>
      <div class="content-3">
        <img src="@/assets/icon/label.png" style="height: 280px" alt="/" />
        <div>
          <span>找标签</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
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
  margin: 200px 0 0 145px;
}
.content {
  width: 100%;
  margin: 35px 0 0 145px;
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
  /* border: 0.1px ridge rgb(6, 7, 7); */
  /* background-color: azure; */
}
.head-2 {
  margin: 20px 0 0 5px;
  padding-top: 6px;
  width: 430px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* border: 0.1px ridge rgb(6, 7, 7); */
  /* border: 1.5px ridge rgb(11, 12, 12); */
  /* background-color: rgb(160, 235, 235); */
}
.head-3 {
  margin: 20px 0 0 5px;
  padding-top: 6px;
  width: 430px;
  height: 250px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* border: 0.1px ridge rgb(6, 7, 7); */
  /* border: 1.5px ridge rgb(3, 3, 3); */
  /* background-color: rgb(212, 224, 141); */
}

.content-1 {
  margin: 20px 0 0 25px;
  /* padding-top: 30px; */
  width: 430px;
  height: 320px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* border: 0.1px ridge rgb(6, 7, 7); */
  /* border: 1.5px ridge rgb(6, 6, 7); */
  /* background-color: rgb(203, 217, 248); */
}
.content-2 {
  margin: 20px 0 0 5px;
  /* padding-top: 6px; */
  width: 430px;
  height: 320px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* border: 0.1px ridge rgb(6, 7, 7); */
  /* border: 1.5px ridge rgb(6, 6, 7);
  background-color: rgb(227, 234, 248); */
}

.content-3 {
  margin: 20px 0 0 5px;
  /* padding-top: 6px; */
  width: 430px;
  height: 320px;
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* border: 0.1px ridge rgb(6, 7, 7); */
  /* border: 1.5px ridge rgb(6, 6, 7);
  background-color: rgb(227, 234, 248); */
  text-align: center;
}
</style>