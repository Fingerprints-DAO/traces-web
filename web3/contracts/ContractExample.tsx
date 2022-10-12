import { ethers, providers } from 'ethers'
import { CONTRACT_ADDRESS } from '@ui/base/dotenv-client'
import { ProviderType } from 'web3/provider'
import CoreAbi from './abi/ContractExample.json'
import { Contract } from './Contract'

export class ContractExample implements Contract {
  contract
  constructor(provider: ProviderType | providers.JsonRpcSigner) {
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CoreAbi, provider)
  }
  get() {
    return this.contract
  }
}
