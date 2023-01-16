import React, { useState } from 'react'
import { Button, Td, Tr } from '@chakra-ui/react'
import { Editor } from '.graphclient'
import useTracesRevokeRole from '@web3/contracts/traces/use-traces-revoke-role'
import { TransactionStatus } from 'types/transaction'
import useTxToast from '@ui/hooks/use-tx-toast'
import { useQueryClient } from 'react-query'
import { getTracesAdministratorsKey } from '@web3/contracts/traces/keys'
import useTracesRead from '@web3/contracts/traces/use-traces-read'

type AdminItemProps = {
  isAdmin?: boolean
} & Pick<Editor, 'id' | 'role'>

const AdminItem = ({ isAdmin, ...item }: AdminItemProps) => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const { showTxErrorToast, showTxExecutedToast } = useTxToast()

  const { adminRole, editorRole } = useTracesRead()
  const { mutateAsync: deleteRole } = useTracesRevokeRole(isAdmin)

  const handleDelete = (item: Pick<Editor, 'id' | 'role'>) => async () => {
    try {
      setIsLoading(true)

      const response = await deleteRole(item)

      const wait = await response?.wait()

      if (wait?.status === TransactionStatus.Success) {
        showTxExecutedToast({
          title: 'Role revoked',
          txHash: wait?.transactionHash,
          id: 'revoke-role-success',
        })

        const prevAdmins = queryClient.getQueryData<Pick<Editor, 'id' | 'role'>[]>(getTracesAdministratorsKey)

        const newAdmins = (prevAdmins || [])?.filter((user) => JSON.stringify(user) !== JSON.stringify(item))

        queryClient.setQueryData<Pick<Editor, 'id' | 'role'>[]>(getTracesAdministratorsKey, newAdmins)
      }
    } catch (error: any) {
      console.log('handleDelete', error)

      showTxErrorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tr>
      <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
        {item.role === adminRole && 'Admin'}
        {item.role === editorRole && 'Editor'}
      </Td>
      <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
        {item.id}
      </Td>
      <Td isNumeric borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
        {isAdmin && (
          <Button disabled={isLoading} colorScheme="blue" variant="link" onClick={handleDelete(item)}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        )}
      </Td>
    </Tr>
  )
}

export default AdminItem
