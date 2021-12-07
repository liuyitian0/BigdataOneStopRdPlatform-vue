<template>
  <el-container>
    <div class="navigation">
      <Navigation></Navigation>
    </div>
 
  <el-main>
    <div class="title">
       <h1>数据服务中心(配置即服务)</h1>
     </div>
    <div id="c0">
      <div id="c1">  创建服务接口
      </div>
      <div id="c2">  运维服务
      </div>
      <div id="c3">  调用服务
      </div>
    </div>

    <div class="c00">
      <div id="c5"> 接口鉴权
      </div>
    </div>
    <div class="c00">
      <div id="c4">  数据资产
                 画像标签
                 内容数据
                 社交数据
                 消费数据
                 预测数据
      </div>
    </div>
    <div class="c000">
      <div id="c6"> 数据加速
                   中高速数据缓存
                   多级缓存
                   分析型缓存（olap)
      </div>
      <div id="c7"> 接口服务 (配置化的方式生成 api )
                 kv api
                 SQL api 
                 Stream api 
      </div>
      <div id="c8">
      </div>
      <div id="c9"> 自动生成gRPC/HTTP访问接口
      </div>
    </div>
    <div>
      <div id="c10">
        <!-- <el-link type="primary" href="http://10.30.64.240:12345/dolphinscheduler/ui/#/home" >进入调度系统</el-link> -->
        <el-link type="primary" > </el-link>
      </div>
    </div>

  </el-main>

  </el-container>
</template>


<script>
import Navigation from './components/navigation.vue';


export default {
  components: {
    Navigation,
  },
  mounted(){
    this.initReport1();
    this.initReport2();
    this.initReport3();
    this.initReport4();
    this.initReport5();
  },
  data () {
    return {
      data: [],
      resTablejson:Promise,
    };
  },
  methods: {
    initReport1 (){
 

      // 默认选择
      // interval.elements[0].setState('selected', true);

    },
    initReport2 () {


    },
    initReport3 () {
 
 
    
    },
    initReport4 () {
      // fetch('https://gw.alipayobjects.com/os/bmw-prod/d62448ea-1f58-4498-8f76-b025dd53e570.json')
      // .then((res) => res.json())
      // .then((data) => {
      //   console.log("data:",data);

    

    },
    initReport5 () {
    }
  } //methods
};
</script>

<style scoped>

.title {
  width: 99%;
  /* background-color: khaki; */
  display: flex;
}

h1 {
  font-size: 28px;
  text-align: center;
  letter-spacing: 2px;
  margin: 5px auto;
  };

#c0 {
  width: 100%;
  height: 100%;
  float: left;
}


#c1 {
   background-color: darkkhaki;
   margin-top: 48px;
   width: calc(35%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c2 {
   margin-top: 48px;
   background-color:beige;
   width: calc(35%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c3 {
   margin-top: 50px;
   background-color:coral;
   width: calc(30%);
   height: 450px;
   float: left;
   text-align: center;
   line-height: 30px;
}
#c4 {
   background-color: cornflowerblue;
   margin-top: 88px;
   width: calc(50%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
   padding-left: 5px;
}


#c5 {
   background-color:mistyrose;
   margin-top: 88px;
   width: calc(49%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c6 {
   margin-top: 58px;
   padding-left: 10px;
   background-color:darkturquoise;
   width: calc(25%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 230px;
}

#c7 {
   margin-top: 58px;
   background-color:dodgerblue;
   width: calc(25%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c8 {
   margin-top: 58px;
   background-color:lightskyblue;
   width: calc(25%);
   height: 450px;
   float: left;
   text-align:center;
   line-height: 30px;
}
#c9 {
   margin-top: 58px;
   background-color:rosybrown;
   width: calc(24%);
   height: 450px;
   float: left; 
   text-align:center;
   line-height: 230px;
}
#c10 {
   /* background-color:lightpink; */
   width: calc(100%);
   height: 90px;
   float: left;
   text-align: center;
   font-size: 48px;
   padding-top: initial;
   margin-bottom: 100px;
}
</style>  