// Dependencies
import { useAccount, useContractRead } from 'wagmi'

// Helpers
import PrintsContract from './contract'
import TracesContract from '@web3/contracts/traces/contract'

const usePrintsRead = () => {
  const { address } = useAccount()

  const { data: allowance } = useContractRead({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS,
    abi: PrintsContract,
    functionName: 'allowance',
    enabled: !!address,
    args: [address!, process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || ('' as any)],
  })

  return {
    allowance,
  }
}

export default usePrintsRead
