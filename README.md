# 🚶‍♂️ Walk2Earn — Move-to-Earn on Celo + Farcaster Frame

Walk2Earn is a decentralized **move-to-earn game** that rewards users for walking.  
Every 100,000 verified steps = **0.01 reward token** minted directly on Celo.

Steps come from the user’s phone (HealthKit, Google Fit, or any pedometer compatible source),  
are **signed off-chain**, then **verified on-chain** using a smart contract.

The game also includes a Farcaster Frame so players can check their progress directly from Warpcast.

## 🎮 Features

- Count your smartphone steps  
- Verify steps using cryptographic signatures  
- Mint reward tokens every 100k steps  
- On-chain tracking of all your steps  
- Farcaster Frame integration to show:
  - Total steps
  - Claimable rewards
  - “Claim Rewards” button

## 🧱 Architecture

walk2earn/
│
├── contracts/ # Solidity smart contracts (Celo)
│ ├── Walk2Earn.sol
│ ├── StepsToken.sol
│ └── libraries/
│
├── backend/ # Node backend to validate and sign user step data
│ ├── index.ts
│ ├── signer.ts
│ └── db.json
│
├── frontend/ # Next.js app + Farcaster Frame
│ ├── pages/
│ ├── api/
│ └── components/
│
├── hardhat/ # Deployment scripts + tests
│ ├── deploy.ts
│ └── test/
│
└── README.md

---

## 🔐 Security

- OpenZeppelin audited libraries  
- ECDSA signature verification  
- Nonce system to avoid replay  
- Backend rate limits  
- Contract is immutable and non-upgradeable  

See full details in the **Security & Next Steps** section.

---

## 🚀 Next Steps

Planned upgrades include:
- NFT badges  
- Leaderboard  
- Daily challenges  
- Native app  
- Real incentives (cUSD, community tokens)

## 🛠️ Development Setup

### 1. Install dependencies

yarn install

### 2. Compile contracts

npx hardhat compile

### 3. Run the backend

yarn backend

### 4. Run the frontend

yarn dev

## 🎯 Deployment
Deploy to Celo Alfajores

npx hardhat run hardhat/deploy.ts --network alfajores

## 🪪 License

MIT - open source for the Celo community ❤️

## 🦶 Logo

![Uploading ChatGPT Image 21 nov. 2025, 17_58_55.png…]()


