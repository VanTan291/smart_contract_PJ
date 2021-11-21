async function main() {
  const CreateNFT = await ethers.getContractFactory("MyToken");
  const result = CreateNFT.deploy("Huy Nguyen Test", "HNT2");

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
