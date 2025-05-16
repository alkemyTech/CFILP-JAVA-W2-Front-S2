
export const Dashboard = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-4xl font-extrabold dark:text-black">Nombre Apellido del Usuario</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Saldo actual de la cuenta principal */}
                <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center items-center dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg font-semibold mb-2 text-center">Saldo actual</h3>
                    <span className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">$12.500</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Cuenta principal</p>
                </div>
                {/* Últimos movimientos de cuentas */}
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
                {/* Puedes agregar más cards aquí */}

                {/* Última tarjeta usada */}
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg font-semibold mb-2">Última tarjeta usada</h3>
                    {/* Aquí puedes renderizar la info de la tarjeta */}
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
