async function main() {
  const CreateNFT = await ethers.getContractFactory("MyToken");
  console.log('Deploying...');
  const createToken = await upgrades.deployProxy(CreateNFT, ["Test upgrades coint", "TUC"], { initializer: 'initialize' });
  await createToken.deployed();
  console.log('Deployed to:', createToken.address);
  return createToken;
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
