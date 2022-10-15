// Dependencies
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

// Components
import Layout from '@ui/components/templates/layout'

// Helpers
import theme from '@ui/base/theme'
import { Web3Provider } from '@ui/contexts/Web3Provider'
import useScrollRestoration from '@ui/hooks/useScrollRestoration'

// Assets
import '../styles/globals.css'
import '@fontsource/inter/100.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'

function MyApp({ Component, pageProps, router }: AppProps) {
  useScrollRestoration(router)

  return (
    <ChakraProvider theme={theme}>
      {/* <Web3Provider> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </Web3Provider> */}
    </ChakraProvider>
  )
}

export default MyApp
