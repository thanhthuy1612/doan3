const { post } = require('~/utils/api');
const { url } = require('./url');

const path = url.login;

export const getToken = async (sign) => {
    try {
        const res = await post(path, { sign: sign });
        localStorage.setItem('token', res.data.tokens.accessToken);
        return { ...res.data.data };
    } catch (err) {
        console.log(err);
    }
};
