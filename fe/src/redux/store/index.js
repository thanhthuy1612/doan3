import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../reducer/Account';

export const store = configureStore({
    reducer: {
        account: accountReducer,
    },
});
