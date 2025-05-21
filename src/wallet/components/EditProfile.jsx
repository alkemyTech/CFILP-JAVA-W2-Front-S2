// src/wallet/pages/EditProfilePage.jsx
import React, { useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';

// Importa los nuevos componentes
import { EditProfileForm } from './EditProfileForm';
import { ChangePasswordForm } from './ChangePassword';

const EditProfile = () => {
    // Estado para los datos personales del usuario
    const [userData, setUserData] = useState({
        name: 'Manuel',
        lastName: 'García',
        email: 'manuel.garcia@example.com'
    });

    const [formValues, setFormValues] = useState(userData);
    const [message, setMessage] = useState(''); // Mensaje para el formulario de perfil

    // Estado para el cambio de contraseña
    const [passwordFields, setPasswordFields] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [passwordMessage, setPasswordMessage] = useState(''); // Mensaje para el formulario de contraseña

    // Manejadores de cambios para el formulario de perfil
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
        setMessage(''); // Limpiar mensajes al cambiar algo
    };

    // Manejador de envío para el formulario de perfil
    const handleSubmitProfile = (e) => {
        e.preventDefault();
        console.log('Datos de perfil actualizados:', formValues);
        setMessage('¡Perfil actualizado con éxito!');
        // En un entorno real: await updateProfile(formValues);
        setTimeout(() => setMessage(''), 3000);
    };

    // Manejadores de cambios para el formulario de contraseña
    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordFields({
            ...passwordFields,
            [name]: value
        });
        setPasswordMessage(''); // Limpiar mensajes al cambiar algo
    };

    // Manejador de envío para el formulario de contraseña
    const handleSubmitPassword = (e) => {
        e.preventDefault();

        const { currentPassword, newPassword, confirmNewPassword } = passwordFields;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setPasswordMessage('Todos los campos de contraseña son obligatorios.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setPasswordMessage('La nueva contraseña y su confirmación no coinciden.');
            return;
        }

        if (newPassword.length < 6) {
            setPasswordMessage('La nueva contraseña debe tener al menos 6 caracteres.');
            return;
        }

        console.log('Contraseña cambiada. Contraseña actual:', currentPassword, 'Nueva:', newPassword);
        setPasswordMessage('¡Contraseña cambiada con éxito!');
        // En un entorno real: await changePassword({ currentPassword, newPassword });
        setPasswordFields({ // Limpiar campos después de un cambio exitoso
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
        setTimeout(() => setPasswordMessage(''), 3000);
    };

    return (
        <div className="flex justify-center items-start min-h-[calc(100vh-80px)] py-8 px-4">
            <div className="bg-[#2D3748] text-white p-8 rounded-xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row gap-8"> {/* Flex para columnas, md:flex-row para que sean columnas en desktop */}
                {/* Columna Izquierda: Datos Personales */}
                <div className="w-full md:w-1/2"> {/* Ocupa la mitad en desktop, completo en mobile */}
                    <EditProfileForm
                        formValues={formValues}
                        handleInputChange={handleInputChange}
                        handleSubmitProfile={handleSubmitProfile}
                        message={message}
                    />
                </div>

                {/* Columna Derecha: Cambio de Contraseña */}
                <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-700 md:pl-8 pt-8 md:pt-0"> {/* Borde separador y padding */}
                    <ChangePasswordForm
                        passwordFields={passwordFields}
                        handlePasswordInputChange={handlePasswordInputChange}
                        handleSubmitPassword={handleSubmitPassword}
                        passwordMessage={passwordMessage}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditProfile;