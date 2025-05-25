import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAuthStore } from '../hooks';
import { WalletRouter } from '../wallet/router/WalletRouter';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <div className="flex flex-col justify-center items-center h-screen backdrop-blur-sm bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#2D3748]">
                <img src="https://cdn-icons-png.flaticon.com/128/17215/17215810.png" alt="logo" className='w-20 h-20 animate-spin' />
                <h1 className="text-2xl font-bold text-[#E9F1F7] ml-4">Cargando...</h1>
            </div>
        )
    }

    return (
        <>
            {
                <Routes>
                    {
                        (status === 'authenticated') ? (

                            <Route path="/*" element={<WalletRouter />} />
                        ) :
                            (<Route path="/auth/*" element={<AuthRoutes />} />)
                    }
                    <Route path='/*' element={<Navigate to="/auth/login" />} />
                </Routes>
            }

        </>
    )
}
