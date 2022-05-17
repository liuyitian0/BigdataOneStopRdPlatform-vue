<template>
  <el-container class="wrap">
    <el-header class="fy_el-header" height="58px">
      <img src="./assets/all_profile.jpeg" alt="" />
      <span class="logoFont">大数据研发平台</span>
      <router-link class="navItem" active-class="active" to="/index"
        >IDE</router-link
      >
      <router-link class="navItem" to="/scheduler">调度中心</router-link>
      <router-link class="navItem" to="/index">数据交换</router-link>
      <router-link class="navItem" to="/DataServices">数据服务</router-link>
      <router-link class="navItem" to="/index">数据权限</router-link>
      <router-link class="navItem" to="/Indicators">数据指标</router-link>
      <router-link class="navItem" to="/index">数据治理</router-link>
      <router-link class="navItem" to="/Test">alg平台</router-link>
      <router-link class="navItem" to="/DataLineage">数据血缘</router-link>
      <router-link class="navItem" to="/Abc">运维监控</router-link>
      <router-link class="navItem" to="/Graph">Flink流平台</router-link>
      <el-dropdown>
        <span class="el-dropdown-link">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-tools">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-warning">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="my-app-container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>
<style lang="scss">
html {
  height: 100%;
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  .wrap {
    height: 100%;
    .fy_el-header {
      background: #031725;
      color: #fff;
      z-index: 1000;
      font-size: 14px;
      line-height: 50px;
      padding-left: 5px;
      img {
        height: 42px;
        width: 42px;
        margin-left: 0;
      }
      span.logoFont {
        font-size: 16px;
        margin-left: 20px;
        position: relative;
        top: -9px;
        margin-right: 100px;
      }
      .navItem {
        color: #fff;
        display: inline-block;
        height: 42px;
        line-height: 42px;
        padding: 0 20px;
        position: relative;
        font-size: 18px;
        top: -10px;
        text-decoration: none;
        &.active {
          background: hsla(0, 0%, 100%, 0.2);
        }
      }
      .el-dropdown {
        float: right;
        height: 42px;
        .el-dropdown-link {
          color: #fff;
        }
      }
    }

    .my-app-container {
      height: calc(100% - 42px);
    }
  }
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.12);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
