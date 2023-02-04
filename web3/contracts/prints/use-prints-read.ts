import { Address, useContractRead } from 'wagmi'
import PrintsContract from './prints-abi'
import { useContext } from 'react'
import { TracesContext } from '@ui/contexts/Traces'

const usePrintsRead = () => {
  const { address } = useContext(TracesContext)

  const { data: allowance, refetch: refetchAllowance } = useContractRead({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS as Address,
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
