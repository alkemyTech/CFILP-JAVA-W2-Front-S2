import React, { useState } from 'react';

export const AddCardForm = ({ onAddCard }) => {
  const [formData, setFormData] = useState({
    numero: '',
    titular: '',
    vencimiento: '',
    tipo: 'Visa', // Valor predeterminado
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
    if (!formData.numero || !formData.titular || !formData.vencimiento || !formData.tipo) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    onAddCard(formData);
    setFormData({
      numero: '',
      titular: '',
      vencimiento: '',
      tipo: 'Visa',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Agregar Nueva Tarjeta</h2>

      <div>
        <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
          Número de Tarjeta
        </label>
        <input
          type="text"
          id="numero"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          maxLength="16"
          placeholder="Ej: 1234567890123456"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="titular" className="block text-sm font-medium text-gray-700">
          Titular
        </label>
        <input
          type="text"
          id="titular"
          name="titular"
          value={formData.titular}
          onChange={handleChange}
          placeholder="Nombre del Titular"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="vencimiento" className="block text-sm font-medium text-gray-700">
          Fecha de Vencimiento (MM/AA)
        </label>
        <input
          type="text"
          id="vencimiento"
          name="vencimiento"
          value={formData.vencimiento}
          onChange={handleChange}
          maxLength="5"
          placeholder="MM/AA"
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
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="Alkywallet">Alkywallet</option>
          <option value="Otra">Otra</option>
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