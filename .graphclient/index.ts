// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { TracesTypes } from './sources/Traces/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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
  price: Scalars['BigInt'];
  minHoldPeriod: Scalars['BigInt'];
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
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minHoldPeriod?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_not?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_gt?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_lt?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_gte?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_lte?: InputMaybe<Scalars['BigInt']>;
  minHoldPeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minHoldPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | 'price'
  | 'minHoldPeriod'
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Collection: ResolverTypeWrapper<Collection>;
  CollectionAdded: ResolverTypeWrapper<CollectionAdded>;
  CollectionAdded_filter: CollectionAdded_filter;
  CollectionAdded_orderBy: CollectionAdded_orderBy;
  Collection_filter: Collection_filter;
  Collection_orderBy: Collection_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  OrderDirection: OrderDirection;
  Outbid: ResolverTypeWrapper<Outbid>;
  Outbid_filter: Outbid_filter;
  Outbid_orderBy: Outbid_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  TokenAdded: ResolverTypeWrapper<TokenAdded>;
  TokenAdded_filter: TokenAdded_filter;
  TokenAdded_orderBy: TokenAdded_orderBy;
  TokenDeleted: ResolverTypeWrapper<TokenDeleted>;
  TokenDeleted_filter: TokenDeleted_filter;
  TokenDeleted_orderBy: TokenDeleted_orderBy;
  WNFT: ResolverTypeWrapper<WNFT>;
  WNFT_filter: WNFT_filter;
  WNFT_orderBy: WNFT_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Collection: Collection;
  CollectionAdded: CollectionAdded;
  CollectionAdded_filter: CollectionAdded_filter;
  Collection_filter: Collection_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Outbid: Outbid;
  Outbid_filter: Outbid_filter;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  TokenAdded: TokenAdded;
  TokenAdded_filter: TokenAdded_filter;
  TokenDeleted: TokenDeleted;
  TokenDeleted_filter: TokenDeleted_filter;
  WNFT: WNFT;
  WNFT_filter: WNFT_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CollectionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ogTokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokens?: Resolver<Array<ResolversTypes['WNFT']>, ParentType, ContextType, RequireFields<CollectiontokensArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectionAddedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CollectionAdded'] = ResolversParentTypes['CollectionAdded']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  collectionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  ogTokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OutbidResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Outbid'] = ResolversParentTypes['Outbid']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  ogTokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  ogTokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<QuerycollectionArgs, 'id' | 'subgraphError'>>;
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<QuerycollectionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenAdded?: Resolver<Maybe<ResolversTypes['TokenAdded']>, ParentType, ContextType, RequireFields<QuerytokenAddedArgs, 'id' | 'subgraphError'>>;
  tokenAddeds?: Resolver<Array<ResolversTypes['TokenAdded']>, ParentType, ContextType, RequireFields<QuerytokenAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  wnft?: Resolver<Maybe<ResolversTypes['WNFT']>, ParentType, ContextType, RequireFields<QuerywnftArgs, 'id' | 'subgraphError'>>;
  wnfts?: Resolver<Array<ResolversTypes['WNFT']>, ParentType, ContextType, RequireFields<QuerywnftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  outbid?: Resolver<Maybe<ResolversTypes['Outbid']>, ParentType, ContextType, RequireFields<QueryoutbidArgs, 'id' | 'subgraphError'>>;
  outbids?: Resolver<Array<ResolversTypes['Outbid']>, ParentType, ContextType, RequireFields<QueryoutbidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenDeleted?: Resolver<Maybe<ResolversTypes['TokenDeleted']>, ParentType, ContextType, RequireFields<QuerytokenDeletedArgs, 'id' | 'subgraphError'>>;
  tokenDeleteds?: Resolver<Array<ResolversTypes['TokenDeleted']>, ParentType, ContextType, RequireFields<QuerytokenDeletedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  collectionAdded?: Resolver<Maybe<ResolversTypes['CollectionAdded']>, ParentType, ContextType, RequireFields<QuerycollectionAddedArgs, 'id' | 'subgraphError'>>;
  collectionAddeds?: Resolver<Array<ResolversTypes['CollectionAdded']>, ParentType, ContextType, RequireFields<QuerycollectionAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  collection?: SubscriptionResolver<Maybe<ResolversTypes['Collection']>, "collection", ParentType, ContextType, RequireFields<SubscriptioncollectionArgs, 'id' | 'subgraphError'>>;
  collections?: SubscriptionResolver<Array<ResolversTypes['Collection']>, "collections", ParentType, ContextType, RequireFields<SubscriptioncollectionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenAdded?: SubscriptionResolver<Maybe<ResolversTypes['TokenAdded']>, "tokenAdded", ParentType, ContextType, RequireFields<SubscriptiontokenAddedArgs, 'id' | 'subgraphError'>>;
  tokenAddeds?: SubscriptionResolver<Array<ResolversTypes['TokenAdded']>, "tokenAddeds", ParentType, ContextType, RequireFields<SubscriptiontokenAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  wnft?: SubscriptionResolver<Maybe<ResolversTypes['WNFT']>, "wnft", ParentType, ContextType, RequireFields<SubscriptionwnftArgs, 'id' | 'subgraphError'>>;
  wnfts?: SubscriptionResolver<Array<ResolversTypes['WNFT']>, "wnfts", ParentType, ContextType, RequireFields<SubscriptionwnftsArgs, 'skip' | 'first' | 'subgraphError'>>;
  outbid?: SubscriptionResolver<Maybe<ResolversTypes['Outbid']>, "outbid", ParentType, ContextType, RequireFields<SubscriptionoutbidArgs, 'id' | 'subgraphError'>>;
  outbids?: SubscriptionResolver<Array<ResolversTypes['Outbid']>, "outbids", ParentType, ContextType, RequireFields<SubscriptionoutbidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenDeleted?: SubscriptionResolver<Maybe<ResolversTypes['TokenDeleted']>, "tokenDeleted", ParentType, ContextType, RequireFields<SubscriptiontokenDeletedArgs, 'id' | 'subgraphError'>>;
  tokenDeleteds?: SubscriptionResolver<Array<ResolversTypes['TokenDeleted']>, "tokenDeleteds", ParentType, ContextType, RequireFields<SubscriptiontokenDeletedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  collectionAdded?: SubscriptionResolver<Maybe<ResolversTypes['CollectionAdded']>, "collectionAdded", ParentType, ContextType, RequireFields<SubscriptioncollectionAddedArgs, 'id' | 'subgraphError'>>;
  collectionAddeds?: SubscriptionResolver<Array<ResolversTypes['CollectionAdded']>, "collectionAddeds", ParentType, ContextType, RequireFields<SubscriptioncollectionAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TokenAddedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenAdded'] = ResolversParentTypes['TokenAdded']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  ogTokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  ogTokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minHoldPeriod?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenDeletedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenDeleted'] = ResolversParentTypes['TokenDeleted']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  ogTokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  ogTokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WNFTResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WNFT'] = ResolversParentTypes['WNFT']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  ogTokenAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ogTokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currentOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  lastPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  firstStakePrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minHoldPeriod?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Collection?: CollectionResolvers<ContextType>;
  CollectionAdded?: CollectionAddedResolvers<ContextType>;
  Outbid?: OutbidResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TokenAdded?: TokenAddedResolvers<ContextType>;
  TokenDeleted?: TokenDeletedResolvers<ContextType>;
  WNFT?: WNFTResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = TracesTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/Traces/introspectionSchema":
      return import("./sources/Traces/introspectionSchema") as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const tracesTransforms = [];
