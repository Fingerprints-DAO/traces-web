// Dependencies
import { Address } from 'wagmi'
import { BigNumber } from 'ethers'
import { useMutation } from 'react-query'
import { Box, Text, useToast } from '@chakra-ui/react'

// Helpers
import usePrints from './use-prints'

const usePrintsApprove = () => {
  const toast = useToast()
  const prints = usePrints()

  const request = async ({ amount, isIncrease }: { amount: BigNumber; isIncrease?: boolean }) =>
    prints?.[isIncrease ? 'increaseAllowance' : 'approve'](process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address, amount)

  return useMutation(request, {
    onSuccess: () => {},
    onError: (error: any) => {
      toast({
        title: 'Error',
        status: 'error',
        description: (
          <>
            <Text mb={4}>{error?.reason || 'Transaction error'}</Text>
            <Box as="a" href={`https://etherscan.io/tx/`} target="_blank" textDecoration="underline">
              Click here to see transaction
            </Box>
          </>
        ),
      })
    },
  })
}

export default usePrintsApprove
