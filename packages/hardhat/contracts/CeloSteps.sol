// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CeloRewardToken.sol";

contract CeloSteps is Ownable {
    CeloRewardToken public token;
    address public relayer;
    mapping(address => uint256) public points;

    uint256 public pointsPerReward = 100_000;
    uint256 public rewardAmountWei; // 0.01 token => 1e16 if decimals = 18

    event PointsAdded(address indexed user, uint256 amount, uint256 total);
    event RewardClaimed(address indexed user, uint256 pointsUsed, uint256 tokenAmount);

    constructor(address _token, uint256 _rewardAmountWei) Ownable(msg.sender) {
        token = CeloRewardToken(_token);
        relayer = msg.sender;
        rewardAmountWei = _rewardAmountWei;
    }

    modifier onlyRelayer() {
        require(msg.sender == relayer, "only relayer");
        _;
    }

    function setRelayer(address _relayer) external onlyOwner {
        relayer = _relayer;
    }

    function setPointsPerReward(uint256 _pp) external onlyOwner {
        pointsPerReward = _pp;
    }

    function setRewardAmountWei(uint256 _amt) external onlyOwner {
        rewardAmountWei = _amt;
    }

    function addPoints(address user, uint256 added) external onlyRelayer {
        points[user] += added;
        emit PointsAdded(user, added, points[user]);
    }

    function addPointsBatch(address[] calldata users, uint256[] calldata adds) external onlyRelayer {
        require(users.length == adds.length, "len mismatch");
        for (uint i=0;i<users.length;i++){
            points[users[i]] += adds[i];
            emit PointsAdded(users[i], adds[i], points[users[i]]);
        }
    }

    function claimRewards() external {
        uint256 userPoints = points[msg.sender];
        require(userPoints >= pointsPerReward, "not enough points");
        uint256 batches = userPoints / pointsPerReward;
        uint256 pointsUsed = batches * pointsPerReward;
        uint256 tokenAmount = batches * rewardAmountWei;
        points[msg.sender] = userPoints - pointsUsed;
        token.mint(msg.sender, tokenAmount);
        emit RewardClaimed(msg.sender, pointsUsed, tokenAmount);
    }
}
