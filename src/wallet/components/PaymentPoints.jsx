import React, { useState } from 'react';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';

const PaymentPoints = () => {
    const [codigo, setCodigo] = useState('');
    const [mostrarMapa, setMostrarMapa] = useState(false);
    const [copiado, setCopiado] = useState(false);

    const generarCodigo = () => {
        const nuevoCodigo = 'DEP-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        setCodigo(nuevoCodigo);
        setMostrarMapa(true);
        setCopiado(false);
    };

    const copiarCodigo = () => {
        navigator.clipboard.writeText(codigo);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000); // mensaje por 2 segundos
    };

    return (
        <div className="bg-[#2D3748] text-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto my-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Generar código de depósito</h2>

            <div className="flex justify-center mb-6">
                <button
                    onClick={generarCodigo}
                    className="bg-[linear-gradient(to_right,_#FF9A9E,_#F6416C)] hover:opacity-90 text-[#2D3748] font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
                >
                    Generar Código
                </button>
            </div>

            {codigo && (
                <div className="mt-6 text-center border-t border-gray-700 pt-6">
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

            {mostrarMapa && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-center">Puntos de pago Rapipago (Mapa)</h3>
                    {/* Contenedor del mapa - Ajustado para mejor visualización */}
                    <div className="relative overflow-hidden rounded-xl border border-gray-700" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio (9 / 16 * 100 = 56.25) */}
                        <iframe
                            title="Mapa de Rapipago"
                            // **¡ATENCIÓN: URL de Google Maps Embed!**
                            // Reemplaza esta URL de ejemplo por la URL REAL de incrustación de Google Maps.
                            // Puedes obtenerla yendo a Google Maps, buscando la ubicación, clic en "Compartir", luego en "Insertar un mapa".
                            src="https://www.google.com/maps?q=rapipago&output=embed"
                            className="absolute top-0 left-0 w-full h-full" // El iframe ocupa el 100% de su contenedor
                            allowFullScreen={true} // Usamos true para la propiedad booleana de React
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentPoints;