// Dependencies
import { Box, Text, useToast } from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

// Helpers
import PrintsContract from './contract'
import usePrintsRead from './use-prints-read'

const usePrintsApprove = (minPrints: number) => {
  const toast = useToast()
  const [amount, setAmount] = useState<BigNumber>()
  const [isFetched, setIsFetched] = useState(false)

  const { allowance } = usePrintsRead()

  const amountBN = useMemo(() => {
    const allowanceUntilNow = allowance?.toNumber()

    const balanceToApprove = (amount?.toNumber() || 0) - (allowanceUntilNow || 0)

    return BigNumber.from(balanceToApprove)
  }, [allowance, amount])

  const prepare = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS,
    abi: PrintsContract,
    functionName: 'approve',
    enabled: isFetched && amountBN.toNumber() > 0 && (allowance?.toNumber() || 0) < minPrints,
    args: [process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as `0x${string}`, amountBN!],
  })

  console.log('AAAAA', isFetched && amountBN.toNumber() > 0 && (allowance?.toNumber() || 0) < minPrints)

  const {
    data: approved,
    isSuccess: isSuccessApprove,
    isLoading: isLoadingApprove,
    write: approvePrints,
  } = useContractWrite({
    ...prepare.config,
    onError: (error) => {
      console.log('error >>>', JSON.stringify(error))
      toast({
        title: 'Error',
        status: 'error',
        description: (
          <div>
            <Text mb={4}>{(error as any)?.reason || 'Transaction error'}</Text>
            <Box as="a" href={`https://etherscan.io/tx/`} target="_blank" textDecoration="underline">
              Click here to see transaction
            </Box>
          </div>
        ),
      })
    },
  })

  const waiting = useWaitForTransaction({
    hash: approved?.hash,
    enabled: isSuccessApprove,
  })

  useEffect(() => {
    if (!!amount && !!approvePrints && !isFetched) {
      approvePrints()
      setIsFetched(true)
    }
  }, [amount, approvePrints, isFetched])

  const canStake = useMemo(() => isSuccessApprove || (allowance?.toNumber() || 0) >= minPrints, [allowance, isSuccessApprove, minPrints])

  console.log('waiting', waiting)

  return {
    amount: amountBN,
    allowance,
    setAmount,
    approvePrints,
    isLoadingApprove,
    isFetched,
    isFetchedPrepare: prepare.isFetched,
    isLoadingWaitingApprove: waiting.isLoading,
    isSuccessWaitingApprove: waiting.isSuccess,
    canStake,
  }
}

export default usePrintsApprove
