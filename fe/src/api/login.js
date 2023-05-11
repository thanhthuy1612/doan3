const { postLogin } = require('~/utils/api');
const { url } = require('./url');

const path = url.login;

export const getToken = async (sign) => {
    try {
        const res = await postLogin(path, { sign: sign });
        localStorage.setItem('token', res.data.accessToken);
        return { ...res.data.data };
    } catch (err) {
        console.log(err);
    }
};
