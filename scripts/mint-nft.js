require("dotenv").config()

const {API_URL, PRIVATE_KEY, PUBLIC_KEY} = process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const ApiUrls = {
    'rinkeby' : `https://polygon-mumbai.g.alchemy.com/v2/${process.env.INFURA_API_KEY}`,
}

const web3 = createAlchemyWeb3(ApiUrls['rinkeby']);


const contract = require("../artifacts/contracts/CreateNFT.sol/MyTokenV2.json");
const contractAddress = "0xF8670FC2ac8192CC0D58AD31D3fA136FE228bF8a";
const toAddress = "0x45748C66760e37125cc8A8a752D9864cbba90a59";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
async function mintNFT(tokenURI) {
    // nftContract.methods.CreateToken(toAddress, tokenURI).send({from: PUBLIC_KEY}, function (err, tokenAddress) {
    //     if (err) {
    //         console.log('An error occured: ', err);
    //         return;
    //     }
    //     console.log(tokenAddress);
    // });

    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');
    const tx = {
      from: PUBLIC_KEY, // our MetaMask public key
      to: contractAddress, // the smart contract address we want to interact with
      nonce: nonce, // nonce with the no of transactions from our account
      gas: 200000, // fee estimate to complete the transaction
      data: nftContract.methods
        .CreateToken(toAddress, tokenURI)
        .encodeABI(), // call the CreateToken function from our createNFT.sol file and pass the account that should receive the minted NFT.
    };
  
    const signPromise = web3.eth.accounts.signTransaction(
      tx,
      PRIVATE_KEY
    );
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of our transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of our transaction!"
              );
            } else {
              console.log(
                "Something went wrong when submitting our transaction:",
                err
              );
            }
          }
        );
      })
      .catch((err) => {
        console.log(" Promise failed:", err);
      });
}

async function getDomain() {
    nftContract.methods.NewTest().call({}, function (response) {
        console.log(response);
    });
}
mintNFT(6);
getDomain();