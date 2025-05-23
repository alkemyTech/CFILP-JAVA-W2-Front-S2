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

};
