<template >

  <div id="container">
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import  'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'
import  'monaco-editor/esm/vs/basic-languages/scala/scala.contribution'
import  'monaco-editor/esm/vs/basic-languages/shell/shell.contribution'
import  'monaco-editor/esm/vs/basic-languages/mysql/mysql.contribution'
import  'monaco-editor/esm/vs/basic-languages/python/python.contribution'
import  'monaco-editor/esm/vs/editor/contrib/find/findController.js'


export default {
   data(){
     return {
       editor: null,
     }
   },
   mounted(){
     this.initEditor();
   },
   methods: {
     initEditor(){
       this.editor = monaco.editor.create(document.getElementById('container'),{
         value: '这里可以写python\n',
         language: 'python',
         automaticLayout: true,
         theme: 'vs-dark',
         selectOnLineNumbers: true, //行号
         fontSize: 20,
         autoIndent: true,
         quickSuggestionsDelay: 500,
         folding: true,
         renderLineHightlight: 'gutter',
         glyphMargin: true
       });
     },
     getValue(){
       this.editor.getValue();
     }
   }
}
</script>

<style scoped>
#container {
  width: 65%;
  height: 80%;
  padding-left: 300px;
  padding-top: 50px;
  }
</style>