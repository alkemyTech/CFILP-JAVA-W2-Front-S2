import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_ALKYWALLET } = getEnvVariables();

const walletApi = axios.create({
    baseURL: `${VITE_API_ALKYWALLET}`,
});


walletApi.interceptors.request.use(
    config => {
        config.headers = {
            ...config.headers,
            'x-token': localStorage.getItem('token'),
        };
        return config;
    }
);

export default walletApi;