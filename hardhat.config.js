require("@nomiclabs/hardhat-waffle");

let secret = require("./secret.json");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    /* 
    ropsten: {
      url: secret.url,
      accounts: [secret.key],
      network_id: 3,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    }
    */

  }

};

// npx hardhat compile
// npx hardhat node
// npx hardhat run scripts/deploy1.js --network localhost

