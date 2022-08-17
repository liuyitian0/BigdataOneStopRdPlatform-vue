<template>
  <div id="app">
    <!-- 引入magic-editor组件 -->
    <magic-editor />
  </div>
</template>

<script>
// 引入组件
import MagicEditor from "magic-editor";
// 引入样式
import "magic-editor/dist/magic-editor.css";

export default {
  components: {
    MagicEditor,
  },
  data() {
    return {
      config: {
        baseURL: "http://localhost:9999/magic/web", //配置后台服务
        serverURL: "http://localhost:9999/", //配置接口实际路径
        // 其它配置请参考文档
      },
    };
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>