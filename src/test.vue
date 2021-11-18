<template>
  <el-container class="flowChartWrap">
    <el-aside class="index">
      
      <div class="searchbox">
        <el-input placeholder="搜索" size="small" v-model="filterText">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <el-tree :data="resj"
               node-key="id-tree1"
               :render-content="renderContentFunction"
               ref="tree1"
               :highlight-current="true"
               :props="defaultProps"
               >
      </el-tree>
    </el-aside>

  </el-container>
</template>

<script lang="ts">
import Vue, { CreateElement } from 'vue';
 export default Vue.extend({
   data(){
     return {
       resj:[],
       filterNode:{},
       filterText:null,
       defaultProps: {},
     }
   },
   mounted() {
      //  console.log('nodedata:',this.nodeData);
     this.resj = require('../public/data/TreeDW.json');
    //  this.nodeData = this.resj;
    //  console.log('resdata:',this.resj);
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
              width: '240px',
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
    
    dragHandle(ev:any) {
      ev.dataTransfer.setData('target', ev.target.id);
    },

   } //methods

});
</script>

<style scoped>
.el-tree {
  color: blue;
}
</style>