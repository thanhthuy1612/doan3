import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import { abi } from '~/redux/reducer/Account/abi';
import { addressContract } from '~/redux/reducer/Account/addressContract';

const { post, get } = require('~/utils/api');
const { url } = require('./url');

const path = url.picture;
const client = create('http://14.225.254.58/api/v0');
const uploadToIPFS = async (inputs = {}) => {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const data = JSON.stringify({ ...inputs, time: date });
    try {
        const added = await client.add(data);
        const url = `https://ipfs.io/ipfs/${added.path}`;
        return url;
    } catch (error) {
        console.log('Error uploading file: ', error);
    }
};

export const postPicture = async (id, option = {}) => {
    try {
        const url = await uploadToIPFS(option);
        let provider = window.ethereum;
        await provider.request({
            method: 'eth_requestAccounts',
        });
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(addressContract, abi, web3Provider);
        const erc721 = contract.connect(signer);
        const price = ethers.utils.parseUnits(option.price, 'ether');
        let listingPrice = await contract.getListingPrice();
        listingPrice = listingPrice.toString();
        let transaction = await erc721.createToken(url, price, { value: listingPrice });
        await transaction.wait();
        const res = await post(path, { url: url, account: id });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const getItem = async (url) => {
    try {
        const res = await get(url, { params: {} });
        return res;
    } catch (err) {
        console.log(err);
    }
};
