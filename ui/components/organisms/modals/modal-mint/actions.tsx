import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Dependencies
import { UseMutationResult } from 'react-query'
import { BsCheck2Circle } from 'react-icons/bs'
import { BigNumber, ContractTransaction } from 'ethers'
import { TransactionReceipt } from '@ethersproject/providers'
import { Box, Button, Icon, ModalFooter, Spinner, Text, useToast } from '@chakra-ui/react'

// Helpers
import { ModalContext } from '@ui/contexts/Modal'
import { Address, useWaitForTransaction } from 'wagmi'
import usePrints from '@web3/contracts/prints/use-prints'
import useWallet from '@web3/wallet/use-wallet'
import useTracesOutbid from '@web3/contracts/traces/use-traces-outbid'

type ActionsProps = {
  minPrints: number
  amount?: BigNumber
  onClose: () => void
} & UseMutationResult<ContractTransaction | undefined, any, BigNumber, unknown>

const tokenId = BigNumber.from(11)

const Actions = (props: ActionsProps) => {
  const toast = useToast()
  const prints = usePrints()
  const { address } = useWallet()

  const [allowance, setAllowance] = useState<BigNumber>()
  const [isOutbidSubmitted, setIsOutbidSubmitted] = useState(false)

  const { onClose, amount, minPrints, isLoading, isSuccess: isSuccessApprove, data: approve, mutateAsync: approvePrints } = props

  const outbid = useTracesOutbid()

  const getAllowance = useCallback(async () => {
    try {
      const allowance = await prints?.allowance(address as Address, process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address)

      setAllowance(allowance)
    } catch (error) {
      console.log('getAllowance', error)
    }
  }, [address, prints])

  useEffect(() => {
    getAllowance()
  }, [getAllowance])

  const { handleCloseModal } = useContext(ModalContext)

  const handleOutbid = useCallback(async () => {
    try {
      console.log('amount', amount)
      if (amount) {
        await outbid.mutateAsync({ amount, tokenAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', tokenId })

        setIsOutbidSubmitted(true)
      }
    } catch (error) {
      console.log('handleWaitingApproveSuccess', error)
    }
  }, [amount, outbid])

  const waitingApprove = useWaitForTransaction({ hash: approve?.hash as Address })

  const handleApprove = async () => {
    try {
      if (amount) {
        await approvePrints(amount)
      }
    } catch (error) {
      console.log('handleApprove', error)
    }
  }

  const handleWaitingOutbidSuccess = (data: TransactionReceipt) => {
    handleCloseModal()

    toast({
      title: 'Success',
      status: 'success',
      description: (
        <Box as="a" href={`https://etherscan.io/tx/${data.transactionHash}`} target="_blank" textDecoration="underline">
          Click here to see transaction
        </Box>
      ),
    })
  }

  const waitingOutbid = useWaitForTransaction({
    hash: outbid.data?.hash as Address,
    onSuccess: handleWaitingOutbidSuccess,
  })

  const canStake = useMemo(() => isSuccessApprove || (allowance?.toNumber() || 0) >= minPrints, [allowance, isSuccessApprove, minPrints])

  useEffect(() => {
    if (canStake && !isOutbidSubmitted) {
      handleOutbid()
      setIsOutbidSubmitted(true)
    }
  }, [canStake, handleOutbid, isOutbidSubmitted])

  const value = useMemo(() => {
    return (allowance?.toNumber() || 0) > 0 ? allowance?.toNumber().toLocaleString() : (amount?.toNumber() || 0).toLocaleString()
  }, [allowance, amount])

  return (
    <>
      <Box>
        <Box alignItems="baseline" display="flex" mb={10} color="gray.100">
          <Box w={8} h={8} borderRadius="50%" border="1px" borderColor="gray.50" display="flex" alignItems="center" justifyContent="center" mr={4}>
            <Text as="span">1</Text>
          </Box>
          <Box flex={1}>
            <Box display="flex" alignItems="center">
              <Text fontSize="xl">Please confirm the approval of {value} $PRINTS</Text>
              {canStake && <Icon as={BsCheck2Circle} color="green.500" boxSize="7" ml={4} />}
            </Box>
            {!canStake && (
              <Box mt={4}>
                {isLoading || waitingApprove.isLoading ? (
                  <>
                    <Text fontSize="lg" as="span" fontWeight="semibold">
                      waiting for {isLoading ? 'approval' : 'transaction'}
                    </Text>
                    <Spinner ml={2} size="sm" speed="0.7s" />
                  </>
                ) : (
                  <Button color="gray.900" colorScheme="primary" variant="solid" size="lg" onClick={handleApprove}>
                    Confirm
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>
        <Box alignItems="baseline" display="flex" color={!canStake ? 'gray.500' : 'gray.100'}>
          <Box
            w={8}
            h={8}
            borderRadius="50%"
            border="1px"
            borderColor="currentColor"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mr={4}
          >
            <Text as="span">2</Text>
          </Box>
          <Box flex={1}>
            <Box display="flex" alignItems="center">
              <Text fontSize="xl">Please confirm the stake of {value} $PRINTS</Text>
              {waitingOutbid.isSuccess && false && <Icon as={BsCheck2Circle} color="green.500" boxSize="7" ml={4} />}
            </Box>
            {canStake && (
              <Box mt={4}>
                {(outbid.isLoading || waitingOutbid.isLoading) && (
                  <>
                    <Text fontSize="lg" as="span" fontWeight="semibold">
                      waiting for transaction
                    </Text>
                    <Spinner ml={2} size="sm" speed="0.7s" />
                  </>
                )}
                {!(waitingOutbid.isLoading || outbid.isLoading) && (
                  <Button color="gray.900" colorScheme="primary" variant="solid" size="lg" onClick={handleOutbid}>
                    Confirm
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <ModalFooter padding={0} mt={[10, '24']}>
        <Button borderColor="gray.200" color="gray.200" colorScheme="primary" variant="outline" size="md" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </>
  )
}

export default Actions
