import { Address, useWaitForTransaction } from 'wagmi'
import useTraces from './use-traces'
import { useMutation } from 'react-query'
import { AddRolePayload } from '@ui/components/organisms/modals/modal-add-role'
import { useState } from 'react'
import useTxToast from '@ui/hooks/use-tx-toast'

const useTracesAddRole = (isAdmin?: boolean, isEditor?: boolean, adminRole?: Address, onWaitSuccess?: () => void) => {
  const traces = useTraces()
  const { showTxErrorToast, showTxExecutedToast } = useTxToast()

  const [hash, setHash] = useState<Address | undefined>()

  const request = async ({ account, role }: AddRolePayload) => {
    if (!isAdmin || !isEditor) {
      throw new Error('User does not have permission')
    }

    const payloadRoleIsAdmin = role === adminRole

    if (payloadRoleIsAdmin && !isAdmin) {
      throw new Error('User does not have permission')
    }

    return traces?.grantRole?.(role, account)
  }

  useWaitForTransaction({
    hash,
    onSettled: (_, error) => {
      if (error) {
        showTxErrorToast(error)
        return
      }

      showTxExecutedToast({
        title: 'Role granted',
        txHash: hash,
        id: 'grant-role-success',
      })

      onWaitSuccess?.()
    },
  })

  return useMutation(request, {
    onSuccess: (data) => {
      setHash(data?.hash as Address)
    },
    onError: (error: any) => {
      showTxErrorToast(error)
      setHash(undefined)
    },
  })
}

export default useTracesAddRole
