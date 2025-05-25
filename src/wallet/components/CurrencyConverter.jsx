import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ARS'); // Establecemos ARS como moneda de destino por defecto
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reemplaza con tu API key de CurrencyLayer
  const apiKey = 'ade153b6caf5c14cdec2fdbf12d08c37';
  const apiUrl = 'http://api.currencylayer.com/list';
  const conversionUrl = 'http://api.currencylayer.com/live';

  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}?access_key=${apiKey}`);
        const data = await response.json();
        if (data && data.currencies) {
          setCurrencies(Object.keys(data.currencies).sort()); // Ordenamos las monedas alfabéticamente
        } else if (data.error && (data.error.info != undefined)) {
          setError(`Error al cargar monedas: ${data.error.info}`);
        } else {
          setError('No se pudieron cargar las monedas.');
        }
      } catch (error) {
        setError('Error de conexión al cargar las monedas.');
        console.error('Error fetching currencies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, [apiKey, apiUrl]);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
    setConvertedAmount(null);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
    setConvertedAmount(null);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConvert = async () => {
    if (!apiKey) {
      setError('Por favor, ingresa tu API key de CurrencyLayer.');
      return;
    }
    if (!currencies.length) {
      setError('Las monedas aún no se han cargado.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${conversionUrl}?access_key=${apiKey}&source=${fromCurrency}&currencies=${toCurrency}`
      );
      const data = await response.json();

      if (data && data.success && data.quotes) {
        const quoteKey = `${fromCurrency}${toCurrency}`;
        const rate = data.quotes[quoteKey];
        if (rate) {
          const result = (amount * rate).toFixed(2);
          setConvertedAmount(result);
        } else {
          setError('No se encontró la tasa de cambio para las monedas seleccionadas.');
        }
      } else if (data && !data.success && data.error) {
        setError(`Error al convertir: ${data.error.info}`);
      } else {
        setError('No se pudo realizar la conversión.');
      }
    } catch (error) {
      setError('Error de conexión al realizar la conversión.');
      console.error('Error converting currency:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#2D3748] backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-md flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Conversor de Monedas</h3>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      </div>

      <div className="flex-grow">
        {loading && <p className="text-blue-400 mb-2">Cargando monedas...</p>}

        <div className="mb-3">
          <label htmlFor="fromCurrency" className="block text-gray-400 text-sm font-bold mb-1">De:</label>
          <select
            id="fromCurrency"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            disabled={loading}
          >
            {currencies.length === 0 && !loading && !error && <option value="">Cargando...</option>}
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="toCurrency" className="block text-gray-400 text-sm font-bold mb-1">A:</label>
          <select
            id="toCurrency"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            value={toCurrency}
            onChange={handleToCurrencyChange}
            disabled={loading}
          >
            {currencies.length === 0 && !loading && !error && <option value="">Cargando monedas...</option>}
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-400 text-sm font-bold mb-1">Cantidad:</label>
          <input
            type="number"
            id="amount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            value={amount}
            onChange={handleAmountChange}
            disabled={loading}
            min="0"
          />
        </div>
      </div>

      {/* Contenedor para el botón y el resultado, ahora en una fila */}
      <div className="flex items-center justify-between gap-2 mt-auto"> {/* Usamos flex para ponerlos en fila, items-center para alinear verticalmente, justify-between para espaciarlos y gap para la separación */}
        <button
          className="flex-shrink-0 text-sm py-4 px-6 bg-[linear-gradient(to_right,_#FF9A9E,_#F6416C)] hover:opacity-90 text-[#2D3748] font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-md" 
          onClick={handleConvert}
          disabled={loading || !currencies.length || !apiKey}
        >
          {loading ? 'Cargando...' : 'Convertir'}
        </button>

        {convertedAmount !== null && (
          <div className="flex-grow text-right"> 
            <p className="text-gray-300 text-sm">
              {amount} {fromCurrency} =
            </p>
            <p className="text-2xl font-bold text-white">
              <span className="text-green-400">${convertedAmount}</span> {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;