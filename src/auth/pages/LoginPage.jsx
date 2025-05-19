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
        <section className="bg-[url(https://images.unsplash.com/photo-1742750989574-3412f440a0c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white hover:text-red-200">
                    <img className="w-8 h-8 mr-2" src="https://cdn-icons-png.flaticon.com/128/17215/17215810.png" alt="logo" />
                    AlkyWallet
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Ingresa a tu cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={loginSubmit}>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    name="username"
                                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={username}
                                    onChange={onLoginInputChange}
                                    placeholder="name@company.com"
                                    required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={onLoginInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            <button type="submit" className="w-full cursor-pointer text-black bg-red-100 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-s px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ingresar</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Tienes una cuenta? <Link to="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrarse</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
