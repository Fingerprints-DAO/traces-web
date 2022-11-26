// Dependencies
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Container, IconButton, Table, Tbody, Td, Th, Thead, Tooltip, Tr, useColorModeValue, useTheme } from '@chakra-ui/react'

// Components
import PageHeader from '@ui/components/organisms/page-header'

const AdminPage = () => {
  const { colors } = useTheme()

  return (
    <Container maxWidth="7xl" paddingTop={14} paddingBottom={28}>
      <PageHeader containerProps={{ mb: 24 }} title="Admin panel" />
      <Box as="section">
        <Box mb={8}>
          <Button borderColor="gray.200" color="gray.200" colorScheme="primary" variant="outline" size={['xs', 'md']} width={200} onClick={() => null}>
            New Admin
          </Button>
        </Box>
        <Table colorScheme="whiteAlpha">
          <Thead bg="gray.700">
            <Tr>
              <Th color="gray.100" textTransform="unset">
                Name
              </Th>
              <Th color="gray.100" textTransform="unset">
                Role
              </Th>
              <Th color="gray.100" textTransform="unset">
                Since
              </Th>
              <Th color="gray.100" textTransform="unset">
                Wallet
              </Th>
              <Th isNumeric />
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Shira</Td>
              <Td color="gray.300" fontSize="sm">
                Admin
              </Td>
              <Td color="gray.300" fontSize="sm">
                05-15-2022
              </Td>
              <Td color="gray.300" fontSize="sm">
                0x...03BbC
              </Td>
              <Td isNumeric>
                <Tooltip label="Delete user" fontSize="xs" color="gray.50" textAlign="center" placement="top">
                  <IconButton aria-label="Delete user" bgColor="gray.900" size="sm" icon={<DeleteIcon color="red.600" />} _hover={{ backgroundColor: colors.gray['700'] }} />
                </Tooltip>
              </Td>
            </Tr>
            <Tr>
              <Td>Shira</Td>
              <Td color="gray.300" fontSize="sm">
                Admin
              </Td>
              <Td color="gray.300" fontSize="sm">
                05-15-2022
              </Td>
              <Td color="gray.300" fontSize="sm">
                0x...03BbC
              </Td>
              <Td isNumeric>
                <Tooltip label="Delete user" fontSize="xs" color="gray.50" textAlign="center" placement="top">
                  <IconButton aria-label="Delete user" bgColor="gray.900" size="sm" icon={<DeleteIcon color="red.600" />} _hover={{ backgroundColor: colors.gray['700'] }} />
                </Tooltip>
              </Td>
            </Tr>
            <Tr>
              <Td>Shira</Td>
              <Td color="gray.300" fontSize="sm">
                Admin
              </Td>
              <Td color="gray.300" fontSize="sm">
                05-15-2022
              </Td>
              <Td color="gray.300" fontSize="sm">
                0x...03BbC
              </Td>
              <Td isNumeric>
                <Tooltip label="Delete user" fontSize="xs" color="gray.50" textAlign="center" placement="top">
                  <IconButton aria-label="Delete user" bgColor="gray.900" size="sm" icon={<DeleteIcon color="red.600" />} _hover={{ backgroundColor: colors.gray['700'] }} />
                </Tooltip>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Container>
  )
}

export default AdminPage
