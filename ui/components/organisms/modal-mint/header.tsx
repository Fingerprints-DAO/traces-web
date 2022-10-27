import React from 'react'

// Dependencies
import { Box, Heading, Text } from '@chakra-ui/react'

const ModalMintHeader = () => {
  return (
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
  )
}

export default ModalMintHeader
