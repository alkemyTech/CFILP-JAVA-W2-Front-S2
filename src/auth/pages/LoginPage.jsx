import { useEffect } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { useAuthStore } from "../../hooks/useAuthStore";

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
        if (errorMessage !== undefined && errorMessage !== null && errorMessage !== '') {
            Swal.fire('Error en la Autenticacion', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#2D3748] bg-cover bg-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-4xl text-white dark:text-white font-semibold py-2 rounded-lg transition-all duration-300 hover:scale-120">
                    <img className="w-8 h-8 mr-2" src="https://cdn-icons-png.flaticon.com/128/17215/17215810.png" alt="logo" />
                    AlkyWallet
                </a>
                <div className="w-full bg-[#E9F1F7] rounded-2xl shadow-lg shadow-blue-900/10 max-w-md p-8 transition-all duration-300">
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
                            <button type="submit" className="w-full bg-[linear-gradient(to_right,_#FF9A9E,_#F6416C)] hover:opacity-90 text-[#2D3748] font-semibold py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-md">Ingresar</button>
                            <p className="text-sm text-[#0D1B2A] text-center">
                                ¿No tienes una cuenta? <Link to="/auth/register" className="text-[#3A86FF] font-medium hover:underline">Regístrate</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
