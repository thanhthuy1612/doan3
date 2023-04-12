import { createSlice } from '@reduxjs/toolkit';
import images from '~/assets/images';

const initialState = {
    info: {
        wallet: '',
        banner: images.default,
        ava: images.default,
    },
    walletAddress: '',
};

export const account = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.info = action.payload;
        },
        setWalletAddress: (state, action) => {
            state.walletAddress = action.payload;
        },
    },
});
const accountReducer = account.reducer;

export const { setAccount, setWalletAddress } = account.actions;
export default accountReducer;
