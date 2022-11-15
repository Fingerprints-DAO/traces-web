import Web3Modal, { IProviderOptions } from 'web3modal'
import { providers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { PROVIDER_KEY, WEB3_NETWORK } from '@ui/base/dotenv-client'

export type ProviderType = providers.JsonRpcProvider | providers.Web3Provider

const providerOptions: IProviderOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: PROVIDER_KEY, // required
        },
    },
}

const onChangeNetwork = (_: any, oldNetwork: any) => {
    if (oldNetwork) {
        window.location.reload()
    }
}

const startProvider = () => {
    if (WEB3_NETWORK === 'local') {
        return new providers.JsonRpcProvider()
    }

    return new providers.InfuraProvider(WEB3_NETWORK)
}

let web3Modal: Web3Modal

if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
    })
}

export class Provider {
    readProvider: ProviderType
    signedProvider: ProviderType | null

    constructor() {
        this.readProvider = startProvider()
        this.signedProvider = null
        this.bindNetworkChanges(this.readProvider)
    }

    get() {
        return this.readProvider
    }

    getConnectedWallet() {
        return this.signedProvider
    }

    async connectWallet() {
        const providerConnection = await web3Modal.connect()

        this.signedProvider = new providers.Web3Provider(providerConnection)
        this.bindNetworkChanges(this.signedProvider)

        return this.signedProvider
    }

    disconnectWallet() {
        web3Modal.clearCachedProvider()
        web3Modal.toggleModal()
    }

    bindNetworkChanges(provider: ProviderType) {
        provider
            ?.on('network', onChangeNetwork)
            .on('chainChanged', onChangeNetwork)
            .on('accountsChanged', () => {
                window.location.reload()
            })
    }
}
