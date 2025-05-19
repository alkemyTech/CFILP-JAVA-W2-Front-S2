import { Link } from "react-router";
import { useForm } from "../../hooks";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";
import Swal from "sweetalert2";

const loginFormFields = {
    username: '',
    password: '',
};



export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    //useForm Login
    const {
        username,
        password,
        onInputChange: onLoginInputChange,
        onResetForm
    } = useForm(loginFormFields);

    // Login Submit
    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({ username, password });
        onResetForm();
    }

    // useEffect - errorMessage
    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la Autenticacion', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <section className="bg-[#2D3748] dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white hover:text-red-200">
                    <img className="w-8 h-8 mr-2" src="https://cdn-icons-png.flaticon.com/128/17215/17215810.png" alt="logo" />
                    AlkyWallet
                </a>
                <div className="w-full bg-[#E9F1F7] rounded-2xl shadow-md max-w-md p-8">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl font-bold text-[#0D1B2A]">
                            Ingresa a tu cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={loginSubmit}>
                            <div>
                                <label for="email" className="block mb-1 text-sm text-[#0D1B2A]">Email</label>
                                <input
                                    type="email"
                                    name="username"
                                    id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] text-[#0D1B2A]"
                                    value={username}
                                    onChange={onLoginInputChange}
                                    placeholder="name@company.com"
                                    required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-1 text-sm text-[#0D1B2A]">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={onLoginInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A86FF] text-[#0D1B2A]"
                                    required="" />
                            </div>
                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div> */}
                            <button type="submit" className="w-full bg-[#FFD166] hover:bg-[#FFC300] text-[#0D1B2A] font-semibold py-2 rounded-lg transition">Ingresar</button>
                            <p className="text-[#3A86FF] hover:underline">
                                Tienes una cuenta? <Link to="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrarse</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
