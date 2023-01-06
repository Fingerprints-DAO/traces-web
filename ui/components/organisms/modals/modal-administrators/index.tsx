import React, { useMemo } from 'react'

// Dependencies
import { useQuery } from 'react-query'
import { Box, Button, Heading, Modal, ModalBody, ModalContent, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

// Helpers
import { ModalProps } from '@ui/contexts/Modal'
import { getBuiltGraphSDK } from '.graphclient'
import { shortenAddress } from '@ui/utils/string'

const sdk = getBuiltGraphSDK()

const ModalAdministrators = ({ isOpen, onClose }: ModalProps) => {
  const { data: administrators, isLoading, isError } = useQuery({ queryKey: 'GetAdministrators', queryFn: () => sdk.GetAdministrators() })

  const isEmpty = useMemo(() => !administrators?.admins.concat(administrators.editors).length, [administrators])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="gray.900" padding={[6, 12]} minW={['unset', 650]} maxW={['90%', '90%', '90%', 'md']}>
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
                {isLoading ? (
                  <Tr>
                    <Td colSpan={3}>Loading...</Td>
                  </Tr>
                ) : isError || isEmpty ? (
                  <Tr>
                    <Td colSpan={3}>No administrators found</Td>
                  </Tr>
                ) : (
                  <>
                    {administrators?.admins.map((item) => {
                      return (
                        <Tr key={item.id}>
                          <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                            Admin
                          </Td>
                          <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                            {shortenAddress(item.id, 17, 20)}
                          </Td>
                          <Td isNumeric borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                            <Button colorScheme="blue" variant="link">
                              Delete
                            </Button>
                          </Td>
                        </Tr>
                      )
                    })}
                    {administrators?.editors.map((item) => {
                      return (
                        <Tr key={item.id}>
                          <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                            Editors
                          </Td>
                          <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                            {shortenAddress(item.id, 17, 20)}
                          </Td>
                          <Td isNumeric borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                            <Button colorScheme="blue" variant="link">
                              Delete
                            </Button>
                          </Td>
                        </Tr>
                      )
                    })}
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
