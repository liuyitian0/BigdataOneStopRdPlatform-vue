<template>
  <el-main>
    <el-tabs type="border-card">
      <!-- 走马灯 -->
      <!-- <el-tab-pane label="数据资产"> -->
      <!-- <span>资源大盘 </span> -->
      <!-- <el-carousel :interval="4000" type="card" height="600px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel> -->
      <!-- </el-tab-pane> -->

      <el-tab-pane label="数据字典">
        <el-row class="el-row">
          <div class="btn1">
            <el-input
              v-model="inputSearch"
              placeholder="请输入数仓表名..."
              style="width: 750px"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>

            <el-button
              type="primary"
              style="margin-left: 20px"
              @click="searchtable()"
              >查询表</el-button
            >

            <el-button type="primary">新增字典表</el-button>
          </div>
          <el-table :data="DataDictableDataDetail">
            <!-- <el-table-column label="业务板块" width="100">
              <template slot-scope="dataDicResScope">
                <div slot="reference" class="name-wrapper">
                  <span>
                    {{ dataDicResScope.row.busi_module }}
                  </span>
                </div>
              </template>
            </el-table-column> -->

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
            <el-table-column label="字段类型" width="180">
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.column_type
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
            <!-- <el-table-column label="主数据" width="80">
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.data_primary
                }}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="是否有效" width="110">
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.isvalid
                }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="创维人" width="130">
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.preserve_person
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
            <!-- <el-table-column label="更新时间" width="180">
              <i class="el-icon-time"></i>
              <template slot-scope="dataDicResScope">
                <span style="margin-left: 10px">{{
                  dataDicResScope.row.update_time
                }}</span>
              </template>
            </el-table-column> -->
          </el-table>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>



<script>
import axios from "axios";

export default {
  data() {
    return {
      inputSearch: "",
      DataDictableDataDetail: [],
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
        "http://10.30.64.240:9988/DataMiddleOffice/DataDicSearchTable?table_name=" +
        this.inputSearch;
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
  },
  mounted() {},
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
</style>