import { Link } from 'react-router';
import { useAuthStore } from '../../hooks';
export const Aside = () => {

    const { user, startLogOut } = useAuthStore();

    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-[#E9F1F7] border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between shadow-[2px_0_6px_rgba(0,0,0,0.1)]" aria-label="Sidenav" id="drawer-navigation">
            <div>
                {/* Logo y título */}
                <Link to="/" className="flex items-center justify-center mb-3">
                    <img src="https://cdn-icons-png.flaticon.com/128/17215/17215810.png" width="40" height="40" alt="Logo" />
                    <span className="ml-2 text-gray-900 font-semibold whitespace-nowrap dark:text-white">Alkywallet</span>
                </Link>
                {/* Menú de navegación */}
                <div className="overflow-y-auto py-5 px-3 h-full bg-[#E9F1F7] dark:bg-gray-800">
                    <ul className="space-y-2">
                        {/* ... tus items ... */}
                        <li>
                            <Link to="/"
                                className="flex items-center p-2 text-[#395C6B] font-medium rounded-lg dark:text-white hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 group transition-colors ">
                                {/* Icono SVG con cambio de color en hover */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="size-6  group-hover:text-white transition-colors">
                                    <path
                                        fill="currentColor"  // Importante para heredar el color
                                        fillRule="evenodd"
                                        d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        {/* Link to cuentas */}
                        <li>
                            <Link
                                to="/accounts"
                                className="flex items-center p-2 text-[#395C6B] font-medium text-gray-900 rounded-lg dark:text-white hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"
                                    className="size-6 text-[#395C6B] group-hover:text-white transition-colors"
                                >

                                    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                                </svg>
                                <span className="ml-3">Cuentas</span>
                            </Link>
                        </li>
                        {/* Link to Cards */}
                        <li>
                            <Link
                                to="/cards"
                                className="flex items-center p-2 text-[#395C6B] font-medium text-gray-900 rounded-lg dark:text-white hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6" className="size-6 text-[#395C6B] group-hover:text-white transition-colors">
                                    <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                                </svg>
                                <span className="ml-3">Tarjetas</span>
                            </Link>
                        </li>
                        {/* Link to deposit */}
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-2 text-[#395C6B] font-medium text-gray-900 rounded-lg dark:text-white hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6" className="size-6 text-[#395C6B] group-hover:text-white transition-colors">
                                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                                    <path fill-rule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                </svg>
                                <span className="ml-3">Depositos</span>
                            </Link>
                        </li>
                        {/* Link to transfer */}
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-2 text-[#395C6B] font-medium text-gray-900 rounded-lg dark:text-white hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6" className="size-6 text-[#395C6B] group-hover:text-white transition-colors">
                                    <path fill-rule="evenodd" d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                                </svg>
                                <span className="ml-3">Transferencias</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-2 text-[#395C6B] font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-[#395C6B] hover:text-white dark:hover:bg-gray-700 dark:text-white group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6" className="size-6 text-[#395C6B] group-hover:text-white transition-colors">
                                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                                    <path fill-rule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                                </svg>

                                <span className="ml-3">Saldo Almacenado</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Usuario y menú desplegable */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-500">
                <div className="flex items-center justify-between gap-2" >
                    <button
                        type="button"
                        className="flex items-center text-sm  rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="dropdown"
                    >
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                            alt="user photo"
                        />
                        <span className="ml-2 text-[#395C6B] dark:text-black">{user.name}</span>
                    </button>
                    {/* Aquí puedes agregar el menú desplegable si lo necesitas */}
                    <button className="focus:outline-none text-black bg-[#CFD11A] hover:bg-red-200 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={startLogOut}>
                        <i className="fas fa-sign-out-alt"></i>
                        &nbsp;
                        <span>Salir</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}
