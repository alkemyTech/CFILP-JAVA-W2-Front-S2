import { useDispatch, useSelector } from "react-redux";
import { cuentasService } from "../../services/cuentasService";
import {
    addAccount,
    deleteAccount,
    setAccounts,
    setActiveAccount,
    setError,
    startLoadingAccounts
} from "../../store/wallet/AccountSlice";
import { data } from "react-router";

export const useAccountStore = () => {
    const { accounts, activeAccount, isLoading, error } = useSelector((state) => state.account);

    const dispatch = useDispatch();

    // Function to set the loading state
    const startLoadingUserAccounts = async (userId) => {
        dispatch(startLoadingAccounts());
        try {
            const data = await cuentasService.getAllActiveAccountsOfActiveUser(userId);
            dispatch(setAccounts(data));
        } catch (err) {
            dispatch(setError(err.message));
        }
    };


    // Function to set the active account
    const selectActiveAccount = (account) => {
        dispatch(setActiveAccount(account));
    };

    // Function to add a new account
    const addAccountImpl = (userId, TipoMoneda) => {

        try {
            const data = cuentasService.createNewAccount(userId, TipoMoneda);
            dispatch(addAccount(data));
        } catch (error) {
            dispatch(setError(error.message));
        }

    };

    // Function to update an existing account
    const updateAccount = (account) => {
        dispatch(updateAccount(account));
    };

    // Function to delete an account
    const deleteActiveAccount = (accountId) => {
        dispatch(deleteAccount(accountId));
    };

    return {
        //Properties
        accounts,
        activeAccount,
        isLoading,
        error,
        //Methods
        startLoadingUserAccounts,
        selectActiveAccount,
        addAccountImpl,
        updateAccount,
        deleteActiveAccount,
    };
}
