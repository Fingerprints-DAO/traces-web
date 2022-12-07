// Dependencies
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { createClient, configureChains, chain } from 'wagmi'
import { getChain } from './helpers/chain'

const selectedChain = [getChain()]
const { chains, provider } = configureChains(selectedChain, [
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_PROVIDER_KEY || '' }),
  jsonRpcProvider({
    rpc: (chain) => ({
      http: chain.rpcUrls.default,
    }),
  }),
  walletConnectProvider({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_KEY || '' }),
])

export const web3Config = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'traces', chains }),
  provider,
})

export const ethereumClient = new EthereumClient(web3Config, chains)
