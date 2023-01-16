import React, { PropsWithChildren, useContext, useMemo, useState, useEffect } from 'react'
import useSWR from 'swr'
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
  Skeleton,
  SkeletonText,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { BsArrowDownRightCircle } from 'react-icons/bs'
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { BigNumber } from 'ethers'
import dayjs from 'dayjs'
import Image from 'next/image'
import { WNFT } from '.graphclient'
import { ModalContext, ModalElement } from '@ui/contexts/Modal'
import { fetcher } from '@ui/utils/fetcher'
import TracesContract from '@web3/contracts/traces/traces-abi'
import { HandledToken } from 'pages/api/helpers/_web3'
import useTxToast from '@ui/hooks/use-tx-toast'
import ButtonConnectWallet from '../button-connect-wallet'
import useWallet from '@web3/wallet/use-wallet'
import useTracesRead from '@web3/contracts/traces/use-traces-read'
import { WNFTState } from 'pages/api/helpers/_types'
import CopyButton from '@ui/components/atoms/copy-button'

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

const refreshIntervalTime = 1000 * 60 * 5

const WNFT = ({ item }: PropsWithChildren<WNFTProps>) => {
  const [urlCopied, setUrlCopied] = useState(false)
  const { showTxSentToast, showTxErrorToast } = useTxToast()
  const { handleOpenModal } = useContext(ModalContext)
  const { address } = useWallet()
  const { isEditor } = useTracesRead()
  const [currentState, setCurrentState] = useState<WNFTState>(WNFTState.loading)
  const { data: wnftMeta, error } = useSWR<HandledToken>(`/api/outbid/${item.id}`, fetcher, { refreshInterval: refreshIntervalTime })
  const [deleteParam, setDeleteParam] = useState<[BigNumber] | undefined>(undefined)
  const [unstakeParam, setUnstakeParam] = useState<[BigNumber] | undefined>(undefined)
  const [imageHasError, setImageHasError] = useState(false)

  const imageAttributes = useMemo(() => {
    if (imageHasError) {
      return {
        width: '100%',
        backgroundImage: wnftMeta?.image,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }
    }
    return {}
  }, [imageHasError, wnftMeta?.image])

  const isOwner = useMemo(() => {
    return item.currentOwner.toLowerCase() === address?.toLowerCase()
  }, [item.currentOwner, address])

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address,
    abi: TracesContract,
    functionName: 'deleteToken',
    args: deleteParam,
    enabled: !!deleteParam,
    onError(error) {
      showTxErrorToast(error)
    },
  })

  const { write: deleteWNFT, isIdle: deleteWNFTIsIdle } = useContractWrite({
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
    if (deleteWNFTIsIdle && deleteParam && deleteWNFT) {
      deleteWNFT()
    }
  }, [deleteParam, deleteWNFT, deleteWNFTIsIdle])

  const handleDelete = (onClose: Function) => () => {
    setDeleteParam([BigNumber.from(item.id)])
    onClose()
  }

  const { config: unstakeConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS as Address,
    abi: TracesContract,
    functionName: 'unstake',
    args: unstakeParam,
    enabled: !!unstakeParam,
    onError(error) {
      showTxErrorToast(error)
    },
  })

  const { write: unstakeWNFT, isIdle: unstakeWNFTIsIdle } = useContractWrite({
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
    if (!wnftMeta) return
    setCurrentState(wnftMeta.state)
  }, [currentState, wnftMeta])

  useEffect(() => {
    if (unstakeWNFTIsIdle && unstakeParam && unstakeWNFT) {
      unstakeWNFT()
    }
  }, [unstakeWNFTIsIdle, unstakeParam, unstakeWNFT])

  const handleUnstake = (onClose: Function) => () => {
    setUnstakeParam([BigNumber.from(item.id)])
    onClose()
  }

  const handleOpenMintNftModal = useMemo(
    () =>
      handleOpenModal(ModalElement.Mint, {
        id: item.id,
        name: wnftMeta?.name,
        minAmount: Math.round(wnftMeta?.price ?? 0),
        ogTokenAddress: item.ogTokenAddress,
        ogTokenId: item.ogTokenId,
      }),
    [handleOpenModal, item.id, item.ogTokenAddress, item.ogTokenId, wnftMeta?.name, wnftMeta?.price]
  )

  const ownerAddress = useMemo(() => {
    // if item.currentOwner matches address, return 'You'
    if (address?.toLowerCase() === item.currentOwner.toLowerCase()) {
      return 'You'
    }

    return shortAddress(item.currentOwner)
  }, [address, item.currentOwner])

  if (error) {
    return null
  }

  return (
    <GridItem w="100%" key={item.id}>
      <Box display="flex" flexDirection="column" height="full" width={'100%'} color="gray.100">
        <a href={wnftMeta?.openseaUrl} target={'_blank'} rel="noreferrer">
          <Skeleton
            isLoaded={!!wnftMeta?.image}
            width="100%"
            height={'400px'}
            marginBottom={4}
            background="gray.500"
            borderRadius={8}
            overflow={'hidden'}
            position={'relative'}
            {...imageAttributes}
          >
            {!imageHasError && wnftMeta?.image && (
              <Image
                src={wnftMeta?.image}
                onError={() => setImageHasError(true)}
                alt={`Image of ${wnftMeta?.name}`}
                layout="fill"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            )}
          </Skeleton>
        </a>
        <Heading as="h6" size="md" marginBottom={2} display={'flex'} justifyContent={'space-between'}>
          <SkeletonText isLoaded={currentState !== WNFTState.loading} noOfLines={1} skeletonHeight="100%" w={'full'}>
            {wnftMeta?.name ?? 'No name'}
          </SkeletonText>
          {(isEditor || isOwner) && (
            <Popover placement={'bottom-end'} colorScheme="primary">
              {({ onClose }) => (
                <>
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
                        {currentState !== WNFTState.minting && (
                          <Link as={'button'} p={2} onClick={handleUnstake(onClose)} _hover={{ textDecor: 'none' }}>
                            {isEditor && !isOwner && 'Force '}Unstake
                          </Link>
                        )}
                        {isEditor && currentState === WNFTState.minting && (
                          <Link as={'button'} p={2} onClick={handleDelete(onClose)} _hover={{ textDecor: 'none' }}>
                            Delete
                          </Link>
                        )}
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </>
              )}
            </Popover>
          )}
        </Heading>
        <Box marginTop={6} flex={1} display="flex" flexDirection="column">
          {currentState === WNFTState.loading && (
            <Box>
              <SkeletonText noOfLines={6} spacing="2" skeletonHeight="4" marginBottom={4} />
              <Skeleton width="full" height={'40px'} />
            </Box>
          )}
          {currentState === WNFTState.minting && (
            <>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={4}>
                <Text color="gray.200">Minimum stake</Text>
                <Text color="gray.100" fontWeight={600}>
                  {wnftMeta?.price} PRINTS
                </Text>
              </SkeletonText>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={6}>
                <Text color="gray.200">Guaranteed holding period</Text>
                <Text color="gray.100" fontWeight={600}>
                  {formatTime(item.minHoldPeriod)}
                </Text>
              </SkeletonText>
              <Skeleton isLoaded={!!wnftMeta} width="full" marginTop="auto">
                <ButtonConnectWallet color="gray.900" colorScheme="primary" width="full" onClick={handleOpenMintNftModal}>
                  Mint WNFT
                </ButtonConnectWallet>
              </Skeleton>
            </>
          )}
          {currentState === WNFTState.holding && (
            <>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={4}>
                <Text color="gray.200">Staked</Text>
                <Flex alignItems="baseline">
                  <Text color="gray.100" fontWeight={600} marginRight={2}>
                    {wnftMeta?.stakedAmount} PRINTS
                  </Text>
                </Flex>
              </SkeletonText>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={4}>
                <Text color="gray.200">Duration</Text>
                <Text color="gray.100" fontWeight={600}>
                  {wnftMeta! && dayjs.unix(wnftMeta?.lastOutbidTimestamp).fromNow(true)}
                </Text>
              </SkeletonText>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={6}>
                <Text color="gray.200">Current holder</Text>
                <Flex alignItems="center">
                  <Text color="gray.100" fontWeight={600}>
                    {ownerAddress}
                  </Text>
                  <CopyButton textToCopy={item.currentOwner} />
                </Flex>
              </SkeletonText>
              <Skeleton isLoaded={!!wnftMeta} width="full" marginTop="auto">
                <Button disabled={true} borderColor="gray.200" color="gray.200" colorScheme="primary" variant="outline" width="full">
                  {wnftMeta! && dayjs.unix(wnftMeta.lastOutbidTimestamp).add(item.minHoldPeriod, 'seconds').fromNow(true)} to outbid
                </Button>
              </Skeleton>
            </>
          )}
          {currentState === WNFTState.outbidding && (
            <>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={4}>
                <Text color="gray.200">Value to outbid</Text>
                <Flex alignItems="baseline">
                  <Text color="gray.100" fontWeight={600} marginRight={2}>
                    {Math.round(wnftMeta?.price ?? 0)} PRINTS
                  </Text>
                  {wnftMeta! && (
                    <Tooltip
                      label={`The value decreases constantly until reachs ${wnftMeta.stakedAmount} at ${dayjs
                        .unix(wnftMeta.lastOutbidTimestamp)
                        .add(wnftMeta.dutchAuctionDuration, 'seconds')
                        .add(wnftMeta.minHoldPeriod, 'seconds')
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
                  )}
                </Flex>
              </SkeletonText>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={4}>
                <Text color="gray.200">Duration</Text>
                <Text color="gray.100" fontWeight={600}>
                  {wnftMeta! && dayjs.unix(wnftMeta.lastOutbidTimestamp).fromNow(true)}
                </Text>
              </SkeletonText>
              <SkeletonText isLoaded={!!wnftMeta} noOfLines={2} spacing="2" skeletonHeight="4" marginBottom={6}>
                <Text color="gray.200">Current holder</Text>
                <Flex alignItems="center">
                  <Text color="gray.100" fontWeight={600}>
                    {ownerAddress}
                  </Text>
                  <CopyButton textToCopy={item.currentOwner} />
                </Flex>
              </SkeletonText>
              <Skeleton isLoaded={!!wnftMeta} width="full" marginTop="auto">
                <ButtonConnectWallet color="gray.900" colorScheme="primary" width="full" onClick={handleOpenMintNftModal}>
                  Outbid WNFT
                </ButtonConnectWallet>
              </Skeleton>
            </>
          )}
        </Box>
      </Box>
    </GridItem>
  )
}

export default WNFT
