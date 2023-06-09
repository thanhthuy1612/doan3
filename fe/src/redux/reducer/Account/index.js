import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { checkAccount } from '~/api/account';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '~/api/login';
import { abi } from './abi';
import { addressContract } from './addressContract';
import { getItem } from '~/api/picture';

const initialState = {
    info: undefined,
    item: undefined,
    items: [],
    myNFT: [],
    itemsListed: [],
    itemsSeller: [],
    loading: false,
    cart: [],
    upComing: [],
    past: [],
};

const getERC = async () => {
    let provider = window.ethereum;
    await provider.request({
        method: 'eth_requestAccounts',
    });
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(addressContract, abi, web3Provider);
    const erc721 = contract.connect(signer);
    return { contract, erc721 };
};

const getDate = (time) => {
    let yyyy = time.getFullYear();
    let mm = time.getMonth() + 1; // Months start at 0!
    let dd = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return dd + '-' + mm + '-' + yyyy + ' ' + hours + ':' + minutes;
};

const getItems = async (data, contract) => {
    const items = await Promise.all(
        data.map(async (i) => {
            let tokenUri = await contract.tokenURI(i.tokenId);
            const meta = await getItem(tokenUri);
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let date = new Date(i.time.toNumber() * 1000);
            let time = getDate(date);
            let item = {
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                price,
                time,
                meta,
            };
            return item;
        }),
    );
    return items;
};

export const createMarketSale = createAsyncThunk('createMarketSale', async (item, thunkAPI) => {
    const { erc721 } = await getERC();
    const price = ethers.utils.parseUnits(item.price, 'ether');
    let result = await erc721.createMarketSale(item.tokenId, { value: price });
    thunkAPI.dispatch(setLoading(true));
    await result.wait();
});

export const resellToken = createAsyncThunk('createMarketSale', async (item, thunkAPI) => {
    const { contract, erc721 } = await getERC();
    const price = ethers.utils.parseUnits(item.price, 'ether');
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    let result = await erc721.resellToken(item.tokenId, price, { value: listingPrice });
    thunkAPI.dispatch(setLoading(true));
    await result.wait();
});

export const fetchMarketItem = createAsyncThunk('fetchMarketItem', async (item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchMarketItems();
    const items = await getItems(data, contract);
    thunkAPI.dispatch(setLoading(false));
    return items;
});

export const fetchMarketItemsUpComing = createAsyncThunk('fetchMarketItemsUpComing', async (item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchMarketItemsUpComing();
    const items = await getItems(data, contract);
    thunkAPI.dispatch(setLoading(false));
    return items;
});

export const fetchMarketItemsPast = createAsyncThunk('fetchMarketItemsPast', async (item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchMarketItemsPast();
    const items = await getItems(data, contract);
    thunkAPI.dispatch(setLoading(false));
    return items;
});

export const fetchMyNFTs = createAsyncThunk('fetchMyNFTs', async (item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchMyNFTs();
    const items = await getItems(data, contract);
    thunkAPI.dispatch(setLoading(false));
    return items;
});

export const fetchItemsListed = createAsyncThunk('fetchItemsListed', async (item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchItemsListed();
    const items = await getItems(data, contract);
    thunkAPI.dispatch(setLoading(false));
    return items;
});

export const fetchItemsSeller = createAsyncThunk('fetchItemsSeller', async (address) => {
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchItemsSeller(address);
    const items = await getItems(data, contract);
    return items;
});

export const fetchConnect = createAsyncThunk('wallet', async (reload, thunkAPI) => {
    const reconnect = async ({ provider }) => {
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        if (reload) {
            const address = await signer.getAddress();
            const result = await checkAccount(address);
            thunkAPI.dispatch(setAccount(result[0]));
        } else {
            if (thunkAPI.getState().account.info !== undefined) {
                const address = await signer.getAddress();
                const result = await checkAccount(address);
                thunkAPI.dispatch(setAccount(result[0]));
            } else {
                const sign = await signer.signMessage('Login');
                const result = await getToken(sign);
                thunkAPI.dispatch(setAccount(result));
            }
        }
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
        setItem: (state, action) => {
            state.item = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConnect.fulfilled, (state, action) => {});
        builder.addCase(fetchMarketItem.fulfilled, (state, actions) => {
            state.items = actions.payload;
        });
        builder.addCase(fetchMyNFTs.fulfilled, (state, actions) => {
            state.myNFT = actions.payload;
        });
        builder.addCase(fetchItemsListed.fulfilled, (state, actions) => {
            state.itemsListed = actions.payload;
        });
        builder.addCase(fetchItemsSeller.fulfilled, (state, actions) => {
            state.itemsSeller = actions.payload;
        });
        builder.addCase(fetchMarketItemsUpComing.fulfilled, (state, actions) => {
            state.upComing = actions.payload;
        });
        builder.addCase(fetchMarketItemsPast.fulfilled, (state, actions) => {
            state.past = actions.payload;
        });
        builder.addCase(createMarketSale.fulfilled || resellToken.fulfilled, (state, actions) => {
            state.loading = false;
        });
    },
});
const accountReducer = account.reducer;

export const { setAccount, setItem, setLoading } = account.actions;
export default accountReducer;
