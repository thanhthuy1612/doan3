import { get, post, update } from '~/utils/api';
import { url } from './url';

const path = url.account;
export const getAccount = async (id) => {
    try {
        const res = await get(`${path}/${id}`, { params: {} });
        return res;
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

export const postTest = async (id, body) => {
    try {
        const res = await post(`${path}/${id}`, body, { params: {} });
        return res;
    } catch (err) {
        console.log(err);
    }
};
