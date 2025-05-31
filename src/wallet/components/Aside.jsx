import { Link } from 'react-router';
import { useAuthStore } from '../../hooks';
import {
    FaThLarge,       // Para Dashboard (rejilla sólida)
    FaUsers,         // Para Cuentas (grupo de usuarios sólido)
    FaCreditCard,    // Para Tarjetas (tarjeta de crédito sólida)
    FaBoxOpen,       // Para Depósitos (caja o contenedor, buscando algo similar a la flecha abajo en caja)
    FaExchangeAlt,   // Para Transferencias (flechas de intercambio sólidas)
    FaUserEdit,      // Para Editar Usuario (lápiz o persona editando sólido)
    FaSignOutAlt     // Para Salir (puerta o flecha de salida sólida)
} from 'react-icons/fa';

export const Aside = () => {

    const { user, startLogOut } = useAuthStore();

    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-[#E9F1F7] border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between shadow-[2px_0_6px_rgba(0,0,0,0.1)]" aria-label="Sidenav" id="drawer-navigation">
            <div>
                {/* Logo y título Alkywallet - Mejorado para más profesionalismo y centrado */}
                <Link to="/" className="flex items-center justify-center mb-8 px-4"> {/* Aumentado mb y añadido px para espaciado lateral */}
                    <img src="https://cdn-icons-png.flaticon.com/128/17215/17215810.png" width="36" height="36" alt="Logo Alkywallet" className="object-contain" /> {/* Reducido ligeramente el tamaño y añadido object-contain */}
                    <span className="ml-2 text-gray-900 text-xl font-bold whitespace-nowrap dark:text-white tracking-tight">Alkywallet</span> {/* Aumentado tamaño de fuente, bold y tracking */}
                </Link>
                {/* Menú de navegación */}
                <div className="overflow-y-auto py-5 px-3 bg-[#E9F1F7] dark:bg-gray-800">
                    <ul className="space-y-2">
                        {/* Dashboard */}
                        <li>
                            <Link to="/"
                                className="flex items-center p-2 text-[#395C6B] font-medium rounded-lg dark:text-white hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 group transition-colors">
                                <FaThLarge className="size-6 text-current group-hover:text-white transition-colors" />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        {/* Enlace a Cuentas */}
                        <li>
                            <Link
                                to="/accounts"
                                className="flex items-center p-2 text-[#395C6B] font-medium rounded-lg dark:text-white hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 group transition-colors"
                            >
                                <FaUsers className="size-6 text-current group-hover:text-white transition-colors" />
                                <span className="ml-3">Cuentas</span>
                            </Link>
                        </li>
                        {/* Enlace a Tarjetas */}
                        <li>
                            <Link
                                to="/cards"
                                className="flex items-center p-2 text-[#395C6B] font-medium rounded-lg dark:text-white hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 group transition-colors"
                            >
                                <FaCreditCard className="size-6 text-current group-hover:text-white transition-colors" />
                                <span className="ml-3">Tarjetas</span>
                            </Link>
                        </li>
                        {/* Enlace a Depósitos */}
                        <li>
                            <Link
                                to="/deposit"
                                className="flex items-center p-2 text-[#395C6B] font-medium rounded-lg dark:text-white hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 group transition-colors"
                            >
                                <FaBoxOpen className="size-6 text-current group-hover:text-white transition-colors" />
                                <span className="ml-3">Movimentos</span>
                            </Link>
                        </li>
                        {/* Enlace a Transferencias */}
                        <li>
                            <Link
                                to="/transfer"
                                className="flex items-center p-2 text-[#395C6B] font-medium rounded-lg dark:text-white hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 group transition-colors"
                            >
                                <FaExchangeAlt className="size-6 text-current group-hover:text-white transition-colors" />
                                <span className="ml-3">Transferencias</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Usuario y acciones */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-500">
                <div className="flex items-center justify-between gap-2 mb-3">
                    <button
                        type="button"
                        className="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="dropdown"
                    >
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                            alt="foto de usuario"
                        />
                        <span className="ml-2 text-[#395C6B] dark:text-black">{user.name}</span>
                    </button>
                    {/* Aquí puedes agregar el menú desplegable si lo necesitas */}
                </div>
                <div className="flex flex-col gap-2">
                    {/* Botón Editar Usuario - Estilo con bg-[#2D3748] y texto blanco */}
                    <Link
                        to="/edit-profile"
                        className="w-full text-center focus:outline-none bg-[#2D3748] text-white font-semibold py-2 rounded-lg
                                   transition-all duration-300 hover:scale-97 shadow-md 
                                   flex items-center justify-center"
                    >
                        <FaUserEdit className="size-5 mr-2" />
                        <span>Editar Usuario</span>
                    </Link>

                    {/* Botón Salir - Mantiene el estilo de degradado rojo */}
                    <button
                        className="w-full text-center focus:outline-none text-[#2D3748] font-semibold py-2 rounded-lg transition-all duration-300 hover:scale-97 shadow-md
                                   bg-[linear-gradient(to_right,_#FF9A9E,_#F6416C)]  flex items-center justify-center"
                        onClick={startLogOut}
                    >
                        <FaSignOutAlt className="size-6 mr-2" />
                        <span>Salir</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}