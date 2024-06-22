async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Staking = await ethers.getContractFactory("Staking");
    const staking = await Staking.deploy();
    console.log("Staking contract deployed to:", staking.address);
  
    const fs = require('fs');
    const contractsDir = __dirname + '/../src/contracts';
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + '/contract-address.json',
      JSON.stringify({ Staking: staking.address }, undefined, 2)
    );
  
    const StakingArtifact = await artifacts.readArtifact("Staking");
  
    fs.writeFileSync(
      contractsDir + '/Staking.json',
      JSON.stringify(StakingArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  