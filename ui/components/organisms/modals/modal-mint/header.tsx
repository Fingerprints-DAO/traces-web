import React from 'react'

// Dependencies
import { Box, Heading, Text } from '@chakra-ui/react'

type ModalMintHeaderProps = {
  amount?: number
  prints?: number
}

const ModalMintHeader = ({ amount, prints = 0 }: ModalMintHeaderProps) => {
  return (
    <Box
      display="flex"
      flexDirection={['column-reverse', 'row']}
      alignItems={!!amount ? 'end' : 'start'}
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
      {!!amount ? (
        <Text as="span" color="gray.100">
          {amount.toLocaleString()} $PRINTS
        </Text>
      ) : (
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
            {prints.toLocaleString()} $PRINTS
          </Text>
        </Text>
      )}
    </Box>
  )
}

export default ModalMintHeader
