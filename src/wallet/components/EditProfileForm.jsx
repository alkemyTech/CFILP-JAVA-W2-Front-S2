
import React from 'react';
import { FaSave } from 'react-icons/fa';

export const EditProfileForm = ({ formValues, handleInputChange, handleSubmitProfile, message }) => {
    return (
        <form onSubmit={handleSubmitProfile} className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-3 mb-4">Datos Personales</h3>
            {/* Campo Nombre */}
            <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2 text-gray-300">
                    Nombre
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    placeholder="Tu nombre"
                    required
                />
            </div>

            {/* Campo Apellido */}
            <div>
                <label htmlFor="lastName" className="block text-lg font-medium mb-2 text-gray-300">
                    Apellido
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    placeholder="Tu apellido"
                    required
                />
            </div>

            {/* Campo Email (generalmente no editable o con proceso aparte) */}
            <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-300">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 cursor-not-allowed text-gray-400"
                    placeholder="Tu email"
                    disabled
                />
                <p className="text-sm text-gray-400 mt-1">
                    El email no puede ser cambiado directamente desde aquí.
                </p>
            </div>

            {/* Botón Guardar Cambios del Perfil */}
            <button
                type="submit"
                className="w-full bg-[linear-gradient(to_right,_#FF9A9E,_#F6416C)] hover:opacity-90 text-[#2D3748] font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center justify-center gap-2 mt-8"
            >
                <FaSave />
                Guardar Cambios
            </button>

            {message && (
                <div className={`mt-4 p-3 rounded-lg text-center font-medium ${message.includes('éxito') ? 'bg-green-600' : 'bg-red-600'}`}>
                    {message}
                </div>
            )}
        </form>
    );
};