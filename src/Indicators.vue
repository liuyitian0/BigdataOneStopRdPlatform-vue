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
                  :close-on-click-modal="false"
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
      <!-- <el-tab-pane label="常用指标"> </el-tab-pane> -->
      <!-- <el-tab-pane label="指标血缘"> </el-tab-pane> -->
      <!-- <el-tab-pane label="指标术语" style="color: #008fd4"> -->

      <!-- <el-input
          v-model="Jargon_inputSearch"
          placeholder="请输入术语名称"
          style="width: 750px"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input> -->

      <!-- <el-button
          type="primary"
          @click="SearchJargon()"
          style="margin-left: 20px"
          >查询术语</el-button
        > -->

      <!-- <el-button
          type="primary"
          @click="
            dialogAddJargon = true;
            addJargon();
          "
          >录入术语</el-button
        > -->

      <!-- <el-dialog title="录入术语" :visible.sync="dialogAddJargon">
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
        </el-dialog> -->

      <!-- <el-table :data="tableDataJargon">
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
        </el-table> -->
      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane label="指标公式" style="color: #008fd4"> -->
      <!-- <div class="btn2"> -->
      <!-- <el-input
            v-model="formulas_inputSearch"
            placeholder="请输入术语名称"
            style="width: 750px"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input> -->

      <!-- <el-button type="primary" @click="formulasSearchIndicator()"
            >查询公式</el-button
          > -->

      <!-- <el-button
            type="primary"
            @click="
              dialogAddFotmVisibleFormulas = true;
              addFormulas();
            "
            >新增公式</el-button
          > -->
      <!-- <el-dialog
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
          </el-dialog> -->
      <!-- 更新公式对话框 -->
      <!-- <el-dialog
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
          </el-dialog> -->
      <!-- </div> -->

      <!-- <el-table :data="tableDataDetailFormulas">
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
        </el-table> -->
      <!-- </el-tab-pane> -->

      <el-tab-pane label="提数管理" style="color: #008fd4">
        <div>
          <el-dialog
            title="新增提数"
            :visible.sync="dialogPickDataVisibleFormulas"
          >
            <el-form
              :model="FormPickData"
              :rules="rulesPickData"
              ref="FormPickData"
              label-width="200px"
              class="demo-ruleFormPickData"
            >
              <el-form-item label="提数标题" prop="pickdata_title">
                <el-input v-model="FormPickData.pickdata_title"></el-input>
              </el-form-item>

              <el-form-item label="需求内容" prop="pickdata_content">
                <el-input
                  type="textarea"
                  :rows="10"
                  autosize
                  v-model="FormPickData.pickdata_content"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="提取的指标(度量/统计口径)"
                prop="pickdata_indicators"
              >
                <el-input
                  type="textarea"
                  :rows="10"
                  autosize
                  v-model="FormPickData.pickdata_indicators"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="提取的维度(过滤条件)"
                prop="pickdata_dimension"
              >
                <el-input
                  type="textarea"
                  :rows="10"
                  autosize
                  v-model="FormPickData.pickdata_dimension"
                ></el-input>
              </el-form-item>

              <el-form-item label="SQL逻辑" prop="pickdata_sql">
                <el-input
                  type="textarea"
                  :rows="10"
                  autosize
                  v-model="FormPickData.pickdata_sql"
                ></el-input>
              </el-form-item>

              <el-form-item label="指标逻辑理解补充" prop="added_explain">
                <el-input
                  type="textarea"
                  :rows="10"
                  autosize
                  v-model="FormPickData.added_explain"
                ></el-input>
              </el-form-item>

              <div class="dialg_div1">
                <el-form-item label="需求负责人" prop="demand_person">
                  <el-input
                    v-model="FormPickData.demand_person"
                    style="width: 240px; margin: 2px 0 4px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="提数负责人" prop="dev_person">
                  <el-input
                    v-model="FormPickData.dev_person"
                    style="width: 200px; margin: 2px 0 4px 0"
                  ></el-input>
                </el-form-item>
              </div>

              <div class="dialg_div1">
                <el-form-item label="需求类型" prop="pickdata_type">
                  <el-select
                    v-model="FormPickData.pickdata_type"
                    placeholder="需求类型"
                    style="width: 240px; margin: 2px 0 4px 0"
                  >
                    <el-option label="一次性" value="一次性"></el-option>
                    <el-option label="周期(周/月/年)" value="周期"></el-option>
                    <el-option label="每天" value="每天"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="状态" prop="pickdata_type">
                  <el-select
                    v-model="pickdata_status"
                    placeholder="状态"
                    style="width: 200px; margin: 2px 0 4px 0"
                  >
                    <el-option label="发起" value="发起"></el-option>
                    <el-option label="已分配" value="已分配"></el-option>
                    <el-option label="提数中" value="提数中"></el-option>
                    <el-option label="完成" value="完成"></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <el-form-item label="期望反馈时间" prop="expected_feedback_time">
                <el-date-picker
                  v-model="FormPickData.expected_feedback_time"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitFormAddPickData('FormPickData')"
                  >新增提数任务</el-button
                >
                <el-button @click="resetForm('FormPickData')">清空</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>

        <div class="btn">
          <div class="dw-btn1">
            <div>
              <el-input
                v-model="PickDatainputSearch1"
                placeholder="按照提数标题检索"
                style="margin: 5px 0 0 0"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>

              <el-input
                v-model="PickDatainputSearch2"
                placeholder="按照内容检索"
                style="margin: 5px 0 0 0"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>

            <div>
              <el-button
                type="primary"
                @click="GetPickDataSearch()"
                style="height: 85px; margin: 5px"
                >历史提数</el-button
              >
            </div>
          </div>
          <div class="dw-btn1">
            <div>
              <el-input
                v-model="PickDatainputSearch3"
                placeholder="按照需求负责人"
                style="margin: 5px 0 0 0"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>

              <el-input
                v-model="PickDatainputSearch4"
                placeholder="按照提数负责人"
                style="margin: 5px 0 0 0"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>

            <div>
              <el-button
                type="primary"
                @click="GetPickDataSearchByPerson()"
                style="height: 85px; margin: 5px"
                >按人查询</el-button
              >
            </div>
          </div>
          <div class="dw-btn1">
            <div>
              <el-input
                v-model="PickDatainputSearch5"
                placeholder="按照需求类型"
                style="margin: 5px 0 0 0"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>

              <el-input
                v-model="PickDatainputSearch6"
                placeholder="按照状态"
                style="margin: 5px 0 0 0"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>

            <div>
              <el-button
                type="primary"
                @click="GetPickDataSearchByStatusType()"
                style="height: 85px; margin: 5px"
                >类型/状态</el-button
              >
            </div>
          </div>
          <div class="dw-btn1">
            <div>
              <el-input
                v-model="PickDatainputSearch7"
                placeholder="按照创建时间"
                style="margin: 5px 0 0 0"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>

              <el-input
                v-model="PickDatainputSearch8"
                placeholder="按照期望反馈时间"
                style="margin: 5px 0 0 0"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>

            <div>
              <el-button
                type="primary"
                @click="GetPickDataSearchByTime()"
                style="height: 85px; margin: 5px"
                >按时间</el-button
              >
            </div>
          </div>
        </div>
        <div class="banner">
          <el-button
            type="success"
            @click="dialogPickDataVisibleFormulas = true"
            style="margin: 10px 20px; font-size: 18px; float: right"
            >创建提数</el-button
          >
        </div>

        <div style="margin: 25px">
          <el-table :data="PickDatatableDataDetailFormulas">
            <el-table-column label="提数标题" width="150">
              <template slot-scope="PickDataFormulasscope">
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
                    {{ PickDataFormulasscope.row.pickdata_title }}
                  </span>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="需求内容" width="150">
              <template slot-scope="PickDataFormulasscope">
                <span style="margin-left: 10px">{{
                  PickDataFormulasscope.row.pickdata_content
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="提取的指标(度量/统计口径)" width="330">
              <template slot-scope="PickDataFormulasscope">
                {{ PickDataFormulasscope.row.pickdata_indicators }}
              </template>
            </el-table-column>

            <el-table-column label="提取的维度(过滤条件)" width="220">
              <i class="el-icon-time"></i>
              <template slot-scope="PickDataFormulasscope">
                <span style="margin-left: 10px">{{
                  PickDataFormulasscope.row.pickdata_dimension
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="SQL逻辑" width="120">
              <template slot-scope="PickDataFormulasscope">
                <el-button
                  type="primary"
                  @click="
                    GetPickDataTitleSql(
                      PickDataFormulasscope.$index,
                      PickDataFormulasscope.row.pickdata_title
                    )
                  "
                >
                  <i class="el-icon-view el-icon--right"></i>
                  <span>SQL</span>
                </el-button>
              </template>

              <template>
                <el-dialog
                  :title="DailogPickDatatitle"
                  :visible.sync="PickDatadialogSQLEditorVisible"
                  :append-to-body="true"
                  :destroy-on-close="true"
                  :close-on-click-modal="false"
                  :center="true"
                  top="3vh"
                  :fullscreen="fullscreen"
                  @close="PickDataMoncaoDispose"
                >
                  <div ref="PickDataSqlContainer" style="height: 800px">
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

            <el-table-column label="需求类型" width="180">
              <i class="el-icon-time"></i>
              <template slot-scope="PickDataFormulasscope">
                <span style="margin-left: 10px">{{
                  PickDataFormulasscope.row.pickdata_type
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="需求负责人" width="180">
              <i class="el-icon-time"></i>
              <template slot-scope="PickDataFormulasscope">
                <span style="margin-left: 10px">{{
                  PickDataFormulasscope.row.demand_person
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="提数负责人" width="180">
              <i class="el-icon-time"></i>
              <template slot-scope="PickDataFormulasscope">
                <span style="margin-left: 10px">{{
                  PickDataFormulasscope.row.dev_person
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="180">
              <i class="el-icon-time"></i>
              <template slot-scope="PickDataFormulasscope">
                <span style="margin-left: 10px">{{
                  PickDataFormulasscope.row.pickdata_status
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="指标逻辑理解补充" width="180">
              <i class="el-icon-time"></i>
              <template slot-scope="PickDataFormulasscope">
                <span style="margin-left: 10px">{{
                  PickDataFormulasscope.row.added_explain
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="期望反馈时间" width="180">
              <i class="el-icon-time"></i>
              <template slot-scope="PickDataFormulasscope">
                <span style="margin-left: 10px">{{
                  PickDataFormulasscope.row.expected_feedback_time
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" width="180">
              <i class="el-icon-time"></i>
              <template slot-scope="PickDataFormulasscope">
                <span style="margin-left: 10px">{{
                  PickDataFormulasscope.row.create_time
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="180">
              <template slot-scope="PickDataFormulasscope">
                <el-button
                  type="primary"
                  @click="PickDataFormEdit(PickDataFormulasscope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  @click="submitPickDataFormDelete(PickDataFormulasscope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-dialog
          title="更新提数"
          :visible.sync="dialogUpdatePickDataVisibleForm"
        >
          <el-form
            :model="FormUpdatePickData"
            :rules="rulesPickData"
            ref="FormUpdatePickData"
            label-width="200px"
            class="demo-FormUpdatePickData"
          >
            <el-form-item label="提数标题" prop="pickdata_title">
              <el-input v-model="FormUpdatePickData.pickdata_title"></el-input>
            </el-form-item>

            <el-form-item label="需求内容" prop="pickdata_content">
              <el-input
                type="textarea"
                :rows="10"
                autosize
                v-model="FormUpdatePickData.pickdata_content"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="提取的指标(度量/统计口径)"
              prop="pickdata_indicators"
            >
              <el-input
                type="textarea"
                :rows="10"
                autosize
                v-model="FormUpdatePickData.pickdata_indicators"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="提取的维度(过滤条件)"
              prop="pickdata_dimension"
            >
              <el-input
                type="textarea"
                :rows="10"
                autosize
                v-model="FormUpdatePickData.pickdata_dimension"
              ></el-input>
            </el-form-item>

            <el-form-item label="SQL逻辑" prop="pickdata_sql">
              <el-input
                type="textarea"
                :rows="10"
                autosize
                v-model="FormUpdatePickData.pickdata_sql"
              ></el-input>
            </el-form-item>

            <el-form-item label="指标逻辑理解补充" prop="added_explain">
              <el-input
                type="textarea"
                :rows="10"
                autosize
                v-model="FormUpdatePickData.added_explain"
              ></el-input>
            </el-form-item>

            <div class="dialg_div1">
              <el-form-item label="需求负责人" prop="demand_person">
                <el-input
                  v-model="FormUpdatePickData.demand_person"
                  style="width: 240px; margin: 2px 0 4px"
                ></el-input>
              </el-form-item>
              <el-form-item label="提数负责人" prop="dev_person">
                <el-input
                  v-model="FormUpdatePickData.dev_person"
                  style="width: 200px; margin: 2px 0 4px 0"
                ></el-input>
              </el-form-item>
            </div>

            <div class="dialg_div1">
              <el-form-item label="需求类型" prop="pickdata_type">
                <el-select
                  v-model="FormUpdatePickData.pickdata_type"
                  placeholder="需求类型"
                  style="width: 240px; margin: 2px 0 4px 0"
                >
                  <el-option label="一次性" value="一次性"></el-option>
                  <el-option label="周期(周/月/年)" value="周期"></el-option>
                  <el-option label="每天" value="每天"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="状态" prop="pickdata_status">
                <el-select
                  v-model="FormUpdatePickData.pickdata_status"
                  placeholder="状态"
                  style="width: 200px; margin: 2px 0 4px 0"
                >
                  <el-option label="发起" value="发起"></el-option>
                  <el-option label="已分配" value="已分配"></el-option>
                  <el-option label="提数中" value="提数中"></el-option>
                  <el-option label="完成" value="完成"></el-option>
                </el-select>
              </el-form-item>
            </div>

            <el-form-item label="期望反馈时间" prop="expected_feedback_time">
              <el-date-picker
                v-model="FormUpdatePickData.expected_feedback_time"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="
                  submitFormUpdatePickData(
                    'FormUpdatePickData',
                    FormUpdatePickData.pickdata_id,
                    FormUpdatePickData.pickdata_type,
                    FormUpdatePickData.dev_person,
                    FormUpdatePickData.pickdata_status
                  )
                "
                >保存</el-button
              >
              <el-button @click="resetForm('FormUpdatePickData')"
                >清空</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
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
      dialogPickDataVisibleFormulas: false,
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
      PickDatatableDataDetailFormulas: [],
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
      pickdata_status: "发起",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      FormPickData: {
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rulesPickData: {
        pickdata_title: [
          { required: true, message: "请录入需求标题名称", trigger: "blur" },
          {
            min: 8,
            max: 100,
            message: "长度在 8 到 100 个字符",
            trigger: "blur",
          },
        ],
        pickdata_content: [
          {
            required: true,
            message: "请尽量描述更多提数需求细节",
            trigger: "blur",
          },
          {
            min: 20,
            max: 400,
            message: "长度在 20 到 400 个字符",
            trigger: "blur",
          },
        ],
        pickdata_indicators: [
          {
            required: true,
            message: "请尽量描述更多提取的指标",
            trigger: "blur",
          },
          {
            min: 20,
            max: 400,
            message: "长度在 20 到 400 个字符",
            trigger: "blur",
          },
        ],

        pickdata_dimension: [
          {
            required: true,
            message: "请尽量描述更多提取指标的维度",
            trigger: "blur",
          },
          {
            min: 20,
            max: 400,
            message: "长度在 20 到 400 个字符",
            trigger: "blur",
          },
        ],
        demand_person: [
          {
            required: true,
            message: "请填写需求负责人",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      PickDatainputSearch1: "",
      PickDatainputSearch2: "",
      PickDatainputSearch3: "",
      PickDatainputSearch4: "",
      PickDatainputSearch5: "",
      PickDatainputSearch6: "",
      PickDatainputSearch7: "",
      PickDatainputSearch8: "",
      DailogPickDatatitle: "",
      PickDatadialogSQLEditorVisible: false,
      dialogUpdatePickDataVisibleForm: false,
      FormUpdatePickData: {
        delivery: false,
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
    IndicatorFormulasDeleteByName(terminology_id) {
      // console.log(terminology_id);
      let stringUrl =
        "http://10.30.64.240:9988/Indicators/IndicatorFormulasDeleteByName?terminology_id=" +
        terminology_id;
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
          this.InintContainer(this.sqlvalue);
          // console.log(this.sqlvalue);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    InintContainer(Sql) {
      // console.log("this.sqlvalue", this.sqlvalue);
      this.editorIndicators = monaco.editor.create(
        // document.getElementById("IndicatorsContainer"),
        this.$refs.IndicatorsContainer,
        {
          value: Sql,
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
          this.IndicatorFormulasDeleteByName(row.terminology_id);
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
    submitFormAddPickData(pickformdata) {
      this.$refs[pickformdata].validate((valid) => {
        if (valid) {
          this.dialogPickDataVisibleFormulas = false;
          axios({
            method: "post",
            url: "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataAdd",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
            data: {
              pickdata_title: this.FormPickData.pickdata_title,
              pickdata_content: this.FormPickData.pickdata_content,
              pickdata_indicators: this.FormPickData.pickdata_indicators,
              pickdata_dimension: this.FormPickData.pickdata_dimension,
              pickdata_sql: this.FormPickData.pickdata_sql,
              pickdata_type: this.FormPickData.pickdata_type,
              demand_person: this.FormPickData.demand_person,
              dev_person: this.FormPickData.dev_person,
              pickdata_status: this.pickdata_status,
              added_explain: this.FormPickData.added_explain,
              expected_feedback_time: this.FormPickData.expected_feedback_time,
              added_explain: this.FormPickData.added_explain,
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
    GetPickDataSearch() {
      let stringUrl = "";
      if (this.PickDatainputSearch1) {
        stringUrl =
          "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataSearchByTitleContent?pickdata_title=" +
          this.PickDatainputSearch1;
      } else {
        stringUrl =
          "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataSearchByTitleContent?pickdata_content=" +
          this.PickDatainputSearch2;
      }

      // console.log(stringUrl);
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          this.PickDatatableDataDetailFormulas = res.data.data;
          console.log(this.PickDatatableDataDetailFormulas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetPickDataTitleSql(index, title) {
      let resSql = "";
      let stringUrl =
        "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataSearchSqlByTitle";
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          res.data.data.forEach((item, index) => {
            // console.log(item, index);
            if (item.pickdata_title === title) {
              console.log("item,title", item.pickdata_title, title);
              console.log("pickdata_sql", item.pickdata_sql);
              resSql = item.pickdata_sql;
              this.DailogPickDatatitle = item.pickdata_title;
            }
          });
          this.PickDataInintContainer(resSql);
        })
        .catch((error) => {
          console.log(error);
        });

      this.PickDatadialogSQLEditorVisible = true;
    },

    PickDataInintContainer(Sql) {
      this.editorPickData = monaco.editor.create(
        this.$refs.PickDataSqlContainer,
        {
          value: Sql,
          language: "sql",
          automaticLayout: true,
          theme: "vs-dark",
          selectOnLineNumbers: true, //行号
          fontSize: 16,
          autoIndent: "none",
          overviewRulerBorder: false,
          quickSuggestionsDelay: 0,
          folding: true,
          renderLineHightlight: "gutter",
          glyphMargin: true,
          minimap: {
            enabled: false, // 是否启用预览图
          },
          readOnly: true,
        }
      );
    },
    PickDataMoncaoDispose() {
      if (this.editorPickData) {
        if (this.editorPickData.getModel()) {
          this.editorPickData.getModel().dispose();
        }
        this.editorPickData.dispose();
        this.editorPickData = null;
      }
    },
    GetPickDataSearchByPerson() {
      let stringUrl = "";
      if (this.PickDatainputSearch3) {
        stringUrl =
          "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataSearchByPerson?demand_person=" +
          this.PickDatainputSearch3;
      } else {
        stringUrl =
          "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataSearchByPerson?dev_person=" +
          this.PickDatainputSearch4;
      }

      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          this.PickDatatableDataDetailFormulas = res.data.data;
          // console.log(this.PickDatatableDataDetailFormulas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetPickDataSearchByStatusType() {
      let stringUrl = "";
      if (this.PickDatainputSearch5) {
        stringUrl =
          "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataSearchByStatusType?pickdata_type=" +
          this.PickDatainputSearch5;
      } else {
        stringUrl =
          "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataSearchByStatusType?pickdata_status=" +
          this.PickDatainputSearch6;
      }

      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          this.PickDatatableDataDetailFormulas = res.data.data;
          // console.log(this.PickDatatableDataDetailFormulas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetPickDataSearchByTime() {
      let stringUrl = "";
      if (this.PickDatainputSearch7) {
        stringUrl =
          "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataSearchByTime?create_time=" +
          this.PickDatainputSearch7 +
          "&expected_feedback_time=1900-01-01";
      } else {
        stringUrl =
          "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataSearchByTime?expected_feedback_time=" +
          this.PickDatainputSearch8 +
          "&create_time=1";
      }

      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          this.PickDatatableDataDetailFormulas = res.data.data;
          // console.log(this.PickDatatableDataDetailFormulas);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitFormUpdatePickData(
      pickformdata,
      pickdata_id,
      pickdata_type,
      dev_person,
      pickdata_status
    ) {
      // console.log("pickdata_id:", pickdata_id);
      // console.log("pickdata_type:", pickdata_type);
      // console.log("dev_person:", dev_person);
      // console.log("pickdata_status:", pickdata_status);

      this.$refs[pickformdata].validate((valid) => {
        if (valid) {
          this.dialogUpdatePickDataVisibleForm = false;
          axios({
            method: "post",
            url: "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataFormUpdateByPickdataId",
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: true,
            data: {
              pickdata_id: pickdata_id,
              pickdata_type: pickdata_type,
              dev_person: dev_person,
              pickdata_status: pickdata_status,
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
    PickDataFormEdit(row) {
      this.dialogUpdatePickDataVisibleForm = true;
      this.FormUpdatePickData.pickdata_id = row.pickdata_id;
      this.FormUpdatePickData.pickdata_title = row.pickdata_title;
      this.FormUpdatePickData.pickdata_content = row.pickdata_content;
      this.FormUpdatePickData.pickdata_indicators = row.pickdata_indicators;
      this.FormUpdatePickData.pickdata_dimension = row.pickdata_dimension;
      this.FormUpdatePickData.pickdata_sql = row.pickdata_sql;
      this.FormUpdatePickData.added_explain = row.added_explain;
      this.FormUpdatePickData.demand_person = row.demand_person;
      // this.FormUpdatePickData.dev_person = row.dev_person;
      this.FormUpdatePickData.pickdata_type = row.pickdata_type;
      // this.pickdata_status = this.pickdata_status;
      this.FormUpdatePickData.expected_feedback_time =
        row.expected_feedback_time;
    },
    PickDataFormDeleteByPickdataId(pickdata_id) {
      let stringUrl =
        "http://10.30.64.240:9988/DataMiddleOffice/PickData/PickDataFormDeleteByPickdataId?pickdata_id=" +
        pickdata_id;
      axios({
        method: "get",
        url: stringUrl,
      })
        .then((res) => {
          console.log("Delete.id:", pickdata_id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitPickDataFormDelete(row) {
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
          this.PickDataFormDeleteByPickdataId(row.pickdata_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
  width: 100%;
}

.banner {
  width: 100%;
  height: 60px;
  /* background-color: darkorange; */
  justify-content: center;
  align-items: center;
}

.btn1 ::v-deep .el-button {
  border-radius: 6px;
  /* margin-left: 20px; */
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
  /* margin-left: 20px; */
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

.dw-btn1 {
  width: 450px;
  /* box-sizing: border-box; */
  display: flex;
  padding-left: 5px;
}

.dialg_div1 {
  display: flex;
}
</style>