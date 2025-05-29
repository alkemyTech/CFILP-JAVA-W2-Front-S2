import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    IoSwapHorizontalSharp,
    IoArrowForward,
    IoCheckmarkCircle,
    IoWarning
} from 'react-icons/io5';

const Transfer = () => {
    const dispatch = useDispatch();
    const { accounts, transferMessage } = useSelector(state => state.account);

    const [transferDetails, setTransferDetails] = useState({
        recipientType: 'cbuAlias',
        cbuAlias: '',
        amount: '',
        description: '',
        sourceCardId: '', // Estado para la tarjeta seleccionada
    });
    const [localMessage, setLocalMessage] = useState(null);
    const [isSending, setIsSending] = useState(false);

    // Aplanar todas las tarjetas de todas las cuentas y asociarlas con su accountId y saldo
    // ¡Cambiado para usar 'tarjetasDto'!
    const allCards = accounts.flatMap(account =>
        (account.tarjetasDto || []).map(card => ({ // *** AHORA SE BUSCA 'tarjetasDto' ***
            ...card,
            accountId: account.id,
            accountMoneda: account.moneda,
            accountSaldo: parseFloat(account.saldo) || 0
        }))
    );

    // Encontrar la tarjeta seleccionada por el usuario
    const selectedCard = allCards.find(card => card.id === transferDetails.sourceCardId);

    // Determinar el saldo disponible
    const availableBalance = selectedCard && selectedCard.accountMoneda === 'ARS'
        ? selectedCard.accountSaldo
        : 0;

    useEffect(() => {
        if (localMessage) {
            const timer = setTimeout(() => setLocalMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [localMessage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalMessage(null);
        setTransferDetails({
            ...transferDetails,
            [name]: value
        });
    };

    const handleSubmitTransfer = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setLocalMessage(null);

        const { cbuAlias, amount, description, sourceCardId } = transferDetails;

        // Validaciones
        if (!cbuAlias.trim() || !amount || !description.trim() || !sourceCardId) {
            setLocalMessage({ type: 'error', text: 'Todos los campos y la tarjeta de origen son obligatorios.' });
            setIsSending(false);
            return;
        }

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setLocalMessage({ type: 'error', text: 'El monto debe ser un número positivo.' });
            setIsSending(false);
            return;
        }

        if (numericAmount > availableBalance) {
            setLocalMessage({ type: 'error', text: `Saldo insuficiente en la cuenta de la tarjeta. Tienes $${availableBalance.toFixed(2)} disponibles.` });
            setIsSending(false);
            return;
        }

        console.log('Realizando transferencia desde tarjeta:', sourceCardId, 'Detalles:', transferDetails);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            setLocalMessage({ type: 'success', text: '¡Transferencia realizada con éxito!' });
            setTransferDetails({
                recipientType: 'cbuAlias',
                cbuAlias: '',
                amount: '',
                description: '',
                sourceCardId: '',
            });

        } catch (error) {
            console.error('Error al realizar la transferencia:', error);
            setLocalMessage({ type: 'error', text: 'Error al realizar la transferencia. Inténtalo de nuevo.' });
        } finally {
            setIsSending(false);
        }
    };

    const displayMessage = localMessage;

    return (
        <div className="flex justify-center items-start min-h-[calc(100vh-80px)] py-8 px-4">
            <div className="bg-[#2D3748] text-white p-8 rounded-xl shadow-lg w-full max-w-xl">
                <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                    <IoSwapHorizontalSharp className="text-white text-[1.8rem]" />
                    Realizar Transferencia
                </h2>

                <div className="text-lg text-center mb-6 py-3 px-4 rounded-lg bg-gray-700">
                    <p className="font-semibold">
                        Saldo Disponible: <span className="text-green-400">${availableBalance.toFixed(2)}</span>
                        {/* Mostrar el tipo y los últimos 4 dígitos de la tarjeta si hay una seleccionada */}
                        {selectedCard && ` (de ${selectedCard.tipo} ${selectedCard.numero.slice(-4)})`}
                    </p>
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

                    {/* Selector de Tarjeta de Origen */}
                    <div>
                        <label htmlFor="sourceCardId" className="block text-lg font-medium mb-2 text-gray-300">
                        Seleccionar Tarjeta de Origen
                        </label>
                        <select
                            id="sourceCardId"
                            name="sourceCardId"
                            value={transferDetails.sourceCardId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            required
                        >
                            <option value="">Selecciona una tarjeta...</option>
                            {allCards.map(card => (
                            <option key={card.id} value={card.id}>
                                {`${card.banco} - ${card.tipo} ${card.numero.slice(-4)} (${card.marca || 'N/A'}) (Cuenta ${card.accountMoneda})`}
                            </option>
                            ))}
                        </select>
                        {allCards.length === 0 && (
                            <p className="text-sm text-gray-500 mt-2 text-red-400">
                            No se encontraron tarjetas asociadas a tus cuentas.
                            </p>
                        )}
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