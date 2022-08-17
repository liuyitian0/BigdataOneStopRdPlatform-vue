<template>
  <div class="wrrap">
    <el-tabs
      type="border-card"
      v-model="activeName"
      style="height: 100%; width: 100%"
    >
      <el-tab-pane label="表血缘" name="first">
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

      <el-tab-pane label="字段血缘" name="second">
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
          查看血缘
        </el-button>
        <i class="el-icon-location"> {{ tab }}.{{ col }} </i>

        <div>
          <div id="container2"></div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="补录/纠正" name="third">
        功能待上线中 ...
      </el-tab-pane>
    </el-tabs>
  </div>
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
import { GetTabRectNode } from "@/utils/GetTabRect";

const LINE_HEIGHT = 32;
const NODE_WIDTH = 300;

export default {
  name: "index",
  data() {
    return {
      Searchtablename: null,
      jsondata: [],
      jsonERdata: {},
      node: [],
      edge: [],
      alldata: {},
      resdata: {},
      activeName: "",
      tab: "dw_crm_supper_case_details",
      col: "rescue_record_date",
      cellsAll: [],
      value_table: "down",
      value_col: "down",
      value_level: "3",
      selectLevel: [],
      selectDirc: [],
      selectColDirc: [],
      levelcnt: 3,
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
      options_col_dirc: [
        {
          value_col: "down",
          label: "下游",
        },
        {
          value_col: "up",
          label: "上游",
        },
      ],
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
      miniMapContainerTab: null,
    };
  },
  created() {
    this.activeName = "first";
  },
  mounted() {},
  methods: {
    getTabLineagedata() {
      // this.GetTab(this.Searchtablename, this.$refs.selectLevel.selected.label); --- old
      let dirc = this.$refs.selectDirc.selected.label; // 上下游
      let lvl = this.$refs.selectLevel.selected.value; // 层级
      this.GetTab(this.Searchtablename, dirc, lvl);
    },
    getColLineagedata(tab, col) {
      this.canvnsCol(
        this.tab,
        this.col,
        this.$refs.selectColDirc.selected.label
      );
    },
    // GetTab(tablename, lable_level) {
    //   this.alldata = {};
    //   this.node = [];
    //   this.edge = [];
    //   this.jsondata = [];
    //   this.graph = {};
    //   this.miniMapContainerRef = null;
    //   this.newModel = {};
    //   //调用公共方法,获取单个表的数据
    //   // this.jsondata = require("../../public/data/base.json");
    //   // this.jsondata.forEach((item, index) => {
    //   //   if (item.name === tablename) {
    //   //     // tablelable
    //   //     this.resdata = item.value;
    //   //     console.log("resdata", this.resdata);
    //   //     this.resdata.forEach((subitem, index) => {
    //   //       this.node.push(GetDataGraph(subitem.s, subitem.t)[0]);
    //   //       this.edge.push(GetDataGraph(subitem.s, subitem.t)[1]);
    //   //     });
    //   //   }
    //   // });
    //   // this.alldata.nodes = this.node;
    //   // this.alldata.edges = this.edge;
    //   // console.log("nodes", this.node);
    //   // console.log("edges", this.edges);
    //   // if (this.alldata.nodes.length != 0) {
    //   //   const miniMapContainerRef = this.$refs.miniMapContainerRef;
    //   //   const graph = new X6.Graph({
    //   //     container: document.getElementById("container1"),
    //   //     width: 4600,
    //   //     height: 4600,
    //   //     snapline: true,
    //   //     background: {
    //   //       color: "#ffffff",
    //   //     },
    //   //     grid: {
    //   //       size: 10, // 网格大小 10px
    //   //       visible: true, // 渲染网格背景
    //   //     },
    //   //     scroller: {
    //   //       enabled: true,
    //   //       pageVisible: true,
    //   //       pageBreak: true,
    //   //       pannable: true,
    //   //     },
    //   //     minimap: {
    //   //       enabled: true,
    //   //       container: miniMapContainerRef,
    //   //     },
    //   //     // rotating: {
    //   //     //   enabled: true, // 是否开启节点旋转
    //   //     //   grid: 45 // 每次旋转15度
    //   //     // },
    //   //   });

    //   //   const dagreLayout = new DagreLayout({
    //   //     type: "dagre",
    //   //     rankdir: "LR",
    //   //     align: "UR",
    //   //     ranksep: 100,
    //   //     nodesep: 20,
    //   //     controlPoints: true,
    //   //   });
    //   //   const newModel = dagreLayout.layout(this.alldata);

    //   //   graph.fromJSON(newModel);
    //   // } //if

    //   // ------------- 以下是新逻辑

    //   const miniMapContainerRef = this.$refs.miniMapContainerRef;
    //   const graphTab = new X6.Graph({
    //     container: document.getElementById("container1"),
    //     width: 4600,
    //     height: 4600,
    //     snapline: true,
    //     background: {
    //       color: "#ffffff",
    //     },
    //     grid: {
    //       size: 10, // 网格大小 10px
    //       visible: true, // 渲染网格背景
    //     },
    //     scroller: {
    //       enabled: true,
    //       pageVisible: true,
    //       pageBreak: true,
    //       pannable: true,
    //     },
    //     // minimap: {
    //     //   enabled: true,
    //     //   container: miniMapContainerRef,
    //     // },
    //     // rotating: {
    //     //   enabled: true, // 是否开启节点旋转
    //     //   grid: 45 // 每次旋转15度
    //     // },
    //   });

    //   // const dagreLayout = new DagreLayout({
    //   //   type: "dagre",
    //   //   rankdir: "LR",
    //   //   align: "UR",
    //   //   ranksep: 100,
    //   //   nodesep: 20,
    //   //   controlPoints: true,
    //   // });

    //   if (lable_level === "上游") {
    //     let stringUrl =
    //       "http://10.30.64.240:9988/DataMiddleOffice/LineageColumnUp?table_name=" +
    //       tablename +
    //       "&col_name=" +
    //       tablename;
    //     axios({
    //       method: "get",
    //       url: stringUrl,
    //     })
    //       .then((res) => {
    //         this.jsonERdata = res.data.data;

    //         //     this.resdata.forEach((subitem, index) => {
    //         //       this.node.push(GetDataGraph(subitem.s, subitem.t)[0]);
    //         //       this.edge.push(GetDataGraph(subitem.s, subitem.t)[1]);
    //         //     });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } else {
    //     let stringUrl =
    //       "http://10.30.64.240:9988/DataMiddleOffice/LineageTableDown?table_name=" +
    //       tablename;

    //     axios({
    //       method: "get",
    //       url: stringUrl,
    //     })
    //       .then((res) => {
    //         this.jsonERdata = res.data.data;
    //         this.jsonERdata.forEach((res) => {
    //           // let stab = res.src_db_nme + "." + res.src_tab_nme;
    //           // let ttab = res.tar_db_nme + "." + res.tar_tab_nme;
    //           let s = res.src_tab_nme;
    //           let t = res.tar_tab_nme;
    //           this.node.push(GetTabRectNode(s));
    //           // this.node.push(GetTabRectNode(t));
    //           // console.log(GetDataGraph(s, t));
    //           // this.edge.push(GetDataGraph(subitem.s, subitem.t)[1]);
    //           // this.edge.push(GetDataGraph(stab, ttab));
    //         });
    //         // console.log("node", this.node);
    //         this.alldata = this.node;
    //         // console.log("alldata", this.alldata);
    //         // this.alldata.edges = this.edge;
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    //   // console.log("this.alldata", this.alldata);
    //   // const newModel = dagreLayout.layout(this.alldata);
    //   // graphTab.createNode(this.alldata);
    //   // graphTab.fromJSON(newModel);
    // },
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
          res.tar_tab_nme +
          "." +
          res.tar_col_nme +
          "_" +
          res.src_tab_nme +
          "." +
          res.src_col_list;
        resEdge = GetColEdgeDataGraph(
          tabjoin,
          res.tar_tab_nme,
          tabcol2,
          res.src_tab_nme,
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
          "http://10.30.64.240:9988/DataMiddleOffice/LineageColumnUp?table_name=" +
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
          "http://10.30.64.240:9988/DataMiddleOffice/LineageColumnDown?table_name=" +
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
    GetTab(Inputtable, dirc, level) {
      this.alldata = {};
      this.node = [];
      this.edge = [];
      this.jsondata = [];
      this.graph = null;
      this.newModel = {};
      this.miniMapContainerTab = this.container;
      let stringUrl =
        "http://10.30.64.240:8088/table/" + Inputtable.toLowerCase();

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
            console.log("this.tabledata", this.alldata);
            const newModel = dagreLayout.layout(this.alldata);
            graph.fromJSON(newModel);
            // graph.centerContent();
          }
        }); //fetch
    }, //init
  },
};
</script>

<style scoped>
.wrrap {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.miniMap {
  position: fixed;
  z-index: 999;
  bottom: 35px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 240px;
}

.banner_Btn1 {
  margin-left: 30px;
}
.banner_input1 {
  margin-left: 10px;
  /* margin-top: 5px; */
  width: 280px;
  height: 36px;
  border-radius: 10px;
}
.banner_input1_col {
  margin-left: 10px;
  width: 150px;
  height: 36px;
  border-radius: 10px;
}

.el-icon-location {
  margin-left: 100px;
  font-size: 18px;
  font-weight: bold;
  color: green;
}
.el-select {
  margin-left: 10px;
  width: 126px;
}

#container2 {
  /* background-color: coral; */
  width: 1400px;
  height: 760px;
  /* top: 10px; */
  /* margin: 0 auto; */
}

.el-tabs__content {
  padding: 1px;
  background-color: lime;
}

/* #pane-first.el-tab-pane {
  padding: 0px;
  background-color: magenta;
  margin-top: 1px;
} */
</style>