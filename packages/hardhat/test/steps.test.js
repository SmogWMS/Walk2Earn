const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CeloSteps", function() {
  it("should add points and claim token", async function() {
    const [deployer, user] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("CeloRewardToken");
    const token = await Token.deploy();
    await token.deployed();

    const Steps = await ethers.getContractFactory("CeloSteps");
    const rewardAmountWei = ethers.parseUnits("0.01", 18);
    const steps = await Steps.deploy(token.address, rewardAmountWei);
    await steps.deployed();

    // transfer token ownership to steps
    await token.transferOwnership(steps.address);

    // add points via relayer (deployer is relayer by default)
    await steps.connect(deployer).addPoints(user.address, 100_000);
    expect((await steps.points(user.address)).toString()).to.equal("100000");

    // user claims
    await steps.connect(user).claimRewards();
    expect(await token.balanceOf(user.address)).to.equal(rewardAmountWei);
  });
});
