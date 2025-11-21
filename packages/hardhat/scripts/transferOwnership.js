const { ethers } = require("hardhat");

async function main() {
  const steps = await ethers.getContract("CeloSteps");
  const token = await ethers.getContract("CeloRewardToken");
  console.log("Steps:", steps.address, "Token:", token.address);
  // make steps contract owner of token
  const tx = await token.transferOwnership(steps.address);
  await tx.wait();
  console.log("Transferred token ownership to steps contract");
}

main().catch((err)=>{ console.error(err); process.exit(1); });
