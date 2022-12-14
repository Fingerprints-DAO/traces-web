// Dependencies
import { Address, useAccount, useContractRead } from 'wagmi'

// Helpers
import PrintsContract from './contract'

const usePrintsRead = () => {
  const { address } = useAccount()

  const { data: allowance, refetch: refetchAllowance } = useContractRead({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS,
    abi: PrintsContract,
    functionName: 'allowance',
    enabled: !!address,
    args: [address as Address, process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address],
  })

  return {
    allowance,
    refetchAllowance,
  }
}

export default usePrintsRead
