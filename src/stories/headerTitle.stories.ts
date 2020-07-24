import HeaderTitle from '@/components/headerTitle/index.vue'

export default { title: 'HeaderTitle' }

export const asAComponent = () => ({
  components: { HeaderTitle },
  template: `<header-title class="favorites-artists__header-title"
  size="22px"
  value="Artists"
  content="Artists" />`
})
