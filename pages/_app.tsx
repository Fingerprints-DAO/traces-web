// Dependencies
import type { AppContext, AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Web3Modal } from '@web3modal/react'
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiConfig as Web3Provider } from 'wagmi'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import NProgress from 'nprogress'
import App from 'next/app'
import 'nprogress/nprogress.css'

// Components
import { ModalProvider } from '@ui/contexts/Modal'
import Layout from '@ui/components/templates/layout'
import Modal from '@ui/components/organisms/modals'

// Helpers
import theme from '@ui/base/theme'
import ReactQueryProvider from '@ui/contexts/ReactQuery'
import { web3Config, ethereumClient } from '@web3/config'
import useScrollRestoration from '@ui/hooks/use-scroll-restoration'
import MetaTags, { MetaTagsProps } from '@ui/components/molecules/metatags'

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
import { getBaseURL } from './api/helpers/_getLink'

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
NProgress.configure({ showSpinner: false })

type TracesProps = AppProps & {
  pageProps: {
    host: string
    meta: MetaTagsProps
  }
}

function Traces({ Component, pageProps }: TracesProps) {
  const router = useRouter()
  useScrollRestoration(router)

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <ReactQueryProvider>
      <MetaTags {...pageProps.meta} host={pageProps.host} />
      <ChakraProvider theme={theme}>
        <Web3Provider client={web3Config}>
          <ModalProvider>
            <Layout>
              <Component {...pageProps} />
              <Modal />
            </Layout>
          </ModalProvider>
        </Web3Provider>
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

Traces.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return {
    pageProps: {
      ...appProps.pageProps,
      host: getBaseURL(),
    },
  }
}

export default Traces
