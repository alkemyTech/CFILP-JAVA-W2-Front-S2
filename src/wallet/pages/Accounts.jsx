import { useEffect, useState } from "react";
import { cuentasService } from "../../services/cuentasService";
import { AccountsTable } from "../components/AccountsTable";
import { EditAccountModal } from "../components/EditAccountModal";
import { useAuthStore } from "../../hooks";


const initialAccounts = [];


export const Accounts = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [cuentas, setcuentas] = useState(initialAccounts);

    const { user } = useAuthStore();


    useEffect(() => {
        // Aquí podrías hacer una llamada a la API para obtener los usuarios
        // setUsers(fetchedUsers);
        const fetchAccounts = async () => {
            try {
                const data = await cuentasService.getAllActiveAccountsOfActiveUser(user.id);
                setcuentas(data);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        fetchAccounts();
    }, [user.id]);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h2 className="text-4xl mb-6">Cuentas</h2>
            {/* ...barra de acciones y búsqueda aquí... */}
            <AccountsTable accounts={cuentas} onEdit={handleEditUser} />
            <EditAccountModal show={showModal} user={selectedUser} onClose={handleCloseModal} />
        </div>

    );
};