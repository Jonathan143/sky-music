const path = require('path')
const resolve = dir => require('path').join(__dirname, dir)

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../src/assets/style/public.scss')
        }
      }
    ],
    include: path.resolve(__dirname, '../')
  })

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader')
      }
    ]
  })
  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.alias['@'] = resolve('../src')

  console.log(config)
  // Return the altered config
  return config
}
