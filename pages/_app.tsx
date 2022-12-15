// Dependencies
import type { AppProps } from 'next/app'
import { Web3Modal } from '@web3modal/react'
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiConfig as Web3Provider } from 'wagmi'
import { QueryClient } from 'react-query'
import Router from 'next/router'
import ReactDOM from 'react-dom'

// Components
import { ModalProvider } from '@ui/contexts/Modal'
import Layout from '@ui/components/templates/layout'
import Modal from '@ui/components/organisms/modals'

// Helpers
import theme from '@ui/base/theme'
import ReactQueryProvider from '@ui/contexts/ReactQuery'
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

const Loading = () => <div>Loading louco...</div>

const registerLoadingScreen = () => {
  if (typeof window === 'undefined') return
  const container = document.createElement('div')

  Router.events.on('routeChangeStart', () => {
    ReactDOM.render(<Loading />, container)
    document.body.appendChild(container)
  })

  Router.events.on('routeChangeComplete', () => {
    ReactDOM.unmountComponentAtNode(container)
    // hide the loading screen
    document.body.removeChild(container)
  })
}
registerLoadingScreen()

function Traces({ Component, pageProps, router }: AppProps) {
  useScrollRestoration(router)

  return (
    <ReactQueryProvider>
      <ChakraProvider theme={theme}>
        <ModalProvider>
          <Web3Provider client={web3Config}>
            <Layout>
              <Component {...pageProps} />
              <Modal />
            </Layout>
          </Web3Provider>
        </ModalProvider>
        <Web3Modal
          projectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_KEY || ''}
          themeMode="dark"
          themeColor="default"
          ethereumClient={ethereumClient}
        />
      </ChakraProvider>
    </ReactQueryProvider>
  )
}

export default Traces
