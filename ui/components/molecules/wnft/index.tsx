import React, { PropsWithChildren, useContext, useMemo, useState, useEffect } from 'react'
import useSWR from 'swr'

// Dependencies
import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Icon,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { BsArrowDownRightCircle } from 'react-icons/bs'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { BigNumber } from 'ethers'
import dayjs from 'dayjs'
import { formatUnits } from 'ethers/lib/utils.js'

import { WNFT } from '.graphclient'
import { ModalContext, ModalElement } from '@ui/contexts/Modal'
import { fetcher } from '@ui/utils/fetcher'
import TracesContract from '@web3/contracts/traces/traces-abi'
import { HandledToken } from 'pages/api/helpers/_web3'
import { parseAmountToDisplay } from '@web3/helpers/handleAmount'
import useTxToast from '@ui/hooks/use-tx-toast'
import ButtonConnectWallet from '../button-connect-wallet'
import useWallet from '@web3/wallet/use-wallet'
import useTracesRead from '@web3/contracts/traces/use-traces-read'

type WNFTProps = {
  item: Pick<WNFT, 'id' | 'ogTokenAddress' | 'ogTokenId' | 'tokenId' | 'currentOwner' | 'lastPrice' | 'firstStakePrice' | 'minHoldPeriod'>
}

const shortAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

function formatTime(timeInSeconds: number) {
  // If time is less than an hour, display in second
  if (timeInSeconds < 60) {
    return `${timeInSeconds} seconds`
  }

  // If time is less than an hour, display in minutes
  if (timeInSeconds < 3600) {
    const minutes = dayjs.duration(timeInSeconds, 'seconds').minutes()
    return `${minutes} minutes`
  }

  // If time is less than a day, display in hours
  if (timeInSeconds < 86400) {
    const hours = dayjs.duration(timeInSeconds, 'seconds').hours()
    return `${hours} hours`
  }

  // If time is more than a day, display in days
  const days = dayjs.duration(timeInSeconds, 'seconds').days()
  return `${days} days`
}

enum WNFTState {
  Idle,
  Loading,
  Holding,
  Minting,
  Outbidding,
}

