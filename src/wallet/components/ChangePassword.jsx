// src/wallet/components/ChangePasswordForm.jsx
import React from 'react';
import { FaLock, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

export const ChangePasswordForm = ({ passwordFields, handlePasswordInputChange, handleSubmitPassword, passwordMessage }) => {
    return (
        <form onSubmit={handleSubmitPassword} className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-3 mb-4 flex items-center gap-2">
                <FaLock className="text-yellow-400" />
                Cambiar Contraseña
            </h3>
            {/* Campo Contraseña Actual */}
            <div>
                <label htmlFor="currentPassword" className="block text-lg font-medium mb-2 text-gray-300">
                    Contraseña Actual
                </label>
                <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordFields.currentPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    placeholder="Tu contraseña actual"
                    required
                />
            </div>

            {/* Campo Nueva Contraseña */}
            <div>
                <label htmlFor="newPassword" className="block text-lg font-medium mb-2 text-gray-300">
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordFields.newPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    placeholder="Mínimo 6 caracteres"
                    required
                />
            </div>

            {/* Campo Confirmar Nueva Contraseña */}
            <div>
                <label htmlFor="confirmNewPassword" className="block text-lg font-medium mb-2 text-gray-300">
                    Confirmar Nueva Contraseña
                </label>
                <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={passwordFields.confirmNewPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    placeholder="Confirma tu nueva contraseña"
                    required
                />
            </div>

            {/* Mensaje de éxito/error de contraseña */}
            {passwordMessage && (
                <div className={`mt-4 p-3 rounded-lg text-center font-medium flex items-center justify-center gap-2 ${passwordMessage.includes('éxito') ? 'bg-green-600' : 'bg-red-600'}`}>
                    {passwordMessage.includes('éxito') ? <FaCheckCircle /> : <FaExclamationCircle />}
                    <span>{passwordMessage}</span>
                </div>
            )}

            {/* Botón Cambiar Contraseña */}
            <button
                type="submit"
                className="w-full bg-[#395C6B] hover:bg-[#2c4b57] text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center justify-center gap-2 mt-8"
            >
                <FaLock />
                Actualizar Contraseña
            </button>
        </form>
    );
};