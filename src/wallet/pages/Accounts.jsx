import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks";
import { cuentasService } from "../../services/cuentasService";
import { AccountsTable, EditAccountModal } from "../components";

const initialAccounts = [];

export const Accounts = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [cuentas, setCuentas] = useState(initialAccounts);

    const { user } = useAuthStore();


    useEffect(() => {
        // Aquí podrías hacer una llamada a la API para obtener los usuarios
        // setUsers(fetchedUsers);
        const fetchAccounts = async () => {
            try {
                const data = await cuentasService.getAllActiveAccountsOfActiveUser(user.id);
                setCuentas(data);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        fetchAccounts();
    }, [user.id]);

    const handleEditAccount = (account) => {
        setSelectedAccount(account);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAccount(null);
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className="text-4xl mb-6">Cuentas</h2>
            {/* ...barra de acciones y búsqueda aquí... */}
            <AccountsTable accounts={cuentas} onEdit={handleEditAccount} />
            <EditAccountModal show={showModal} account={selectedAccount} onClose={handleCloseModal} />
        </div>

    );
};