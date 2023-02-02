import React, { useContext, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  Box,
  Text,
} from '@chakra-ui/react'
import Wallet from '@ui/components/molecules/wallet'
import { TracesContext } from '@ui/contexts/Traces'
import { ModalElement } from '@ui/contexts/Modal'
import useWallet from '@web3/wallet/use-wallet'
import logoImage from 'public/images/logo.svg'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  onOpenModal: (element: ModalElement) => void
}

const Drawer = ({ isOpen, onClose, onOpenModal }: DrawerProps) => {
  const router = useRouter()
  const { isAdmin, isEditor, isConnected } = useContext(TracesContext)

  const handleOpenModal = (element: ModalElement) => () => onOpenModal(element)

  const items = useMemo(() => {
    const arr = [
      { path: '/', label: 'Home' },
      { path: '/collections', label: 'Collections' },
    ]

    if (isConnected) {
      arr.push({ path: '/profile', label: 'Profile' })
    }

    return arr
  }, [isConnected])

  return (
    <ChakraDrawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent backgroundColor="gray.900" maxWidth={400}>
        <DrawerHeader alignItems="center" display="flex" justifyContent="space-between" padding={8} mb={4}>
          <Heading as="h1" color="gray.50" size="xl" flex={1} display={'flex'} alignItems={'center'}>
            <Image src={logoImage} width={36} height={43} alt="FingerprintsDAO Logo" />
            <Text as={'span'} ml={'24px'}>
              Traces
            </Text>
          </Heading>
          <DrawerCloseButton position="static" />
        </DrawerHeader>
        <DrawerBody px={8}>
          <Box as="nav">
            {items.map(({ path, label }) => {
              return (
                <Link key={path} href={path} legacyBehavior={true}>
                  <Box
                    as="a"
                    href={path}
                    display="block"
                    lineHeight={9}
                    fontSize={24}
                    fontWeight={router.pathname === path ? 700 : 400}
                    mb={[4, 4, 4, 4, 10]}
                  >
                    {label}
                  </Box>
                </Link>
              )
            })}
          </Box>
        </DrawerBody>
        <DrawerFooter alignItems="flex-start" flexDirection="column" p={8}>
          <Box as="nav" mb={[10, 20]}>
            {isEditor && (
              <Box as="button" display="block" lineHeight={9} mb={[4, 4, 4, 4, 10]} fontSize={24} onClick={handleOpenModal(ModalElement.AddNFT)}>
                Add NFT
              </Box>
            )}
            {(isEditor || isAdmin) && (
              <Box
                as="button"
                display="block"
                lineHeight={9}
                fontSize={24}
                mb={[4, 4, 4, 4, 10]}
                onClick={handleOpenModal(ModalElement.Administrators)}
              >
                Roles
              </Box>
            )}
            {isAdmin && (
              <>
                <Box as="button" display="block" lineHeight={9} fontSize={24} mb={[4, 4, 4, 4, 10]} onClick={handleOpenModal(ModalElement.AddRole)}>
                  Grant roles
                </Box>
                <Box as="button" display="block" lineHeight={9} fontSize={24} onClick={handleOpenModal(ModalElement.UpdateConfigs)}>
                  Settings
                </Box>
              </>
            )}
          </Box>
          <Wallet variant="drawer" />
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  )
}

export default Drawer
