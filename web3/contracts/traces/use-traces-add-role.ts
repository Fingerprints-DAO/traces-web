import { Address } from 'wagmi'
import useTraces from './use-traces'
import { useMutation } from 'react-query'
import { AddRolePayload } from '@ui/components/organisms/modals/modal-add-role'

const useTracesAddRole = (isAdmin?: boolean, isEditor?: boolean, adminRole?: Address, onWaitSuccess?: () => void) => {
  const traces = useTraces()

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

  return useMutation(request)
}

export default useTracesAddRole
