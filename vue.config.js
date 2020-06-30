const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  publicPath: './',

  // 放置生成的静态资源(js、css、img、fonts)的目录。
  assetsDir: 'static',

  // 指定生成的 index.html 的输出路径
  indexPath: 'index.html',
  // 是否使用包含运行时编译器的 Vue 构建版本。
  runtimeCompiler: false,

  lintOnSave: true,
  parallel: false,

  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: `@import '~@/assets/style/public.scss';`
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })

    config.resolve.alias.set('assets', resolve('src/assets'))

    config.optimization.minimizer('terser').tap(args => {
      // 去除生产环境console
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          // gzip压缩配置
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10kb的数据进行压缩
          deleteOriginalAssets: false // 是否删除原文件
        })
      )
    }
  }
}
