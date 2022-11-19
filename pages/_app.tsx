// Dependencies
import { WagmiConfig } from 'wagmi'
import type { AppProps } from 'next/app'
import { Web3Modal } from '@web3modal/react'
import { ChakraProvider } from '@chakra-ui/react'

// Components
import { ModalProvider } from '@ui/contexts/Modal'
import Layout from '@ui/components/templates/layout'
import Modals from '@ui/components/organisms/modals'

// Helpers
import theme from '@ui/base/theme'
import { wagmiClient, ethereumClient } from '@web3/wagmi'
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
                <WagmiConfig client={wagmiClient}>
                    <Layout>
                        <Component {...pageProps} />
                        <Modals />
                    </Layout>
                </WagmiConfig>
            </ModalProvider>
            <Web3Modal projectId={'485af33ad5e6074d70a5cb408d857994'} theme="dark" accentColor="default" ethereumClient={ethereumClient} />
        </ChakraProvider>
    )
}

export default Traces
