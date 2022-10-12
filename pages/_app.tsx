import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from '@ui/base/theme'
import { Web3Provider } from '@ui/contexts/Web3Provider'
import useScrollRestoration from '@ui/hooks/useScrollRestoration'

function MyApp({ Component, pageProps, router }: AppProps) {
  useScrollRestoration(router)
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ChakraProvider>
  )
}

export default MyApp
