// Dependencies
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

// Components
import { ModalProvider } from '@ui/contexts/Modal'
import Layout from '@ui/components/templates/layout'
import Modals from '@ui/components/organisms/modals'
import { Web3Provider } from '@ui/contexts/Web3Provider'

// Helpers
import theme from '@ui/base/theme'
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
                <Web3Provider>
                    <Layout>
                        <Component {...pageProps} />
                        <Modals />
                    </Layout>
                </Web3Provider>
            </ModalProvider>
        </ChakraProvider>
    )
}

export default Traces
