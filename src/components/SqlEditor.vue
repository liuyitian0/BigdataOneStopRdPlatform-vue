<template >

  <div id="container">
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import  'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'


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
         value: '这里可以写SQL\n',
         language: 'sql',
         automaticLayout: true,
         theme: 'vs-dark',
         selectOnLineNumbers: true, //行号
         fontSize: 18,
         autoIndent: true,
         quickSuggestionsDelay: 500,
         folding: true,
         renderLineHightlight: 'gutter',
         glyphMargin: true,
         acceptSuggertionOnCommitCharacter: true,
         acceptSuggertionOnEnter: 'on',

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
  /* padding-top: 45px; */
  }
</style>