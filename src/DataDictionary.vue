<template>
  <el-main>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资产清单">
        <el-row class="el-row">
          <el-table
            :data="AssetsListDate"
            :header-cell-style="{
              background: '#fab969',
              borderColor: '#3e3e3e',
              textAlign: 'center',
              color: '#000000',
            }"
            border
            style="width: 100%"
          >
            <el-table-column prop="rn" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="dw_lvl" label="层级" width="80">
            </el-table-column>
            <el-table-column prop="table_name" label="资产名称" width="450">
            </el-table-column>
            <el-table-column prop="table_comment" label="资产解释" width="450">
            </el-table-column>
            <el-table-column prop="source_type" label="资产分类" width="100">
            </el-table-column>
            <el-table-column prop="md_rule" label="主数据/规则" width="580">
              <template #default="{ row }">
                <span
                  v-if="row.md_rule"
                  style="
                    display: flex;
                    flex-wrap: nowrap;
                    flex-direction: row;
                    justify-content: flex-start;
                  "
                >
                  <div
                    v-for="(item, index) in row.md_rule.split(',')"
                    :key="index"
                    style="border-radius: 0.533333rem; margin-left: 10px"
                  >
                    <el-tag
                      :type="
                        item != '' && index % 2 == 0 ? 'primary' : 'success'
                      "
                    >
                      {{ item }}
                    </el-tag>
                  </div>
                </span>
              </template>
              <!-- 
              <template slot-scope="scope" v-if="scope.row.md_rule != ''">
                <el-tag>
                  {{ scope.row.md_rule }}
                </el-tag>
              </template> -->
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="数仓字典">
        <el-row class="el-row">
          <div class="btn1">
            <el-input
              v-model="inputSearch"
              placeholder="请输入数仓表名..."
              style="width: 750px"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>

            <template>
              <el-select
                ref="SelectDB"
                v-model="value"
                placeholder="请选择数仓库..."
                style="margin-left: 20px"
              >
                <el-option
                  v-for="item in SelectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>

            <el-button
              type="primary"
              style="margin-left: 20px"
              @click="searchtable()"
              >查询数仓表</el-button
            >
          </div>
          <el-table :data="DataDictableDataDetail">
            <el-table-column label="表名" width="350">
              <template slot-scope="dataDicResScope">
                <span
                  style="
                    margin-left: 10px;
                    font-size: 16px;
                    font-weight: bolder;
                    text-decoration: underline;
                    color: #008fd4;
                  "
                  >{{ dataDicResScope.row.table_name }}</span
                >
              </template>
            </el-table-column>

            <el-table-column label="表含义" width="250">
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">
                  {{ dataDicResScope.row.table_comment }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="列名" width="250">
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.column_name
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="列含义" width="230">
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.column_mean
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="字段类型" width="120">
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.column_type
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="最近修改人" width="150">
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.author
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数仓层级" width="110">
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.dw_lvl
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="210">
              <i class="el-icon-time"></i>
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.create_time
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="数据源字典">
        <el-row class="el-row">
          <div class="btn1">
            <el-input
              v-model="DsginputSearch"
              placeholder="查询贴源表是否同步到数仓...,可以模糊查询"
              style="width: 750px"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>

            <el-button
              type="primary"
              style="margin-left: 20px"
              @click="DsgSearchTable()"
              >查询表是否同步到数仓</el-button
            >
          </div>
          <el-table :data="DsgSourceDetail">
            <el-table-column label="字段序号" width="250">
              <template slot-scope="DsgResScope">
                <span style="margin-left: 10px">
                  {{ DsgResScope.row.column_id }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="属主" width="150">
              <template slot-scope="DsgResScope">
                {{ DsgResScope.row.owner }}
              </template>
            </el-table-column>

            <el-table-column label="表名" width="250">
              <template slot-scope="DsgResScope">
                <span style="margin-left: 10px">
                  {{ DsgResScope.row.table_name }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="字段名" width="250">
              <template slot-scope="DsgResScope">
                <span style="margin-left: 10px">{{
                  DsgResScope.row.column_name
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="字段类型" width="180">
              <template slot-scope="DsgResScope">
                <span style="margin-left: 10px">{{
                  DsgResScope.row.data_type
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" width="210">
              <i class="el-icon-time"></i>
              <template slot-scope="DsgResScope">
                <span style="margin-left: 10px">{{
                  DsgResScope.row.update_date
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="主数据">
        <div class="card">
          <el-card class="box-card1">
            <h2>主数据类型代码 : 主数据类型含义</h2>
            <div v-for="(value, key) in carIndex1" :key="key" class="text item">
              {{ key }} : {{ value }}
            </div>
          </el-card>

          <el-card class="box-card2">
            <h2>主数据类型 : 主数据定义规则</h2>
            <div v-for="(value, key) in carIndex2" :key="key" class="text item">
              {{ key }} : {{ value }}
            </div>
          </el-card>

          <el-table
            border
            height="480"
            v-infinite-scroll="ScrollLoad"
            :infinite-scroll-distance="1000"
            :data="scrollMdList"
            :row-class-name="tableRowClassName"
            :header-cell-style="{
              color: '#fff',
              fontSize: '18px',
              background: '#000',
            }"
          >
            <el-table-column
              prop="md_code"
              label="主数据编码"
              width="220"
            ></el-table-column>
            <el-table-column
              prop="md_mean"
              label="主数据含义"
              width="220"
            ></el-table-column>
            <el-table-column
              prop="md_type"
              label="主数据类型"
              width="210"
            ></el-table-column>
          </el-table>
        </div>

        <div class="md">
          <el-row class="el-row">
            <div class="btn1">
              <el-input
                v-model="MdinputSearch"
                placeholder="eg. A001,B001 ..."
                style="width: 150px"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>

              <el-button
                type="primary"
                style="margin-left: 20px"
                @click="MdSearchParentCde()"
                >查询主数据编码</el-button
              >

              <el-input
                v-model="MdinputSearchMdMean"
                placeholder="共保方式/渠道大类"
                style="width: 150px; margin-left: 15px"
              >
                <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
              </el-input>

              <el-button
                type="primary"
                style="margin-left: 15px"
                @click="MdSearchMdMean()"
                >查询主数据含义</el-button
              >

              <el-input
                v-model="MdinputSearchSub"
                placeholder="B0010001 ..."
                style="width: 150px; padding-left: 10px"
              >
                <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
              </el-input>

              <el-button
                type="primary"
                style="margin-left: 15px"
                @click="MdSearchSubCde()"
                >查询数仓编码</el-button
              >

              <el-input
                v-model="MdinputSearchSubMean"
                placeholder="法人客户/个人客户 ..."
                style="width: 150px; padding-left: 10px"
              >
                <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
              </el-input>

              <el-button
                type="primary"
                style="margin-left: 15px"
                @click="MdSearchSubCdeMean()"
                >模糊查询子编码含义</el-button
              >

              <el-button
                type="primary"
                style="margin-left: 120px"
                @click="
                  dialogAddMd = true;
                  AddMdInit();
                "
                >新增主数据</el-button
              >

              <el-dialog title="新增主数据" :visible.sync="dialogAddMd">
                <el-form
                  :model="AddMdForm"
                  :rules="AddMdrules"
                  ref="AddMdForm"
                  label-width="150px"
                  class="demo-AddMdForm"
                >
                  <el-form-item label="编码大类" prop="md_type">
                    <el-input v-model="AddMdForm.md_type"></el-input>
                  </el-form-item>
                  <el-form-item label="主数据编码" prop="md_parent_cde">
                    <el-input v-model="AddMdForm.md_parent_cde"></el-input>
                  </el-form-item>
                  <el-form-item label="主数据含义" prop="md_parent_nme">
                    <el-input v-model="AddMdForm.md_parent_nme"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitMdForm('AddMdForm')"
                      >新增</el-button
                    >
                    <el-button @click="AddMdresetForm('AddMdForm')"
                      >清空</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-dialog>

              <el-button
                type="primary"
                style="margin-left: 10px"
                @click="
                  dialogAddMdSubCde = true;
                  AddMdSubCdeInit();
                "
                >新增主数据子编码</el-button
              >

              <el-dialog
                title="新增主数据子编码"
                :visible.sync="dialogAddMdSubCde"
              >
                <el-form
                  :model="AddMdSubCdeForm"
                  :rules="AddMdSubCderules"
                  ref="AddMdSubCdeForm"
                  label-width="150px"
                  class="demo-AddMdForm"
                >
                  <el-form-item label="编码大类" prop="md_type">
                    <el-input v-model="AddMdSubCdeForm.md_type"></el-input>
                  </el-form-item>
                  <el-form-item label="主数据编码" prop="md_parent_cde">
                    <el-input
                      v-model="AddMdSubCdeForm.md_parent_cde"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="主数据含义" prop="md_parent_nme">
                    <el-input
                      v-model="AddMdSubCdeForm.md_parent_nme"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="原本级编码" prop="ods_sub_cde">
                    <el-input v-model="AddMdSubCdeForm.ods_sub_cde"></el-input>
                  </el-form-item>
                  <el-form-item label="主数据子编码" prop="md_sub_cde">
                    <el-input v-model="AddMdSubCdeForm.md_sub_cde"></el-input>
                  </el-form-item>
                  <el-form-item label="主数据子编码含义" prop="md_sub_nme">
                    <el-input v-model="AddMdSubCdeForm.md_sub_nme"></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="submitMdSubCdeForm('AddMdSubCdeForm')"
                      >新增</el-button
                    >
                    <el-button @click="AddMdresetForm('AddMdSubCdeForm')"
                      >清空</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-dialog>
            </div>
            <el-table :data="MdSourceDetail">
              <el-table-column label="编码大类" width="80">
                <template slot-scope="MdResScope">
                  <span style="margin-left: 10px">
                    {{ MdResScope.row.md_type }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column label="主数据编码" width="90">
                <template slot-scope="MdResScope">
                  {{ MdResScope.row.md_parent_cde }}
                </template>
              </el-table-column>

              <el-table-column label="主数据含义" width="150">
                <template slot-scope="MdResScope">
                  <span style="margin-left: 10px">
                    {{ MdResScope.row.md_parent_nme }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column label="原本级编码" width="150">
                <template slot-scope="MdResScope">
                  <span style="margin-left: 10px">{{
                    MdResScope.row.ods_sub_cde
                  }}</span>
                </template>
              </el-table-column>

              <el-table-column label="主数据子编码" width="280">
                <template slot-scope="MdResScope">
                  <span style="margin-left: 10px">{{
                    MdResScope.row.md_sub_cde
                  }}</span>
                </template>
              </el-table-column>

              <el-table-column label="主数据子编码含义" width="480">
                <template slot-scope="MdResScope">
                  <span style="margin-left: 10px">{{
                    MdResScope.row.md_sub_nme
                  }}</span>
                </template>
              </el-table-column>

              <el-table-column label="创建时间" width="210">
                <i class="el-icon-time"></i>
                <template slot-scope="MdResScope">
                  <span style="margin-left: 10px">{{
                    MdResScope.row.create_date
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="更新时间" width="210">
                <i class="el-icon-time"></i>
                <template slot-scope="MdResScope">
                  <span style="margin-left: 10px">{{
                    MdResScope.row.update_date
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>



<script>
import axios from "axios";

export default {
  data() {
    return {
      activeName: 0,
      inputSearch: "",
      MdinputSearch: "",
      MdinputSearchSub: "",
      MdinputSearchSubMean: "",
      MdinputSearchMdMean: "",
      DsginputSearch: "",
      DataDictableDataDetail: [],
      DsgSourceDetail: [],
      MdSourceDetail: [],
      carIndex1: [
        { A: "公共类型" },
        { B: "标的人" },
        { C: "标的车" },
        { D: "标的物" },
        { E: "保单范畴" },
        { F: "理赔范畴" },
        { H: "服务范畴" },
        { I: "销管" },
        { J: "费用" },
        { G: "国标" },
        { K: "再保" },
        { L: "收付" },
        { M: "人事" },
      ],
      carIndex2: {
        公共类型: "无业务背景；保险公司范围内各系统共用数据",
        标的人: "人相关的属性或者人具备的性质",
        标的车: "标的车相关的属性",
        标的物: "标的物相关的属性(车除外)",
        保单范畴: "保险承保范围内的属性",
        理赔范畴: "保险理赔范围内的属性",
        收付: "保险收付范围内的属性",
        销管: "销管",
        费用: "费控/费用",
        国标: "数据类型为国标范围",
        服务范畴: "保险服务范围内的属性;比如增值服务;客户关怀、客户回访服务等",
        再保: "再保系统",
        人事: "人事系统",
      },
      scrollMdList: [],
      AddMdForm: {
        name: "",
        delivery: false,
      },
      AddMdSubCdeForm: {
        name: "",
        delivery: false,
      },
      dialogAddMd: false,
      dialogAddMdSubCde: false,
      AddMdrules: {
        md_parent_cde: [
          { required: true, message: "请录入主数据编码", trigger: "change" },
        ],
        md_parent_nme: [
          {
            required: true,
            message: "请录入主数据编码含义",
            trigger: "change",
          },
        ],
        md_type: [
          {
            required: true,
            message: "请录入主数据类型",
            trigger: "change",
          },
        ],
      },
      AddMdSubCderules: {
        md_type: [
          { required: true, message: "请录入指大类名称", trigger: "blur" },
          {
            min: 4,
            max: 6,
            message: "长度在 4 到 6 个字符",
            trigger: "blur",
          },
        ],
        md_parent_cde: [
          { required: true, message: "请录入主数据编码", trigger: "change" },
        ],
        md_parent_nme: [
          {
            required: true,
            message: "请录入主数据编码含义",
            trigger: "change",
          },
        ],
        ods_sub_cde: [
          {
            required: true,
            message: "请录入原本级编码(业务库枚举值)",
            trigger: "change",
          },
        ],
        md_sub_cde: [
          {
            required: true,
            message: "请录入主数据子编码(数仓编码)",
            trigger: "change",
          },
        ],
        md_sub_nme: [
          {
            required: true,
            message: "请录入主数据子编码含义",
            trigger: "change",
          },
        ],
      },
      value: "",
      SelectOptions: [
        {
          value: "default",
          label: "default",
        },
        {
          value: "ods",
          label: "ods",
        },
        {
          value: "dcl",
          label: "dcl",
        },
        {
          value: "dw",
          label: "dw",
        },
        {
          value: "mdp",
          label: "mdp",
        },
        {
          value: "dim",
          label: "dim",
        },
        {
          value: "mid",
          label: "mid",
        },
        {
          value: "tmp",
          label: "tmp",
        },
        {
          value: "realtime",
          label: "realtime",
        },
        {
          value: "datacheck",
          label: "datacheck",
        },
        {
          value: "east_bak",
          label: "east_bak",
        },
        {
          value: "realtime_dcl",
          label: "realtime_dcl",
        },
        {
          value: "realtime_dw",
          label: "realtime_dw",
        },
        {
          value: "realtime_mid",
          label: "realtime_mid",
        },
      ],
      SelectDB: [],
      AssetsListDate: [
        {
          dw_lvl: "dw",
          table_name: "dw_zsclm_c_loss_pro",
          table_comment: "车损清单表",
          source_type: "其他",
        },
      ],
    };
  },

  methods: {
    handleClick(tab) {
      if (tab.label == "主数据") {
        this.ScrollLoad();
      }
    },
    getCurrentTime() {
      //获取当前时间
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      var currentTime =
        year +
        "-" +
        dateArr[0] +
        "-" +
        dateArr[1] +
        " " +
        dateArr[2] +
        ":" +
        dateArr[3] +
        ":" +
        dateArr[4];
      // console.log('strDate',strDate)
      return currentTime;
    },
    getCurrentDate() {
      //获取当前天
      var date = new Date();
      var year = date.getFullYear();
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      var currentDate = year + "-" + dateArr[0] + "-" + dateArr[1];
      return currentDate;
    },
    searchtable() {
      let stringUrl =
        "http://xx.xx.xx.xx:0000/DataMiddleOffice/DataDicSearchTable?table_name=" +
        this.inputSearch +
        "&db_name=" +
        this.$refs.SelectDB.selected.label;
      // console.log("option", stringUrl);
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log(res.data.data);
          this.DataDictableDataDetail = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    DsgSearchTable() {
      let stringUrl =
        "http://xx.xx.xx.xx:0000/DataMiddleOffice/DsgSearchTableDetail?table_name=" +
        this.DsginputSearch;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log(res.data.data);
          this.DsgSourceDetail = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ScrollLoad() {
      let stringUrl = "http://xx.xx.xx.xx:0000/DataMiddleOffice/MdmTypeList";
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log("res", res.data.data);
          this.scrollMdList = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
      return "";
    },
    _filterChange() {
      this.totalSize = this.$refs.table.scrollMdList.length;
      console.log(this.totalSize);
    },
    MdSearchParentCde() {
      let stringUrl =
        "http://xx.xx.xx.xx:0000/DataMiddleOffice/MdSearchParentCde?md_parent_cde=" +
        this.MdinputSearch;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log("res", res.data.data);
          this.MdSourceDetail = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MdSearchSubCde() {
      let stringUrl =
        "http://xx.xx.xx.xx:0000/DataMiddleOffice/MdSearchSubCde?md_sub_cde=" +
        this.MdinputSearchSub;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log("res", res.data.data);
          this.MdSourceDetail = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MdSearchSubCdeMean() {
      let stringUrl =
        "http://xx.xx.xx.xx:0000/DataMiddleOffice/MdinputSearchSubMean?md_sub_nme=" +
        this.MdinputSearchSubMean;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log("res", res.data.data);
          this.MdSourceDetail = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MdSearchMdMean() {
      let stringUrl =
        "http://xx.xx.xx.xx:0000/DataMiddleOffice/MdSearchMdMean?md_parent_nme=" +
        this.MdinputSearchMdMean;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log("res", res.data.data);
          this.MdSourceDetail = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AddMdInit() {
      this.AddMdForm = {};
    },
    AddMdSubCdeInit() {
      this.AddMdSubCdeForm = {};
    },
    submitMdSubCdeForm(submitForm) {
      this.$refs[submitForm].validate((valid) => {
        if (valid) {
          this.dialogAddMdSubCde = false;
          axios({
            method: "post",
            url: "http://xx.xx.xx.xx:0000//DataMiddleOffice/MdAddSubCode",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
            data: {
              md_type: submitForm.md_type,
              md_parent_cde: submitForm.md_parent_cde,
              md_parent_nme: submitForm.md_parent_nme,
              ods_sub_cde: submitForm.ods_sub_cde,
              md_sub_cde: submitForm.md_sub_cde,
              md_sub_nme: submitForm.md_sub_nme,
              create_time: this.getCurrentTime(),
              update_time: this.getCurrentTime(),
            },
          }).then((response) => {
            // console.log(response);
          });

          alert("已保存!");
        } else {
          console.log("保存失败!!,请务多次提交");
          return false;
        }
      });
    },
    submitMdForm(submitForm) {
      this.$refs[submitForm].validate((valid) => {
        if (valid) {
          this.dialogAddMd = false;
          axios({
            method: "post",
            url: "http://xx.xx.xx.xx:0000//DataMiddleOffice/MdAddMd",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
            data: {
              md_type: submitForm.md_type,
              md_parent_cde: submitForm.md_parent_cde,
              md_parent_nme: submitForm.md_parent_nme,
              create_time: this.getCurrentTime(),
              update_time: this.getCurrentTime(),
            },
          }).then((response) => {
            // console.log(response);
          });

          alert("已保存!");
        } else {
          console.log("保存失败!!,请务多次提交");
          return false;
        }
      });
    },
    AddMdresetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loadAllAssets() {
      let stringUrl =
        "http://xx.xx.xx.xx:0000/DataMiddleOffice/ListingOfAllAssets";
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log(res.data.data);
          this.AssetsListDate = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.loadAllAssets();
  },
};
</script>


<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #809dc5;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #5183bd;
}

.card {
  display: flex;
}

.md {
  padding-top: 10px;
}
.text {
  font-size: 16px;
  text-align: left;
}

.item {
  padding: 3px 0;
}

.box-card1 {
  font-size: 16px;
  width: 480px;
  background-color: lightblue;
}

.box-card2 {
  font-size: 16px;
  width: 580px;
  background-color: lightsalmon;
}

.infinite-list {
  margin-top: 0px;
  padding-bottom: 0px;
  background-color: rgb(245, 218, 142);
  width: 620px;
  height: auto;
  margin: 0px 0px 0px;
}
.infinite-list-item {
  width: 500px;
  height: 40px;
  line-height: 40px;
  /* background: lightblue; */
  /* margin: 10px; */
  overflow: auto;
}

.el-table .warning-row {
  background: rgb(238, 194, 112);
}

.el-table .success-row {
  background: darkseagreen;
}
</style>
