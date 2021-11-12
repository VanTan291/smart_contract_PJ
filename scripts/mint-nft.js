require("dotenv").config()

const {API_URL, PRIVATE_KEY, PUBLIC_KEY} = process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")

const web3 = createAlchemyWeb3(API_URL)


const contract = require("../artifacts/contracts/CreateNFT.sol/MyToken.json");
const contractAddress = "0x86a940a5f9639ee731981b1372ECf0ABe8F15480";
const toAddress = "0x23767b6B84D3B2664042FdA8c635A032c8dA3A27";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');
    const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.CreateToken(toAddress, tokenURI).encodeABI()
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