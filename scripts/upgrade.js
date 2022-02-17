const { ethers, upgrades } = require('hardhat');
async function main() {
  const MyTokenV2 = await ethers.getContractFactory("MyTokenV2");
  console.log('Upgrading...');
  await upgrades.upgradeProxy('0xF8670FC2ac8192CC0D58AD31D3fA136FE228bF8a', MyTokenV2);
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