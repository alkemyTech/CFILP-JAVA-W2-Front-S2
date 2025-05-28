import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accounts: [],        // Todas las cuentas del usuario
    activeAccount: null, // Cuenta seleccionada (para editar/ver)
    isLoading: false,
    error: null,
};

export const AccountSlice = createSlice({
    name: 'Account',
    initialState,
    reducers: {
        startLoadingAccounts: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setAccounts: (state, action) => {
            state.accounts = action.payload;
            state.isLoading = false;
        },
        setActiveAccount: (state, action) => {
            state.activeAccount = action.payload;
        },
        addAccount: (state, action) => {
            state.accounts.push(action.payload);
        },
        updateAccount: (state, action) => {
            state.accounts = state.accounts.map(acc =>
                acc.id === action.payload.id ? action.payload : acc
            );
            // Si la cuenta editada es la activa, actualízala también
            if (state.activeAccount && state.activeAccount.id === action.payload.id) {
                state.activeAccount = action.payload;
            }
        },
        deleteAccount: (state, action) => {
            // Soft-delete: marca la cuenta como inactiva
            state.accounts = state.accounts.filter(acc => acc.idCuenta !== action.payload);
            // Si la cuenta eliminada es la activa, deselecciónala
            if (state.activeAccount && state.activeAccount.idCuenta === action.payload) {
                state.activeAccount = null;
            }
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Opcional: para manejar tarjetas asociadas a una cuenta
        addCardToAccount: (state, action) => {
            const { accountId, card } = action.payload;
            state.accounts = state.accounts.map(acc =>
                acc.idCuenta === accountId
                    ? { ...acc, tarjetas: [...(acc.tarjetas || []), card] }
                    : acc
            );
        },
        removeCardFromAccount: (state, action) => {
            const { accountId, cardId } = action.payload;
            state.accounts = state.accounts.map(acc => {
                if (acc.id === accountId) {
                    return {
                        ...acc,
                        // *** CAMBIA ESTO: acc.tarjetas ***
                        // *** POR ESTO: acc.tarjetasDto ***
                        tarjetasDto: (acc.tarjetasDto || []).filter(card => card.id !== cardId)
                    };
                }
                return acc;
            });
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    startLoadingAccounts,
    setAccounts,
    setActiveAccount,
    addAccount,
    updateAccount,
    deleteAccount,
    setError,
    addCardToAccount,
    removeCardFromAccount,
} = AccountSlice.actions;