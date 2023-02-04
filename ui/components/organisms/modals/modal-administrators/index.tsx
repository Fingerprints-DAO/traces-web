import React, { useContext } from 'react'
import { Box, Heading, Modal, ModalBody, ModalContent, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ModalProps } from '@ui/contexts/Modal'
import useTracesGetAdministrators from '@web3/contracts/traces/use-traces-get-administrators'
import { Address } from 'wagmi'
import AdminItem from './item'
import { TracesContext } from '@ui/contexts/Traces'

export type DeleteRolePayload = {
  role: Address
  id: Address
}

const ModalAdministrators = ({ isOpen, onClose }: ModalProps) => {
  const { isAdmin } = useContext(TracesContext)
  const { data: administrators, isLoading: isGettingAdmins, isError } = useTracesGetAdministrators()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 680]} maxW={['90%', '90%', '90%', 'lg']}>
        <Box display="flex" flexDirection={['column-reverse', 'row']} alignItems="start" justifyContent="space-between" marginBottom={10}>
          <Heading size="md" color="gray.100">
            Administrators & Editors
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
                ) : isError || !administrators?.length ? (
                  <Tr>
                    <Td colSpan={3}>No administrators found</Td>
                  </Tr>
                ) : (
                  administrators?.map((item) => <AdminItem key={`${item.id}_${item.role}`} {...item} isAdmin={isAdmin} />)
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
