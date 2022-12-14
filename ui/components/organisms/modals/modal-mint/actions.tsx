import React, { useContext, useMemo } from 'react'

// Dependencies
import { BigNumber } from 'ethers'
import { BsCheck2Circle } from 'react-icons/bs'
import { Box, Button, Icon, ModalFooter, Spinner, Text } from '@chakra-ui/react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

// Helpers
import { ModalContext } from '@ui/contexts/Modal'
import TracesContract from '@web3/contracts/traces/contract'
import usePrintsApprove from '@web3/contracts/prints/use-prints-approve'

type ActionsProps = {
  minPrints: number
  amount?: BigNumber
  allowance?: BigNumber
  onClose: () => void

  setAmount: any
  approvePrints: any
  isLoadingApprove: boolean
  isLoadingWaitingApprove: boolean
  isSuccessWaitingApprove: boolean
  isFetched: boolean
  canStake: boolean
}

const tokenId = BigNumber.from(11)

const Actions = ({
  onClose,
  allowance,
  approvePrints,
  amount,
  canStake,
  isLoadingApprove,
  isLoadingWaitingApprove,
  isSuccessWaitingApprove,
}: ActionsProps) => {
  const { handleCloseModal } = useContext(ModalContext)

  const handleApprove = () => approvePrints?.()

  const { config: outbidConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'outbid',
    enabled: canStake && isSuccessWaitingApprove && !!allowance,
    args: ['0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', tokenId, allowance!],
  })

  const { write: outbid, data: dataOutbid, isSuccess: isSuccessOutbid, isLoading: isLoadingOutbid } = useContractWrite(outbidConfig)

  const { isLoading: isLoadingWaitingOutbid, isSuccess: isSuccessWaitingOutbid } = useWaitForTransaction({
    hash: dataOutbid?.hash,
    // enabled: isSuccessOutbid,
    onSettled: (_, error) => {
      if (!error) {
        handleCloseModal()
      }
    },
  })

  const handleOutbid = () => outbid?.()

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
                {isLoadingWaitingApprove || isLoadingApprove ? (
                  <>
                    <Text fontSize="lg" as="span" fontWeight="semibold">
                      waiting for {isLoadingApprove ? 'approval' : 'transaction'}
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
              {isSuccessWaitingOutbid && isSuccessOutbid && <Icon as={BsCheck2Circle} color="green.500" boxSize="7" ml={4} />}
            </Box>
            {canStake && (
              <Box mt={4}>
                {(isLoadingWaitingOutbid || isLoadingOutbid) && (
                  <>
                    <Text fontSize="lg" as="span" fontWeight="semibold">
                      waiting for transaction
                    </Text>
                    <Spinner ml={2} size="sm" speed="0.7s" />
                  </>
                )}
                {canStake && !(isLoadingWaitingOutbid || isLoadingOutbid) && (
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
