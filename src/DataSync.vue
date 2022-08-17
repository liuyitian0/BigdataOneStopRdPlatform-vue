<template>
  <div class="index">
    <div class="navigation">
      <Navigation></Navigation>
    </div>

    <div class="content">
      <div class="step">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="选择数据源-库表"></el-step>
          <el-step title="元数据同步"></el-step>
        </el-steps>
      </div>

      <el-card class="box-card" v-show="active == 0">
        <div class="card-content1">
          <div class="card-left">
            Source:
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="140px"
              class="demo-ruleForm"
            >
              <el-form-item label="数据源配置" prop="source">
                <el-select
                  v-model="ruleForm.source"
                  placeholder="请选择数据源"
                  style="width: 300px"
                >
                  <el-option label="Hive" value="Hive"></el-option>
                  <el-option label="Clickhouse" value="Clickhouse"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="请选择源库" prop="base">
                <el-select v-model="ruleForm.base" placeholder="请选择源库">
                  <el-option label="mdp" value="mdp"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="请选择源表" prop="table">
                <el-autocomplete
                  v-model="ruleForm.table"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请选择表 ..."
                  @select="handleSelect"
                  style="width: 450px"
                ></el-autocomplete>
              </el-form-item> -->

              <el-form-item label="请选择源表" prop="table">
                <el-autocomplete
                  class="inline-input"
                  v-model="ruleForm.table"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                  style="width: 430px"
                ></el-autocomplete>
              </el-form-item>
            </el-form>
          </div>

          <div class="card-right">
            Target:
            <el-form
              :model="TargetruleForm"
              :rules="Targetrules"
              ref="TargetruleForm"
              label-width="140px"
              class="Target-ruleForm"
            >
              <el-form-item label="目标源配置" prop="target">
                <el-select
                  v-model="TargetruleForm.target"
                  placeholder="请选择目标配置"
                  style="width: 300px"
                >
                  <el-option label="Clickhouse" value="Clickhouse"></el-option>
                  <el-option label="Hive" value="Hive"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="请选择目标库" prop="targetbase">
                <el-select
                  v-model="TargetruleForm.targetbase"
                  placeholder="请选择目标源库"
                  style="width: 300px"
                >
                  <el-option label="hive2ck" value="hive2ck"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="目标表名称" prop="targettable">
                <el-input
                  placeholder="或手动指定表名"
                  v-model="TargetruleForm.targettable"
                  clearable
                  style="width: 310px"
                >
                </el-input>
                或手动指定表名
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="card-content2">
          <div class="car-left-down">
            <div class="trs" style="text-align: center">
              <el-transfer
                style="text-align: left"
                v-model="value"
                :render-content="renderFunc"
                :titles="['Source', 'Target']"
                :button-texts="['☜', '☞']"
                @change="handleChange"
                :data="TransferData"
              >
              </el-transfer>
            </div>
          </div>
          <div class="car-right-down">
            <el-form
              :model="ArgsruleForm"
              :rules="Argsrules"
              ref="ArgsruleForm"
              label-width="140px"
              class="Args-ruleForm"
            >
              <el-form-item label="Partition" prop="input1_partition">
                <el-input
                  placeholder="输入分区字段,默认 无"
                  v-model="ArgsruleForm.input1_partition"
                  clearable
                  style="width: 280px; margin-top: 10px"
                >
                </el-input>
              </el-form-item>

              <el-form-item label="Order By" prop="input2_orderby">
                <el-input
                  placeholder="指定Order BY字段,默认 无"
                  v-model="ArgsruleForm.input2_orderby"
                  clearable
                  style="width: 280px; margin-top: 10px"
                >
                </el-input>
              </el-form-item>

              <el-form-item label="Primary Key" prop="input3_key">
                <el-input
                  placeholder="指定Primary Key字段,默认 无"
                  v-model="input3_key"
                  clearable
                  style="width: 280px; margin-top: 10px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Enginer" prop="input4_enginer">
                <el-input
                  placeholder="默认ReplicatedReplacingMergeTree"
                  v-model="input4_enginer"
                  clearable
                  style="width: 290px; margin-top: 10px"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="next_btn">
          <el-button>数据源配置</el-button>
          <el-button @click="next">下一步</el-button>
        </div>
      </el-card>

      <el-card class="box-card-textarea" v-show="active == 1">
        <el-form :model="SyncruleForm" ref="SyncruleForm">
          <el-form-item>
            <div class="next_btn_2">
              <el-button @click="prev" v-if="active == 1 || active == 2"
                >上一步</el-button
              >
              <el-button @click="SyncTableMeta">创建CK表</el-button>
              <el-button @click="DropTableMetaPop">删除CK表(严重)</el-button>
            </div>

            <el-dialog
              title="删除表提示"
              :visible.sync="centerDialogVisible"
              width="30%"
              center
            >
              <div>{{ diagContent }}</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false"
                  >取 消</el-button
                >
                <el-button type="primary" @click="DropTableMeta"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </el-form-item>

          <el-form-item prop="exec_sql">
            <el-input
              type="textarea"
              :rows="35"
              v-model="exec_sql"
              style="overflow-y: scroll"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import Navigation from "./components/navigation.vue";

