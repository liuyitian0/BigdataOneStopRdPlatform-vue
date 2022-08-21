<template>
  <div class="indexpage">
    <div class="head">
      <div class="head-1">head-1</div>
      <div class="head-2">head-2</div>
      <div class="head-3">head-3</div>
      <div class="head-4">head-4</div>
    </div>

    <div class="content">
      <div class="content-1">标签</div>
      <div class="content-2">
        <div class="dw-arc">
          <div class="ck">CK:{{ CKCnt }} 表</div>
          <div class="doris">Doris:{{ DorisCnt }}表</div>
        </div>
        <div class="dw-all">
          <div class="dw-lvl">
            <div class="dw-left">
              <div class="mdp">Mdp: {{ MdpCnt }}表</div>
              <div class="dw">Dw: {{ DwCnt }}表</div>
              <div class="dcl">Dcl:{{ DclCnt }}表</div>
              <div class="ods">Ods:{{ OdsCnt }}表</div>
            </div>
            <div class="dw-right">Dim:{{ DimCnt }}表</div>
          </div>
          <div class="dw-bottom">Oracle:{{ OracleCnt }}表</div>
        </div>
      </div>
      <div class="content-3">
        指标
        <div id="indicators_id"></div>
        <!-- <div class="dw-all">
          <div class="dw-lvl">
            <div class="dw-left">
              <div class="mdp">Mdp: {{ MdpCnt }}表</div>
            </div>
            <div class="dw-right">Dim:{{ DimCnt }}表</div>
          </div>
          <div class="dw-bottom">Oracle:{{ OracleCnt }}表</div>
        </div> -->
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      CKCnt: 78,
      DorisCnt: 24,
      MdpCnt: 455,
      DwCnt: 578,
      DclCnt: 578,
      OdsCnt: 578,
      OracleCnt: 578,
      DimCnt: 89,
      resTablejson: Promise,
    };
  },
  methods: {
    indicators() {
      const chartdata = [
        { item: "经营分析类", count: 40, percent: 0.4 },
        { item: "客服考核类", count: 21, percent: 0.21 },
        { item: "核心指标类", count: 17, percent: 0.17 },
        { item: "派生指标类", count: 13, percent: 0.13 },
        { item: "综合成本类", count: 9, percent: 0.09 },
      ];

      const chart = new G2.Chart({
        container: "indicators_id",
        autoFit: true,
        height: 385,
      });

      chart.data(chartdata);

      chart.coordinate("theta", {
        radius: 0.85,
      });

      chart.scale("percent", {
        formatter: (val) => {
          val = val * 100 + "%";
          return val;
        },
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart.axis(false); // 关闭坐标轴
      const interval = chart
        .interval()
        .adjust("stack")
        .position("percent")
        .color("item")
        .label("percent", {
          offset: -40,
          style: {
            textAlign: "center",
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)",
            fill: "#fff",
          },
        })
        .tooltip("item*percent", (item, percent) => {
          percent = percent * 100 + "%";
          return {
            name: item,
            value: percent,
          };
        })
        .style({
          lineWidth: 1,
          stroke: "#fff",
        });
      chart.interaction("element-single-selected");
      chart.render();

      // 默认选择
      // interval.elements[0].setState('selected', true);
    },
  },
  mounted() {
    this.indicators();
  },
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
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  /* border: 0.1px ridge rgb(6, 7, 7); */
  /* border: 1.5px ridge rgb(6, 6, 7);
  background-color: rgb(227, 234, 248); */
}

.content-3 {
  margin: 20px 0 0 25px;
  padding-top: 0px;
  width: 530px;
  height: 410px;
  border-radius: 0px;
  text-align: center;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  /* border: 0.1px ridge rgb(6, 7, 7); */
  /* border: 1.5px ridge rgb(6, 6, 7);
  background-color: rgb(227, 234, 248); */
}

.dw-arc {
  display: flex;
  width: 100%;
  height: 80px;
  /* background-color: aquamarine; */
}

.ck {
  width: 50%;
  margin: 5px 5px 5px 5px;
  background-color: rgb(132, 219, 51);
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.doris {
  width: 50%;
  margin: 5px 5px 5px 0;
  background-color: rgb(100, 211, 36);
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.dw-lvl {
  width: 100%;
  height: 270px;
  display: flex;
  /* background-color: darkgray; */
}

.dw-left {
  width: 65%;
}

.dw-right {
  width: 35%;
  background-color: rgb(226, 152, 68);
  height: 255px;
  margin: 5px 5px 0 0;
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.mdp {
  width: 95%;
  height: 60px;
  margin: 5px 5px 5px 5px;
  background-color: rgb(235, 232, 57);
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.dw {
  width: 95%;
  height: 60px;
  margin: 5px 5px 5px 5px;
  background-color: rgb(81, 70, 238);
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.dcl {
  width: 95%;
  height: 60px;
  margin: 5px 5px 5px 5px;
  background-color: rgb(228, 146, 23);
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.ods {
  width: 95%;
  height: 60px;
  margin: 5px 5px 5px 5px;
  background-color: rgb(28, 98, 131);
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.dw-bottom {
  width: 99%;
  height: 55px;
  margin: 0 5px 5px 5px;
  background-color: rgb(112, 112, 235);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>