import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks";
import { AccountsTable, EditAccountModal } from "../components";
import { useAccountStore } from "../hooks/useAccountStore";

export const Accounts = () => {
    const [showModal, setShowModal] = useState(false);

    const {
        accounts,
        isLoading,
        startLoadingUserAccounts,
        activeAccount,
        selectActiveAccount
    } = useAccountStore();

    const { user } = useAuthStore();


    useEffect(() => {
        startLoadingUserAccounts(user.id);
    }, [user.id]);

    const handleEditAccount = (account) => {
        selectActiveAccount(account);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        selectActiveAccount(null);
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className="text-4xl mb-6">Cuentas</h2>
            {/* ...barra de acciones y búsqueda aquí... */}
            {isLoading && <p>Cargando cuentas...</p>}
            <AccountsTable accounts={accounts} onEdit={handleEditAccount} />
            <EditAccountModal show={showModal} account={activeAccount} onClose={handleCloseModal} />
        </div>

    );
};