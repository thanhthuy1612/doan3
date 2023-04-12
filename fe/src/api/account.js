import { get, update } from '~/utils/api';
import { url } from './url';

const path = url.account;
export const getAccount = async (id) => {
    try {
        const res = await get(`${path}/${id}`, { params: {} });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const checkAccount = async (account) => {
    try {
        const res = await get(`${path}/search/${account}`, { params: {} });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const updateAccount = async (id, option = {}) => {
    try {
        const res = await update(`${path}/${id}`, { ...option });
        return res;
    } catch (err) {
        console.log(err);
    }
};
