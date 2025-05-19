import { useState } from "react";
import { AccountsTable } from "../components/AccountsTable";
import { EditAccountModal } from "../components/EditAccountModal";

export const Accounts = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    // Ejemplo de usuarios
    const users = [
        {
            name: "Neil Sims",
            email: "neil.sims@flowbite.com",
            position: "React Developer",
            status: "Online",
            img: "/docs/images/people/profile-picture-1.jpg"
        },
        // ...otros usuarios
    ];

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
            <AccountsTable users={users} onEdit={handleEditUser} />
            <EditAccountModal show={showModal} user={selectedUser} onClose={handleCloseModal} />
        </div>

    );
};