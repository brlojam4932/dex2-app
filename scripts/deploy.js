const hre = require("hardhat");

async function main() {

  const Dex = await hre.ethers.getContractFactory("Dex");
  const dex = await Dex.deploy();

  await dex.deployed();

  console.log("dex deployed to:", dex.address);

  const RealToken = await hre.ethers.getContractFactory("RealToken");
  const realToken = await RealToken.deploy();

  await realToken.deployed();
  console.log("Real Token deployed to:", realToken.address);

  // deploy to localhost:
  // npx hardhat run scripts/deploy.js --network localhost

  //To interact with the Smart Contract: npx hardhat run scripts/deploy.js

 
 /*
  const Link = await hre.ethers.getContractFactory("Link");
  const link = await Link.deploy();

  await link.deployed();

  console.log("link deployed to: ", link.address);
  console.log("name: ", await link.name());
  console.log("symbol: ", await link.symbol());
  console.log("total supply: ", await link.totalSupply());

  
  // ERC20 transfer args
  //event Transfer(address indexed from, address indexed to, uint256 value);
  const transactionResponse = await link.transfer('0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 200);
  
  const transactionReceipt = await transactionResponse.wait();
  //console.log(transactionReceipt);

  console.log("from: ", transactionReceipt.events[0].args.from);
  console.log("to: ", transactionReceipt.events[0].args.to);
  console.log("value: ", transactionReceipt.events[0].args.value.toNumber());
  
  const balance = await link.balanceOf('0x70997970c51812dc3a010c7d01b50e0d17dc79c8');
  console.log("balance of: ", balance.toNumber());
 

  //event Approval(address indexed owner, address indexed spender, uint256 value);
  const apporveResponse = await link.approve("0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc", 100);
  const approveReceipt = await apporveResponse.wait();
  console.log("approve: ", approveReceipt);

  console.log("owner: ", approveReceipt.events[0].args.owner);
  console.log("spender: ", approveReceipt.events[0].args.spender);
  console.log("value: ", approveReceipt.events[0].args.value.toNumber());

  console.log("allowance: ", await link.allowance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"));

  const balance2 = await link.balanceOf('0x70997970c51812dc3a010c7d01b50e0d17dc79c8');
  console.log("balance of 0x7099...79cB: ", balance2.toNumber());

*/

};


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // (To exit, press Ctrl+C again or Ctrl+D or type .exit)

  // dex deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  // link deployed to:  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

  // npx hardhat console --network localhost
  // also: npx hardhat console
  // const Link = await hre.ethers.getContractFactory("Link")
  // const link = await Link.deploy()

  // console.log(await link.name())
  // > console.log(await link.totalSupply())
  // BigNumber { value: "1000" }


