module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const token = await get('CeloRewardToken');
  // 0.01 token with 18 decimals => 1e16
  const rewardAmountWei = "10000000000000000";

  await deploy('CeloSteps', {
    from: deployer,
    args: [token.address, rewardAmountWei],
    log: true
  });
};
module.exports.tags = ['Steps'];
