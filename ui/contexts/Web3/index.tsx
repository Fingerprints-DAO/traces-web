import React, { PropsWithChildren } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { getChain } from '@web3/helpers/chain'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const selectedChain = [getChain()]

const { chains } = configureChains(selectedChain, [
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_PROVIDER_KEY || '' }),
  jsonRpcProvider({
    rpc: (chain) => ({
      http: chain.rpcUrls.default.http[0],
    }),
  }),
])

const config = createClient(
  getDefaultClient({
    appName: 'Traces by Fingerprints DAO',
    infuraId: process.env.NEXT_PUBLIC_PROVIDER_KEY,
    chains,
  })
)

export const Web3Provider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiConfig client={config}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  )
}

export default Web3Provider
