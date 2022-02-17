require("dotenv").config()

const { URL_CREATE_WALLET } = process.env;
const Web3 = require('web3');

module.exports = async function createWallet() {
    const web3 = new Web3(URL_CREATE_WALLET);
    const account = await web3.eth.accounts.create();

    return account;
}