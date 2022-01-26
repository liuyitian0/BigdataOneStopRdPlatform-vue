<template>
    <div ref="container" class="monaco-editor"></div>
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
    name: 'MyEditor',
    data(){
        return {
            defaultOpts:{
                folding: true,
                links: true,
                overviewRuleBorder: false,
                renderLineHightlight: 'gutter',
                scrollBeyondLastLine: true,
                theme: 'vs-dark'
            }
        }
    }
}
</script>