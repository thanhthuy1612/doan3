import { post } from '~/utils/api';

const { url } = require('./url');

const path = url.login;

export const getToken = async (sign) => {
    try {
        const res = await post(path, { sign: sign });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
