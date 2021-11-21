require("dotenv").config()

const {API_URL, PRIVATE_KEY, PUBLIC_KEY} = process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const ApiUrls = {
    'rinkeby' : `https://eth-rinkeby.alchemyapi.io/v2/${process.env.INFURA_API_KEY}`,
}

const web3 = createAlchemyWeb3(ApiUrls['rinkeby']);


const contract = require("../artifacts/contracts/CreateNFT.sol/MyToken.json");
const contractAddress = "0xC897048D732Fcc09815fb8423be98c54dBC81840";
const toAddress = "0x23767b6B84D3B2664042FdA8c635A032c8dA3A27";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
async function mintNFT(tokenURI) {
    nftContract.methods.CreateToken(toAddress, tokenURI).call({from: PUBLIC_KEY}, function (err, tokenAddress) {
        if (err) {
            console.log('An error occured: ', err);
            return;
        }
        console.log(tokenAddress);
    });
}


mintNFT(1);