export default {
  components: {
    Navigation,
  },
  data() {
    return {
      TransferData: [],
      value: [1],
      value4: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      active: 0,
      ruleForm: {},
      rules: {
        source: [
          { required: true, message: "请选择数据源", trigger: "change" },
        ],
        base: [{ required: true, message: "请选择源库", trigger: "change" }],
        table: [{ required: true, message: "请选择源库", trigger: "change" }],
      },
      TargetruleForm: {},
      Targetrules: {
        target: [
          { required: true, message: "请选择目标数据源", trigger: "change" },
        ],
        targetbase: [
          { required: true, message: "请选择目标库", trigger: "change" },
        ],
        targettable: [
          { required: true, message: "请输入目标表名", trigger: "blur" },
          {
            min: 4,
            max: 100,
            message: "长度在 4 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
      SyncruleForm: {},
      exec_sql:
        "create table hive2ck.ck_lym  on cluster hive2ck \n \
 ( id String, \n \
 name String, \n \
 )  \n \
 engine = ReplicatedReplacingMergeTree('/clickhouse/table/{shard}/ck_lym','{replica}') \n \
 primary key id \n  \
 order by id   \n   \
                 ",
      input_search_state: "",
      input1_partition: "",
      input2_orderby: "",
      input3_key: "",
      input4_enginer: "ReplicatedReplacingMergeTree",
      ArgsruleForm: {},
      Argsrules: {
        input4_enginer: [
          { required: true, message: "指定表引擎", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur",
          },
        ],
        input2_orderby: [
          { required: true, message: "指定Order BY", trigger: "blur" },
          {
            min: 2,
            max: 100,
            message: "长度在 2 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
      centerDialogVisible: false,
      diagContent: "",
      resTableList: [],
    };
  },

  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    prev() {
      --this.active;
      if (this.active < 0) this.active = 0;
    },
    next() {
      if (this.active++ > 1) this.active = 0;
      let resCollist = this.Hive2ClickhouseType();
      // console.log("resCollist", resCollist);
      let Exec_SQL_head =
        "create table " +
        this.TargetruleForm.targetbase +
        "." +
        this.TargetruleForm.targettable +
        " on cluster hive2ck (\n";
      let Exec_SQL_tail =
        ")\n" +
        "engine = " +
        this.input4_enginer +
        "('/clickhouse/table/{shard}/" +
        this.TargetruleForm.targettable +
        "','{replica}')\n";
      let Exec_ORDERBY = "order by " + this.ArgsruleForm.input2_orderby + "\n";
      let Exec_Parimary_key = "primary key " + this.input3_key + "\n";

      if (this.input3_key == "") {
        this.exec_sql =
          Exec_SQL_head + resCollist + Exec_SQL_tail + Exec_ORDERBY;
      } else {
        this.exec_sql =
          Exec_SQL_head +
          resCollist +
          Exec_SQL_tail +
          Exec_Parimary_key +
          Exec_ORDERBY;
      }
    },
    Hive2ClickhouseType() {
      let FinalColList = [];

      this.TransferData.forEach((item) => {
        let col_type = item["label"].split(",");
        let column_name = col_type[0];
        let column_type = col_type[1];
        if (column_type == "double") column_type = "Float64";
        if (column_type == "string") column_type = "String";

        FinalColList.push(column_name + " " + column_type + "\n");
      });

      return FinalColList;
    },
    querySearchAsync(queryString, cb) {
      // console.log("ruleForm.table", this.ruleForm.table);
      let stringUrl =
        "http://10.30.64.240:9988/DataMiddleOffice/GeHivetMetaDetailShowtables?table_name=" +
        this.ruleForm.table;

      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          res.data.data.forEach((item) => {
            // console.log({ '"value"': '"' + item.value + '"' });
            this.resTableList.push({ value: item.value });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      var resTableList = this.resTableList;
      var results = queryString
        ? this.resTableList.filter(this.createFilter(queryString))
        : this.resTableList;
      cb(results);

      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //   cb(results);
      // }, 3000 * Math.random());
    },

    createFilter(queryString) {
      return (results) => {
        console.log("results.value", results.value);
        return (
          results.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    // createStateFilter(queryString) {
    //   return (input_search_state) => {
    //     return (
    //       input_search_state.value
    //         .toLowerCase()
    //         .indexOf(queryString.toLowerCase()) === 0
    //     );
    //   };
    // },
    handleSelect(item) {
      this.TransferData = [];
      // this.TargetruleForm.targettable = item.value;
      let stringUrl =
        "http://10.30.64.240:9988/DataMiddleOffice/GeHivetMetaDetailByTable?table_name=" +
        item.value;

      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log("rescol", res.data.data);
          let resAarr = res.data.data;
          resAarr.forEach((item, index) => {
            // console.log(index + 1, item.column_name);
            this.TransferData.push({
              key: index + 1,
              label: item.column_name + "," + item.column_type,
            });
          });
          // console.log("TransferData", this.TransferData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    SyncTableMeta() {
      console.log("exec_sql", this.exec_sql);

      let stringUrl = "http://10.30.64.222:8520/api/hive2ck_full_create_ddl";

      axios({
        method: "post",
        url: stringUrl,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: false,
        data: "create_ddl=" + this.exec_sql,
      }).then((response) => {
        // console.log(response.data);
        let res_status = response.status;
        // console.log("res_status", res_status);
        if (res_status == 200) {
          alert("Ck 表创建成功!");
        } else {
          alert("Ck 表创建失败;" + response.data);
        }
      });
    },
    DropTableMetaPop() {
      this.centerDialogVisible = true;

      let tab =
        this.TargetruleForm.targetbase + "." + this.TargetruleForm.targettable;
      this.diagContent = "确定要删除表:   " + tab + " ?";
    },
    DropTableMeta() {
      this.centerDialogVisible = false;
      let stringUrl = "http://10.30.64.222:8520/api/hive2ck_drop";

      axios({
        method: "post",
        url: stringUrl,
        data: "table_name=" + this.TargetruleForm.targettable,
      }).then((response) => {
        console.log("response", response);
        // let res_status = response.data;
        // console.log(
        //   "drop table " +
        //     this.TargetruleForm.targetbase +
        //     "." +
        //     this.TargetruleForm.targettable +
        //     " on cluster " +
        //     this.TargetruleForm.targetbase
        // );
        // if (res_status == 200) {
        //   alert("Ck 表删除成功!");
        // } else {
        //   alert("Ck 表删除失败." + response.data);
        // }
      });
    },
  },
};
</script>



<style scoped >
.index {
  display: flex;
}
.step {
  margin: 35px 0 45px 150px;
  width: 100%;
  /* width: 1300px; */
  /* background-color: lavender; */
  height: 80px;
  font-size: 24px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

.box-card {
  margin-left: 210px;
  width: 1450px;
  /* height: auto; */
  /* width: 1150px; */
  height: 850px;
  /* overflow-y: auto; */
}

.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
  border: 1px solid green;
}

.trs {
  margin-top: 30px;
  /* margin-left: 30px; */
  padding-left: 3px;
  /* background-color: lightblue; */
  display: flex;
  justify-content: left;
  align-items: center;
}
.trs >>> .el-transfer-panel {
  width: 420px;
}

.trs >>> .el-transfer-panel__body {
  height: 450px;
  border: 1px solid rgb(212, 212, 209);
}

.trs >>> .el-transfer-panel__header {
  height: 40px;
  line-height: 40px;
  background: #c9d5e8;
  /* background: #80a874; */
  margin: 0;
  padding-left: 15px;
  border-bottom: 1px solid #d1e4a5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.trs >>> .el-transfer-panel__list {
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 446px;
  overflow: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.card-content1 {
  display: flex;
}

.card-content2 {
  display: flex;
}

.card-left {
  /* background-color: rgb(212, 212, 209); */
  width: 50%;
  height: 200px;
}

.card-right {
  /* background-color: oldlace; */
  width: 50%;
  height: 200px;
  border-left: thin dashed gray;
  /* border-left: none dashed gray; */
}
.car-left-down {
  /* background-color: rosybrown; */
  width: 70%;
  height: 500px;
}

.car-right-down {
  /* background-color: royalblue; */
  width: 30%;
  height: 220px;
  margin-top: 100px;
  align-items: left;
}

.el-form-item >>> .el-form-item__label {
  text-align: left;
  /* float: left; */
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.box-card-textarea {
  background-color: lightblue;
  margin-left: 200px;
  width: 1450px;
  height: 850px;
}

.next_btn {
  /* background-color: lightcyan; */
  margin-top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.next_btn_2 {
  /* background-color: lightcyan; */
  width: 360px;

  /* display: flex;
  justify-content: right;
  align-items: right; */
}
</style>