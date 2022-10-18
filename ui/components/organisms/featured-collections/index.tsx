import React, { useState } from 'react'

// Dependencies
import Link from 'next/link'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  ButtonGroup,
  Container,
  Grid,
  Heading,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const FeaturedCollections = () => {
  const [swiperRef, setSwiperRef] = useState(null)

  return (
    <Box as="section" paddingBottom={28}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        maxWidth="7xl"
        marginBottom={12}
      >
        <Box display="flex" alignItems="baseline">
          <Heading as="h2" size="lg" color="gray.100" marginRight={6}>
            Featured collections
          </Heading>
          <Link href="collections" passHref={true} color="gray.100">
            <Text as="a" borderBottom="1px solid" borderBottomColor="gray.100">
              view all
            </Text>
          </Link>
        </Box>
        <ButtonGroup as="nav">
          <IconButton aria-label="Previous" color="gray.300" variant="unstyled">
            <ArrowBackIcon width={6} height={6} />
          </IconButton>
          <IconButton aria-label="Next" color="gray.300" variant="unstyled">
            <ArrowForwardIcon width={6} height={6} />
          </IconButton>
        </ButtonGroup>
      </Container>
      {/* <Container
        px={0}
        marginLeft="calc((100% - (80rem - 32px))/2)"
        maxW="calc(100% - calc((100% - (80rem - 32px))/2))"
      >
        <Grid
          gap={8}
          gridTemplateColumns="32px repeat(8, 416px) 32px"
          //   10px repeat(var(--total), calc(50% - var(--gutter) * 2)) 10px
          gridTemplateRows="minmax(384px, 1fr)"
          overflowX="auto"
          scrollSnapType="x proximity"
          gridColumn="1 / -1"
          _before={{ content: '""' }}
          _after={{ content: '""' }}
        >
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
        </Grid>
      </Container> */}
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide style={{ width: 384 }}>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
        </SwiperSlide>
        <SwiperSlide style={{ width: 384 }}>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
        </SwiperSlide>
        <SwiperSlide style={{ width: 384 }}>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
        </SwiperSlide>
        <SwiperSlide style={{ width: 384 }}>
          <Link href="collection/1" passHref={true}>
            <Box
              as="a"
              scrollSnapAlign="center"
              width={96}
              height="620px"
              color="gray.100"
            >
              <Box
                width="100%"
                height="549px"
                marginBottom={6}
                background="gray.500"
                borderRadius={8}
              />
              <Heading as="h6" size="md" marginBottom={2}>
                Autoglyphs
              </Heading>
              <Text fontSize="xs">Larva labs</Text>
            </Box>
          </Link>
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}

export default FeaturedCollections
