import { formatDateTime } from "../../utils/formatDateTime";

export const AccountsTable = ({ onEdit, accounts, onDelete }) => {

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
                            </div>
                        </th>
                        <td> <div className="font-normal text-gray-500">${account.saldo}</div></td>
                        <td className="px-6 py-4">{formatDateTime(account.fechaApertura)}</td>
                        <td className="px-6 py-4">{account.moneda}</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full ${account.estado === true ? "bg-green-500" : "bg-red-500"} me-2`}></div>
                                {(account.estado === true) ? "Activa" : "Inactiva"}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                type="button"
                                onClick={() => onEdit(account)}
                                className="font-medium text-blue-600 dark:text-yellow-300 hover:cursor-pointer hover:underline"
                            >
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                                </svg>
                            </button>

                            <button type="button" className="ms-2" onClick={() => onDelete(account)}>
                                <svg className="w-6 h-6 text-red-600 hover:text-red-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
