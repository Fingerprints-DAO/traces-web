import React, { useState } from 'react'

// Dependencies
import Link from 'next/link'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, ButtonGroup, Container, Heading, IconButton, Text } from '@chakra-ui/react'
import Swiper, { Pagination, Navigation } from 'swiper'

// Components
import Slider from '@ui/components/molecules/slider'
import useMediaQuery from '@ui/hooks/use-media-query'
import CollectionCard from '@ui/components/molecules/collection-card'

const FeaturedCollections = () => {
  const [swiper, setSwiper] = useState<Swiper>()
  const isMobile = useMediaQuery('(max-width: 479px)')

  const handleSliderNavigation = (action: 'previous' | 'next') => () => {
    return action === 'previous' ? swiper?.slidePrev() : swiper?.slideNext()
  }

  return (
    <Box as="section" paddingBottom={[20, 28]}>
      <Container display="flex" alignItems="center" justifyContent="space-between" maxWidth="7xl" marginBottom={[10, 12]}>
        <Box display={['block', 'flex']} alignItems="baseline">
          <Heading as="h2" size="lg" color="gray.100" marginRight={6}>
            Featured collections
          </Heading>
          <Link href="collections" color="gray.100">
            <Text as="a" href="collections" borderBottom="1px solid" borderBottomColor="gray.100">
              view all
            </Text>
          </Link>
        </Box>
        <ButtonGroup as="nav">
          <IconButton aria-label="Previous" color="gray.300" variant="unstyled" onClick={handleSliderNavigation('previous')}>
            <ArrowBackIcon width={6} height={6} />
          </IconButton>
          <IconButton aria-label="Next" color="gray.300" variant="unstyled" onClick={handleSliderNavigation('next')}>
            <ArrowForwardIcon width={6} height={6} />
          </IconButton>
        </ButtonGroup>
      </Container>
      <Slider
        onSwiper={setSwiper}
        slidesPerView="auto"
        centeredSlides={isMobile ? false : true}
        spaceBetween={isMobile ? 16 : 32}
        navigation={false}
        initialSlide={isMobile ? 0 : 1}
        scrollbar={{ draggable: true }}
        modules={[Pagination, Navigation]}
        className="featured-collections"
        items={Array.from(Array(8), (_, index) => {
          return <CollectionCard path="collections/1" key={index} />
        })}
      />
    </Box>
  )
}

export default FeaturedCollections
