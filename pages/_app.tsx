// Dependencies
import type { AppProps } from 'next/app'
import { Web3Modal } from '@web3modal/react'
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiConfig as Web3Provider } from 'wagmi'

// Components
import { ModalProvider } from '@ui/contexts/Modal'
import Layout from '@ui/components/templates/layout'
import Modal from '@ui/components/organisms/modals'

// Helpers
import theme from '@ui/base/theme'
import { web3Config, ethereumClient } from '@web3/config'
import useScrollRestoration from '@ui/hooks/use-scroll-restoration'

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

function Traces({ Component, pageProps, router }: AppProps) {
  useScrollRestoration(router)

  return (
    <ChakraProvider theme={theme}>
      <ModalProvider>
        <Web3Provider client={web3Config}>
          <Layout>
            <Component {...pageProps} />
            <Modal />
          </Layout>
        </Web3Provider>
      </ModalProvider>
      <Web3Modal projectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_KEY || ''} themeMode="dark" themeColor="default" ethereumClient={ethereumClient} />
    </ChakraProvider>
  )
}

export default Traces
