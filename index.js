const { ethers } = require("ethers");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const INFURA_ID = process.env.INFURA_ID;
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",

    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const address = process.env.ADDRESS;
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
    const block = await provider.getBlockNumber();

    const transferEvents = await contract.queryFilter("Transfer", block-5, block);
    console.log(transferEvents);
}

main();