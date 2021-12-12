// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Twitter3 {
    uint256 totalTweets;
    // uint256 private seed;
    address myAddress = address(this);
    mapping(address => uint256) public lastTweetedAt;

    event NewTweet(address indexed from, uint256 timestamp, string tweet);

    struct Tweet {
        address tweeter;
        uint256 timestamp;
        string tweet;
    }

    Tweet[] tweets;

    constructor() payable {
        console.log(
            "this is twitter 3.0 , you dont have to be smart to use this smart contract , your current balence is %d",
            myAddress.balance
        );
        //  seed = (block.timestamp + block.difficulty) % 100;
    }

    function tweet(string memory tweetToSaveInBlockChain) public {
        require(
            lastTweetedAt[msg.sender] + 1 minutes < block.timestamp,
            "Wait 1 Mints to Tweet again , let ether nodes to cool down ;)"
        );

        lastTweetedAt[msg.sender] = block.timestamp;

        totalTweets++;
        tweets.push(
            Tweet({
                tweeter: msg.sender,
                timestamp: block.timestamp,
                tweet: tweetToSaveInBlockChain
            })
        );

        emit NewTweet(msg.sender, block.timestamp, tweetToSaveInBlockChain);

        //  seed = (block.difficulty + block.timestamp + seed) % 100;
        //    if (seed <= 50) {
        //         console.log("%s won!", msg.sender);
        // uint256 prizeAmount = 0.1 ether;
        // if (prizeAmount < myAddress.balance) {
        //     (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        //     require(success, "Failed to withdraw money from contract.");
        // }
        // }
    }

    function getAllTweets() public view returns (Tweet[] memory) {
        return tweets;
    }

    function getTweetsCount() public view returns (uint256) {
        return totalTweets;
    }
}
