import { Address, useWaitForTransaction } from 'wagmi'
import useTraces from './use-traces'
import { useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'
import useTxToast from '@ui/hooks/use-tx-toast'
import { getTracesAdministratorsKey } from './keys'
import { DeleteRolePayload } from '@ui/components/organisms/modals/modal-administrators'

const useTracesRevokeRole = (isAdmin?: boolean) => {
  const traces = useTraces()
  const { showTxErrorToast, showTxExecutedToast } = useTxToast()
  const queryClient = useQueryClient()

  const [hash, setHash] = useState<Address | undefined>()

  const request = async ({ address, role }: DeleteRolePayload) => {
    if (!isAdmin) {
      throw new Error('User does not have permission')
    }

    return traces?.revokeRole(role, address)
  }

  useWaitForTransaction({
    hash,
    onSettled: (_, error) => {
      if (error) {
        showTxErrorToast(error)
        return
      }

      showTxExecutedToast({
        title: 'Role revoked',
        txHash: hash,
        id: 'revoke-role-success',
      })

      queryClient.invalidateQueries(getTracesAdministratorsKey)
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

export default useTracesRevokeRole
