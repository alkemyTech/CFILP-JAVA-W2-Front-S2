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

    updateAccount: async (id, account) => {
        try {
            const { data } = await walletApi.put(`/cuentas/actualizar/${id}`, account);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error updating account');
        }
    },

    deleteAccount: async (accountId) => {
        try {
            await walletApi.patch(`/cuentas/eliminar/${accountId}`);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error deleting account');
        }
    },

    addCardToAccount: async (accountId, newCard) => {
        try {
            const { data } = await walletApi.post(`/tarjetas/crear/${accountId}`, newCard);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error adding card to account');
        }
    }

};
