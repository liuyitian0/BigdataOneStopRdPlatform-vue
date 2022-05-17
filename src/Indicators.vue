<template>
  <el-container>
    <el-main>
      <el-tabs type="border-card">
        <el-tab-pane id="tab">
          <span slot="label"><i class="el-icon-date"></i>指标查询</span>
        </el-tab-pane>
        <el-tab-pane label="指标维护">指标维护</el-tab-pane>
        <el-tab-pane label="核心指标">核心指标</el-tab-pane>
        <el-tab-pane label="常用指标">常用指标</el-tab-pane>
        <el-tab-pane label="指标血缘">指标血缘</el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      name: "",
      address: "",
      tel: "",
      info: [],
    };
  },
  methods: {
    all() {
      //查找info表全部数据
      axios
        .get("http://127.0.0.1/list/all")
        .then((res) => {
          // console.log(res.data);
          this.info = res.data;
        })
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
    },
    del() {
      //删除操作
      axios
        .get("http://127.0.0.1/list/del", {
          params: {
            id: this.id,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.all();
        })
        .catch((err) => {
          console.log("操作失败" + err);
        });
    },
    get() {
      //查询操作
      axios
        .get("http://127.0.0.1/list/get", {
          params: {
            id: this.id,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.info = res.data;
        })
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
    },
    add() {
      //添加操作
      axios
        .get("http://127.0.0.1/list/add", {
          params: {
            id: this.id,
            name: this.name,
            address: this.address,
            tel: this.tel,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.all();
        })
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
    },
    update() {
      //修改操作
      axios
        .get("http://127.0.0.1/list/update", {
          params: {
            id: this.id,
            name: this.name,
            address: this.address,
            tel: this.tel,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.all();
        })
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
    },
  },
};
</script>

<style>
#tab {
  background-color: #0d72d8;
  text-align: center;
  line-height: 90px;
}
</style>