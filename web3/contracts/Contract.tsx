import { ethers } from 'ethers'

export interface Contract {
  contract: ethers.Contract
  get: () => ethers.Contract
}
