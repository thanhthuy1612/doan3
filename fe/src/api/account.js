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
        if (option.ava !== null) {
            const inputAva = new FormData();
            inputAva.append('ava', option.ava);
            var resAva = await update(`${path}/ava/${id}`, inputAva);
        }
        if (option.banner !== null) {
            const inputBanner = new FormData();
            inputBanner.append('banner', option.banner);
            var resBanner = await update(`${path}/banner/${id}`, inputBanner);
        }
        delete option.ava;
        delete option.banner;
        if (option.username || option.bio || option.email) {
            var res = await update(`${path}/${id}`, { ...option });
        }
        return { res, resAva, resBanner };
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
