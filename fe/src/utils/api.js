import axios from 'axios';
import { baseURL } from '~/api/url';

const request = axios.create({ baseURL: baseURL });
export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const update = async (path, options = {}) => {
    const response = await request.put(path, options);
    return response;
};

export default request;
