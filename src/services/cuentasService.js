import { walletApi } from "../api";

export const cuentasService = {

    getAllActiveAccountsOfActiveUser: async (id) => {
        try {
            const { data } = await walletApi.get(`/cuentas/usuario/${id}/activas`);
            return Array.isArray(data) ? data : [];
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error fetching accounts');
        }
    },

    createNewAccount: async (id, TipoMoneda) => {
        try {
            const { data } = await walletApi.post(`/cuentas/crear/${id}?moneda=${TipoMoneda}`);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error creating account');
        }
    },

};
