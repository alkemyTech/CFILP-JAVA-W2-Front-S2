import { useState } from "react";
import { useAccountStore } from "../hooks/useAccountStore";


export const EditAccountModal = ({ show, account, onClose, userId }) => {

    const [moneda, setMoneda] = useState("ARS");

    const { addAccountImpl } = useAccountStore();

    if (!show) return null;

    const cbu = account?.cbu || '';
    const saldo = account?.saldo || '';
    const email = account?.usuarioDto?.email || '';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!account) {
            addAccountImpl(userId, moneda);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-full">
                <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {account ? "Editar Cuenta" : "Nueva Cuenta"}
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-6 gap-6">
                            {account ? (
                                <>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CBU</label>
                                        <input
                                            type="text"
                                            defaultValue={cbu} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Saldo</label>
                                        <input type="text"
                                            defaultValue={saldo} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="email"
                                            defaultValue={email} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                </>
                            ) : (
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Moneda</label>
                                    <select
                                        name="moneda"
                                        value={moneda}
                                        onChange={(e) => setMoneda(e.target.value)}
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="USD">USD</option>
                                        <option value="ARS">ARS</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                            )
                            }

                            {/* ...otros campos si quieres... */}
                        </div>
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{account ? "Editar" : "Crear"}</button>
                        <button type="button" onClick={onClose} className="ml-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
