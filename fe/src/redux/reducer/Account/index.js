import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { checkAccount } from '~/api/account';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '~/api/login';

const initialState = {
    info: undefined,
    wallet: {},
};
export const fetchTest = createAsyncThunk('wallet', async (wallet) => {
    const reconnect = async ({ provider }) => {
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        if (wallet !== {}) {
            const address = await signer.getAddress();
            const result = await checkAccount(address);
            console.log(result[0], '1');
            return result[0];
        } else {
            const sign = await signer.signMessage('Login');
            const result = await getToken(sign);
            console.log(result[0], '2');

            return result;
        }
    };
    try {
        let provider = window.ethereum;
        await provider.request({
            method: 'eth_requestAccounts',
        });

        provider.on('chainChanged', async function (networkId) {
            console.log(await reconnect({ provider }), '3');
            return await reconnect({ provider });
        });
        provider.on('accountsChanged', async function (accounts) {
            console.log(await reconnect({ provider }), '4');
            return await reconnect({ provider });
        });
        console.log(await reconnect({ provider }), '5');
        return await reconnect({ provider });
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTest.fulfilled, (state, action) => {
            console.log('123');
            console.log(fetchTest, action, 'payload');
            state.wallet = action.payload;
        });
    },
});
const accountReducer = account.reducer;

export const { setAccount, setWallet } = account.actions;
export default accountReducer;
