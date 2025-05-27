import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks";
import { AccountsTable, EditAccountModal } from "../components";
import { useAccountStore } from "../hooks/useAccountStore";
import Swal from "sweetalert2";

export const Accounts = () => {
    const [showModal, setShowModal] = useState(false);

    const {
        accounts,
        isLoading,
        startLoadingUserAccounts,
        activeAccount,
        selectActiveAccount,
        deleteActiveAccount
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

    const handleNewAccount = () => {
        selectActiveAccount(null);
        setShowModal(true);
    };

    const handleDeleteAccount = async (account) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la cuenta y sus tarjetas asociadas. ¿Deseas continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });


        if (result.isConfirmed) {
            await deleteActiveAccount(account.idCuenta);
            Swal.fire('Eliminada', 'La cuenta ha sido eliminada.', 'success');
        }
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
            <AccountsTable
                accounts={accounts}
                onEdit={handleEditAccount}
                onDelete={handleDeleteAccount} />
            <EditAccountModal
                show={showModal}
                account={activeAccount}
                onClose={handleCloseModal}
                userId={user.id} />
        </div>

    );
};