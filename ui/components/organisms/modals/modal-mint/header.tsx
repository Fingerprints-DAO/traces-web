import React, { useEffect } from 'react'

// Dependencies
import { Box, Heading, Text } from '@chakra-ui/react'
import usePrintsRead from '@web3/contracts/prints/use-prints-read'

type ModalMintHeaderProps = {
  prints?: number
  showAllowance: boolean
}

const ModalMintHeader = ({ showAllowance, prints = 0 }: ModalMintHeaderProps) => {
  const { allowance, refetchAllowance } = usePrintsRead()

  //   useEffect(() => {
  //     if (showAllowance) {
  //       refetchAllowance()
  //     }
  //   }, [showAllowance, refetchAllowance])

  return (
    <Box
      display="flex"
      flexDirection={['column-reverse', 'row']}
      alignItems={!!allowance ? 'end' : 'start'}
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
      {showAllowance && (allowance?.toNumber() || 0) > 0 ? (
        <Text as="span" color="gray.100">
          {allowance?.toNumber().toLocaleString()} $PRINTS
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
