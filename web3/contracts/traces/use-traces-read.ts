// Dependencies
import { useAccount, useContractRead } from 'wagmi'

// Helpers
import TracesContract from '@web3/contracts/traces/contract'

const useTracesRead = () => {
  const { address, isConnected } = useAccount()

  const { data: editorRole } = useContractRead({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'EDITOR_ROLE',
    enabled: isConnected,
  })

  const { data: isEditor } = useContractRead({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'hasRole',
    enabled: !!editorRole && !!address,
    args: [editorRole!, address!],
  })

  return {
    isEditor,
    editorRole,
  }
}

export default useTracesRead
