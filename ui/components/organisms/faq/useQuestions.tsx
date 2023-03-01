import { Text } from '@chakra-ui/react'

export const useQuestions = () => {
  return [
    {
      question: 'What is Traces?',
      answer: (
        <>
          Traces is a tool that allows{' '}
          <Text as="a" href="https://fingerprintsdao.xyz/join" textDecor={'underline'} target={'_blank'}>
            Fingerprints DAO
          </Text>{' '}
          members to borrow wrapped versions of NFTs in{' '}
          <Text as="a" href="https://opensea.io/0xbc49de68bcbd164574847a7ced47e7475179c76b" textDecor={'underline'} target={'_blank'}>
            The Fingerprints Collection
          </Text>
          . The tool creates an identical (wrapped) version, allowing users who hold the NFT in their wallets to use it as they like. For example,
          showcasing it in virtual exhibitions or posting it as an NFT on Instagram or Twitter.
        </>
      ),
    },
    {
      question: 'Are all NFTs from The Fingerprints Collection available on Traces?',
      answer: (
        <>
          No. Currently, only NFTs individually selected by the DAO are available. Specific administrators can register and delete NFTs on Traces
          while considering the rules of each NFT before adding them.
        </>
      ),
    },
    {
      question: 'What is a Wrapped NFT (WNFT)?',
      answer: (
        <>
          A Wrapped NFT (WNFT) is an NFT created on the{' '}
          <Text as="a" href="https://etherscan.io/address/0x6207f7065F9693784238ab27084836F74aefbb5a" textDecor={'underline'} target={'_blank'}>
            Traces smart contract
          </Text>
          , using the original metadata to create a wrapped version with the same image and name as the original. The metadata of the WNFT is related
          to the Traces tool.
        </>
      ),
    },
    {
      question: 'Does the WNFT give me the utilities of the original NFT?',
      answer: (
        <>
          No, but it would be possible for other DAOs and organizations to integrate Traces, allowing members to have the utility of the original NFTs
          in the future.
        </>
      ),
    },
    {
      question: 'How can I obtain a WNFT?',
      answer: (
        <>
          You can mint a WNFT if it has never been held by a member before. Alternatively, you can outbid the current holder by staking more $PRINTS
          than the current holder. The current price is defined using a Dutch auction based on the configuration set by the Traces administrators.
        </>
      ),
    },
    {
      question: 'What happens to the original NFT?',
      answer: (
        <>
          Nothing happens to the original NFT. It remains safely inside the{' '}
          <Text as="a" href="https://opensea.io/0xbc49de68bcbd164574847a7ced47e7475179c76b" textDecor={'underline'} target={'_blank'}>
            Fingerprints vault
          </Text>
          .
        </>
      ),
    },
    {
      question: 'Are my $PRINTS locked?',
      answer: (
        <>
          It depends on the parameters set by the Traces administrators. If the WNFT has a guaranteed hold period or Dutch auction, your $PRINTS will
          be locked until the sum of these two parameters ends. If they are set to zero, you can un-stake and return the WNFT at any time.
        </>
      ),
    },
    {
      question: 'Can I transfer my WNFT? What happens to my staked $PRINTS?',
      answer: (
        <>
          You can transfer your WNFT at any time, but only the owner can un-stake it and redeem the $PRINTS. The $PRINTS are returned to the owner of
          the WNFT at the time it is un-staked or outbid. When you transfer the WNFT, you also transfer the rights of the staked $PRINTS.
        </>
      ),
    },
    {
      question: 'Can I un-stake my $PRINTS?',
      answer: (
        <>After the guaranteed hold period and Dutch auction, you can un-stake your $PRINTS and return the WNFT to the Traces smart contract.</>
      ),
    },
    {
      question: 'Do I lose my Fingerprints membership if I stake all my $PRINTS?',
      answer: <>No. If you have a Traces WNFT, you are still considered a member.</>,
    },
    {
      question: 'What happens if someone outbids my WNFT?',
      answer: <>Your staked $PRINTS will be returned to your wallet, and the WNFT will be transferred to the new holder.</>,
    },
    {
      question: 'What does “guaranteed hold period” mean?',
      answer: (
        <>
          The guaranteed hold period is the time during which no one can outbid your WNFT. It is a safe period during which your WNFT cannot be taken
          from you.
        </>
      ),
    },
    {
      question: 'How does a Dutch auction work?',
      answer: (
        <>
          A Dutch auction is a type of auction in which the price of the item being auctioned starts high and gradually decreases over time until a
          buyer is found. In Traces, there are two parameters set by the Traces administrators: duration and multiplier. Duration is how long the WNFT
          will be up for (Dutch) auction. The multiplier is the number of times the original stake amount is multiplied at the start of the Dutch
          auction. The price decreases throughout the duration of the auction and goes to the first price set by Traces administrators. The guaranteed
          hold period and Dutch auction start again as soon someone outbids for the WNFT. The Dutch auction multiplier starts based on this new staked
          value.
        </>
      ),
    },
    {
      question: 'Can I use Traces in my DAO/Community?',
      answer: (
        <>
          Yes, we encourage it. All code is public, and you can find it on our{' '}
          <Text as="a" href="https://github.com/Fingerprints-DAO/" textDecor={'underline'} target={'_blank'}>
            GitHub
          </Text>
          . Feel free to copy and make changes as needed. If you need help customizing the code, you can ask{' '}
          <Text as="a" href="https://twitter.com/arodstudioxyz" textDecor={'underline'} target={'_blank'}>
            Arod Studio
          </Text>{' '}
          for help or reach us on{' '}
          <Text as="a" href="https://fingerprintsdao.xyz/join" textDecor={'underline'} target={'_blank'}>
            Fingerprints’ Discord
          </Text>
          .
        </>
      ),
    },
  ]
}
