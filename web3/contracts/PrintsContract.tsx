import { ethers, providers } from 'ethers'
import { ProviderType } from 'web3/provider'
import PrintsAbi from './abi/prints.json'

const tokenContractAddress = process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || ''

class PrintsContract {
    contract: ethers.Contract

    constructor(provider: ProviderType | providers.JsonRpcSigner) {
        this.contract = new ethers.Contract(tokenContractAddress, PrintsAbi, provider)
    }

    get() {
        return this.contract
    }
}

export default PrintsContract
