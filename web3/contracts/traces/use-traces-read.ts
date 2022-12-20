// Dependencies
import { useContractRead } from 'wagmi'

// Helpers
import useWallet from '@web3/wallet/use-wallet'
import TracesContract from '@web3/contracts/traces/contract'

const useTracesRead = () => {
  const { address, isConnected } = useWallet()

  const { data: editorRole } = useContractRead({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'EDITOR_ROLE',
    enabled: isConnected,
  })

  const { data: adminRole } = useContractRead({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'DEFAULT_ADMIN_ROLE',
    enabled: isConnected,
  })

  const { data: isEditor } = useContractRead({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'hasRole',
    enabled: !!editorRole && !!address,
    args: [editorRole!, address!],
  })

  const { data: isAdmin } = useContractRead({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'hasRole',
    enabled: !!adminRole && !!address,
    args: [editorRole!, address!],
  })

  return {
    isAdmin,
    isEditor,
    adminRole,
    editorRole,
  }
}

export default useTracesRead
