import React from 'react'

// Dependencies
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

type ModalMintProps = {
  isOpen: boolean
  onClose: () => void
}

const ModalMint = ({ isOpen, onClose }: ModalMintProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        padding={[6, 12]}
        minW={['unset', 650]}
        maxW={['90%', '90%', '90%', 'md']}
      >
        <Box
          display="flex"
          flexDirection={['column-reverse', 'row']}
          alignItems="start"
          justifyContent="space-between"
          marginBottom={10}
        >
          <Box>
            <Heading size="md" color="gray.100" marginBottom={2}>
              Mint WNFT
            </Heading>
            <Text color="gray.100" fontSize="md" fontWeight={400}>
              Autoglyph#131
            </Text>
          </Box>
          <Text
            as="span"
            color="gray.300"
            marginBottom={[4, 0]}
            display={['flex', 'unset']}
            w={['full', 'unset']}
            justifyContent={['space-between', 'unset']}
          >
            Current balance
            <Text as="span" color="gray.100" fontWeight={600} marginLeft={3}>
              5000 $PRINTS
            </Text>
          </Text>
        </Box>
        <ModalBody padding={0} marginBottom={[10, '24']}>
          <Box>
            <Text
              color="gray.100"
              display="block"
              as="label"
              htmlFor="amount"
              fontWeight="semibold"
              marginBottom={2}
            >
              Amount to stake
            </Text>
            <InputGroup size="lg" marginBottom={2}>
              <Input
                name="amount"
                type="tel"
                placeholder="Amount to stake"
                size="lg"
              />
              <InputRightAddon
                background="gray.800"
                borderLeft={1}
                borderLeftColor="gray.600"
                color="gray.400"
              >
                $PRINTS
              </InputRightAddon>
            </InputGroup>
            <Text color="gray.300" fontSize="sm">
              Minimun of 1,000 $PRINTS for this WNFT
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter padding={0}>
          <Button colorScheme="red" variant="outline" mr={6} onClick={onClose}>
            Cancel
          </Button>
          <Button color="gray.900" colorScheme="primary" variant="solid">
            Confirm stake
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalMint
