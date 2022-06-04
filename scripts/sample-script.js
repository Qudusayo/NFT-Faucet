require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const NFTFaucet = await hre.ethers.getContractFactory("NFTFaucet");
  const nftFaucet = await NFTFaucet.deploy(process.env.MULTIFAUCETNFT_ADDRESS);

  await nftFaucet.deployed();

  console.log("NFTFaucet deployed to:", nftFaucet.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
