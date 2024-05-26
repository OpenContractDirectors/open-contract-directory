# The Open Contract Directory

The Open Contract Directory (OCD) is a public goods repository of free, libre, ownerless, uncensorable dapps.

## Manifesto

When a dapp gets popular, people come to rely on it. But who controls that dapp? What are their incentives? Can they hike up fees? Can they implement geoblocking or censor addresses? Are they vulnerable to hacks or rugpulls (secure website hosting, upgradable contracts)? Can they track or sell user data?

The Open Contract Directory (OCD) is a public goods repository of free, libre, ownerless, uncensorable dapps—smart contracts and frontends you can trust. Public good means: no tokens, no upgradability, no hidden fees, no external interests!

## Listing Requirements (Draft)

All contracts and frontends listed within the Open Contract Directory must comply with the following requirements:

Free to use (e.g., no fees, no rent extraction)
Libre software (open source, free to deploy/fork)
Secure (e.g., audited contracts, decentralized frontends)
Neutral (e.g., no privileged tokens, no censorship, immutable contracts)

Certifiers are responsible for checking a submitted project’s metadata/IPFS hash to ensure it complies with the above listing requirements.

## How It Works

Step 1: Register a new item (contract or frontend) with a function call.
Contracts: Metadata hash
Frontends: IPFS hash

Step 2: Publicly certify an item in the registry with a function call.
Certifying shows that you checked the metadata/IPFS hash—and you believe the project complies with OCD listing requirements.

## How To Use the Open Contract Directory

OCD is an on-chain repository of smart contracts and frontends.

Step 1: On the website, you can explore contracts and frontends to use.
Step 2: Filter for Certifiers you trust.
Step 3: Navigate to your favorite frontend paired with your favorite smart contract deployment.
-or-
Step 3: Deploy the contract yourself.

## In This Repo

### Screenshots

![screenshot1](./screenshots/screenshot1.png?raw=true "Screenshot1")

![screenshot2](./screenshots/screenshot2.png?raw=true "Screenshot2")

### Contracts

The registry is deployed on Sepolia at address `0xb6fA4E3BBfd97bc5C26d3F39947f9b1aF1828B36`.

The source of the registry contract is in the `/contracts` subdirectory. Deploy them with

```
forge create --private-key <private key> src/Registry.sol:Registry
```

You can interact with the registry in the following ways: Register a contract, frontend, or deployment, and certify a contract or a frontend. Use the following commands to do so:

```
REGISTRY_ADDRESS=<contract address> METADATA_HASH=<contract metadata hash> forge script --rpc-url <RPC URL> --broadcast --private-key <private key> scripts/registerContract.s.sol
REGISTRY_ADDRESS=<contract address> CONTRACT_ID=<contract id to verify> IPFS_HASH=<deployment IPFS hash> forge script --rpc-url <RPC URL> --broadcast --private-key=<private key> scripts/registerFrontend.s.sol
REGISTRY_ADDRESS=<contract address> CONTRACT_ID=<contract id to verify> CHAIN_ID=<deployment chain id> CONTRACT_ADDRESS=<deployment contract address> forge script --rpc-url <RPC URL> --broadcast --private-key=<private key> scripts/registerDeployment.s.sol
REGISTRY_ADDRESS=<contract address> CONTRACT_ID=0 forge script --rpc-url <RPC URL> --broadcast  --private-key=<private key> scripts/certifyContract.s.sol
REGISTRY_ADDRESS=<contract address> FRONTEND_ID=0 forge script --rpc-url <RPC URL> --broadcast  --private-key=<private key> scripts/certifyFrontend.s.sol
```

`CONTRACT_ID` and `FRONTEND_ID` refer to ids in the registry. They are emitted as events when registering the contract or frontend, respectively.

`METADATA_HASH` is the metadata hash as output by Solidity (the IPFS CID0 hash).

`CONTRACT_ADDRESS` is the address of the contract to certify for.

`IPFS_HASH` is the IPFS CID of the frontend to certify for.

### Frontend

The frontend code can be found in the `/frontend` subdirectory. Install dependencies with `npm install` and add a `.env` file with the following variables:

```
ALCHEMY_API_KEY=...
PUBLIC_REGISTRY_ADDRESS=0xb6fA4E3BBfd97bc5C26d3F39947f9b1aF1828B36
```

Then, you can run a development server with `npm run dev`.
