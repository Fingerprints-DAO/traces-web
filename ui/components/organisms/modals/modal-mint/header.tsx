import React, { useContext, useEffect } from 'react'

// Dependencies
import { Box, Heading, Text } from '@chakra-ui/react'
import usePrintsRead from '@web3/contracts/prints/use-prints-read'
import { ModalContext, WNFTModalProps } from '@ui/contexts/Modal'

type ModalMintHeaderProps = {
  prints?: number
  showAllowance: boolean
}

const ModalMintHeader = ({ showAllowance, prints = 0 }: ModalMintHeaderProps) => {
  const { payload } = useContext(ModalContext) as { payload: WNFTModalProps }

  const { allowance, refetchAllowance } = usePrintsRead()

  useEffect(() => {
    if (showAllowance) {
      refetchAllowance()
    }
  }, [showAllowance, refetchAllowance])

  return (
    <Box
      display="flex"
      flexDirection={['column-reverse', 'row']}
      alignItems={!!!allowance ? 'end' : 'start'}
      justifyContent="space-between"
      marginBottom={10}
    >
      <Box>
        <Heading size="md" color="gray.100" marginBottom={2}>
          Mint WNFT
        </Heading>
        <Text color="gray.100" fontSize="md" fontWeight={400}>
          {payload.name}
        </Text>
      </Box>
      <Box display={'flex'} flexDir={'column'} alignItems={'flex-end'}>
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
        {showAllowance && (allowance?.toNumber() ?? 0) > 0 && (
          <Text
            as="div"
            color="gray.300"
            marginBottom={[4, 0]}
            display={['flex', 'unset']}
            w={['full', 'unset']}
            justifyContent={['space-between', 'unset']}
          >
            Approved to stake
            <Text as="span" color="gray.100" fontWeight={600} marginLeft={3}>
              {allowance?.toNumber().toLocaleString()} $PRINTS
            </Text>
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default ModalMintHeader
