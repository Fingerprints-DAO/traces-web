import { useContext } from 'react'

// Dependencies
import { useToast } from '@chakra-ui/react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

// Helpers
import useTracesRead from './use-traces-read'
import TracesContract from '@web3/contracts/traces/traces-abi'
import { ModalContext } from '@ui/contexts/Modal'

const useTracesUpdateConfigs = (isSubmitted: boolean, vaultAddress: `0x${string}`) => {
  const toast = useToast()
  const { isEditor } = useTracesRead()
  const { handleCloseModal } = useContext(ModalContext)

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'setVaultAddress',
    args: [vaultAddress],
    enabled: isSubmitted && !!isEditor && !!vaultAddress,
  })

  const { write } = useContractWrite({
    ...config,
    onSettled: (_, error) => {
      if (!error) {
        toast({ title: 'Vault updated', status: 'success' })
        handleCloseModal()
      }
    },
    onError: () => {
      toast({ title: 'Someting went wrong on your transaction. Need better text', status: 'error' })
    },
  })

  return write
}

export default useTracesUpdateConfigs
