<template>
  <el-container class="flowChartWrap">
    <el-aside class="index">
      
      <div class="searchbox">
        <el-input placeholder="搜索" size="small" v-model="filterText">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <el-tree :data="nodeData"
               node-key="id"
               :default-expanded-keys="['source','preHandle','sign','learn']"
               :render-content="renderContentFunction"
               :filter-node-method="filterNode"
               ref="tree2"
               :props="defaultProps">
      </el-tree>

    </el-aside>
    <el-main>
          <el-main>
            <div class="mainContainer" @drop="dropHandle" @dragover="dragoverHandle">
              <div id="mainContainer" @click="clickBgHandle"></div>
            </div>
          </el-main>
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
.index {
  width: 348px;
  // background-color: red;
}
</style>
