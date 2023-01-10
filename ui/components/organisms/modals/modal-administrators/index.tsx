import React, { useMemo } from 'react'
import { Box, Button, Heading, Modal, ModalBody, ModalContent, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ModalProps } from '@ui/contexts/Modal'
import { shortenAddress } from '@ui/utils/string'
import useTracesRead from '@web3/contracts/traces/use-traces-read'
import useTracesGetAdministrators from '@web3/contracts/traces/use-traces-get-administrators'
import { Address } from 'wagmi'
import { Editor } from '.graphclient'
import useTracesRevokeRole from '@web3/contracts/traces/use-traces-revoke-role'
import AdminItem from './item'

export type DeleteRolePayload = {
  role: Address
  address: Address
}

const ModalAdministrators = ({ isOpen, onClose }: ModalProps) => {
  const { isAdmin } = useTracesRead()
  const { data: administrators, isLoading: isGettingAdmins, isError } = useTracesGetAdministrators(isAdmin)

  const isEmpty = useMemo(() => !administrators?.admins.concat(administrators.editors).length, [administrators])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} maxW={['90%', '90%', '90%', '3xl']}>
        <Box display="flex" flexDirection={['column-reverse', 'row']} alignItems="start" justifyContent="space-between" marginBottom={10}>
          <Heading size="md" color="gray.100">
            Administrators
          </Heading>
        </Box>
        <ModalBody padding={0}>
          <TableContainer overflowX={['auto', 'visible']} overflowY={['auto', 'visible']}>
            <Table colorScheme="whiteAlpha" variant="simple" border={1} borderStyle="solid" borderColor="gray.700">
              <Thead bg="gray.700">
                <Tr>
                  <Th color="gray.100" textTransform="unset">
                    Role
                  </Th>
                  <Th color="gray.100" textTransform="unset">
                    Wallet
                  </Th>
                  <Th isNumeric />
                </Tr>
              </Thead>
              <Tbody>
                {isGettingAdmins ? (
                  <Tr>
                    <Td colSpan={3}>Loading...</Td>
                  </Tr>
                ) : isError || isEmpty ? (
                  <Tr>
                    <Td colSpan={3}>No administrators found</Td>
                  </Tr>
                ) : (
                  <>
                    {administrators?.admins.map((item) => (
                      <AdminItem key={item.id} {...item} isAdmin={isAdmin} type="Admin" />
                    ))}
                    {administrators?.editors.map((item) => (
                      <AdminItem key={item.id} {...item} isAdmin={isAdmin} type="Editor" />
                    ))}
                  </>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalAdministrators
