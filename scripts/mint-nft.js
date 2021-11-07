require("dotenv").config()

const {API_URL, PRIVATE_KEY, PUBLIC_KEY} = process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")

const web3 = createAlchemyWeb3(API_URL)


const contract = require("../artifacts/contracts/CreateNFT.sol/MyToken.json");
const contractAddress = "0x5E4d573F5917ED78e87cbAFA0bfC25CC2bd02657";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');
    const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.CreateToken(PUBLIC_KEY, tokenURI).encodeABI()
    };
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        );
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err

                        );
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err);
        });
}


mintNFT(1);