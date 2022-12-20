// Dependencies
import { Address } from 'wagmi'
import { BigNumber } from 'ethers'
import { useMutation } from 'react-query'
import { Box, Text, useToast } from '@chakra-ui/react'
import useTraces from './use-traces'
import { parseAmountToContract } from '@web3/helpers/handleAmount'

type Payload = {
  tokenAddress?: Address
  tokenId: BigNumber
  amount: number
}

const useTracesOutbid = () => {
  const toast = useToast()
  const traces = useTraces()

  const request = async ({ amount, tokenAddress, tokenId }: Payload) => {
    return tokenAddress && traces?.outbid(tokenAddress, tokenId, parseAmountToContract(amount))
  }

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

export default useTracesOutbid
