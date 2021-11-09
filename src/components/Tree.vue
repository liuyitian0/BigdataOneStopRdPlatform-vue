<template>
  <el-container class="flowChartWrap">
    <el-aside width="350px"
              class="left">
      <div class="searchbox">
        <el-input placeholder="搜索"
                  size="small"
                  v-model="filterText">
          <i slot="prefix"
             class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <el-tree :data="nodeData"
               node-key="id"
               :default-expanded-keys="['source','preHandle','sign','learn']"
               icon-class="el-icon-arrow-right"
               :render-content="renderContentFunction"
               :filter-node-method="filterNode"
               ref="tree2"
               :props="defaultProps">
      </el-tree>
    </el-aside>
    <el-main>
      <el-container>
        <el-header height="40px"
                   class="tabsNav">
          <el-tabs v-model="activeName"
                   type="card"
                   closable>
          </el-tabs>
        </el-header>
        <el-container>
          <el-main class="main">
            <div id="mainMenu">
            </div>
            <div class="mainContainer"
                 @drop="dropHandle"
                 @dragover="dragoverHandle">
              <div id="mainContainer"
                   @click="clickBgHandle"></div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import Vue, { CreateElement } from 'vue';
import API from '../api/lineages';
import Tree from './Tree';

export default Vue.extend({
  data() {
    return {
      isShowNode: false,
      currentNodeId: '',
      isUndoDisable: true,
      isExecDisable: false,
      nodeData: [],
      filterText: '',
      activeName: 'first',
      toolBarShow: 'component',
      dialogTableVisible: false,
      defaultProps : {},
    };
  },
  watch: {
    filterText(val: string) {
      this.$refs.tree2.filter(val);
    },
  },
  mounted() {
    Tree.setContainer('mainContainer');
    Tree.on('commandListEmpty', () => {
      this.isUndoDisable = true;
    });
    Tree.on('showNodeData', () => {
      this.dialogTableVisible = true;
    });
    Tree.on('addCommand', () => {
      this.isUndoDisable = false;
    });
    Tree.on('selectNode', (data: string) => {
      this.isShowNode = true;
      this.currentNodeId = data;
    });
    API.getFlowChartData().then((data: any) => {
      Tree.loadData(data.data);
    });
    API.getLineagesMenuData().then((data:any) => {
      this.nodeData = data.data;
    });
  },
  methods: {
    renderContentFunction(h: CreateElement, { node, data }:{node:any, data:any}) {
      const className = node.expanded ? 'el-icon-folder-opened' : 'el-icon-folder';
      const classNameChild = (!data.children && data.icon) ? data.icon : '';
      return h('div', {
        class: { leafNode: !data.children },
        style: {
          height: '38px',
          lineHeight: '38px',
          fontSize: '12px',
          color: '#1b1c23',
        },
      }, [
        h('el-tooltip', {
          attrs: {
            content: data.label,
            placement: 'top-end',
            disabled: !!data.children,
          },
        }, [
          h('span', {
            attrs: {
              draggable: !data.children,
              id: data.id,
            },
            on: {
              dragstart: this.dragHandle,
            },
            class: 'node',
            style: {
              display: 'inline-block',
              marginTop: '4px',
              height: '30px',
              lineHeight: '30px',
              width: '140px',
              borderRadius: '4px',
              position: 'relative',
              outline: 'none',
              border: !data.children ? '1px solid transparent' : 'none',
            },
          }, [
            h('i', {
              class: {
                [className]: !!data.children,
                [classNameChild]: !data.children,
              },
              style: {
                color: '#00cdea',
                marginLeft: data.children ? '10px' : '15px',
              },
            }),
            h('span', {
              style: {
                fontSize: '13px',
                marginLeft: '10px',
              },
            }, data.label),
          ]),
        ]),
      ]);
    },
    filterNode(value:string, data:any) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    dragoverHandle(ev:Event) {
      ev.preventDefault();
    },
    dragHandle(ev:any) {
      ev.dataTransfer.setData('target', ev.target.id);
    },
    dropHandle(ev:any) {
      Tree.addNode({ pageX: ev.pageX, pageY: ev.pageY }, ev.dataTransfer.getData('target'));
    },
    clickBgHandle() {
      this.isShowNode = false;
    },
    zoomOut() {
      Tree.zoomOut();
    },
    zoomIn() {
      Tree.zoomIn();
    },
    undo() {
      Tree.undo();
    },
    execModel() {
      this.isExecDisable = true;
      Tree.execModel().then(() => {
        this.isExecDisable = false;
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.flowChartWrap {
  width: 350px;
  background-color: red;
  .main {
    #mainMenu {
      height: 41px;
      border-bottom: 1px solid #e1e1e1;
      .tool-left {
        float: left;
        .el-button {
          &:first-child {
            margin-left: 10px;
          }
          border: none;
          margin-top: 8px;
        }
      }
      .tool-right {
        float: right;
        .el-button {
          position: relative;
          border: none;
          margin: 3px 0 0 0;
          &:last-child {
            margin-right: 10px;
          }
          background: transparent;
        }
      }
    }
    .mainContainer {
      height: calc(100% - 42px);
      position: relative;
      overflow: hidden;
      outline: none !important;
      #mainContainer {
        outline: none !important;
        height: 100%;
        width: 100%;
        position: relative;
      }
    }
  }
  #mainNodeInfo {
    .nodeInfoToolBar {
      border-left: 1px solid #e5e5e5;
      overflow: hidden;
      .tool {
        padding: 8px 0;
        writing-mode: vertical-rl;
        line-height: 32px;
        font-size: 12px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        &.acitve {
          background: #eee;
        }
        span {
          margin: 5px 0;
        }
      }
    }
    .title {
      border-bottom: 1px solid #e5e5e5;
      height: 41px;
      font-size: 12px;
      // color: #999;
      line-height: 40px;
      text-align: center;
    }
    .model-attr {
      padding: 10px;
      .item {
        font-size: 12px;
      }
    }
    .node-attr {
      padding: 10px;
      .item {
        font-size: 12px;
      }
    .value {
      font-size: 12px;
      color: #999;
      margin-left: 10px;
    }
    }
  }
  .el-aside {
    .searchbox {
      background-color: #f3f3f3;
      padding: 2px 2px;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e5e5;
      .el-input {
        height: 38px;
      }
      .el-input--small .el-input__icon {
        line-height: 12px;
      }
    }
  }
  .tabsNav {
    padding: 0;
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border-top: 1px solid #01c1de;
      border-radius: 0;
    }
    .el-tabs__item.is-active {
      color: rgb(28, 245, 9) !important;
    }
    .el-tabs__item {
      font-size: 16px;
    }
    .el-tabs__item:focus.is-active.is-focus:not(:active) {
      box-shadow: none !important;
    }
  }
  .leafNode {
    .node::before {
      content: "";
      position: absolute;
      top: 2px;
      left: 3px;
      border-radius: 2px;
      padding: 13px 2px;
      background: transparent;
    }
    &:hover span.node {
      border: 1px solid #1c9bec !important;
      background: #fff;
      &::before {
        background: #1c9bec;
      }
    }
  }
}
</style>
