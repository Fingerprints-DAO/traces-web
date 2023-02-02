import React from 'react'

// Dependencies
import { Box, Container, Text } from '@chakra-ui/react'

// Components
import Logo from '@ui/components/atoms/logo'
import Medias from '@ui/components/molecules/medias'

const Footer = () => {
  return (
    <Box as="footer" paddingY={4}>
      <Container maxWidth="7xl" display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="baseline">
          <Logo showLogo={false} />
          <Text as="span" color="gray.100" fontSize="xs" marginLeft={[2, 4]}>
            by{' '}
            <Text as="a" href="https://fingerprintsdao.xyz/" _hover={{ textDecor: 'underline' }} target={'_blank'}>
              Fingerprints DAO
            </Text>{' '}
            & developed by{' '}
            <Text as="a" href="http://arodstudio.xyz/" _hover={{ textDecor: 'underline' }} target={'_blank'}>
              Arod Studio
            </Text>
          </Text>
        </Box>
        <Medias />
      </Container>
    </Box>
  )
}

export default Footer
