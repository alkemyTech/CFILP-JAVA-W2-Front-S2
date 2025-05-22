
export const AccountsTable = ({ onEdit, accounts }) => {
    // Verifica que accounts sea un array y no esté vacío
    if (!Array.isArray(accounts) || accounts.length === 0) {
        return <p>No hay cuentas disponibles</p>;
    }
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th className="p-4"></th>
                    <th className="px-6 py-3">CBU</th>
                    <th className="px-6 py-3">Saldo</th>
                    <th className="px-6 py-3">Fecha de Apertura</th>
                    <th className="px-6 py-3">Moneda</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {accounts.map((account, idx) => (
                    <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600" />
                        </td>
                        <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="ps-3">
                                <div className="text-base font-semibold">{account.cbu}</div>
                                <div className="font-normal text-gray-500">{account.saldo}</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">{account.fechaApertura}</td>
                        {/* <td className="px-6 py-4">
                            27-09-1992
                        </td> */}
                        <td className="px-6 py-4">{account.moneda}</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full ${account.estado === true ? "bg-green-500" : "bg-red-500"} me-2`}></div>
                                {account.estado}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                type="button"
                                onClick={() => onEdit(account)}
                                className="font-medium text-blue-600 dark:text-yellow-300 hover:underline"
                            >
                                Editar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
