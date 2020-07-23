import headerTitle from './index.vue'
import '@/plugins/vant.ts'

export default { title: 'headerTitle' }

export const asAComponent = () => ({
  components: { headerTitle },
  template: `<header-title class="favorites-artists__header-title"
  size="22px"
  value="Artists"
  content="Artists" />`
})
