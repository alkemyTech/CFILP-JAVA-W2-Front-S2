import { createSlice } from '@reduxjs/toolkit';
import { add } from 'date-fns';

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

        addCardToAccount: (state, action) => {
            const { accountId, card } = action.payload;
            console.log("Añadiendo tarjeta:", card, "a cuenta:", accountId);
            state.accounts = state.accounts.map(acc =>
                acc.idCuenta === accountId
                    ? { ...acc, tarjetasDto: [...(acc.tarjetasDto || []), card] }
                    : acc
            );
        },
        removeCardFromAccount: (state, action) => {
            const cardId = action.payload;

            // Actualizar todas las cuentas que puedan contener la tarjeta
            state.accounts = state.accounts.map(account => {
                // Si la cuenta tiene tarjetas, filtrar la que se eliminó
                if (account.tarjetasDto && account.tarjetasDto.length > 0) {
                    return {
                        ...account,
                        tarjetasDto: account.tarjetasDto.filter(card => card.id !== cardId)
                    };
                }
                return account;
            });
        },

        addTransactionToCard: (state, action) => {
            const { tarjetaId, transferencia } = action.payload;

            // Actualizar todas las cuentas que puedan contener la tarjeta
            state.accounts = state.accounts.map(account => {
                // Si la cuenta tiene tarjetas, buscar la tarjeta específica
                if (account.tarjetasDto && account.tarjetasDto.length > 0) {
                    return {
                        ...account,
                        tarjetasDto: account.tarjetasDto.map(card =>
                            card.id === tarjetaId
                                ? { ...card, transferencias: [...(card.transferencias || []), transferencia] }
                                : card
                        )
                    };
                }
                return account;
            });
        }
    }
});



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
    addTransactionToCard
} = AccountSlice.actions;