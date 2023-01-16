// Dependencies
import { useContractRead } from 'wagmi'

// Helpers
import useWallet from '@web3/wallet/use-wallet'
import TracesContract from '@web3/contracts/traces/traces-abi'

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
    args: editorRole && address ? [editorRole, address] : undefined,
  })

  const { data: isAdmin } = useContractRead({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'hasRole',
    enabled: !!adminRole && !!address,
    args: adminRole && address ? [adminRole, address] : undefined,
  })

  const { data: vaultAddress } = useContractRead({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'vaultAddress',
  })

  return {
    isAdmin,
    isEditor,
    adminRole,
    editorRole,
    vaultAddress,
    isAdminOrEditor: isAdmin || isEditor,
  }
}

export default useTracesRead
