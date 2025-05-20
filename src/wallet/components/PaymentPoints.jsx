import React, { useState } from 'react';

const PaymentPoints = () => {
  const [codigo, setCodigo] = useState('');
  const [mostrarMapa, setMostrarMapa] = useState(false);

  const generarCodigo = () => {
    const nuevoCodigo = 'DEP-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setCodigo(nuevoCodigo);
    setMostrarMapa(true);
  };

  return (
    <div className="bg-[#2D3748] text-white p-6 rounded-2xl shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Generar código de depósito</h2>
      <button
        onClick={generarCodigo}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
      >
        Generar Código
      </button>

      {codigo && (
        <div className="mt-4">
          <p className="text-lg">Tu código de pago es:</p>
          <p className="text-2xl font-mono bg-gray-800 p-3 rounded mt-2 inline-block">{codigo}</p>
        </div>
      )}

      {mostrarMapa && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Puntos de pago Rapipago (Mapa)</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
                title="Mapa de Rapipago"
                src="https://www.google.com/maps?q=rapipago&output=embed"
                width="100%"
                height="480"
                className="rounded"
                allowFullScreen
                loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPoints;