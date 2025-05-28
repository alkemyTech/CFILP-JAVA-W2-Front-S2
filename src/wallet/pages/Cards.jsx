import { useState } from 'react';
import { FaCcMastercard, FaCcVisa, FaCreditCard } from 'react-icons/fa';
import { AddCardForm } from '../components/AddCardForm';
import { Modal } from '../components/Modal';
import { useAccountStore } from '../hooks/useAccountStore';

export const Cards = () => {

  const { accounts, addCardToAccountFn } = useAccountStore();

  const tarjetas = accounts.flatMap(account => account.tarjetasDto || []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCardStyles = (tipo) => {
    switch (tipo) {
      case 'VISA':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600';
      case 'MASTERCARD':
        return 'bg-gradient-to-r from-yellow-500 to-red-500';
      case 'ALKYWALLET':
        return 'bg-gradient-to-r from-[#fd4084] to-[#ffa08c]';
      default:
        return 'bg-gray-600';
    }
  };

  const getCardIcon = (marca) => {
    switch (marca) {
      case "VISA":
        return <FaCcVisa className="w-8 h-8 text-white" />;
      case "MASTERCARD":
        return <FaCcMastercard className="w-8 h-8 text-white" />;
      case "ALKYWALLET":
        return <img src="https://cdn-icons-png.flaticon.com/128/17215/17215810.png" width="40" height="40" alt="Logo" />;
      default:
        return <FaCreditCard className="w-8 h-8 text-white" />;
    }
  };

  const handleAddCard = async (newCardData) => {
    try {
      // Extraer el accountId antes de enviar al backend
      const { accountId, ...cardData } = newCardData;

      // Asegurarse de que la fecha tenga formato correcto (YYYY-MM-DD)
      // Si la fecha viene como MM/YY, convertirla a YYYY-MM-DD
      let fechaVencimiento = cardData.fechaVencimiento;
      if (fechaVencimiento.includes('/')) {
        const [mes, año] = fechaVencimiento.split('/');
        const añoCompleto = `20${año}`; // Asumiendo que es 20XX
        fechaVencimiento = `${añoCompleto}-${mes}-01`; // Usar el primer día del mes
      }

      // Crear la tarjeta con el formato esperado por el backend
      const newCard = {
        ...cardData,
        fechaVencimiento,
      };

      await addCardToAccountFn(accountId, newCard);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al agregar tarjeta:", error);
      alert("No se pudo agregar la tarjeta. Intente nuevamente.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-visible">
      {tarjetas.map((tarjeta, idx) => (
        <div
          key={idx}
          className={`${getCardStyles(tarjeta.marca)} text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.03] duration-200`}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="text-lg font-semibold">{tarjeta.marca}</div>
            {getCardIcon(tarjeta.marca)}
          </div>
          <div className="text-base font-mono tracking-widest">{tarjeta.numeroTarjeta}</div>
          <div className="flex justify-between items-center mt-3 text-xs">
            <div>
              <div className="uppercase text-gray-200">Titular</div>
              <div>{tarjeta.nombreTitular.toUpperCase()}</div>
            </div>
            <div>
              <div className="uppercase text-gray-200">Vencimiento</div>
              <div>{tarjeta.fechaVencimiento}</div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="bg-[#2D3748] text-white border border-gray-600 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-gray-700 transition-all hover:scale-[1.02] duration-200 h-auto"
        onClick={() => setIsModalOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 mb-1 text-blue-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span className="text-sm font-medium">Agregar nueva tarjeta</span>
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddCardForm onAddCard={handleAddCard} />
      </Modal>
    </div>
  );
};