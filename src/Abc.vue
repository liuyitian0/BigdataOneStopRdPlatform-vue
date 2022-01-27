<template>
  <el-container class="indexWrap">
    <div>
      <Navigation/>
    </div>
    <div class="tree">
      <Tree/>
    </div>
    <div class="mainblock">
      <div class="workspace">
          <div class="left">
            <SqlEditor></SqlEditor>
          </div>
          <div class="right">
            <el-aside>
            <el-container id="NodeInfo">
              <el-main>
                <div>
                  <div v-show="toolBarShow==='component'">
                    <div v-show="!isShowNode">
                      <div class="nodetitle">节点属性</div>
                      <div class="nodetitle-model-attr">
                        <p>
                          <span class="item">节点类型:</span>
                          <span class="value">SQL</span>
                        </p>
                        <p>
                          <span class="item">节点名称:</span>
                          <span class="value">Start</span>
                        </p>
                        <p>
                          <span class="item"> 创建人:</span>
                          <span class="value">张三</span>
                        </p>
                        <p>
                          <span class="item">归属任务:</span>
                          <span class="value">dcl-flow</span>
                        </p>
                        <p>
                          <span class="item">当前版本:</span>
                          <span class="value">0001</span>
                        </p>
                        <p>
                          <span class="item">创建时间:</span>
                          <span class="value">2022-01-26 12:14:39</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </el-main>

            </el-container>
            <el-button  class="Btn1"> 试跑 </el-button>
            <el-button  class="Btn2"> 保存 </el-button>
            <el-button  class="Btn3"> 历史版本 </el-button>
            <el-button  class="Btn4"> 版本比对 </el-button>
            </el-aside>
          </div>

          <!-- <div class="bottom">
            <p>
            <span>日志</span>
            </p>
          </div> -->
      </div>

    </div> 
  </el-container>
</template>


<script>
import Navigation from './components/navigation.vue';
import Tree from './components/Tree.vue';
import SqlEditor from './components/SqlEditor.vue';


export default {
  components: {
    Navigation,
    Tree,
    SqlEditor,
  },
  data () {
    return {
      message: '',
      toolBarShow: 'component',
      modelDescription: 'All programs that use checkpointing can resume execution from a savepoint. Savepoints allow both updating your programs and your Flink cluster without losing any state',
    };
  },
  methods: {

  }

};
</script>

<style lang="scss">
.mainblock {
  width: 100%;
  height: 100%;
  // display: flex;
  // background-color: palegreen;
}
.workspace {
  width: 100%;
  height: 100%;
  display: flex;
  // float: right;
  // background-color:palevioletred;
}
 .left {
   width: 80%;
   height: 70%;
 }

 .right {
   width: 20%;
   height: 70%;
   background-color:mintcream;
 }

 .bottom {
  width: 10%;
  height: 20%;
  background-color: rgba(214, 231, 231, 0.808);
 }


  #NodeInfo {
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
    .nodetitle {
      border-bottom: 3px  solid #e5e5e5;
      height: 41px;
      font-size: 14px;
      // color: #999;
      line-height: 40px;
      text-align: center;
    }
    .nodetitle-model-attr {
      padding: 10px;
      .item {
        font-size: 14px;
      }
      .value {
        font-size: 14px;
        color: #999;
        margin-left: 10px;
      }
      .el-input {
        margin-top: 5px;
      }
      textarea {
        margin-top: 5px;
        font-family: inherit;
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
    .messageInfo {
      padding: 0px;
      margin: 10px;
      color: #333;
      font-size: 14px;
      .el-card__body {
        padding: 10px;
      }
      p {
        padding: 0;
        margin: 0;
        font-size: 12px;
      }
    }
  }

.Btn1 {
  margin-top: 240px;
  margin-bottom: 20px;
  margin-left: 10px;
  width: 125px;
}

.Btn2 {
  margin-bottom: 20px;
  margin-left: 10px;
  width: 125px;
}

.Btn3 {
  margin-bottom: 60px;
  margin-left: 10px;
  width: 125px;
}

.Btn4 {
  margin-bottom: 60px;
  margin-left: 10px;
  width: 125px;
}
</style>