import { configureChains, createClient } from 'wagmi'
import { getChain } from '@web3/helpers/chain'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const selectedChain = [getChain()]

const { provider } = configureChains(selectedChain, [
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_PROVIDER_KEY || '' }),
  jsonRpcProvider({
    rpc: (chain) => ({
      http: chain.rpcUrls.default.http[0],
    }),
  }),
])

createClient({
  provider,
})
