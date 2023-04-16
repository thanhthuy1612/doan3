import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { checkAccount } from '~/api/account';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '~/api/login';

const initialState = {
    info: undefined,
};
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConnect.fulfilled, (state, action) => {});
    },
});
const accountReducer = account.reducer;

export const { setAccount } = account.actions;
export default accountReducer;
