import React, { useContext, useMemo } from 'react'

// Dependencies
import { BigNumber } from 'ethers'
import { BsCheck2Circle } from 'react-icons/bs'
import { Box, Button, Icon, ModalFooter, Spinner, Text, useToast } from '@chakra-ui/react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

// Helpers
import { ModalContext } from '@ui/contexts/Modal'
import PrintsContract from '@web3/contracts/prints/contract'
import TracesContract from '@web3/contracts/traces/contract'

type ActionsProps = {
  amount?: BigNumber
  minPrints: number
  onClose: () => void
}

const tokenId = BigNumber.from(12)

const Actions = ({ amount, minPrints, onClose }: ActionsProps) => {
  const toast = useToast()

  const { handleCloseModal } = useContext(ModalContext)

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS,
    abi: PrintsContract,
    functionName: 'approve',
    enabled: !!amount,
    args: [process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || ('' as any), amount!],
  })

  const {
    data: approved,
    isSuccess: isSuccessApprove,
    isLoading: isLoadingApprove,
    write: approvePrints,
  } = useContractWrite({
    ...config,
    onError: () => {
      toast({ title: 'Error', description: 'Transaction error', status: 'error' })
    },
  })

  const { isLoading: isLoadingWaitingApprove, isSuccess: isSuccessWaitingApprove } = useWaitForTransaction({
    hash: approved?.hash,
    enabled: isSuccessApprove,
  })

  const allowanceIsSufficient = useMemo(
    () => (isSuccessApprove && isSuccessWaitingApprove) || !!amount,
    [amount, isSuccessApprove, isSuccessWaitingApprove]
  )

  const handleApprove = () => approvePrints && approvePrints()

  const { config: approveTracesConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'approve',
    enabled: !!tokenId,
    args: ['0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', tokenId],
  })

  const { isSuccess: isSuccessApproveTraces } = useContractWrite(approveTracesConfig)

  const { config: outbidConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'outbid',
    enabled: !!amount && isSuccessApproveTraces,
    args: ['0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', BigNumber.from(11), amount!],
  })

  const {
    write: outbid,
    data: dataOutbid,
    isSuccess: isSuccessOutbid,
    isLoading: isLoadingOutbid,
  } = useContractWrite({
    ...outbidConfig,
    onSettled: (data, error) => {
      if (!error) {
        handleCloseModal()
      }
    },
  })

  const { isLoading: isLoadingWaitingOutbid, isSuccess: isSuccessWaitingOutbid } = useWaitForTransaction({
    hash: dataOutbid?.hash,
    enabled: isSuccessOutbid,
  })

  const handleOutbid = () => outbid?.()

  return (
    <>
      <Box>
        <Box alignItems="baseline" display="flex" mb={10} color="gray.100">
          <Box w={8} h={8} borderRadius="50%" border="1px" borderColor="gray.50" display="flex" alignItems="center" justifyContent="center" mr={4}>
            <Text as="span">1</Text>
          </Box>
          <Box flex={1}>
            <Box display="flex" alignItems="center">
              <Text fontSize="xl">Please confirm the approval of {amount?.toNumber()} $PRINTS</Text>
              {allowanceIsSufficient && <Icon as={BsCheck2Circle} color="green.500" boxSize="7" ml={4} />}
            </Box>
            {!allowanceIsSufficient && (
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
        <Box alignItems="baseline" display="flex" color={!allowanceIsSufficient ? 'gray.500' : 'gray.100'}>
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
              <Text fontSize="xl">Please confirm the stake of {amount?.toNumber()} $PRINTS</Text>
              {isSuccessWaitingOutbid && isSuccessOutbid && <Icon as={BsCheck2Circle} color="green.500" boxSize="7" ml={4} />}
            </Box>
            {!isSuccessWaitingOutbid && !isSuccessOutbid && (
              <Box mt={4}>
                {isLoadingWaitingOutbid || isLoadingOutbid ? (
                  <>
                    <Text fontSize="lg" as="span" fontWeight="semibold">
                      waiting for transaction
                    </Text>
                    <Spinner ml={2} size="sm" speed="0.7s" />
                  </>
                ) : (
                  <Button disabled={!outbid} color="gray.900" colorScheme="primary" variant="solid" size="lg" onClick={handleOutbid}>
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
