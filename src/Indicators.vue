<template>
  <el-main>
    <el-tabs type="border-card">
      <el-tab-pane label="指标查询">
        <el-row class="el-row">
          <div class="btn1">
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入指标名称 ..."
              @select="handleSelect"
              popper-class="el-autocomplete-suggestion"
              style="width: 300px"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>

            <el-button type="primary" @click="dialogAddFotmVisible = true"
              >新增指标</el-button
            >

            <el-dialog title="新增指标" :visible.sync="dialogAddFotmVisible">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="150px"
                class="demo-ruleForm"
              >
                <el-form-item label="指标中文名" prop="name_zn">
                  <el-input v-model="ruleForm.name_zn"></el-input>
                </el-form-item>
                <el-form-item label="指标业务含义" prop="indicator_mean">
                  <el-input v-model="ruleForm.indicator_mean"></el-input>
                </el-form-item>
                <el-form-item label="指标类型" prop="indicator_type">
                  <el-select
                    v-model="ruleForm.indicator_type"
                    placeholder="请选择指标类型"
                  >
                    <el-option label="基础指标" value="基础指标"></el-option>
                    <el-option label="派生指标" value="派生指标"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="指标范围" prop="indicator_scope">
                  <el-select
                    v-model="ruleForm.indicator_scope"
                    placeholder="请选择指标范围"
                  >
                    <el-option label="承保" value="承保"></el-option>
                    <el-option label="理赔" value="理赔"></el-option>
                    <el-option label="财务" value="财务"></el-option>
                    <el-option label="渠道" value="渠道"></el-option>
                    <el-option label="客服" value="客服"></el-option>
                    <el-option label="收付" value="收付"></el-option>
                  </el-select>
                </el-form-item>

                <!-- <el-form-item label="版本" prop="indicator_version">
                  <el-input v-model="ruleForm.indicator_version"></el-input>
                </el-form-item> -->

                <el-form-item label="创建维护人" prop="preserve_person">
                  <el-input v-model="ruleForm.preserve_person"></el-input>
                </el-form-item>

                <!-- <el-form-item label="创建时间" required>
                  <el-col :span="11">
                    <el-form-item prop="create_date">
                      <el-date-picker
                        type="datetime"
                        placeholder="选择日期"
                        v-model="ruleForm.create_date"
                        style="width: 100%"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item> -->
                <el-form-item label="统计口径(SQL)" prop="indicator_sql">
                  <el-input
                    type="textarea"
                    :rows="10"
                    autosize
                    v-model="ruleForm.indicator_sql"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >立即创建</el-button
                  >
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
          <el-table :data="tableDataDetail">
            <el-table-column label="编号" width="80">
              <template slot-scope="scope">
                <span style="margin-left: 10px">
                  {{ scope.row.indicators_id }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="指标中文名" width="300">
              <template slot-scope="scope">
                <!-- <el-popover trigger="hover" placement="top"> -->
                <!-- <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p> -->
                <div slot="reference" class="name-wrapper">
                  <span
                    style="
                      margin-left: 5px;
                      font-size: 16px;
                      font-weight: bolder;
                      text-decoration: underline;
                      color: #008fd4;
                    "
                  >
                    {{ scope.row.indicators_name_zn }}
                  </span>
                </div>
                <!-- </el-popover> -->
              </template>
            </el-table-column>

            <el-table-column label="指标含义" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.indicators_mean
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="统计口径" width="120">
              <template slot-scope="scope">
                <el-button type="text" @click="dialogSQLEditorVisible = true">
                  <i class="el-icon-view el-icon--right"></i>
                  <span style="margin-left: 10px">{{
                    scope.row.indicators_sql
                  }}</span>
                </el-button>

                <el-dialog
                  title="SQL逻辑"
                  :visible.sync="dialogSQLEditorVisible"
                  :append-to-body="true"
                  @open="initEditor"
                  :destroy-on-close="true"
                  :center="true"
                  top="5vh"
                >
                  <div id="container">统计口径:</div>
                </el-dialog>
              </template>
            </el-table-column>
            <el-table-column label="指标类型" width="120">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.indicators_type
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属范围" width="120">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.indicators_scope
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="版本" width="120">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.indicators_version
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建维护人" width="120">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.preserve_person
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="180">
              <i class="el-icon-time"></i>
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.create_time
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" width="180">
              <i class="el-icon-time"></i>
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.update_time
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="常用指标">
        <el-button @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table ref="filterTable" :data="tableData" style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180"
            column-key="date"
            :filters="[
              { text: '2016-05-01', value: '2016-05-01' },
              { text: '2016-05-02', value: '2016-05-02' },
              { text: '2016-05-03', value: '2016-05-03' },
              { text: '2016-05-04', value: '2016-05-04' },
            ]"
            :filter-method="filterHandler"
          >
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址" :formatter="formatter">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            width="100"
            :filters="[
              { text: '家', value: '家' },
              { text: '公司', value: '公司' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions
                >{{ scope.row.tag }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="指标血缘">
        <el-button type="text" @click="dialogTableVisible = true"
          >打开嵌套表格的 Dialog</el-button
        >

        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
          <el-table :data="gridData">
            <el-table-column
              property="date"
              label="日期"
              width="150"
            ></el-table-column>
            <el-table-column
              property="name"
              label="姓名"
              width="200"
            ></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
        </el-dialog>
      </el-tab-pane>

      <el-tab-pane label="指标术语" style="color: #008fd4">
        <div style="padding: 0 90%">
          <el-button type="primary" style="margin-right: 10px"
            >录入术语</el-button
          >
        </div>

        <div>
          签单: <br /><br />
          期初/期末/期间: <br /><br />
          满期保费: <br /><br />
          未满期保费: <br /><br />
          再保:<br /><br />
          共保:
          一般的保单的话，保险公司会和可会签订一个合同，共保是指多个保险公司,一起去承保一张保单，这样的话，会有一个主共从共之分发生共保业务的原因，一般情况下是因为保单的风险过高，如果，我司收到的保单。我司因为风险问题，把这张保单共保出去，我司无论占共保比例是多是少，我司都是主供方，其他公司是从共方，其他保险公司拿到的单子，分给我司的话，我司就是从共方
          <br /><br />
          本币/原币: <br /><br />
          含税/不含税: <br /><br />
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>


<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/basic-languages/sql/sql.contribution";
import qs from "qs";

export default {
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogTableVisible: false,
      dialogAddFotmVisible: false,
      dialogSQLEditorVisible: false,
      editor: null,
      sqlvalue:
        " ----# 订单数 \n" +
        "select rescue  \n " +
        "\t    ,count(distinct workorder_id) as cnt  \n" +
        "  from (                \n " +
        " select get_json_string(columnInfo,'$.update_time') as  update_time      \n " +
        "       ,get_json_string(columnInfo,'$.workorder_id') as  workorder_id    \n" +
        "        ,get_json_string(columnInfo,'$.rescue_project') as  rescue_project  \n " +
        "       ,get_json_string(columnInfo,'$.starttime') as  starttime             \n " +
        "       ,get_json_string(columnInfo,'$.endtime') as  endtime                 \n " +
        "       ,get_json_string(columnInfo,'$.policy_name') as  policy_name        \n " +
        "   from ods.doris_platform_crm_rescue_order tt       \n " +
        "  where SUBSTRING(get_json_string(columnInfo,'$.rescue_handle_date'),1,4)='2022'  \n" +
        " ) aa  \n" +
        "group by rescue;\n",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司",
        },
      ],
      tableDataDetail: [
        {
          indicators_id: "00001",
          indicators_name_zn: "签单保费本币含税",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00002",
          indicators_name_zn: "签单保费原币含税",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00003",
          indicators_name_zn: "签单保费本币不含税",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00004",
          indicators_name_zn: "签单保费原币不含税",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00005",
          indicators_name_zn: "签单保费原币含税期初满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00006",
          indicators_name_zn: "签单保费原币含税期间满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00007",
          indicators_name_zn: "签单保费原币含税期末满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        ,
        {
          indicators_id: "00008",
          indicators_name_zn: "签单保费原币含税期初未满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00009",
          indicators_name_zn: "签单保费原币含税期间未满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00010",
          indicators_name_zn: "签单保费原币含税期末未满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00011",
          indicators_name_zn: "签单保费原币含税期末未满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00012",
          indicators_name_zn: "签单保费原币含税期末未满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00013",
          indicators_name_zn: "签单保费原币含税期末未满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00014",
          indicators_name_zn: "签单保费原币含税期末未满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00015",
          indicators_name_zn: "签单保费原币含税期末未满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
        {
          indicators_id: "00016",
          indicators_name_zn: "签单保费原币含税期末未满期保费",
          indicators_mean: "指的是业务的保费金额",
          indicators_sql: "SQL逻辑",
          indicators_type: "基础指标",
          indicators_scope: "承保",
          indicators_version: "v.01",
          preserve_person: "指标大总管",
          create_time: "2022-05-25 13:14:00",
          update_time: "2022-05-25 13:14:00",
        },
      ],
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name_zn: [
          { required: true, message: "请录入指标名称", trigger: "blur" },
          {
            min: 4,
            max: 28,
            message: "长度在 4 到 28 个字符",
            trigger: "blur",
          },
        ],
        indicator_mean: [
          { required: true, message: "请录入指标业务含义", trigger: "change" },
        ],
        indicator_scope: [
          { required: true, message: "请选择指标范围", trigger: "change" },
        ],
        indicator_type: [
          { required: true, message: "请选择指标类型", trigger: "change" },
        ],
        preserve_person: [
          {
            required: true,
            message: "请录入指标创建维护人",
            trigger: "change",
          },
        ],
        create_data: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        indicator_sql: [
          { required: true, message: "请录入SQL口径", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号",
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113",
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101",
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号",
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号",
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F",
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层",
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺",
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819",
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306",
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元",
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺",
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6",
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号",
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号",
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室",
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部",
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室",
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号",
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位",
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼",
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13",
        },
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },

    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    initEditor() {
      this.editor = monaco.editor.create(document.getElementById("container"), {
        value: this.sqlvalue,
        language: "sql",
        automaticLayout: true,
        theme: "vs-dark",
        selectOnLineNumbers: true, //行号
        fontSize: 16,
        autoIndent: true,
        quickSuggestionsDelay: 500,
        folding: true,
        renderLineHightlight: "gutter",
        glyphMargin: true,
        acceptSuggertionOnCommitCharacter: true,
        acceptSuggertionOnEnter: "on",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogAddFotmVisible = false;
          let formdata = new FormData();
          for (let key in this.ruleForm) {
            formdata.append(key, this.ruleForm[key]);
            console.log(formdata.get(key));
          }
          this.$axios({
            method: "post",
            url: "http://127.0.0.1:8081/users/register",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
            data: formData,
          }).then((response) => {
            console.log(response);
          });

          alert("已保存!");
        } else {
          console.log("保存失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
    // this.initEditor();
  },
};
</script>


<style scoped>
.el-tabs {
  /* background-color: lightblue; */
  width: 100%;
  height: 100%;
}

.btn1 {
  display: flex;
}

.btn1 ::v-deep .el-button {
  border-radius: 6px;
  margin-left: 20px;
  width: 150px;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

::v-deep .el-table th > .cell {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: large;
}

::v-deep .el-table td > .cell {
  line-height: 30px;
}

::v-deep .el-tabs__nav > .is-top {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: larger;
}

.el-row {
  width: 100%;
  height: 100%;
  /* margin-bottom: 20px; */
  /* display: flex; */
  flex-wrap: wrap;
}
</style>