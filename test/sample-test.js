require("dotenv").config();
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTFaucet", function () {
  it("Should return the MultiFaucet NFT address", async function () {
    const NFTFaucet = await ethers.getContractFactory("NFTFaucet");
    const nftFaucet = await NFTFaucet.deploy(
      process.env.MULTIFAUCETNFT_ADDRESS
    );
    await nftFaucet.deployed();

    expect(await nftFaucet.multiFaucetContract()).to.equal(
      process.env.MULTIFAUCETNFT_ADDRESS
    );
  });
});
