import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_ALKYWALLET } = getEnvVariables();

const walletApi = axios.create({
    baseURL: `${VITE_API_ALKYWALLET}`,
});


walletApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${token}`,
            };
        }
        return config;
    }
);

export default walletApi;