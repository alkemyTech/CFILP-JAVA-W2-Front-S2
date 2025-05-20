import { FaCcVisa, FaCcMastercard, FaCreditCard } from 'react-icons/fa';

export const Cards = () => {
  const tarjetas = [
    {
      id: 1,
      numero: '**** **** **** 1234',
      titular: 'Juan Manuel Galán',
      vencimiento: '12/26',
      tipo: 'Visa',
    },
    {
      id: 2,
      numero: '**** **** **** 5678',
      titular: 'Juan Manuel Galán',
      vencimiento: '08/25',
      tipo: 'Mastercard',
    },
    {
      id: 3,
      numero: '**** **** **** 0001',
      titular: 'Juan Manuel Galán',
      vencimiento: '01/30',
      tipo: 'Alkywallet',
    },
  ];

  const getCardStyles = (tipo) => {
    switch (tipo) {
      case 'Visa':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600';
      case 'Mastercard':
        return 'bg-gradient-to-r from-yellow-500 to-red-500';
      case 'Alkywallet':
        return 'bg-gradient-to-r from-[#fd4084] to-[#ffa08c]';
      default:
        return 'bg-gray-600';
    }
  };

  const getCardIcon = (tipo) => {
    switch (tipo) {
      case 'Visa':
        return <FaCcVisa className="w-8 h-8 text-white" />;
      case 'Mastercard':
        return <FaCcMastercard className="w-8 h-8 text-white" />;
      case 'Alkywallet':
        return <img src="https://cdn-icons-png.flaticon.com/128/17215/17215810.png" width="40" height="40" alt="Logo" />;
      default:
        return <FaCreditCard className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-visible">
      {tarjetas.map((tarjeta) => (
        <div
          key={tarjeta.id}
          className={`${getCardStyles(tarjeta.tipo)} text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.03] duration-200`}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="text-lg font-semibold">{tarjeta.tipo}</div>
            {getCardIcon(tarjeta.tipo)}
          </div>
          <div className="text-base font-mono tracking-widest">{tarjeta.numero}</div>
          <div className="flex justify-between items-center mt-3 text-xs">
            <div>
              <div className="uppercase text-gray-200">Titular</div>
              <div>{tarjeta.titular}</div>
            </div>
            <div>
              <div className="uppercase text-gray-200">Vencimiento</div>
              <div>{tarjeta.vencimiento}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Botón para agregar nueva tarjeta */}
      <button
        className="bg-[#2D3748] text-white border border-gray-600 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-gray-700 transition-all hover:scale-[1.02] duration-200 h-auto"
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
    </div>
  );
};
