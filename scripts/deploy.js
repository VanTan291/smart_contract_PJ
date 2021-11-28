async function main() {
  const CreateNFT = await ethers.getContractFactory("MyToken");
  console.log('Deploying...');
  const box = await upgrades.deployProxy(Box, [42], { initializer: 'store' });
  await box.deployed();
  console.log('Deployed to:', box.address);
  return box.address;
}

main()
  .then(response => {
    console.log('address', response.address);
    process.exit(0)
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  }
)
