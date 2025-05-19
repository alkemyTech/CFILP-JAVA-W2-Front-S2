
export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      
      {/* 1. Mosaico Saldo Actual */}
      <div className="bg-[#395C6B] backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-300">Saldo disponible</p>
            <p className="text-3xl font-bold text-white mt-2">$12,500.00</p>
            <p className="text-xs text-gray-400 mt-1">Cuenta principal</p>
          </div>
          <div className="p-3 rounded-full bg-blue-500/10">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6 text-blue-400"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-sm text-green-400 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-4 h-4 text-green-400 mr-1"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" 
              />
            </svg>
            2.5% vs último mes
          </p>
        </div>
      </div>
      {/* 2. Mosaico Últimos Movimientos */}
      <div className="bg-[#395C6B] backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Últimos movimientos</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5 text-purple-400"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" 
            />
          </svg>
        </div>
        
        <ul className="space-y-3">
          {[
            { type: 'income', amount: 1000, description: 'Transferencia recibida' },
            { type: 'expense', amount: 500, description: 'Pago de servicio' },
            { type: 'expense', amount: 2300, description: 'Supermercado' }
          ].map((tx, index) => (
            <li key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  tx.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}>
                  {tx.type === 'income' ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-4 h-4 text-green-400"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" 
                      />
                    </svg>
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-4 h-4 text-red-400"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" 
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-white">{tx.description}</span>
              </div>
              <span className={`text-sm font-medium ${
                tx.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>

        <button className="mt-4 text-sm text-blue-400 hover:text-blue-300 flex items-center">
          Ver historial completo
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-4 h-4 ml-1"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
/*
export const Dashboard = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-4xl font-extrabold dark:text-black">Hola Usuario X</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Saldo actual de la cuenta principal }
                <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg font-semibold mb-2 text-center">Saldo actual</h3>
                    <span className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">$12.500</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Cuenta principal</p>
                </div>
                {/* Últimos movimientos de cuentas }
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg font-semibold mb-2">Últimos movimientos</h3>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-2 flex justify-between">
                            <span className="text-gray-700 dark:text-gray-200">Transferencia recibida</span>
                            <span className="text-green-600 dark:text-green-400">+$1.000</span>
                        </li>
                        <li className="py-2 flex justify-between">
                            <span className="text-gray-700 dark:text-gray-200">Pago de servicio</span>
                            <span className="text-red-600 dark:text-red-400">-$500</span>
                        </li>
                        <li className="py-2 flex justify-between">
                            <span className="text-gray-700 dark:text-gray-200">Compra supermercado</span>
                            <span className="text-red-600 dark:text-red-400">-$2.300</span>
                        </li>
                    </ul>
                </div>
                {/* Puedes agregar más cards aquí }

                {/* Última tarjeta usada }
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg font-semibold mb-2">Última tarjeta usada</h3>
                    {/* Aquí puedes renderizar la info de la tarjeta }
                    <div className="flex items-center space-x-4">
                        <img src="https://cdn-icons-png.flaticon.com/128/8983/8983163.png" alt="Tarjeta" className="w-20 h-20 object-cover rounded" />
                        <div>
                            <p className="text-s text-gray-700 dark:text-gray-200">Visa Débito</p>
                            <p className="text-s text-gray-500 dark:text-gray-400">Terminada en 1234</p>
                            <p className="text-s text-gray-500 dark:text-gray-400">Último uso: 15/05/2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
*/