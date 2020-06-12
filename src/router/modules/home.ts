// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/',
  name: 'home',
  meta,
  redirect: { name: 'homeDiscovery' },
  component: _import('home'),
  children: (pre => [
    {
      path: 'discovery',
      name: `${pre}Discovery`,
      component: _import('home/discovery'),
      meta: { title: '发现', cache: true }
    }
  ])('home')
}
