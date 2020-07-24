import { configure, addDecorator, addParameters } from '@storybook/vue'
import { addReadme } from 'storybook-readme/vue'
import { themes, create } from '@storybook/theming'
import '@/plugins/vant.ts'
import '@/assets/style/public-class.scss'

const basicTheme = create({
  base: 'light',
  brandTitle: 'README addon',
  brandUrl: 'https://github.com/tuchk4/storybook-readme',
  brandImage: null
})

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right',
    theme: basicTheme
    // theme: themes.dark,
  },
  readme: {
    // You can set the global code theme here.
    codeTheme: 'github'
  }
})

addDecorator(addReadme)

configure(require.context('../src', true, /\.stories\.[tj]s$/), module)
