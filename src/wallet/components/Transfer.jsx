import React, { useState } from 'react';
// Importamos íconos que intentan coincidir con tu estilo visual
// Probando con Ionicons (io5) que suelen tener un estilo más moderno y robusto
import {
    IoSwapHorizontalSharp, // Para la transferencia, una flecha de intercambio más robusta/angular
    IoArrowForward,        // Para el botón de enviar, una flecha más sencilla
    IoCheckmarkCircle,     // Para éxito, un check circular
    IoWarning              // Para error, un signo de advertencia
} from 'react-icons/io5'; // O podrías probar 'react-icons/md' si estos no te convencen

const Transfer = () => {
    // Estado para los valores del formulario de transferencia
    const [transferDetails, setTransferDetails] = useState({
        recipientType: 'cbuAlias',
        cbuAlias: '',
        amount: '',
        description: ''
    });
    const [message, setMessage] = useState(null); // Usamos null para indicar que no hay mensaje inicialmente
    const [isSending, setIsSending] = useState(false);

    // Simulación del saldo disponible del usuario
    const availableBalance = 15000.00;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMessage(null); // Limpiar mensajes al cambiar cualquier campo
        setTransferDetails({
            ...transferDetails,
            [name]: value
        });
    };

    const handleSubmitTransfer = async (e) => {
        e.preventDefault();
        setIsSending(true);

        const { cbuAlias, amount, description } = transferDetails;

        if (!cbuAlias.trim() || !amount || !description.trim()) {
            setMessage({ type: 'error', text: 'Todos los campos son obligatorios.' });
            setIsSending(false);
            return;
        }

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setMessage({ type: 'error', text: 'El monto debe ser un número positivo.' });
            setIsSending(false);
            return;
        }

        if (numericAmount > availableBalance) {
            setMessage({ type: 'error', text: `Saldo insuficiente. Tienes $${availableBalance.toFixed(2)} disponibles.` });
            setIsSending(false);
            return;
        }

        console.log('Realizando transferencia:', transferDetails);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            setMessage({ type: 'success', text: '¡Transferencia realizada con éxito!' });
            setTransferDetails({
                recipientType: 'cbuAlias',
                cbuAlias: '',
                amount: '',
                description: ''
            });

        } catch (error) {
            console.error('Error al realizar la transferencia:', error);
            setMessage({ type: 'error', text: 'Error al realizar la transferencia. Inténtalo de nuevo.' });
        } finally {
            setIsSending(false);
            setTimeout(() => setMessage(null), 5000); // Ocultar mensaje después de 5 segundos
        }
    };

    return (
        <div className="flex justify-center items-start min-h-[calc(100vh-80px)] py-8 px-4">
            <div className="bg-[#2D3748] text-white p-8 rounded-xl shadow-lg w-full max-w-xl">
                <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                    <IoSwapHorizontalSharp className="text-white text-[1.8rem]" /> {/* Ajustado tamaño de ícono de título */}
                    Realizar Transferencia
                </h2>

                <div className="text-lg text-center mb-6 py-3 px-4 rounded-lg bg-gray-700">
                    <p className="font-semibold">Saldo Disponible: <span className="text-green-400">${availableBalance.toFixed(2)}</span></p>
                </div>

                <form onSubmit={handleSubmitTransfer} className="space-y-6">
                    {/* Campo CBU / Alias */}
                    <div>
                        <label htmlFor="cbuAlias" className="block text-lg font-medium mb-2 text-gray-300">
                            CBU / Alias del Destinatario
                        </label>
                        <input
                            type="text"
                            id="cbuAlias"
                            name="cbuAlias"
                            value={transferDetails.cbuAlias}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            placeholder="Ej: 0000000000000000000000 / mi.alias.personal"
                            required
                        />
                    </div>

                    {/* Campo Monto */}
                    <div>
                        <label htmlFor="amount" className="block text-lg font-medium mb-2 text-gray-300">
                            Monto a Transferir
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={transferDetails.amount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            placeholder="Ej: 5000.00"
                            step="0.01"
                            min="0.01"
                            required
                        />
                    </div>

                    {/* Campo Concepto / Descripción */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium mb-2 text-gray-300">
                            Concepto / Descripción
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={transferDetails.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                            placeholder="Ej: Pago de alquiler / Cena"
                            maxLength="50"
                            required
                        />
                    </div>

                    {/* Mensaje de éxito/error */}
                    {message && (
                        <div className={`mt-4 p-3 rounded-lg text-center font-medium flex items-center justify-center gap-2 ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                            {message.type === 'success' ? <IoCheckmarkCircle size={20} /> : <IoWarning size={20} />} {/* Nuevos íconos para mensajes */}
                            <span>{message.text}</span>
                        </div>
                    )}

                    {/* Botón Realizar Transferencia */}
                    <button
                        type="submit"
                        className={`w-full bg-[linear-gradient(to_right,_#FF9A9E,_#F6416C)] hover:opacity-90 text-[#2D3748] font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md flex items-center justify-center gap-2 mt-8
                                   ${isSending ? 'opacity-60 cursor-not-allowed' : ''}`}
                        disabled={isSending}
                    >
                        {isSending ? (
                            <>
                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2D3748]"></span>
                                Enviando...
                            </>
                        ) : (
                            <>
                                <IoArrowForward className="text-[1.3rem]" /> {/* Nuevo ícono para el botón, ajustado el tamaño */}
                                Realizar Transferencia
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Transfer;