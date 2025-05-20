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
    <div className="bg-[#2D3748] backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">Conversor de Monedas</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-3">
        <label htmlFor="fromCurrency" className="block text-gray-400 text-sm font-bold mb-2">De:</label>
        <select
          id="fromCurrency"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          disabled={loading}
        >
          <option value="">Cargando monedas...</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="toCurrency" className="block text-gray-400 text-sm font-bold mb-2">A:</label>
        <select
          id="toCurrency"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          value={toCurrency}
          onChange={handleToCurrencyChange}
          disabled={loading}
        >
          <option value="">Cargando monedas...</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="block text-gray-400 text-sm font-bold mb-2">Cantidad:</label>
        <input
          type="number"
          id="amount"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          value={amount}
          onChange={handleAmountChange}
          disabled={loading}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-600"
        onClick={handleConvert}
        disabled={loading || !currencies.length || !apiKey}
      >
        {loading ? 'Cargando...' : 'Convertir'}
      </button>
      {convertedAmount !== null && (
        <p className="mt-4 text-white">
          {amount} {fromCurrency} = <span className="font-bold">{convertedAmount} {toCurrency}</span>
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;