<template >
  <div id="container"></div>
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/basic-languages/sql/sql.contribution";

export default {
  data() {
    return {
      editor: null,
      sqlvalue:
        " ----# 订单数 \n" +
        "select rescue  \n " +
        "\t    ,count(distinct workorder_id) as cnt  \n" +
        "  from (                \n " +
        " select get_json_string(columnInfo,'$.update_time') as  update_time      \n " +
        "       ,get_json_string(columnInfo,'$.workorder_id') as  workorder_id    \n" +
        "        ,get_json_string(columnInfo,'$.rescue_project') as  rescue_project  \n " +
        "       ,get_json_string(columnInfo,'$.starttime') as  starttime             \n " +
        "       ,get_json_string(columnInfo,'$.endtime') as  endtime                 \n " +
        "       ,get_json_string(columnInfo,'$.policy_name') as  policy_name        \n " +
        "   from ods.doris_platform_crm_rescue_order tt       \n " +
        "  where SUBSTRING(get_json_string(columnInfo,'$.rescue_handle_date'),1,4)='2022'  \n" +
        " ) aa  \n" +
        "group by rescue;\n",
    };
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      this.editor = monaco.editor.create(document.getElementById("container"), {
        value: this.sqlvalue,
        language: "sql",
        automaticLayout: false,
        theme: "vs-dark",
        selectOnLineNumbers: true, //行号
        fontSize: 18,
        autoIndent: true,
        quickSuggestionsDelay: 500,
        folding: true,
        renderLineHightlight: "gutter",
        glyphMargin: true,
        acceptSuggertionOnCommitCharacter: true,
        acceptSuggertionOnEnter: "on",
      });
    },
    getValue() {
      this.editor.getValue();
    },
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  /* padding-left: 300px; */
  /* padding-top: 45px; */
}
</style>