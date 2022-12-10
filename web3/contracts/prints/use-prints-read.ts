// Dependencies
import { useAccount, useContractRead } from 'wagmi'

// Helpers
import PrintsContract from './contract'

const usePrintsRead = () => {
  const { address } = useAccount()
  const { data: allowance } = useContractRead({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS,
    abi: PrintsContract,
    functionName: 'allowance',
    enabled: !!address,
    // owner, spender
    args: [address as `0x${string}`, process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as `0x${string}`],
  })

  return {
    allowance,
  }
}

export default usePrintsRead
