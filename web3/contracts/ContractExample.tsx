import { ethers, providers } from 'ethers'
import { ProviderType } from 'web3/provider'
import CoreAbi from './abi/ContractExample.json'
import { Contract } from './Contract'

const tokenContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

export class ContractExample implements Contract {
  contract
  constructor(provider: ProviderType | providers.JsonRpcSigner) {
    this.contract = new ethers.Contract(tokenContractAddress, CoreAbi, provider)
  }
  get() {
    return this.contract
  }
}
