import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import '@nomiclabs/hardhat-truffle5';
import '@vechain/hardhat-vechain'
import '@vechain/hardhat-ethers'

const config: HardhatUserConfig = {
  solidity: "0.8.18",  
};


module.exports = {
  solidity: {
      version: "0.8.18",
  },
  mocha: {
    timeout: 180000,
  },
  networks: {
    vechain: {
      url: "https://vethor-node-test.vechaindev.com",
      accounts: {
        mnemonic: "dwarf turkey black moment depend arrange satoshi private sleep hood crouch child",
        count: 10,
      },
      restful: true,
      gas: 10000000
    }
  }
};


export default config;
