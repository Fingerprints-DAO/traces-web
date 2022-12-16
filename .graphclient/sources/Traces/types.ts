// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace TracesTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Collection = {
  id: Scalars['String'];
  ogTokenAddress: Scalars['String'];
  blockTimestamp: Scalars['BigInt'];
  tokens: Array<WNFT>;
};


export type CollectiontokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WNFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WNFT_filter>;
};

export type CollectionAdded = {
  id: Scalars['Bytes'];
  collectionId: Scalars['BigInt'];
  ogTokenAddress: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type CollectionAdded_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  collectionId?: InputMaybe<Scalars['BigInt']>;
  collectionId_not?: InputMaybe<Scalars['BigInt']>;
  collectionId_gt?: InputMaybe<Scalars['BigInt']>;
  collectionId_lt?: InputMaybe<Scalars['BigInt']>;
  collectionId_gte?: InputMaybe<Scalars['BigInt']>;
  collectionId_lte?: InputMaybe<Scalars['BigInt']>;
  collectionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collectionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ogTokenAddress?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_not?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  ogTokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  ogTokenAddress_contains?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type CollectionAdded_orderBy =
  | 'id'
  | 'collectionId'
  | 'ogTokenAddress'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Collection_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not?: InputMaybe<Scalars['String']>;
  ogTokenAddress_gt?: InputMaybe<Scalars['String']>;
  ogTokenAddress_lt?: InputMaybe<Scalars['String']>;
  ogTokenAddress_gte?: InputMaybe<Scalars['String']>;
  ogTokenAddress_lte?: InputMaybe<Scalars['String']>;
  ogTokenAddress_in?: InputMaybe<Array<Scalars['String']>>;
  ogTokenAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  ogTokenAddress_contains?: InputMaybe<Scalars['String']>;
  ogTokenAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_contains?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress_starts_with?: InputMaybe<Scalars['String']>;
  ogTokenAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress_ends_with?: InputMaybe<Scalars['String']>;
  ogTokenAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokens_?: InputMaybe<WNFT_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Collection_orderBy =
  | 'id'
  | 'ogTokenAddress'
  | 'blockTimestamp'
  | 'tokens';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Outbid = {
  id: Scalars['Bytes'];
  ogTokenAddress: Scalars['Bytes'];
  ogTokenId: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
  amount: Scalars['BigInt'];
  price: Scalars['BigInt'];
  owner: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type Outbid_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_not?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  ogTokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  ogTokenAddress_contains?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  ogTokenId?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_not?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_gt?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_lt?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_gte?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_lte?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ogTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Outbid_orderBy =
  | 'id'
  | 'ogTokenAddress'
  | 'ogTokenId'
  | 'tokenId'
  | 'amount'
  | 'price'
  | 'owner'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  tokenAdded?: Maybe<TokenAdded>;
  tokenAddeds: Array<TokenAdded>;
  wnft?: Maybe<WNFT>;
  wnfts: Array<WNFT>;
  outbid?: Maybe<Outbid>;
  outbids: Array<Outbid>;
  tokenDeleted?: Maybe<TokenDeleted>;
  tokenDeleteds: Array<TokenDeleted>;
  collectionAdded?: Maybe<CollectionAdded>;
  collectionAddeds: Array<CollectionAdded>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerycollectionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Collection_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenAddedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywnftArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywnftsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WNFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WNFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryoutbidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryoutbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Outbid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Outbid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenDeletedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenDeletedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDeleted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenDeleted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectionAddedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectionAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CollectionAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  tokenAdded?: Maybe<TokenAdded>;
  tokenAddeds: Array<TokenAdded>;
  wnft?: Maybe<WNFT>;
  wnfts: Array<WNFT>;
  outbid?: Maybe<Outbid>;
  outbids: Array<Outbid>;
  tokenDeleted?: Maybe<TokenDeleted>;
  tokenDeleteds: Array<TokenDeleted>;
  collectionAdded?: Maybe<CollectionAdded>;
  collectionAddeds: Array<CollectionAdded>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptioncollectionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncollectionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Collection_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenAddedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwnftArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwnftsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WNFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WNFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionoutbidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionoutbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Outbid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Outbid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenDeletedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenDeletedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenDeleted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenDeleted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncollectionAddedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncollectionAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CollectionAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type TokenAdded = {
  id: Scalars['Bytes'];
  ogTokenAddress: Scalars['Bytes'];
  ogTokenId: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  param3: Scalars['BigInt'];
  param4: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type TokenAdded_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_not?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  ogTokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  ogTokenAddress_contains?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  ogTokenId?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_not?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_gt?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_lt?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_gte?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_lte?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ogTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  param3?: InputMaybe<Scalars['BigInt']>;
  param3_not?: InputMaybe<Scalars['BigInt']>;
  param3_gt?: InputMaybe<Scalars['BigInt']>;
  param3_lt?: InputMaybe<Scalars['BigInt']>;
  param3_gte?: InputMaybe<Scalars['BigInt']>;
  param3_lte?: InputMaybe<Scalars['BigInt']>;
  param3_in?: InputMaybe<Array<Scalars['BigInt']>>;
  param3_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  param4?: InputMaybe<Scalars['BigInt']>;
  param4_not?: InputMaybe<Scalars['BigInt']>;
  param4_gt?: InputMaybe<Scalars['BigInt']>;
  param4_lt?: InputMaybe<Scalars['BigInt']>;
  param4_gte?: InputMaybe<Scalars['BigInt']>;
  param4_lte?: InputMaybe<Scalars['BigInt']>;
  param4_in?: InputMaybe<Array<Scalars['BigInt']>>;
  param4_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TokenAdded_orderBy =
  | 'id'
  | 'ogTokenAddress'
  | 'ogTokenId'
  | 'tokenId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'param3'
  | 'param4'
  | 'transactionHash';

export type TokenDeleted = {
  id: Scalars['Bytes'];
  ogTokenAddress: Scalars['Bytes'];
  ogTokenId: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type TokenDeleted_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_not?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  ogTokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  ogTokenAddress_contains?: InputMaybe<Scalars['Bytes']>;
  ogTokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  ogTokenId?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_not?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_gt?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_lt?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_gte?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_lte?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ogTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TokenDeleted_orderBy =
  | 'id'
  | 'ogTokenAddress'
  | 'ogTokenId'
  | 'tokenId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type WNFT = {
  id: Scalars['String'];
  collection: Collection;
  ogTokenAddress: Scalars['String'];
  ogTokenId: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
  currentOwner: Scalars['Bytes'];
  lastPrice: Scalars['BigInt'];
  firstStakePrice: Scalars['BigInt'];
  minHoldPeriod: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
};

export type WNFT_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection?: InputMaybe<Scalars['String']>;
  collection_not?: InputMaybe<Scalars['String']>;
  collection_gt?: InputMaybe<Scalars['String']>;
  collection_lt?: InputMaybe<Scalars['String']>;
  collection_gte?: InputMaybe<Scalars['String']>;
  collection_lte?: InputMaybe<Scalars['String']>;
  collection_in?: InputMaybe<Array<Scalars['String']>>;
  collection_not_in?: InputMaybe<Array<Scalars['String']>>;
  collection_contains?: InputMaybe<Scalars['String']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_not_contains?: InputMaybe<Scalars['String']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_starts_with?: InputMaybe<Scalars['String']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_starts_with?: InputMaybe<Scalars['String']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_ends_with?: InputMaybe<Scalars['String']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_?: InputMaybe<Collection_filter>;
  ogTokenAddress?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not?: InputMaybe<Scalars['String']>;
  ogTokenAddress_gt?: InputMaybe<Scalars['String']>;
  ogTokenAddress_lt?: InputMaybe<Scalars['String']>;
  ogTokenAddress_gte?: InputMaybe<Scalars['String']>;
  ogTokenAddress_lte?: InputMaybe<Scalars['String']>;
  ogTokenAddress_in?: InputMaybe<Array<Scalars['String']>>;
  ogTokenAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  ogTokenAddress_contains?: InputMaybe<Scalars['String']>;
  ogTokenAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_contains?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress_starts_with?: InputMaybe<Scalars['String']>;
  ogTokenAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress_ends_with?: InputMaybe<Scalars['String']>;
  ogTokenAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  ogTokenAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ogTokenId?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_not?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_gt?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_lt?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_gte?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_lte?: InputMaybe<Scalars['BigInt']>;
  ogTokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ogTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentOwner?: InputMaybe<Scalars['Bytes']>;
  currentOwner_not?: InputMaybe<Scalars['Bytes']>;
  currentOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currentOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currentOwner_contains?: InputMaybe<Scalars['Bytes']>;
  currentOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  lastPrice?: InputMaybe<Scalars['BigInt']>;
  lastPrice_not?: InputMaybe<Scalars['BigInt']>;
  lastPrice_gt?: InputMaybe<Scalars['BigInt']>;
  lastPrice_lt?: InputMaybe<Scalars['BigInt']>;
  lastPrice_gte?: InputMaybe<Scalars['BigInt']>;
  lastPrice_lte?: InputMaybe<Scalars['BigInt']>;
  lastPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstStakePrice?: InputMaybe<Scalars['BigInt']>;
  firstStakePrice_not?: InputMaybe<Scalars['BigInt']>;
  firstStakePrice_gt?: InputMaybe<Scalars['BigInt']>;
  firstStakePrice_lt?: InputMaybe<Scalars['BigInt']>;
  firstStakePrice_gte?: InputMaybe<Scalars['BigInt']>;
  firstStakePrice_lte?: InputMaybe<Scalars['BigInt']>;
  firstStakePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstStakePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minHoldPeriod?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_not?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_gt?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_lt?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_gte?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_lte?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minHoldPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type WNFT_orderBy =
  | 'id'
  | 'collection'
  | 'ogTokenAddress'
  | 'ogTokenId'
  | 'tokenId'
  | 'currentOwner'
  | 'lastPrice'
  | 'firstStakePrice'
  | 'minHoldPeriod'
  | 'blockTimestamp';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  collection: InContextSdkMethod<Query['collection'], QuerycollectionArgs, MeshContext>,
  /** null **/
  collections: InContextSdkMethod<Query['collections'], QuerycollectionsArgs, MeshContext>,
  /** null **/
  tokenAdded: InContextSdkMethod<Query['tokenAdded'], QuerytokenAddedArgs, MeshContext>,
  /** null **/
  tokenAddeds: InContextSdkMethod<Query['tokenAddeds'], QuerytokenAddedsArgs, MeshContext>,
  /** null **/
  wnft: InContextSdkMethod<Query['wnft'], QuerywnftArgs, MeshContext>,
  /** null **/
  wnfts: InContextSdkMethod<Query['wnfts'], QuerywnftsArgs, MeshContext>,
  /** null **/
  outbid: InContextSdkMethod<Query['outbid'], QueryoutbidArgs, MeshContext>,
  /** null **/
  outbids: InContextSdkMethod<Query['outbids'], QueryoutbidsArgs, MeshContext>,
  /** null **/
  tokenDeleted: InContextSdkMethod<Query['tokenDeleted'], QuerytokenDeletedArgs, MeshContext>,
  /** null **/
  tokenDeleteds: InContextSdkMethod<Query['tokenDeleteds'], QuerytokenDeletedsArgs, MeshContext>,
  /** null **/
  collectionAdded: InContextSdkMethod<Query['collectionAdded'], QuerycollectionAddedArgs, MeshContext>,
  /** null **/
  collectionAddeds: InContextSdkMethod<Query['collectionAddeds'], QuerycollectionAddedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  collection: InContextSdkMethod<Subscription['collection'], SubscriptioncollectionArgs, MeshContext>,
  /** null **/
  collections: InContextSdkMethod<Subscription['collections'], SubscriptioncollectionsArgs, MeshContext>,
  /** null **/
  tokenAdded: InContextSdkMethod<Subscription['tokenAdded'], SubscriptiontokenAddedArgs, MeshContext>,
  /** null **/
  tokenAddeds: InContextSdkMethod<Subscription['tokenAddeds'], SubscriptiontokenAddedsArgs, MeshContext>,
  /** null **/
  wnft: InContextSdkMethod<Subscription['wnft'], SubscriptionwnftArgs, MeshContext>,
  /** null **/
  wnfts: InContextSdkMethod<Subscription['wnfts'], SubscriptionwnftsArgs, MeshContext>,
  /** null **/
  outbid: InContextSdkMethod<Subscription['outbid'], SubscriptionoutbidArgs, MeshContext>,
  /** null **/
  outbids: InContextSdkMethod<Subscription['outbids'], SubscriptionoutbidsArgs, MeshContext>,
  /** null **/
  tokenDeleted: InContextSdkMethod<Subscription['tokenDeleted'], SubscriptiontokenDeletedArgs, MeshContext>,
  /** null **/
  tokenDeleteds: InContextSdkMethod<Subscription['tokenDeleteds'], SubscriptiontokenDeletedsArgs, MeshContext>,
  /** null **/
  collectionAdded: InContextSdkMethod<Subscription['collectionAdded'], SubscriptioncollectionAddedArgs, MeshContext>,
  /** null **/
  collectionAddeds: InContextSdkMethod<Subscription['collectionAddeds'], SubscriptioncollectionAddedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["Traces"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
