import { providers } from 'ethers'

export type ProviderType = providers.JsonRpcProvider | providers.Web3Provider

export class Provider {
  provider: ProviderType
  constructor() {
    if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'local') {
      this.provider = new providers.JsonRpcProvider()
    } else {
      this.provider = new providers.InfuraProvider(process.env.NEXT_PUBLIC_PROVIDER_KEY)
    }
  }
  get() {
    return this.provider
  }
}
