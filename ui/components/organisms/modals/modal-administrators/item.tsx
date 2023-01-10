import React, { useState } from 'react'
import { Button, Td, Tr } from '@chakra-ui/react'
import { Editor, GetAdministratorsQuery } from '.graphclient'
import useTracesRevokeRole from '@web3/contracts/traces/use-traces-revoke-role'
import { TransactionStatus } from 'types/transaction'
import useTxToast from '@ui/hooks/use-tx-toast'
import { useQueryClient } from 'react-query'
import { getTracesAdministratorsKey } from '@web3/contracts/traces/keys'

type AdminItemProps = {
  type: string
  isAdmin?: boolean
} & Pick<Editor, 'id' | 'role'>

const AdminItem = ({ isAdmin, type, ...item }: AdminItemProps) => {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const { showTxErrorToast, showTxExecutedToast } = useTxToast()
  const { mutateAsync: deleteRole } = useTracesRevokeRole(isAdmin)

  const handleDelete = (item: Pick<Editor, 'id' | 'role'>) => async () => {
    try {
      setIsLoading(true)

      const response = await deleteRole({ role: item.role, address: item.id })

      const wait = await response?.wait()

      if (wait?.status === TransactionStatus.Success) {
        showTxExecutedToast({
          title: 'Role revoked',
          txHash: wait?.transactionHash,
          id: 'revoke-role-success',
        })

        const prevAdmins = queryClient.getQueryData<GetAdministratorsQuery>(getTracesAdministratorsKey)

        queryClient.setQueryData<GetAdministratorsQuery>(getTracesAdministratorsKey, {
          admins: type === 'Admin' ? prevAdmins?.admins?.filter((admin) => admin.id !== item.id) || [] : prevAdmins?.admins || [],
          editors: type === 'Editor' ? prevAdmins?.admins.filter((admin) => admin.id !== item.id) || [] : prevAdmins?.editors || [],
        })
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
        {type}
      </Td>
      <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
        {item.id}
      </Td>
      <Td isNumeric borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
        <Button disabled={isLoading} colorScheme="blue" variant="link" onClick={handleDelete(item)}>
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </Td>
    </Tr>
  )
}

export default AdminItem
