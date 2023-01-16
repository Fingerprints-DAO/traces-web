import { Address } from 'wagmi'
import useTraces from './use-traces'
import { useMutation } from 'react-query'
import { AddRolePayload } from '@ui/components/organisms/modals/modal-add-role'

const useTracesAddRole = (isAdmin?: boolean, adminRole?: Address) => {
  const traces = useTraces()

  const request = async ({ account, role }: AddRolePayload) => {
    if (!isAdmin) {
      throw new Error('User does not have permission')
    }

    return traces?.grantRole?.(role, account)
  }

  return useMutation(request)
}

export default useTracesAddRole
