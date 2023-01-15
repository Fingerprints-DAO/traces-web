// Dependencies
import type { NextPage } from 'next'

// Components
import FAQ from '@ui/components/organisms/faq'
import HomeHero from '@ui/components/organisms/home-hero'
import FeaturedCollections from '@ui/components/organisms/featured-collections'

const Home: NextPage = () => {
  return (
    <>
      <HomeHero />
      <FeaturedCollections />
      <FAQ />
    </>
  )
}

export async function getStaticProps() {
  const meta = {
    title: 'Home',
    description: 'Hold and use NFTs from the Fingerprints collection',
    navPage: 'home',
  }

  return { props: { meta } }
}

export default Home
