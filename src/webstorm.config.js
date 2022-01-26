'use strict'
const webpackConfig = require('@vue/cli-service/webpack.config.js')
const MonacoWebpackPlugin = require('monaco-editor-esm-webpack-plugin');
const { languages, features } = require('monaco-editor/esm/metadata');
module.exports = {
    plugins : [
      new MonacoWebpackPlugin( {
        languages: ['sql','json','sql','shell'],
        features: ['coreCommands','find']
      })
    ]
}
module.exports = webpackConfig