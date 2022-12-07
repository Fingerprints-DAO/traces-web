import React from 'react'

// Dependencies
import { Box, Button, Heading, Modal, ModalBody, ModalContent, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

// Helpers
import { ModalProps } from '@ui/contexts/Modal'

const ModalAdministrators = ({ isOpen, onClose }: ModalProps) => {
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
          <TableContainer>
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
                <Tr>
                  <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                    Admin
                  </Td>
                  <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                    0x0dAb8FDeFfc501b...15952Dcd7bf116D5B506
                  </Td>
                  <Td isNumeric borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                    <Button colorScheme="blue" variant="link">
                      Delete
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                    Admin
                  </Td>
                  <Td color="gray.300" fontSize="sm" borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                    0x0dAb8FDeFfc501b...15952Dcd7bf116D5B506
                  </Td>
                  <Td isNumeric borderBottom={1} borderBottomStyle="solid" borderBottomColor="gray.700">
                    <Button colorScheme="blue" variant="link">
                      Delete
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalAdministrators
