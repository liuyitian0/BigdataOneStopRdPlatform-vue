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
            <el-table-column prop="md_rule" label="主数据/规则" width="680">
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
                style="margin-left: 20px; width: 188px"
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

      <el-tab-pane label="表血缘">
        <input
          class="banner_input1"
          type="text"
          v-model.trim="Searchtablename"
          placeholder="表名..."
        />

        <el-select
          ref="selectDirc"
          v-model="value_table"
          placeholder="选择上下游"
        >
          <el-option
            v-for="item in options_dirc"
            :key="item.value_table"
            :label="item.label"
            :value="item.value_table"
          >
          </el-option>
        </el-select>

        <el-select
          ref="selectLevel"
          v-model="value_level"
          placeholder="选择层级"
        >
          <el-option
            v-for="item in options_level"
            :key="item.value_level"
            :label="item.label"
            :value="item.value_level"
          >
          </el-option>
        </el-select>

        <el-button
          type="primary"
          class="banner_Btn1"
          @click="getTabLineagedata()"
        >
          查看表血缘
        </el-button>
        <!-- <el-tooltip content="放大" effect="light">
          <el-button icon="el-icon-zoom-in" circle></el-button>
        </el-tooltip>
        <el-tooltip content="缩小" effect="light">
          <el-button icon="el-icon-zoom-out"  @click="zoomin()" circle></el-button>
        </el-tooltip> -->

        <i class="el-icon-location"> {{ Searchtablename }}</i>

        <div>
          <div id="container1"></div>
          <div ref="miniMapContainerTab" class="miniMap"></div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="字段血缘">
        <input
          class="banner_input1"
          type="text"
          v-model.trim="tab"
          placeholder="表名..."
        />
        <input
          class="banner_input1_col"
          type="text"
          v-model.trim="col"
          placeholder="字段列..."
        />

        <el-select
          ref="selectColDirc"
          v-model="value_col"
          placeholder="选择上下游"
        >
          <el-option
            v-for="item in options_col_dirc"
            :key="item.value_col"
            :label="item.label"
            :value="item.value_col"
          >
          </el-option>
        </el-select>

        <el-button
          type="primary"
          class="banner_Btn1"
          @click="getColLineagedata(tab, col)"
        >
          查看字段血缘
        </el-button>
        <i class="el-icon-location"> {{ tab }}.{{ col }} </i>

        <div>
          <div id="container2"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>



