<template>
  <el-main>
    <el-tabs type="border-card">
      <el-tab-pane label="指标查询">
        <el-row class="el-row">
          <div class="btn1">
            <!-- <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入指标名称 ..."
              @select="handleSelect"
              popper-class="el-autocomplete-suggestion"
              style="width: 300px"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete> -->

            <el-input
              v-model="inputSearch"
              placeholder="请输入指标名称"
              style="width: 750px"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>

            <el-button type="primary" @click="SearchIndicator()"
              >查询指标</el-button
            >

            <el-button
              type="primary"
              @click="
                dialogAddFotmVisible = true;
                addIndicatorsForm();
              "
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
                <el-form-item label="指标中文名" prop="indicators_name_zn">
                  <el-input v-model="ruleForm.indicators_name_zn"></el-input>
                </el-form-item>
                <el-form-item label="指标业务含义" prop="indicators_mean">
                  <el-input v-model="ruleForm.indicators_mean"></el-input>
                </el-form-item>
                <el-form-item label="指标类型" prop="indicators_type">
                  <el-select
                    v-model="ruleForm.indicators_type"
                    placeholder="请选择指标类型"
                  >
                    <el-option label="基础指标" value="基础指标"></el-option>
                    <el-option label="派生指标" value="派生指标"></el-option>
                    <el-option label="经营指标" value="经营指标"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="指标范围" prop="indicators_scope">
                  <el-select
                    v-model="ruleForm.indicators_scope"
                    placeholder="请选择指标范围"
                  >
                    <el-option label="承保" value="承保"></el-option>
                    <el-option label="理赔" value="理赔"></el-option>
                    <el-option label="财务" value="财务"></el-option>
                    <el-option label="渠道" value="渠道"></el-option>
                    <el-option label="客服" value="客服"></el-option>
                    <el-option label="收付" value="收付"></el-option>
                    <el-option label="经营" value="经营"></el-option>
                    <el-option label="电商" value="电商"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="版本" prop="indicators_version">
                  <el-select
                    v-model="ruleForm.indicators_version"
                    placeholder="请选择版本"
                  >
                    <el-option label="v1.0" value="1.0"></el-option>
                    <el-option label="v2.0" value="2.0"></el-option>
                    <el-option label="v3.0" value="3.0"></el-option>
                    <el-option label="v4.0" value="4.0"></el-option>
                    <el-option label="v5.0" value="5.0"></el-option>
                    <el-option label="v6.0" value="6.0"></el-option>
                    <el-option label="v7.0" value="7.0"></el-option>
                    <el-option label="v8.0" value="8.0"></el-option>
                    <el-option label="v9.0" value="9.0"></el-option>
                    <el-option label="v10.0" value="10.0"></el-option>
                  </el-select>
                </el-form-item>

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
                <el-form-item label="统计口径(SQL)" prop="indicators_sql">
                  <el-input
                    type="textarea"
                    :rows="10"
                    autosize
                    v-model="ruleForm.indicators_sql"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >保存</el-button
                  >
                  <el-button @click="resetForm('ruleForm')">清空</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>

            <!-- 更新指标数据对话框 -->
            <el-dialog title="更新指标" :visible.sync="dialogUpdateFotmVisible">
              <el-form
                :model="ruleFormUpdate"
                :rules="rules"
                ref="ruleFormUpdate"
                label-width="150px"
                class="demo-ruleForm-Update"
              >
                <el-form-item label="指标中文名" prop="indicators_name_zn">
                  <el-input
                    v-model="ruleFormUpdate.indicators_name_zn"
                  ></el-input>
                </el-form-item>
                <el-form-item label="指标业务含义" prop="indicators_mean">
                  <el-input v-model="ruleFormUpdate.indicators_mean"></el-input>
                </el-form-item>
                <el-form-item label="指标类型" prop="indicators_type">
                  <el-select
                    v-model="ruleFormUpdate.indicators_type"
                    placeholder="请选择指标类型"
                  >
                    <el-option label="基础指标" value="基础指标"></el-option>
                    <el-option label="派生指标" value="派生指标"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="指标范围" prop="indicators_scope">
                  <el-select
                    v-model="ruleFormUpdate.indicators_scope"
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

                <el-form-item label="版本" prop="indicators_version">
                  <el-select
                    v-model="ruleFormUpdate.indicators_version"
                    placeholder="请选择版本"
                  >
                    <el-option label="v1.0" value="1.0"></el-option>
                    <el-option label="v2.0" value="2.0"></el-option>
                    <el-option label="v3.0" value="3.0"></el-option>
                    <el-option label="v4.0" value="4.0"></el-option>
                    <el-option label="v5.0" value="5.0"></el-option>
                    <el-option label="v6.0" value="6.0"></el-option>
                    <el-option label="v7.0" value="7.0"></el-option>
                    <el-option label="v8.0" value="8.0"></el-option>
                    <el-option label="v9.0" value="9.0"></el-option>
                    <el-option label="v10.0" value="10.0"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="创建维护人" prop="preserve_person">
                  <el-input v-model="ruleFormUpdate.preserve_person"></el-input>
                </el-form-item>

                <el-form-item label="统计口径(SQL)" prop="indicators_sql">
                  <el-input
                    type="textarea"
                    :rows="10"
                    autosize
                    v-model="ruleFormUpdate.indicators_sql"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitUpdateForm('ruleFormUpdate')"
                    >更新</el-button
                  >
                  <el-button @click="resetForm('ruleFormUpdate')"
                    >清空</el-button
                  >
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
          <el-table :data="tableDataDetail">
            <el-table-column label="指标中文名" width="300">
              <template slot-scope="scope">
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
                <el-button
                  type="primary"
                  @click="
                    dialogSQLEditorVisible = true;
                    initEditor(scope.row.indicators_name_zn);
                  "
                >
                  <i class="el-icon-view el-icon--right"></i>
                  <span>SQL</span>
                </el-button>
              </template>

              <template>
                <el-dialog
                  :title="DailogIndicatorstitle"
                  :visible.sync="dialogSQLEditorVisible"
                  :append-to-body="true"
                  :destroy-on-close="true"
                  :center="true"
                  top="3vh"
                  :fullscreen="fullscreen"
                  @close="MoncaoDispose"
                >
                  <div ref="IndicatorsContainer" style="height: 800px">
                    <el-button type="primary" @click="DailogFullscreen()"
                      >全屏</el-button
                    >
                    <el-button type="danger" @click="DailogMinscreen()"
                      >小屏</el-button
                    >
                  </div>
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
            <el-table-column label="创维人" width="130">
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
            <el-table-column label="操作" width="360">
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
      <el-tab-pane label="常用指标"> </el-tab-pane>
      <el-tab-pane label="指标血缘"> </el-tab-pane>
      <el-tab-pane label="指标术语" style="color: #008fd4">
        <!-- <div style="padding: 0 90%">
          <el-button type="primary" style="margin-right: 10px"
            >录入术语</el-button
          >
        </div> -->

        <el-input
          v-model="Jargon_inputSearch"
          placeholder="请输入术语名称"
          style="width: 750px"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>

        <el-button type="primary" @click="SearchJargon()">查询术语</el-button>

        <el-button
          type="primary"
          @click="
            dialogAddJargon = true;
            addJargon();
          "
          >录入术语</el-button
        >

        <el-dialog title="录入术语" :visible.sync="dialogAddJargon">
          <el-form
            :model="ruleFormJargon"
            :rules="rulesJargon"
            ref="ruleFormJargon"
            label-width="200px"
            class="demo-ruleFormJargon"
          >
            <el-form-item label="术语" prop="jargon">
              <el-input v-model="ruleFormJargon.jargon"></el-input>
            </el-form-item>

            <el-form-item label="术语解释" prop="jargon_instructions">
              <el-input v-model="ruleFormJargon.jargon_instructions"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="submitFormJargon('ruleFormJargon')"
                >新增术语</el-button
              >
              <el-button @click="resetForm('ruleFormJargon')">清空</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-table :data="tableDataJargon">
          <el-table-column label="术语" width="300">
            <template slot-scope="Jargon">
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
                  {{ Jargon.row.jargon }}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="术语解释" width="1100">
            <template slot-scope="Jargon">
              <span style="margin-left: 10px">{{
                Jargon.row.jargon_instructions
              }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template slot-scope="Jargon">
              <el-button
                type="primary"
                @click="JargonEdit(Jargon.$index, Jargon.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                @click="JargonDelete(Jargon.$index, Jargon.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- <div>
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
        </div> -->
      </el-tab-pane>

      <el-tab-pane label="指标公式" style="color: #008fd4">
        <div class="btn2">
          <el-input
            v-model="formulas_inputSearch"
            placeholder="请输入术语名称"
            style="width: 750px"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>

          <el-button type="primary" @click="formulasSearchIndicator()"
            >查询公式</el-button
          >

          <el-button
            type="primary"
            @click="
              dialogAddFotmVisibleFormulas = true;
              addFormulas();
            "
            >新增公式</el-button
          >
          <el-dialog
            title="新增公式"
            :visible.sync="dialogAddFotmVisibleFormulas"
          >
            <el-form
              :model="ruleFormFormulas"
              :rules="rulesFormulas"
              ref="ruleFormFormulas"
              label-width="200px"
              class="demo-ruleFormFormulas"
            >
              <el-form-item
                label="业务模块(指标所属范围)"
                prop="indicators_scope"
              >
                <el-select
                  v-model="ruleFormFormulas.indicators_scope"
                  placeholder="业务模块"
                >
                  <el-option label="承保" value="承保"></el-option>
                  <el-option label="理赔" value="理赔"></el-option>
                  <el-option label="财务" value="财务"></el-option>
                  <el-option label="渠道" value="渠道"></el-option>
                  <el-option label="客服" value="客服"></el-option>
                  <el-option label="收付" value="收付"></el-option>
                  <el-option label="经营" value="经营"></el-option>
                  <el-option label="电商" value="电商"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="专业术语名称" prop="terminology">
                <el-input v-model="ruleFormFormulas.terminology"></el-input>
              </el-form-item>

              <el-form-item label="计算公式(逻辑)" prop="indicators_formulas">
                <el-input
                  type="textarea"
                  :rows="10"
                  autosize
                  v-model="ruleFormFormulas.indicators_formulas"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitFormFormulas('ruleFormFormulas')"
                  >新增公式</el-button
                >
                <el-button @click="resetForm('ruleFormFormulas')"
                  >清空</el-button
                >
              </el-form-item>
            </el-form>
          </el-dialog>
          <!-- 更新公式对话框 -->
          <el-dialog
            title="更新公式"
            :visible.sync="dialogUpdateFotmVisibleFormulas"
          >
            <el-form
              :model="ruleFormUpdateFormulas"
              :rules="rulesFormulas"
              ref="ruleFormUpdateFormulas"
              label-width="200px"
              class="demo-ruleFormUpdateFormulas"
            >
              <el-form-item
                label="业务模块(指标所属范围)"
                prop="indicators_scope"
              >
                <el-select
                  v-model="ruleFormUpdateFormulas.indicators_scope"
                  placeholder="业务模块"
                >
                  <el-option label="承保" value="承保"></el-option>
                  <el-option label="理赔" value="理赔"></el-option>
                  <el-option label="财务" value="财务"></el-option>
                  <el-option label="渠道" value="渠道"></el-option>
                  <el-option label="客服" value="客服"></el-option>
                  <el-option label="收付" value="收付"></el-option>
                  <el-option label="经营" value="经营"></el-option>
                  <el-option label="电商" value="电商"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="专业术语名称" prop="terminology">
                <el-input
                  v-model="ruleFormUpdateFormulas.terminology"
                ></el-input>
              </el-form-item>

              <el-form-item label="计算公式(逻辑)" prop="indicators_formulas">
                <el-input
                  type="textarea"
                  :rows="10"
                  autosize
                  v-model="ruleFormUpdateFormulas.indicators_formulas"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitFormUpdateFormulas('ruleFormUpdateFormulas')"
                  >更新</el-button
                >
                <el-button @click="resetForm('ruleFormUpdateFormulas')"
                  >清空</el-button
                >
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>

        <el-table :data="tableDataDetailFormulas">
          <el-table-column label="业务模块" width="300">
            <template slot-scope="Formulasscope">
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
                  {{ Formulasscope.row.indicators_scope }}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="专业术语名称" width="550">
            <template slot-scope="Formulasscope">
              <span style="margin-left: 10px">{{
                Formulasscope.row.terminology
              }}</span>
            </template>
          </el-table-column>

          <el-table-column label="计算公式(逻辑)" width="330">
            <template slot-scope="Formulasscope">
              <el-popover trigger="hover" placement="bottom">
                {{ Formulasscope.row.indicators_formulas }}
                <div slot="reference" class="name-wrapper">
                  <el-tag size="larger"
                    >公式{{ Formulasscope.row.name }}</el-tag
                  >
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="180">
            <i class="el-icon-time"></i>
            <template slot-scope="Formulasscope">
              <span style="margin-left: 10px">{{
                Formulasscope.row.create_time
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="180">
            <i class="el-icon-time"></i>
            <template slot-scope="Formulasscope">
              <span style="margin-left: 10px">{{
                Formulasscope.row.update_time
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="Formulasscope">
              <el-button
                type="primary"
                @click="
                  FormulashandleEdit(Formulasscope.$index, Formulasscope.row)
                "
                >编辑</el-button
              >
              <el-button
                type="danger"
                @click="
                  FormulashandleDelete(Formulasscope.$index, Formulasscope.row)
                "
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>


<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/basic-languages/sql/sql.contribution";
import axios from "axios";

export default {
  data() {
    return {
      restaurants: [],
      formulas_inputSearch: "",
      Jargon_inputSearch: "",
      inputSearch: "",
      timeout: null,
      DailogIndicatorstitle: "",
      fullscreen: false,
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
      dialogUpdateFotmVisible: false,
      dialogAddFotmVisibleFormulas: false,
      dialogUpdateFotmVisibleFormulas: false,
      dialogSQLEditorVisible: false,
      editor: null,
      sqlvalue: "",
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
      tableDataJargon: [],
      tableDataDetail: [],
      tableDataDetailFormulas: [],
      ruleForm: {
        name: "",
        delivery: false,
      },
      ruleFormUpdate: {
        name: "",
        delivery: false,
      },
      ruleFormFormulas: {
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      ruleFormUpdateFormulas: {
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        indicators_name_zn: [
          { required: true, message: "请录入指标名称", trigger: "blur" },
          {
            min: 4,
            max: 28,
            message: "长度在 4 到 28 个字符",
            trigger: "blur",
          },
        ],
        indicators_mean: [
          { required: true, message: "请录入指标业务含义", trigger: "change" },
        ],
        indicators_scope: [
          { required: true, message: "请选择指标范围", trigger: "change" },
        ],
        indicators_type: [
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
        indicators_sql: [
          { required: true, message: "请录入SQL口径", trigger: "blur" },
        ],
      },
      rulesFormulas: {
        terminology: [
          { required: true, message: "请录入指标名称", trigger: "blur" },
          {
            min: 4,
            max: 28,
            message: "长度在 4 到 28 个字符",
            trigger: "blur",
          },
        ],

        indicators_scope: [
          { required: true, message: "请选择指标范围", trigger: "change" },
        ],
        indicators_formulas: [
          { required: true, message: "请录入SQL口径", trigger: "blur" },
        ],
      },

      dialogAddJargon: false,
      rulesJargon: {
        jargon: [
          { required: true, message: "请录入术语名称", trigger: "blur" },
          {
            min: 1,
            max: 60,
            message: "长度在 4 到 60 个字符",
            trigger: "blur",
          },
        ],
        jargon_instructions: [
          { required: true, message: "请录入术语解释", trigger: "blur" },
        ],
      },
      ruleFormJargon: {
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
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
    DailogFullscreen() {
      this.fullscreen = true;
    },
    DailogMinscreen() {
      this.fullscreen = false;
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
    SearchIndicator() {
      let stringUrl =
        "http://10.30.64.240:9988/Indicators/IndicatorsSearch?indicators_name_zn=" +
        this.inputSearch;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log(res.data.data);
          this.tableDataDetail = res.data.data;
          this.sqlvalue = res.data.data[0].indicators_sql;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    IndicatorDeleteByName(Indicators_name_zn) {
      let stringUrl =
        "http://10.30.64.240:9988/Indicators/IndicatorsDeleteByname?indicators_name_zn=" +
        Indicators_name_zn;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log(res.data.data);
          // this.tableDataDetail = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    IndicatorFormulasDeleteByName(terminology) {
      let stringUrl =
        "http://10.30.64.240:9988/Indicators/IndicatorFormulasDeleteByName?terminology=" +
        terminology;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log(res.data.data);
          // this.tableDataDetail = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formulasSearchIndicator() {
      let stringUrl =
        "http://10.30.64.240:9988/Indicators/IndicatorsSearchFormulas?terminology=" +
        this.formulas_inputSearch;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log(res.data.data);
          this.tableDataDetailFormulas = res.data.data;
          // this.sqlvalue = res.data.data[0].indicators_formulas;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    initEditor(indicators_name_zn) {
      // console.log("indicators_name_zn", indicators_name_zn);
      this.DailogIndicatorstitle = indicators_name_zn;
      let stringUrl =
        "http://10.30.64.240:9988/Indicators/IndicatorsSearch?indicators_name_zn=" +
        indicators_name_zn;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          // console.log(res.data.data[0]);
          // console.log(res.data.data[0]);
          this.sqlvalue = res.data.data[0].indicators_sql;
          this.InintContainer();
          // console.log(this.sqlvalue);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    InintContainer() {
      // console.log("this.sqlvalue", this.sqlvalue);
      this.editorIndicators = monaco.editor.create(
        // document.getElementById("IndicatorsContainer"),
        this.$refs.IndicatorsContainer,
        {
          value: this.sqlvalue,
          language: "sql",
          automaticLayout: true,
          theme: "vs-dark",
          selectOnLineNumbers: true, //行号
          fontSize: 16,
          autoIndent: "none",
          // scrollBeyondLastLine: true,
          overviewRulerBorder: false,
          quickSuggestionsDelay: 0,
          folding: true,
          renderLineHightlight: "gutter",
          glyphMargin: true,
          // acceptSuggertionOnCommitCharacter: true,
          // acceptSuggertionOnEnter: "on",
          minimap: {
            enabled: false, // 是否启用预览图
          },
          readOnly: true,
        }
      );
    },
    MoncaoDispose() {
      console.log("dispose");
      if (this.editorIndicators) {
        if (this.editorIndicators.getModel()) {
          this.editorIndicators.getModel().dispose();
        }
        this.editorIndicators.dispose();
        this.editorIndicators = null;
        // if(this.provider){
        //   this.provider.dispose();
        //   this.provider = null
        // }
      }
    },
    addIndicatorsForm() {
      this.ruleForm = {};
    },
    submitUpdateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogUpdateFotmVisible = false;
          axios({
            method: "post",
            url: "http://10.30.64.240:9988/Indicators/IndicatorAddUpdate",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
            data: {
              indicators_name_zn: this.ruleFormUpdate.indicators_name_zn,
              indicators_mean: this.ruleFormUpdate.indicators_mean,
              indicators_type: this.ruleFormUpdate.indicators_type,
              indicators_scope: this.ruleFormUpdate.indicators_scope,
              indicators_version: this.ruleFormUpdate.indicators_version,
              preserve_person: this.ruleFormUpdate.preserve_person,
              indicators_sql: this.ruleFormUpdate.indicators_sql,
              update_time: this.getCurrentTime(),
            },
          }).then((response) => {
            // console.log(response);
          });

          alert("已更新!");
        } else {
          console.log("保存失败!!,请务多次提交");
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogAddFotmVisible = false;
          axios({
            method: "post",
            url: "http://10.30.64.240:9988/Indicators/IndicatorAdd",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
            data: {
              indicators_name_zn: this.ruleForm.indicators_name_zn,
              indicators_mean: this.ruleForm.indicators_mean,
              indicators_type: this.ruleForm.indicators_type,
              indicators_scope: this.ruleForm.indicators_scope,
              indicators_version: this.ruleForm.indicators_version,
              preserve_person: this.ruleForm.preserve_person,
              indicators_sql: this.ruleForm.indicators_sql,
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
    addFormulas() {
      this.ruleFormFormulas = {};
    },
    submitFormFormulas(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogAddFotmVisibleFormulas = false;
          axios({
            method: "post",
            url: "http://10.30.64.240:9988/Indicators/IndicatorAddFormulas",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
            data: {
              indicators_scope: this.ruleFormFormulas.indicators_scope,
              terminology: this.ruleFormFormulas.terminology,
              indicators_formulas: this.ruleFormFormulas.indicators_formulas,
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
    submitFormUpdateFormulas(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogUpdateFotmVisibleFormulas = false;
          axios({
            method: "post",
            url: "http://10.30.64.240:9988/Indicators/IndicatorUpdateFormulas",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
            data: {
              indicators_scope: this.ruleFormUpdateFormulas.indicators_scope,
              terminology: this.ruleFormUpdateFormulas.terminology,
              indicators_formulas:
                this.ruleFormUpdateFormulas.indicators_formulas,
              update_time: this.getCurrentTime(),
            },
          }).then((response) => {
            console.log(response);
          });

          alert("已保存!");
        } else {
          console.log("保存失败!!,请务多次提交");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEdit(index, row) {
      this.dialogUpdateFotmVisible = true;
      this.ruleFormUpdate.indicators_name_zn = row.indicators_name_zn;
      this.ruleFormUpdate.indicators_mean = row.indicators_mean;
      this.ruleFormUpdate.indicators_type = row.indicators_type;
      this.ruleFormUpdate.indicators_scope = row.indicators_scope;
      this.ruleFormUpdate.indicators_version = row.indicators_version;
      this.ruleFormUpdate.preserve_person = row.preserve_person;
      this.ruleFormUpdate.indicators_sql = row.indicators_sql;
    },
    FormulashandleEdit(index, row) {
      this.dialogUpdateFotmVisibleFormulas = true;
      this.ruleFormUpdateFormulas.indicators_scope = row.indicators_scope;
      this.ruleFormUpdateFormulas.terminology = row.terminology;
      this.ruleFormUpdateFormulas.indicators_formulas = row.indicators_formulas;
    },
    FormulashandleDelete(index, row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //请求接口删除
          this.IndicatorFormulasDeleteByName(row.terminology);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //请求接口删除
          this.IndicatorDeleteByName(row.indicators_name_zn);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    addJargon() {
      this.ruleFormJargon = {};
    },
    submitFormJargon(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogAddJargon = false;
          axios({
            method: "post",
            url: "http://10.30.64.240:9988/Indicators/IndicatorAddJargon",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
            data: {
              jargon: this.ruleFormJargon.jargon,
              jargon_instructions: this.ruleFormJargon.jargon_instructions,
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
    SearchJargon() {
      let stringUrl =
        "http://10.30.64.240:9988/Indicators/JargonSearchAll?jargon=" +
        this.Jargon_inputSearch;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          console.log(res.data.data);
          this.tableDataJargon = res.data.data;
          // this.sqlvalue = res.data.data[0].indicators_sql;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
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

.btn2 {
  display: flex;
}

.btn2 ::v-deep .el-button {
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
  flex-wrap: wrap;
}
.el-popover {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: steelblue;
}

/* .el-dialog__wrapper {
  height: 850px;
} */
</style>