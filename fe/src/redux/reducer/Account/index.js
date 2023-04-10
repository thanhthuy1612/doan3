import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    info: {},
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
