import React, { useState, useEffect } from 'react';
import { FaCopy, FaCheckCircle, FaSpinner, FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa'; // Importa iconos de flecha

export const PaymentPoints = () => {
    const [codigo, setCodigo] = useState('');
    const [mostrarMapa, setMostrarMapa] = useState(false);
    const [copiado, setCopiado] = useState(false);
    const [movimientos, setMovimientos] = useState([]); // Ahora se llama movimientos
    const [loadingMovimientos, setLoadingMovimientos] = useState(true);

    // Función para simular la obtención de movimientos (depósitos y extracciones)
    useEffect(() => {
        const fetchMovimientos = async () => {
            setLoadingMovimientos(true);
            try {
                // Simulación de una llamada a la API con datos de ejemplo
                const simulatedMovimientos = [
                    // Depósitos
                    { id: 1, tipo: 'deposito', descripcion: 'Depósito en Rapipago', monto: 1000000, fecha: '2025-06-09T12:03:56', estado: 'Completado' },
                    { id: 2, tipo: 'deposito', descripcion: 'Depósito en Pagofacil', monto: 156897, fecha: '2025-06-09T12:03:56', estado: 'Completado' },
                    { id: 3, tipo: 'deposito', descripcion: 'Transferencia Recibida', monto: 200000, fecha: '2025-06-10T15:00:00', estado: 'Completado' },
                    // Extracciones
                    { id: 4, tipo: 'extraccion', descripcion: 'Pago de Servicio', monto: -500, fecha: '2025-06-11T09:30:00', estado: 'Completado' },
                    { id: 5, tipo: 'extraccion', descripcion: 'Supermercado', monto: -2300, fecha: '2025-06-11T10:00:00', estado: 'Completado' },
                    { id: 6, tipo: 'extraccion', descripcion: 'Retiro ATM', monto: -10000, fecha: '2025-06-12T14:15:00', estado: 'Completado' },
                ];
                await new Promise(resolve => setTimeout(resolve, 1000));
                setMovimientos(simulatedMovimientos);
            } catch (error) {
                console.error("Error al cargar los movimientos (simulado):", error);
            } finally {
                setLoadingMovimientos(false);
            }
        };
        fetchMovimientos();
    }, []);

    const generarCodigo = () => {
        const nuevoCodigo = 'DEP-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        setCodigo(nuevoCodigo);
        setMostrarMapa(true);
        setCopiado(false);
    };

    const copiarCodigo = () => {
        if (codigo) {
            navigator.clipboard.writeText(codigo).then(() => {
                setCopiado(true);
                setTimeout(() => setCopiado(false), 2000);
            }).catch(err => {
                console.error('Error al copiar el texto: ', err);
                // Fallback para entornos que no permiten navigator.clipboard
                const el = document.createElement('textarea');
                el.value = codigo;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                setCopiado(true);
                setTimeout(() => setCopiado(false), 2000);
            });
        }
    };

    const formatFecha = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatMonto = (monto) => {
        const value = Math.abs(monto); // Usar el valor absoluto para el formato
        const formatted = `$${value.toLocaleString('es-AR')}`;
        return monto < 0 ? `-${formatted}` : formatted;
    };

    return (
        // Contenedor principal con flexbox para los dos paneles
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto my-8 p-4 lg:p-0">

            {/* Panel de Generar Código de Depósito (izquierdo) */}
            {/* Altura mínima para que no cambie demasiado si el mapa aparece/desaparece */}
            <div className="flex-1 bg-[#2D3748] text-white pt-4 pb-4 px-6 rounded-xl shadow-lg min-h-[450px]">
                {/* Título como en "Últimos movimientos" */}
                <h2 className="text-xl font-semibold mb-6 text-gray-200 pl-4">Generar código de depósito/extraccion</h2>

                <div className="flex flex-col items-center"> {/* Centrar el contenido de esta sección */}
                    <button
                        onClick={generarCodigo}
                        className="bg-[linear-gradient(to_right,_#FF9A9E,_#F6416C)] hover:opacity-90 text-[#2D3748] font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md mb-6"
                    >
                        Generar Código
                    </button>

                    {codigo && (
                        <div className="text-center w-full max-w-md border-t border-gray-700 pt-6">
                            <p className="text-lg mb-4 font-medium">Tu código de pago es:</p>
                            <div className="inline-flex items-center gap-3 bg-gray-700 px-5 py-3 rounded-lg border border-gray-600">
                                <span className="text-2xl font-mono tracking-wider text-yellow-300">{codigo}</span>
                                <button
                                    onClick={copiarCodigo}
                                    className="text-yellow-400 hover:text-yellow-200 transition-colors transform hover:scale-110"
                                    title="Copiar código"
                                >
                                    <FaCopy size={22} />
                                </button>
                            </div>

                            {copiado && (
                                <div className="mt-4 flex items-center justify-center gap-2 text-green-400 font-semibold text-base">
                                    <FaCheckCircle size={18} />
                                    <span>¡Código copiado al portapapeles!</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* El mapa se mostrará en un contenedor fijo */}
                    {mostrarMapa && (
                        <div className="mt-8 w-full">
                            <h3 className="text-xl font-semibold mb-4 text-center">Puntos de pago Rapipago (Mapa)</h3>
                            <div className="relative overflow-hidden rounded-xl border border-gray-700" style={{ paddingTop: '56.25%', height: 'auto' }}>
                                <iframe
                                    title="Mapa de Rapipago"
                                    src="https://www.google.com/maps?q=rapipago&output=embed" // Ejemplo de Obelisco, Buenos Aires
                                    className="absolute top-0 left-0 w-full h-full"
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Panel de Registro de Movimientos (derecho) */}
            {/* Similar al estilo de "Últimos movimientos" */}
            <div className="flex-1 bg-[#2D3748] text-white pt-4 pb-4 px-6 rounded-xl shadow-lg min-h-[450px] flex flex-col">
                <h2 className="text-xl font-semibold mb-6 text-gray-200 pl-4">Últimos movimientos</h2>

                {loadingMovimientos ? (
                    <div className="flex justify-center items-center flex-grow">
                        <FaSpinner className="animate-spin text-blue-400 text-4xl" />
                        <span className="ml-3 text-lg">Cargando movimientos...</span>
                    </div>
                ) : movimientos.length === 0 ? (
                    <div className="flex justify-center items-center flex-grow">
                        <p className="text-center text-gray-400 text-lg">No hay movimientos registrados.</p>
                    </div>
                ) : (
                    <div className="flex-grow overflow-y-auto pr-2" style={{ maxHeight: 'calc(100% - 60px)' }}> {/* Ajuste para scroll y espacio de título */}
                        {movimientos.map((mov) => (
                            <div key={mov.id} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                                <div className="flex items-center">
                                    {mov.tipo === 'deposito' ? (
                                        <FaArrowCircleDown className="text-green-500 mr-3 text-lg" />
                                    ) : (
                                        <FaArrowCircleUp className="text-red-500 mr-3 text-lg" />
                                    )}
                                    <div>
                                        <div className="font-medium text-base text-gray-200">{mov.descripcion}</div>
                                        <div className="text-xs text-gray-400">{formatFecha(mov.fecha)}</div>
                                    </div>
                                </div>
                                <span className={`font-semibold text-base ${mov.monto >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {formatMonto(mov.monto)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};