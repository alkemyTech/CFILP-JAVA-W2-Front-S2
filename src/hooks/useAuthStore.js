import { useDispatch, useSelector } from "react-redux";
import { walletApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogOut } from "../store/auth/AuthSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    //Metodo para iniciar sesion
    const startLogin = async ({ username, password }) => {

        dispatch(onChecking());

        try {
            const { data } = await walletApi.post("/auth/login", { username, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.username, msg: data.message, id: data.id }));

        } catch (error) {
            dispatch(onLogOut('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
            console.error(error);
        }
    }


    //function to register
    const startRegister = async ({ email, nombre, apellido, password }) => {

        dispatch(onChecking());
        try {
            const { data } = await walletApi.post('/auth/register', { email, nombre, apellido, password, roleRequest: { roleListName: ['ADMIN'] } });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.username, msg: data.message, id: data.id }));

        } catch (error) {
            dispatch(onLogOut(error.response.data?.msg || 'Error creating user'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    };

    //function to check the token
    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) dispatch(onLogOut('There is no token'));

        try {

            const { data } = await walletApi.post('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.username, msg: data.message }));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogOut('Invalid token'));
        }
    };

    //function to logout
    const startLogOut = () => {
        dispatch(onLogOut());
        localStorage.clear();
    }

    return {
        // Properties
        status,
        user,
        errorMessage,

        // Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogOut,
    }
}