import axios from 'axios';
import { baseURL } from '~/api/url';

const request = axios.create({ baseURL: baseURL });
const requestIPFS = axios.create({ baseURL: baseURL });

request.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers['x-access-token'] = accessToken;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const getIPFS = async (path, options = {}) => {
    const response = await requestIPFS.get(path, options);
    return response.data;
};

export const update = async (path, options = {}) => {
    const response = await request.put(path, options);
    return response;
};

export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response;
};

export const del = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response;
};

export { request, requestIPFS };
