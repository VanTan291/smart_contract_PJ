async function main() {
  const CreateNFT = await ethers.getContractFactory("MyToken");
  const result = CreateNFT.deploy("Huy Nguyen coint", "HNC");

  return result;
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
