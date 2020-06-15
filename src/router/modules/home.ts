// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/',
  name: 'home',
  meta,
  redirect: { name: 'homeLibrary' },
  component: _import('home'),
  children: (pre => [
    {
      path: 'library',
      name: `${pre}Library`,
      component: _import('home/library'),
      meta: { title: '推荐', cache: true }
    },
    {
      path: 'favorites',
      name: `${pre}Favorites`,
      component: _import('home/favorites'),
      meta: { title: '我的喜欢', cache: true }
    },
    {
      path: 'suggest',
      name: `${pre}Suggest`,
      component: _import('home/suggest'),
      meta: { title: '曲库', cache: true }
    }
  ])('home')
}
