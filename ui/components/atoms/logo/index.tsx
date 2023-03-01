import React from 'react'
import Image from 'next/image'

// Dependencies
import Link from 'next/link'
import { Box, Heading, Show, Text } from '@chakra-ui/react'

import logoImage from 'public/images/logo.svg'

const Logo = ({ showLogo = true }) => {
  return (
    <Link href="/">
      <Heading as="a" href="/" color="gray.100" size="md" display={'flex'} alignItems={'center'}>
        {showLogo && (
          <Show breakpoint="(min-width: 515px)">
            <Box mr={'11px'} display={'flex'} alignItems={'center'}>
              <Image src={logoImage} width={20} height={24} alt="FingerprintsDAO Logo" />
            </Box>
          </Show>
        )}
        <Text as={'span'}>Traces</Text>
      </Heading>
    </Link>
  )
}

export default Logo
