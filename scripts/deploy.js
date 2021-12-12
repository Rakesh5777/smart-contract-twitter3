const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const deloyerAddress = await deployer.getAddress();
    const deloyerBalance = await deployer.getBalance();

    console.log('Deploying contracts with account: ', deloyerAddress);
    console.log('Balance: ', deloyerBalance.toString());

    const token = await hre.ethers.getContractFactory('Twitter3');
    const portal = await token.deploy();
    await portal.deployed();

    console.log('twitter 3 address', portal.address);
};


const runMainDeploy = async () => {
    try {
        await main();
        process.exit(0);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

runMainDeploy();

// 0x3e95C7892FfE071b04F0ECeb9289C920D033062d twitter 3 - basic (1.0) address
// 0x3f7c905bFd2b40b28Bc32741a860D1169400B6d1 twitter 3 - with msg storage(2.0) address
// 0xE7874A6145b66988F06e8befB360E5Aa945cd970 my metamask address

