import Vue from 'vue'
// 全局组件自动注册
const componentsContext = require.context('./', true, /\.vue$/)

componentsContext.keys().forEach((component: string) => {
  const name = (component.match(/\.\/(\S*)\./) as any)[1]

  const componentConfig = componentsContext(component)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  const ctrl = componentConfig.default || componentConfig

  Vue.component(name, ctrl)
})
