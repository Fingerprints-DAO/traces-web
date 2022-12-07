import React from 'react'

// Dependencies
import { BigNumber } from 'ethers'
import { useWaitForTransaction } from 'wagmi'
import { BsCheck2Circle } from 'react-icons/bs'
import { Box, Button, Icon, ModalFooter, Spinner, Text } from '@chakra-ui/react'

// Helpers
import usePrintsApprove from '@web3/contracts/prints/use-prints-approve'

type ActionsProps = {
  amount: BigNumber
  onClose: () => void
}

const Actions = ({ amount, onClose }: ActionsProps) => {
  const { write: approvePrints, data: approved, isLoading: isLoadingApprove, isSuccess: isSuccessApprove } = usePrintsApprove(amount)

  const { isLoading: isLoadingWaitingApprove, isSuccess: isSuccessWaitingApprove } = useWaitForTransaction({
    hash: approved?.hash,
    enabled: isSuccessApprove,
  })

  const handleApprove = () => approvePrints && approvePrints()

  return (
    <>
      <Box>
        <Box alignItems="baseline" display="flex" mb={10} color="gray.100">
          <Box w={8} h={8} borderRadius="50%" border="1px" borderColor="gray.50" display="flex" alignItems="center" justifyContent="center" mr={4}>
            <Text as="span">1</Text>
          </Box>
          <Box flex={1}>
            <Box display="flex" alignItems="center">
              <Text fontSize="xl">Please confirm the approval of {amount.toNumber()} $PRINTS</Text>
              {isSuccessApprove && isSuccessWaitingApprove && <Icon as={BsCheck2Circle} color="green.500" boxSize="7" ml={4} />}
            </Box>
            {!isSuccessApprove && (
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
        <Box alignItems="baseline" display="flex" color={!isSuccessApprove && !isSuccessWaitingApprove ? 'gray.500' : 'gray.100'}>
          <Box w={8} h={8} borderRadius="50%" border="1px" borderColor="currentColor" display="flex" alignItems="center" justifyContent="center" mr={4}>
            <Text as="span">2</Text>
          </Box>
          <Box flex={1}>
            <Text fontSize="xl">Please confirm the stake of 5000 $PRINTS</Text>
            {/* <Box mt={4}>
                {isLoadingWaitingApprove || isLoadingApprove ? (
                    <>
                    <Text fontSize="lg" as="span" fontWeight="semibold">
                        waiting for {isLoadingApprove ? 'approval' : 'transaction'}
                    </Text>
                    <Spinner ml={2} size="sm" speed="0.7s" />
                    </>
                ) : (
                    <Button color="gray.900" colorScheme="primary" variant="solid" size="lg" onClick={() => {}}>
                    Confirm
                    </Button>
                )}
            </Box> */}
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
