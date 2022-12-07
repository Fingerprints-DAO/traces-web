// Dependencies
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// Helpers
import styles from './styles'
import components from './components'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  primary: {
    50: '#FFFFFF33',
    500: '#FFF',
  },
}

const theme = extendTheme({
  config,
  semanticTokens: {},
  colors,
  components,
  styles,
})

export default theme