<script>
import axios from "axios";
import { GetDataGraph } from "@/utils/GetDataGraph";
import { DagreLayout } from "@antv/layout";
import {
  GetColRectDataGraph,
  GetColEdgeDataGraph,
  GetRowPorts,
  GetErRect,
  SourceGetErRect,
} from "@/utils/GetColDataGraph";
const LINE_HEIGHT = 32;
const NODE_WIDTH = 300;

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
        {
          value: "pg2hive",
          label: "pg2hive",
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
      selectDirc: [],
      value_table: "down",
      options_dirc: [
        {
          value_table: "down",
          label: "下游",
        },
        {
          value_table: "up",
          label: "上游",
        },
      ],
      selectLevel: [],
      value_level: "3",
      options_level: [
        {
          value_level: "1",
          label: "1层",
        },
        {
          value_level: "2",
          label: "2层",
        },
        {
          value_level: "3",
          label: "3层",
        },
        {
          value_level: "4",
          label: "4层",
        },
        {
          value_level: "5",
          label: "5层",
        },
      ],
      Searchtablename: null,

      tab: "dw_crm_supper_case_details",
      col: "rescue_record_date",
      selectColDirc: [],
      options_col_dirc: [
        {
          value_col: "down",
          label: "下游一层",
        },
        {
          value_col: "up",
          label: "上游一层",
        },
      ],
      value_col: "down",
      levelcnt: 3,

      miniMapContainerTab: null,
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
    /*表*/
    getTabLineagedata() {
      // this.GetTab(this.Searchtablename, this.$refs.selectLevel.selected.label); --- old
      let dirc = this.$refs.selectDirc.selected.label; // 上下游
      let lvl = this.$refs.selectLevel.selected.value; // 层级
      this.GetTab(this.Searchtablename, dirc, lvl);
    },
    GetTab(Inputtable, dirc, level) {
      this.alldata = {};
      this.node = [];
      this.edge = [];
      this.jsondata = [];
      this.graph = null;
      this.newModel = {};
      this.miniMapContainerTab = this.container;
      let stringUrl =
        "http://xx.xx.xx.xx:0000/table/" + Inputtable.toLowerCase();

      fetch(stringUrl, {
        hearders: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      })
        .then((res) => res.json())
        .then((tables) => {
          // console.log("res", tables);
          if (dirc == "下游" && tables.length != 0) {
            tables.down.forEach((item) => {
              if (item.type <= level) {
                // 装载指定层级内的数据
                this.node.push(GetDataGraph(item.s, item.t)[0]);
                this.edge.push(GetDataGraph(item.s, item.t)[1]);
              }
            });
          } else {
            tables.up.forEach((item) => {
              if (item.type <= level) {
                // 装载指定层级内的数据
                this.node.push(GetDataGraph(item.t, item.s)[0]);
                this.edge.push(GetDataGraph(item.s, item.t)[1]);
              }
            });
          }

          this.alldata.nodes = this.node;
          this.alldata.edges = this.edge;
          // console.log("alldata", this.alldata);
          if (this.alldata.nodes.length != 0) {
            this.miniMapContainerTab = this.$refs.miniMapContainerTab;
            const graph = new X6.Graph({
              container: document.getElementById("container1"),
              width: 3000,
              height: 3000,
              snapline: true,
              background: {
                color: "#ffffff",
              },
              grid: {
                size: 10, // 网格大小 10px
                visible: false, // 渲染网格背景
              },
              scroller: {
                enabled: true,
                pageVisible: true,
                pageBreak: true,
                pannable: true,
              },
              minimap: {
                enabled: true,
                container: this.miniMapContainerTab,
              },
            });
            const dagreLayout = new DagreLayout({
              type: "dagre",
              rankdir: "LR",
              align: "UR",
              ranksep: 100,
              nodesep: 20,
              controlPoints: true,
            });
            // console.log("this.tabledata", this.alldata);
            const newModel = dagreLayout.layout(this.alldata);
            graph.fromJSON(newModel);
            // graph.centerContent();
          }
        }); //fetch
    },

    /*字段*/
    getColLineagedata(tab, col) {
      this.canvnsCol(
        this.tab,
        this.col,
        this.$refs.selectColDirc.selected.label
      );
    },
    canvnsCol(tab, col, selectlabel) {
      this.cellsAll = [];
      this.graphCol = {};
      this.jsonERdata = {};
      this.resEdge = {};
      this.all_col_nodes = [];
      this.all_col_edges = [];
      this.all_models = {};

      const graphCol = new X6.Graph({
        container: document.getElementById("container2"),
        connecting: {
          router: {
            name: "er",
            args: {
              offset: 25,
              direction: "H",
            },
          },
          createEdge() {
            return new X6.Shape.Edge({
              attrs: {
                line: {
                  stroke: "#A2B1C3",
                  strokeWidth: 2,
                },
              },
            });
          },
        },
        width: 4600,
        height: 4600,
        snapline: true,
        background: {
          color: "#ffffff",
        },
        grid: {
          size: 10, // 网格大小 10px
          visible: false, // 渲染网格背景
        },
        scroller: {
          enabled: true,
          pageVisible: true,
          pageBreak: true,
          pannable: true,
        },
      });

      X6.Graph.registerPortLayout(
        "erPortPosition",
        (portsPositionArgs) => {
          return portsPositionArgs.map((_, index) => {
            return {
              position: {
                x: 0,
                y: (index + 1) * LINE_HEIGHT,
              },
              angle: 0,
            };
          });
        },
        true
      );

      X6.Graph.registerNode(
        "er-rect",
        {
          inherit: "rect",
          markup: [
            {
              tagName: "rect",
              selector: "body",
            },
            {
              tagName: "text",
              selector: "label",
            },
          ],
          attrs: {
            rect: {
              strokeWidth: 1,
              stroke: "#5F95FF",
              fill: "#5F95FF",
            },
            label: {
              fontWeight: "bold",
              fill: "#ffffff",
              fontSize: 14,
            },
          },
          ports: {
            groups: {
              list: {
                markup: [
                  {
                    tagName: "rect",
                    selector: "portBody",
                  },
                  {
                    tagName: "text",
                    selector: "portNameLabel",
                  },
                  {
                    tagName: "text",
                    selector: "portTypeLabel",
                  },
                ],
                attrs: {
                  portBody: {
                    width: NODE_WIDTH,
                    height: LINE_HEIGHT,
                    strokeWidth: 1,
                    stroke: "#5F95FF",
                    fill: "#EFF4FF",
                    magnet: true,
                  },
                  portNameLabel: {
                    ref: "portBody",
                    refX: 6,
                    refY: 8,
                    fontSize: 16,
                  },
                  portTypeLabel: {
                    ref: "portBody",
                    refX: 250,
                    refY: 8,
                    fontSize: 14,
                  },
                },
                position: "erPortPosition",
              },
            },
          },
        },
        true
      );

      if (selectlabel === "上游一层") {
        let stringUrl =
          "http://xx.xx.xx.xx:0000/DataMiddleOffice/LineageColumnUp?table_name=" +
          tab +
          "&col_name=" +
          col;
        axios({
          method: "get",
          url: stringUrl,
        })
          .then((res) => {
            this.jsonERdata = res.data.data;
            // console.log("jsonERdata", this.jsonERdata);
            this.jsonERdata.forEach((res) => {
              // console.log("res", res);
              this.recursiveColUP(res, graphCol);
            });
            graphCol.resetCells(this.cellsAll); // 重新绘制节点和边
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        let stringUrl =
          "http://xx.xx.xx.xx:0000/DataMiddleOffice/LineageColumnDown?table_name=" +
          tab +
          "&col_name=" +
          col;

        axios({
          method: "get",
          url: stringUrl,
        })
          .then((res) => {
            this.jsonERdata = res.data.data;
            // console.log("jsonERdata", this.jsonERdata);
            this.jsonERdata.forEach((res) => {
              // console.log("res", res);
              this.recursiveColDOWN(res, graphCol);
            });
            graphCol.resetCells(this.cellsAll); // 重新绘制节点和边
          })
          .catch((error) => {
            console.log(error);
          });
      } //if

      const ColLineagedagreLayout = new DagreLayout({
        type: "dagre",
        rankdir: "LR",
        align: "UR",
        ranksep: 100,
        nodesep: 20,
        controlPoints: true,
      });

      // console.log("this.all_col_edges", this.all_col_edges);
      // console.log("this.all_col_nodes", this.all_col_nodes);
      this.all_models.nodes = this.all_col_nodes;
      this.all_models.edges = this.all_col_edges;
      console.log("this.all_col_nodes", this.all_models);
      const ColLineagenewModel = ColLineagedagreLayout.layout(this.all_models);

      graphCol.fromJSON(ColLineagenewModel);
    },
    recursiveColUP(res, graphCol) {
      let resEdge = {};
      let tabjoin = null;
      let tabcol1 = null;
      let tabcol2 = null;
      let resRectNode1 = null;
      let resRectNode2 = null;
      let colist = res.src_col_list.split(",");
      let resPorts = [];
      let sresPorts = [];
      let resErRect = {};
      let resSourceNodeErRect = {};

      // create  source node
      resSourceNodeErRect = SourceGetErRect(res.tar_tab_nme, 100, 500);
      let stabcfg = res.tar_tab_nme + "." + res.tar_tab_nme;
      // console.log("stabcfg", stabcfg);
      sresPorts.push(
        GetRowPorts(res.tar_tab_nme, stabcfg, res.tar_col_nme, 300, 40)
      );

      this.$set(resSourceNodeErRect, "ports", sresPorts);
      // console.log("resSourceNodeErRect", resSourceNodeErRect);
      // console.log("sresPorts", sresPorts);
      this.cellsAll.push(graphCol.createNode(resSourceNodeErRect));

      if (colist.length > 1) {
        // Node
        resErRect = GetErRect(res.src_tab_nme, 500, 80);
        colist.forEach((subcol) => {
          let tabcfg = res.src_tab_nme + "." + subcol;
          resPorts.push(GetRowPorts(res.src_tab_nme, tabcfg, subcol, 500, 80));

          //add edge
          tabjoin =
            res.tar_tab_nme +
            "." +
            res.tar_col_nme +
            "_" +
            res.src_tab_nme +
            "." +
            subcol;
          resEdge = GetColEdgeDataGraph(
            tabjoin,
            res.tar_tab_nme,
            res.tar_col_nme,
            res.src_tab_nme,
            res.src_tab_nme + "." + subcol
          );
          // console.log("resErRect", resErRect);
          // console.log("resEdge", resEdge);

          // create edge
          this.cellsAll.push(graphCol.createEdge(resEdge));
        });
        this.$set(resErRect, "ports", resPorts);
        // console.log("resErRect", resErRect);
        this.cellsAll.push(graphCol.createNode(resErRect));
      } else if (res.src_tab_nme && res.src_col_list) {
        tabcol1 = res.src_tab_nme + "." + res.src_col_list;
        resRectNode1 = GetColRectDataGraph(
          res.src_tab_nme,
          tabcol1,
          res.src_col_list,
          500,
          40
        );
        this.cellsAll.push(graphCol.createNode(resRectNode1));

        tabcol2 = res.tar_tab_nme + "." + res.tar_col_nme;
        resRectNode2 = GetColRectDataGraph(
          res.tar_tab_nme,
          tabcol2,
          res.tar_col_nme,
          10,
          650
        );
        this.cellsAll.push(graphCol.createNode(resRectNode2));
        tabjoin =
          res.src_tab_nme +
          "." +
          res.src_col_nme +
          "_" +
          res.tar_tab_nme +
          "." +
          res.tar_col_list;
        resEdge = GetColEdgeDataGraph(
          tabjoin,
          res.src_tab_nme,
          tabcol2,
          res.tar_tab_nme,
          tabcol1
        );
        this.cellsAll.push(graphCol.createEdge(resEdge));
      } // if
    },
    recursiveColDOWN(res, graphCol) {
      let resEdge = {};
      let tabjoin = null;
      let tabcol1 = null;
      let tabcol2 = null;
      let resRectNode1 = null;
      let resRectNode2 = null;
      let colist = res.tar_col_list.split(",");
      let resPorts = [];
      let sresPorts = [];
      let resErRect = {};
      let resSourceNodeErRect = {};

      // create  source node
      resSourceNodeErRect = SourceGetErRect(res.src_tab_nme, 100, 500);
      let stabcfg = res.src_tab_nme + "." + res.src_col_nme;
      // console.log("stabcfg", stabcfg);
      sresPorts.push(
        GetRowPorts(res.src_tab_nme, stabcfg, res.src_col_nme, 300, 40)
      );

      this.$set(resSourceNodeErRect, "ports", sresPorts);
      // console.log("resSourceNodeErRect", resSourceNodeErRect);
      // console.log("sresPorts", sresPorts);
      this.cellsAll.push(graphCol.createNode(resSourceNodeErRect));

      // console.log("resSourceNodeErRect", resSourceNodeErRect);
      this.all_col_nodes.push(resSourceNodeErRect);

      if (colist.length > 1) {
        // Node
        resErRect = GetErRect(res.tar_tab_nme, 500, 80);
        colist.forEach((subcol) => {
          let tabcfg = res.tar_tab_nme + "." + subcol;
          resPorts.push(GetRowPorts(res.tar_tab_nme, tabcfg, subcol, 500, 80));

          //add edge
          tabjoin =
            res.src_tab_nme +
            "." +
            res.src_col_nme +
            "_" +
            res.tar_tab_nme +
            "." +
            subcol;
          resEdge = GetColEdgeDataGraph(
            tabjoin,
            res.src_tab_nme,
            res.src_col_nme,
            res.tar_tab_nme,
            res.tar_tab_nme + "." + subcol
          );
          // console.log("resErRect", resErRect);
          // console.log("resEdge", resEdge);

          // create edge
          this.cellsAll.push(graphCol.createEdge(resEdge));

          this.all_col_edges.push(resEdge);
          // console.log("resEdge", resEdge);
        });
        this.$set(resErRect, "ports", resPorts);
        // console.log("resErRect", resErRect);
        this.cellsAll.push(graphCol.createNode(resErRect));

        this.all_col_nodes.push(resErRect);
      } else if (res.tar_tab_nme && res.tar_col_list) {
        tabcol1 = res.tar_tab_nme + "." + res.tar_col_list;
        resRectNode1 = GetColRectDataGraph(
          res.tar_tab_nme,
          tabcol1,
          res.tar_col_list,
          500,
          40
        );
        this.cellsAll.push(graphCol.createNode(resRectNode1));

        // console.log("resRectNode1", resRectNode1);
        this.all_col_nodes.push(resRectNode1);
        tabcol2 = res.src_tab_nme + "." + res.src_col_nme;
        resRectNode2 = GetColRectDataGraph(
          res.src_tab_nme,
          tabcol2,
          res.src_col_nme,
          10,
          650
        );
        this.cellsAll.push(graphCol.createNode(resRectNode2));

        // console.log("resRectNode2", resRectNode2);
        this.all_col_nodes.push(resRectNode2);
        tabjoin =
          res.src_tab_nme +
          "." +
          res.src_col_nme +
          "_" +
          res.tar_tab_nme +
          "." +
          res.tar_col_list;
        resEdge = GetColEdgeDataGraph(
          tabjoin,
          res.src_tab_nme,
          tabcol2,
          res.tar_tab_nme,
          tabcol1
        );
        this.cellsAll.push(graphCol.createEdge(resEdge));

        // console.log("resEdge", resEdge);
        this.all_col_edges.push(resEdge);
      } // if
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
  width: 700px;
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

/* 表血缘 */
.banner_Btn1 {
  margin-left: 30px;
}

.banner_input1 {
  margin-left: 10px;
  /* margin-top: 5px; */
  width: 380px;
  height: 36px;
  border-radius: 10px;
}

.banner_Btn1 {
  margin-left: 30px;
}

.el-icon-location {
  margin-left: 100px;
  font-size: 18px;
  font-weight: bold;
  color: green;
}

.miniMap {
  position: fixed;
  z-index: 999;
  bottom: 35px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 240px;
}

.el-select {
  margin-left: 10px;
  width: 126px;
}

/* 字段血缘 */
.banner_input1_col {
  margin-left: 10px;
  width: 150px;
  height: 36px;
  border-radius: 10px;
}
</style>
