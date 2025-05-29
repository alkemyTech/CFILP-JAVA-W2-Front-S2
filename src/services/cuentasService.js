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

    softDeleteAccount: async (accountId) => {
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
    },

    deleteCardFromAccount: async (cardId) => {
        try {
            await walletApi.patch(`/tarjetas/eliminar/${parseInt(cardId)}`);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error deleting card from account');
        }
    },

    addTransactionToCard: async (tarjetaId, transferencia) => {
        try {
            const { data } = await walletApi.post(`/transferencias/tarjeta/${tarjetaId}`, transferencia);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error adding transaction to card');
        }
    }
};
