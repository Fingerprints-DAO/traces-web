// Dependencies
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { createClient, configureChains, chain } from 'wagmi'

const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.hardhat],
    [
        infuraProvider({ apiKey: process.env.NEXT_PUBLIC_PROVIDER_KEY || '' }),
        jsonRpcProvider({
            rpc: (chain) => ({
                http: chain.rpcUrls.default,
            }),
        }),
        walletConnectProvider({ projectId: '485af33ad5e6074d70a5cb408d857994' }),
    ]
)

export const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: 'traces', chains }),
    provider,
    webSocketProvider,
})

export const ethereumClient = new EthereumClient(wagmiClient, chains)