const additionalTypeDefs = [] as any[];
const tracesHandler = new GraphqlHandler({
              name: "Traces",
              config: {"endpoint":"https://api.studio.thegraph.com/query/38826/traces/v0.0.4"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("Traces"),
              logger: logger.child("Traces"),
              importFn,
            });
sources[0] = {
          name: 'Traces',
          handler: tracesHandler,
          transforms: tracesTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetCollectionDocument,
        get rawSDL() {
          return printWithCache(GetCollectionDocument);
        },
        location: 'GetCollectionDocument.graphql'
      },{
        document: GetCollectionsDocument,
        get rawSDL() {
          return printWithCache(GetCollectionsDocument);
        },
        location: 'GetCollectionsDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler(): MeshHTTPHandler<MeshContext> {
  return createMeshHTTPHandler<MeshContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type GetCollectionQueryVariables = Exact<{
  ogTokenAddress: Scalars['String'];
}>;


export type GetCollectionQuery = { collections: Array<(
    Pick<Collection, 'id' | 'ogTokenAddress' | 'blockTimestamp'>
    & { tokens: Array<Pick<WNFT, 'id' | 'ogTokenAddress' | 'ogTokenId' | 'tokenId' | 'currentOwner' | 'lastPrice' | 'firstStakePrice' | 'minHoldPeriod'>> }
  )> };

export type GetCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCollectionsQuery = { collections: Array<Pick<Collection, 'id' | 'ogTokenAddress' | 'blockTimestamp'>> };


export const GetCollectionDocument = gql`
    query GetCollection($ogTokenAddress: String!) {
  collections(where: {ogTokenAddress: $ogTokenAddress}) {
    id
    ogTokenAddress
    blockTimestamp
    tokens {
      id
      ogTokenAddress
      ogTokenId
      tokenId
      currentOwner
      lastPrice
      firstStakePrice
      minHoldPeriod
    }
  }
}
    ` as unknown as DocumentNode<GetCollectionQuery, GetCollectionQueryVariables>;
export const GetCollectionsDocument = gql`
    query GetCollections {
  collections {
    id
    ogTokenAddress
    blockTimestamp
  }
}
    ` as unknown as DocumentNode<GetCollectionsQuery, GetCollectionsQueryVariables>;



export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetCollection(variables: GetCollectionQueryVariables, options?: C): Promise<GetCollectionQuery> {
      return requester<GetCollectionQuery, GetCollectionQueryVariables>(GetCollectionDocument, variables, options) as Promise<GetCollectionQuery>;
    },
    GetCollections(variables?: GetCollectionsQueryVariables, options?: C): Promise<GetCollectionsQuery> {
      return requester<GetCollectionsQuery, GetCollectionsQueryVariables>(GetCollectionsDocument, variables, options) as Promise<GetCollectionsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;