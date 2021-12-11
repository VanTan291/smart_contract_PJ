const { ethers, upgrades } = require('hardhat');
async function main() {
  const MyTokenV2 = await ethers.getContractFactory("MyTokenV2");
  console.log('Upgrading...');
  await upgrades.upgradeProxy('0x7229F945C5392A844A8D22cd5300ACDd092Ac11A', MyTokenV2);
  console.log('Upgraded');
}

main()
  .then(response => {
    process.exit(0)
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  }
)