const WNFT = ({ item }: PropsWithChildren<WNFTProps>) => {
  const { showTxSentToast, showTxErrorToast } = useTxToast()
  const { handleOpenModal } = useContext(ModalContext)
  const { address } = useWallet()
  const { isEditor } = useTracesRead()
  const [currentState, setCurrentState] = useState<WNFTState>(WNFTState.Loading)
  const { data, error } = useSWR<HandledToken>(`/api/outbid/${item.id}`, fetcher)
  const [deleteParam, setDeleteParam] = useState<[BigNumber] | undefined>(undefined)
  const [unstakeParam, setUnstakeParam] = useState<[BigNumber] | undefined>(undefined)

  const isOwner = useMemo(() => {
    return item.currentOwner.toLowerCase() === address?.toLowerCase()
  }, [item.currentOwner, address])

  const price = useContractRead({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '',
    abi: TracesContract,
    functionName: 'getWNFTPrice',
    args: [BigNumber.from(item.id)],
    onSuccess(data) {
      if (data.eq(item.firstStakePrice)) {
        setCurrentState(WNFTState.Minting)
        return
      }

      setCurrentState(WNFTState.Outbidding)
    },
    onError(error) {
      const revertError = error as RevertError
      if (revertError.errorName === 'HoldPeriod') {
        setCurrentState(WNFTState.Holding)
      }
    },
  })

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'deleteToken',
    args: deleteParam,
    enabled: !!deleteParam,
    onError(error) {
      showTxErrorToast(error)
    },
  })

  const { write: deleteWNFT } = useContractWrite({
    ...config,
    onSettled: (data, error) => {
      if (error) {
        showTxErrorToast(error)
        return
      }

      showTxSentToast(data?.hash)

      // TODO: Add a listener to wait for the transaction to be mined and display toast
    },
    onError: showTxErrorToast,
  })

  useEffect(() => {
    if (deleteParam && deleteWNFT) {
      deleteWNFT()
    }
  }, [deleteParam, deleteWNFT])

  const handleDelete = () => {
    setDeleteParam([BigNumber.from(item.id)])
  }

  const { config: unstakeConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
    abi: TracesContract,
    functionName: 'unstake',
    args: unstakeParam,
    enabled: !!unstakeParam,
    onError(error) {
      showTxErrorToast(error)
    },
  })

  const { write: unstakeWNFT } = useContractWrite({
    ...unstakeConfig,
    onSettled: (data, error) => {
      if (error) {
        showTxErrorToast(error)
        return
      }

      showTxSentToast(data?.hash)

      // TODO: Add a listener to wait for the transaction to be mined and display toast
    },
    onError: showTxErrorToast,
  })

  useEffect(() => {
    if (unstakeParam && unstakeWNFT) {
      unstakeWNFT()
    }
  }, [unstakeParam, unstakeWNFT])

  const handleUnstake = () => {
    setUnstakeParam([BigNumber.from(item.id)])
  }

  const handleOpenMintNftModal = useMemo(
    () =>
      handleOpenModal(ModalElement.Mint, {
        id: item.id,
        name: data?.name,
        minAmount: Math.round(parseAmountToDisplay(price.data ?? item.firstStakePrice)),
        ogTokenAddress: item.ogTokenAddress,
        ogTokenId: item.ogTokenId,
      }),
    [handleOpenModal, item.id, item.firstStakePrice, item.ogTokenAddress, item.ogTokenId, data?.name, price.data]
  )

  if (error || !data) {
    return null
  }
  // if (!data) {
  //   return <div>loading...</div>
  // }

  return (
    <GridItem w="100%" key={item.id}>
      <Box display="flex" flexDirection="column" height="full" width={'100%'} color="gray.100">
        <a href={data?.openseaUrl} target={'_blank'} rel="noreferrer">
          <Box
            width="100%"
            height={'400px'}
            marginBottom={4}
            background="gray.500"
            backgroundImage={data?.image}
            backgroundSize="cover"
            backgroundRepeat={'no-repeat'}
            backgroundPosition={'center'}
            borderRadius={8}
          />
        </a>
        <Heading as="h6" size="md" marginBottom={2} display={'flex'} justifyContent={'space-between'}>
          <span>{data?.name}</span>
          {(isEditor || isOwner) && (
            <Popover placement={'bottom-end'} colorScheme="primary">
              <PopoverTrigger>
                <Box as={'button'} display={'flex'} flexDir={'column'} h={'100%'} justifyContent={'space-evenly'} pr={2}>
                  <Box as="span" w={1} h={1} bgColor={'white'} borderRadius={100} />
                  <Box as="span" w={1} h={1} bgColor={'white'} borderRadius={100} />
                  <Box as="span" w={1} h={1} bgColor={'white'} borderRadius={100} />
                </Box>
              </PopoverTrigger>
              <PopoverContent bgColor={'gray.700'} w={'auto'} borderColor={'transparent'}>
                <PopoverBody>
                  <Box display={'flex'} flexDir={'column'} alignItems={'start'}>
                    {currentState !== WNFTState.Minting && (
                      <Link as={'button'} p={2} onClick={handleUnstake} _hover={{ textDecor: 'none' }}>
                        {isEditor && !isOwner && 'Force '}Unstake
                      </Link>
                    )}
                    {isEditor && currentState === WNFTState.Minting && (
                      <Link as={'button'} p={2} onClick={handleDelete} _hover={{ textDecor: 'none' }}>
                        Delete
                      </Link>
                    )}
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Heading>
        <Box marginTop={6} flex={1} display="flex" flexDirection="column">
          {currentState === WNFTState.Minting && (
            <>
              {!price.isLoading && (
                <Box marginBottom={4}>
                  <Text color="gray.200">Minimum stake</Text>
                  <Text color="gray.100" fontWeight={600}>
                    {Number(formatUnits(price?.data ?? '', 18))} PRINTS
                  </Text>
                </Box>
              )}
              <Box marginBottom={6}>
                <Text color="gray.200">Guaranteed holding period</Text>
                <Text color="gray.100" fontWeight={600}>
                  {formatTime(item.minHoldPeriod)}
                </Text>
              </Box>
              <ButtonConnectWallet color="gray.900" colorScheme="primary" width="full" marginTop="auto" onClick={handleOpenMintNftModal}>
                Mint WNFT
              </ButtonConnectWallet>
            </>
          )}
          {currentState === WNFTState.Holding && (
            <>
              <Box marginBottom={4}>
                <Text color="gray.200">Staked</Text>
                <Flex alignItems="baseline">
                  <Text color="gray.100" fontWeight={600} marginRight={2}>
                    {parseAmountToDisplay(price.data ?? '0')} PRINTS
                  </Text>
                </Flex>
              </Box>
              <Box marginBottom={4}>
                <Text color="gray.200">Holding during</Text>
                <Text color="gray.100" fontWeight={600}>
                  {dayjs.unix(data.lastOutbidTimestamp).fromNow(true)}
                </Text>
              </Box>
              <Box marginBottom={6}>
                <Text color="gray.200">Current holder</Text>
                <Text color="gray.100" fontWeight={600}>
                  {shortAddress(item.currentOwner)}
                </Text>
              </Box>
              <Button disabled={true} borderColor="gray.200" color="gray.200" colorScheme="primary" variant="outline" width="full" marginTop="auto">
                {dayjs.unix(data.lastOutbidTimestamp).add(item.minHoldPeriod, 'seconds').fromNow(true)} to outbid
              </Button>
            </>
          )}
          {currentState === WNFTState.Outbidding && (
            <>
              <Box marginBottom={4}>
                <Text color="gray.200">Value to outbid</Text>
                <Flex alignItems="baseline">
                  {!price.isLoading && !price.error && (
                    <Text color="gray.100" fontWeight={600} marginRight={2}>
                      {Math.round(parseAmountToDisplay(price?.data ?? '0'))} PRINTS
                    </Text>
                  )}
                  <Tooltip
                    label={`The value decreases constantly until reachs ${parseAmountToDisplay(item.firstStakePrice)} at ${dayjs
                      .unix(data.lastOutbidTimestamp)
                      .add(data.dutchAuctionDuration, 'seconds')
                      .add(data.minHoldPeriod, 'seconds')
                      .format('L LT')}`}
                    fontSize="sm"
                    color="gray.50"
                    textAlign="center"
                    placement="top-start"
                    hasArrow={true}
                    arrowSize={8}
                  >
                    <span>
                      <Icon as={BsArrowDownRightCircle} color="gray.300" boxSize={3} />
                    </span>
                  </Tooltip>
                </Flex>
              </Box>
              <Box marginBottom={4}>
                <Text color="gray.200">Holding during</Text>
                <Text color="gray.100" fontWeight={600}>
                  {dayjs.unix(data.lastOutbidTimestamp).fromNow(true)}
                </Text>
              </Box>
              <Box marginBottom={6}>
                <Text color="gray.200">Current holder</Text>
                <Text color="gray.100" fontWeight={600}>
                  {shortAddress(item.currentOwner)}
                </Text>
              </Box>

              <ButtonConnectWallet color="gray.900" colorScheme="primary" width="full" marginTop="auto" onClick={handleOpenMintNftModal}>
                Outbid WNFT
              </ButtonConnectWallet>
            </>
          )}
        </Box>
      </Box>
    </GridItem>
  )
}

export default WNFT
