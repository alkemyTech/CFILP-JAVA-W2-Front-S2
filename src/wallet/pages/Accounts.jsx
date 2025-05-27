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
    }, [user.id, accounts]);

    const handleEditAccount = (account) => {
        selectActiveAccount(account);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        selectActiveAccount(null);
    };

    const handleNewAccount = () => {
        selectActiveAccount(null);
        setShowModal(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className="text-4xl mb-6">Cuentas</h2>
            {/* Botón para agregar cuenta */}
            <div className="mb-4 pr-3 flex justify-end">
                <button
                    type="button"
                    onClick={handleNewAccount}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#3A86FF] to-[#4361EE] text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva cuenta
                </button>
            </div>
            {/* ...barra de acciones y búsqueda aquí... */}
            {isLoading && <p>Cargando cuentas...</p>}
            <AccountsTable accounts={accounts} onEdit={handleEditAccount} />
            <EditAccountModal
                show={showModal}
                account={activeAccount}
                onClose={handleCloseModal}
                userId={user.id}
            />
        </div>

    );
};