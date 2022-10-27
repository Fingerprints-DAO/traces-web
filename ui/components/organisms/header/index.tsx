import React, { useMemo, useState } from 'react'

// Dependencies
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Container,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'

// Components
import Logo from '@ui/components/atoms/logo'

const Header = () => {
  const [isMobile] = useMediaQuery('(max-width: 30em)')
  const [isConnected, setIsConnected] = useState(true)

  const handleConnectWallet = () => setIsConnected(!isConnected)

  const connectButtonLabel = useMemo(() => {
    const sufix = ' wallet'
    const prefix = isConnected ? 'Disconnect' : 'Connect'

    return isMobile ? prefix : `${prefix} ${sufix}`
  }, [isConnected, isMobile])

  return (
    <Box
      as="header"
      paddingY="3"
      background="gray.900"
      position="sticky"
      left={0}
      top={0}
      zIndex="sticky"
    >
      <Container
        maxWidth="7xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <Button
            variant="unstyled"
            display="block"
            minWidth="unset"
            height="unset"
            padding="3px"
            marginRight={[2, 4]}
          >
            <HamburgerIcon boxSize={18} display="block" />
          </Button>
          <Logo />
        </Box>
        <Box display="flex" alignItems="center">
          {isConnected && (
            <Box display="flex" alignItems="center" marginRight={[3, 6]}>
              <Box textAlign="right" marginRight={2}>
                <Text
                  as="strong"
                  color="gray.200"
                  display="block"
                  fontSize={['xs', 'sm']}
                  fontWeight={600}
                  marginBottom="-2px"
                >
                  1580 PRINTS
                </Text>
                <Text
                  as="span"
                  color="gray.400"
                  fontSize={['xs', 'sm']}
                  display="block"
                >
                  0x...45bG
                </Text>
              </Box>
              <Avatar size={['sm', 'xm']} src="https://bit.ly/dan-abramov" />
            </Box>
          )}
          <Button
            borderColor="gray.200"
            color={isConnected ? 'gray.200' : 'gray.900'}
            colorScheme="primary"
            variant={isConnected ? 'outline' : 'solid'}
            size={['xs', 'md']}
            onClick={handleConnectWallet}
          >
            {connectButtonLabel}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Header
