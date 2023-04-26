import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { checkAccount } from '~/api/account';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '~/api/login';
import { abi } from './abi';
import { addressContract } from './addressContract';
import axios from 'axios';

const initialState = {
    info: undefined,
    erc721: undefined,
    items: undefined,
};
export const fetchMarketItem = createAsyncThunk('fetchMarketItem', async () => {
    let provider = window.ethereum;
    await provider.request({
        method: 'eth_requestAccounts',
    });
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(addressContract, abi, web3Provider);
    const erc721 = contract.connect(signer);
    const data = await erc721.fetchMarketItems();
    const items = await Promise.all(
        data.map(async (i) => {
            let tokenUri = await contract.tokenURI(i.tokenId);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                price,
                meta,
            };
            return item;
        }),
    );
    return items;
});

export const fetchConnect = createAsyncThunk('wallet', async (wallet, thunkAPI) => {
    const reconnect = async ({ provider }) => {
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        if (wallet !== undefined) {
            const address = await signer.getAddress();
            const result = await checkAccount(address);
            thunkAPI.dispatch(setAccount(result[0]));
        } else {
            const sign = await signer.signMessage('Login');
            const result = await getToken(sign);
            thunkAPI.dispatch(setAccount(result));
        }
        const contract = new ethers.Contract(addressContract, abi, web3Provider);
        const erc721 = contract.connect(signer);
        const data = await erc721.fetchMarketItems();
        const items = await Promise.all(
            data.map(async (i) => {
                let tokenUri = await contract.tokenURI(i.tokenId);
                // let meta = await getItem(tokenUri);
                let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
                let item = {
                    tokenId: i.tokenId.toNumber(),
                    seller: i.seller,
                    owner: i.owner,
                    price,
                    tokenUri,
                };
                return item;
            }),
        );
        thunkAPI.dispatch(setItems(items));
    };
    try {
        let provider = window.ethereum;
        await provider.request({
            method: 'eth_requestAccounts',
        });

        provider.on('chainChanged', async function () {
            await reconnect({ provider });
        });
        provider.on('accountsChanged', async function () {
            await reconnect({ provider });
        });
        await reconnect({ provider });
    } catch (err) {
        console.log(err);
    }
});

export const account = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.info = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConnect.fulfilled, (state, action) => {});
        builder.addCase(fetchMarketItem.fulfilled, (state, actions) => {
            state.items = actions.payload;
        });
    },
});
const accountReducer = account.reducer;

export const { setAccount, setItems } = account.actions;
export default accountReducer;
