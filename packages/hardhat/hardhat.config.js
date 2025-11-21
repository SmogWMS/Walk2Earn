require("dotenv").config();
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");

const { PRIVATE_KEY, RPC_URL } = process.env;

module.exports = {
  solidity: "0.8.20",
  namedAccounts: {
    deployer: 0
  },
  networks: {
    alfajores: {
      url: RPC_URL || "https://alfajores-forno.celo-testnet.org",
      chainId: 44787,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337
    }
  }
};
