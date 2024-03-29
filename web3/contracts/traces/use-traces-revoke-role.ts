import useTraces from './use-traces'
import { useMutation } from 'react-query'
import { DeleteRolePayload } from '@ui/components/organisms/modals/modal-administrators'

const useTracesRevokeRole = (isAdmin?: boolean) => {
  const traces = useTraces()

  const request = async ({ id, role }: DeleteRolePayload) => {
    if (!isAdmin) {
      throw new Error('User does not have permission')
    }

    return traces?.revokeRole(role, id)
  }

  return useMutation(request)
}

export default useTracesRevokeRole
