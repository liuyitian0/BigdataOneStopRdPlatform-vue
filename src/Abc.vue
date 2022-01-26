<template >

  <div id="container">
  </div>
</template>

<script>
// import * as monaco  from 'monaco-editor';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
// import MyEditor from './components/MyEditor.vue'



import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import  'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'
import  'monaco-editor/esm/vs/basic-languages/scala/scala.contribution'
import  'monaco-editor/esm/vs/basic-languages/shell/shell.contribution'
import  'monaco-editor/esm/vs/basic-languages/mysql/mysql.contribution'
import  'monaco-editor/esm/vs/basic-languages/python/python.contribution'
import  'monaco-editor/esm/vs/editor/contrib/find/findController.js'


export default {
  // components: {
  //   MyEditor
  // },
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
         value: '',
         language: 'sql',
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
  width: 100%;
  height: 100%;
  /* padding-left: 300px; */
  }
</style>