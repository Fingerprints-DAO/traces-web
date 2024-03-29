import { useCallback, useContext, useEffect, useState } from 'react'
import { Address, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

// Helpers
import TracesContract from '@web3/contracts/traces/traces-abi'
import { ModalContext } from '@ui/contexts/Modal'
import useTxToast from '@ui/hooks/use-tx-toast'
import { isAddress } from '@ethersproject/address'

const useTracesUpdateConfigs = (isSubmitted: boolean) => {
  const { showTxErrorToast, showTxSentToast, showTxExecutedToast } = useTxToast()
  const { handleCloseModal } = useContext(ModalContext)
  const [formIsReady, setFormIsReady] = useState(false)
  const [vaultAddress, setVaultAddress] = useState<[Address] | undefined>(undefined)

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address,
    abi: TracesContract,
    functionName: 'setVaultAddress',
    args: vaultAddress,
    enabled: !!vaultAddress,
  })

  const { write, data, isIdle, isError } = useContractWrite({
    ...config,
    onSettled: (data, error) => {
      if (error) {
        setFormIsReady(false)
        showTxErrorToast(error)
        return
      }

      showTxSentToast(data?.hash)
      handleCloseModal()
    },
  })

  useWaitForTransaction({
    hash: data?.hash as Address,
    onSuccess: () => {
      showTxExecutedToast({
        title: 'Vault updated',
        txHash: data?.hash,
        id: 'vault-updated',
      })
    },
  })
  const setValues = useCallback((address: Address) => {
    if (!address) return
    setVaultAddress([address])
    setFormIsReady(true)
  }, [])

  useEffect(() => {
    if ((isIdle || isError) && formIsReady && isAddress(vaultAddress?.[0] ?? '') && write) {
      write()
    }
  }, [formIsReady, isError, isIdle, vaultAddress, write])

  return setValues
}

export default useTracesUpdateConfigs
