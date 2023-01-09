import React from 'react'
import { Button, Td, Tr } from '@chakra-ui/react'
import { Editor } from '.graphclient'
import useTracesRevokeRole from '@web3/contracts/traces/use-traces-revoke-role'

type AdminItemProps = {
  type: string
  isAdmin?: boolean
} & Pick<Editor, 'id' | 'role'>

const AdminItem = ({ isAdmin, type, ...item }: AdminItemProps) => {
  const { mutateAsync: deleteRole, isLoading: isDeleting } = useTracesRevokeRole(isAdmin)

  const handleDelete = (item: Pick<Editor, 'id' | 'role'>) => async () => {
    try {
      await deleteRole({ role: item.role, address: item.id })
    } catch (error) {
      console.log('handleDelete', error)
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
        <Button disabled={isDeleting} colorScheme="blue" variant="link" onClick={handleDelete(item)}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </Td>
    </Tr>
  )
}

export default AdminItem
