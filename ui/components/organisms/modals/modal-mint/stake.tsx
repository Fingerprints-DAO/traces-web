import React from 'react'

// Dependencies
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  ModalFooter,
  Text,
} from '@chakra-ui/react'

const Stake = ({ onClick, onClose }: any) => {
  return (
    <>
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
      <ModalFooter padding={0} mt={[10, '24']}>
        <Button colorScheme="red" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="gray.900"
          colorScheme="primary"
          variant="solid"
          ml={6}
          onClick={onClick}
        >
          Confirm stake
        </Button>
      </ModalFooter>
    </>
  )
}

export default Stake
