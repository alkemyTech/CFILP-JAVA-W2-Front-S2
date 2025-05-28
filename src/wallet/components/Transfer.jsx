import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importa useDispatch y useSelector
import {
    IoSwapHorizontalSharp,
    IoArrowForward,
    IoCheckmarkCircle,
    IoWarning
} from 'react-icons/io5';
// Importa clearTransferMessage si aún lo usas, si no, puedes eliminarlo
// import { clearTransferMessage } from '../store/wallet/AccountSlice'; // Solo si lo estás usando

const Transfer = () => {
    const dispatch = useDispatch(); // Necesario si usas `dispatch` para limpiar `transferMessage` del store

    // Obtener las cuentas del store y el mensaje de transferencia (si aún lo manejas en el store)
    const { accounts, transferMessage } = useSelector(state => state.account);

    const [transferDetails, setTransferDetails] = useState({
        recipientType: 'cbuAlias',
        cbuAlias: '',
        amount: '',
        description: ''
    });
    const [localMessage, setLocalMessage] = useState(null); // Usamos null para indicar que no hay mensaje inicialmente
    const [isSending, setIsSending] = useState(false);

    // ======================================================================
    // CÁLCULO DEL SALDO DISPONIBLE EN ARS (igual que en el Dashboard)
    const availableBalance = accounts.reduce((total, account) => {
        if (account.moneda === "ARS") {
            return total + (parseFloat(account.saldo) || 0);
        }
        return total;
    }, 0);
    // ======================================================================

    // Este useEffect se encargará de limpiar los mensajes automáticamente
    useEffect(() => {
        // Limpiar mensajes locales después de 5 segundos
        if (localMessage) {
            const timer = setTimeout(() => setLocalMessage(null), 5000);
            return () => clearTimeout(timer);
        }
        // Si también manejas un `transferMessage` en el store, y quieres limpiarlo aquí:
        // if (transferMessage) {
        //     const timer = setTimeout(() => dispatch(clearTransferMessage()), 5000);
        //     return () => clearTimeout(timer);
        // }
    }, [localMessage, /* transferMessage, dispatch */]); // Descomenta transferMessage y dispatch si los usas

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalMessage(null); // Limpiar mensajes locales al cambiar cualquier campo
        // Si manejas transferMessage en el store y quieres limpiarlo aquí:
        // dispatch(clearTransferMessage());
        setTransferDetails({
            ...transferDetails,
            [name]: value
        });
    };

    const handleSubmitTransfer = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setLocalMessage(null); // Limpiar mensajes antes de iniciar la transferencia

        const { cbuAlias, amount, description } = transferDetails;

        if (!cbuAlias.trim() || !amount || !description.trim()) {
            setLocalMessage({ type: 'error', text: 'Todos los campos son obligatorios.' });
            setIsSending(false);
            return;
        }

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setLocalMessage({ type: 'error', text: 'El monto debe ser un número positivo.' });
            setIsSending(false);
            return;
        }

        // Validación de saldo usando el saldo real de Redux
        if (numericAmount > availableBalance) {
            setLocalMessage({ type: 'error', text: `Saldo insuficiente. Tienes $${availableBalance.toFixed(2)} disponibles.` });
            setIsSending(false);
            return;
        }

        console.log('Realizando transferencia:', transferDetails);

        try {
            // Simulación de la llamada a la API (simulando un delay)
            // Aquí iría tu lógica real para llamar al backend para hacer la transferencia.
            await new Promise(resolve => setTimeout(resolve, 2000));

            setLocalMessage({ type: 'success', text: '¡Transferencia realizada con éxito!' });
            setTransferDetails({
                recipientType: 'cbuAlias',
                cbuAlias: '',
                amount: '',
                description: ''
            });

        } catch (error) {
            console.error('Error al realizar la transferencia:', error);
            setLocalMessage({ type: 'error', text: 'Error al realizar la transferencia. Inténtalo de nuevo.' });
        } finally {
            setIsSending(false);
            // El useEffect se encargará de limpiar el mensaje local.
            // Si tienes un transferMessage en el store, asegúrate de que se limpie también.
        }
    };

    // Determinar qué mensaje mostrar: el local tiene prioridad
    const displayMessage = localMessage; // O localMessage || transferMessage si usas el store

    return (
        <div className="flex justify-center items-start min-h-[calc(100vh-80px)] py-8 px-4">
            <div className="bg-[#2D3748] text-white p-8 rounded-xl shadow-lg w-full max-w-xl">
                <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                    <IoSwapHorizontalSharp className="text-white text-[1.8rem]" />
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
                    {displayMessage && (
                        <div className={`mt-4 p-3 rounded-lg text-center font-medium flex items-center justify-center gap-2 ${displayMessage.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                            {displayMessage.type === 'success' ? <IoCheckmarkCircle size={20} /> : <IoWarning size={20} />}
                            <span>{displayMessage.text}</span>
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
                                <IoArrowForward className="text-[1.3rem]" />
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