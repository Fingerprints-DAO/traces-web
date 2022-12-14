## To run locally you need to have 3 projects, they are:

### [Traces Contracts](https://github.com/Fingerprints-DAO/traces-contracts)
- Contains the Traces contract, an erc20 contract for mocking $PRINTS and an erc721 contract for mocking collections
- Also, there are scripts to make transactions necessary to test things locally or on testnets, including deploying the contracts


### [Traces Subgraph](https://github.com/Fingerprints-DAO/traces-subgraph)
  - Subgraph is set up using [subgraph studio](https://thegraph.com/studio/subgraph/traces/)
  - To run locally, you need to setup a docker and run the deployment to this docker. See more on subgraph repository documentation.
  - Collection and some wnft data are handled there based on events triggered from traces contract.



---
## Running traces-web locally
First you need to set your nodejs to the version used to build this project. Check it on [.nvmrc](./.nvmrc) file. 
Then, install the dependencies of this project using `yarn`:
```
yarn
```

Copy the `.env-example` file to `.env` and change the `.env` on according to your variables.
The contracts addresses should be get when running [traces-contract](https://github.com/Fingerprints-DAO/traces-contracts) project. Check the terminal when running the task to make the server up.

Then, run
```
yarn dev
```

And check the browser on [localhost:3000](http://localhost:3000/)

--- 
ERC20 = $PRINTS
ERC721 = NFTs
TRACES = MAIN CONTRACT
