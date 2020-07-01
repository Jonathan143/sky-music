import Vue from 'vue'
import { compressionParam, replaceHttp } from '@/libs/utils.string'

// 图片压缩参数
Vue.filter('compressionParam', compressionParam)

// 删除 http || https
Vue.filter('replaceHttp', replaceHttp)
