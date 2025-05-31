import { useState } from 'react';
import { useAccountStore } from '../hooks/useAccountStore';

export const AddCardForm = ({ onAddCard }) => {

  const { accounts } = useAccountStore();

  const [formData, setFormData] = useState({
    numeroTarjeta: '',
    nombreTitular: '',
    fechaVencimiento: '',
    cvv: '',
    banco: '',
    marca: '',
    tipo: '',
    accountId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.numeroTarjeta ||
      !formData.nombreTitular ||
      !formData.fechaVencimiento ||
      !formData.cvv ||
      !formData.tipo ||
      !formData.marca ||
      !formData.accountId ||
      !formData.banco) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    onAddCard(formData);
    setFormData({
      numeroTarjeta: '',
      nombreTitular: '',
      fechaVencimiento: '',
      cvv: '',
      banco: '',
      marca: '',
      tipo: '',
      accountId: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Agregar Nueva Tarjeta</h2>

      <div>
        <label htmlFor="accountId" className="block text-sm font-medium text-gray-700">
          Cuenta asociada
        </label>
        <select
          id="accountId"
          name="accountId"
          value={formData.accountId}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        >
          <option value="" selected>Seleccione una cuenta</option>
          {accounts.map((account, idx) => (
            <option key={idx} value={account.idCuenta}>
              {account.moneda} - {account.cbu.substring(0, 8)}... (Saldo: {parseFloat(account.saldo).toLocaleString('es-AR')})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="numeroTarjeta" className="block text-sm font-medium text-gray-700">
          Número de Tarjeta
        </label>
        <input
          type="text"
          id="numeroTarjeta"
          name="numeroTarjeta"
          value={formData.numeroTarjeta}
          onChange={handleChange}
          maxLength="16"
          placeholder="Ej: 1234567890123456"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="nombreTitular" className="block text-sm font-medium text-gray-700">
          Titular
        </label>
        <input
          type="text"
          id="nombreTitular"
          name="nombreTitular"
          value={formData.nombreTitular}
          onChange={handleChange}
          placeholder="Nombre del Titular"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="banco" className="block text-sm font-medium text-gray-700">
          Banco
        </label>
        <input
          type="text"
          id="banco"
          name="banco"
          value={formData.banco}
          onChange={handleChange}
          placeholder="banco"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="fechaVencimiento" className="block text-sm font-medium text-gray-700">
          Fecha de Vencimiento (YYY-MM-DD)
        </label>
        <input
          type="text"
          id="fechaVencimiento"
          name="fechaVencimiento"
          value={formData.fechaVencimiento}
          onChange={handleChange}
          placeholder="MM/AA"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          maxLength="3"
          placeholder="***"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
          Tipo de Tarjeta
        </label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        >
          <option value="">Seleccione un Tipo</option>
          <option value="CREDITO">Credito</option>
          <option value="DEBITO">Debito</option>
          <option value="ALKYWALLET">Alkywallet</option>
          <option value="OTRA">Otra</option>
        </select>
      </div>

      <div>
        <label htmlFor="marca" className="block text-sm font-medium text-gray-700">
          Marca de Tarjeta
        </label>
        <select
          id="marca"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        >
          <option value="">Seleccione una marca</option>
          <option value="VISA">Visa</option>
          <option value="MASTERCARD">Mastercard</option>
          <option value="ALKYWALLET">Alkywallet</option>
          <option value="OTRA">Otra</option>
        </select>
      </div>

      {/* Botón con el estilo proporcionado */}
      <button
        type="submit"
        className="w-full bg-[linear-gradient(to_right,_#FF9A9E,_#F6416C)] hover:opacity-90 text-[#2D3748] font-semibold py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
      >
        Guardar Tarjeta
      </button>
    </form>
  );
};