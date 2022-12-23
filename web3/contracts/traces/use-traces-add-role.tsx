import { Address } from 'wagmi'
import useTraces from './use-traces'
import { useMutation } from 'react-query'
import { Box, Text, useToast } from '@chakra-ui/react'
import { AddRolePayload } from '@ui/components/organisms/modals/modal-add-role'

const useTracesAddRole = (isAdmin?: boolean, isEditor?: boolean, adminRole?: Address) => {
  const toast = useToast()
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

  return useMutation(request, {
    onSettled: (_, error: any) => {
      if (error) {
        toast({
          title: 'Error',
          status: 'error',
          description: (
            <>
              <Text mb={4}>{error?.reason || error?.message || 'Transaction error'}</Text>
              <Box as="a" href={`https://etherscan.io/tx/`} target="_blank" textDecoration="underline">
                Click here to see transaction
              </Box>
            </>
          ),
        })
      }
    },
  })
}

export default useTracesAddRole
