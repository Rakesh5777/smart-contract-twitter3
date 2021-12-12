const mainTest = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const twi3ContractFactory = await hre.ethers.getContractFactory('Twitter3');
    const twi3Contract = await twi3ContractFactory.deploy({
        value: hre.ethers.utils.parseEther('10'),
    });
    await twi3Contract.deployed();
    console.log("Contract deployed to:", twi3Contract.address);
    console.log("Contract deployed by:", owner.address);

    await getCurrentContractBalence(twi3Contract);
    let tweetsCount = await twi3Contract.getTweetsCount();
    console.log("Previous Tweets count:", tweetsCount);
    let tweet = await twi3Contract.tweet('first web3 tweet');
    await tweet.wait();
    // tweet = await twi3Contract.tweet('testing timeout tweet');
    // await tweet.wait();
    tweet = await twi3Contract.connect(randomPerson).tweet('second web3 tweet');
    await tweet.wait();
    let totalTweets = await twi3Contract.getAllTweets();
    console.log("Total tweets:", totalTweets);
    tweetsCount = await twi3Contract.getTweetsCount();
    console.log("after Tweets count:", tweetsCount);
    await getCurrentContractBalence(twi3Contract);
};

const getCurrentContractBalence = async (twi3Contract) => {
    let contractBalance = await hre.ethers.provider.getBalance(
        twi3Contract.address
    );
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

}

const runMain = async () => {
    try {
        await mainTest();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
