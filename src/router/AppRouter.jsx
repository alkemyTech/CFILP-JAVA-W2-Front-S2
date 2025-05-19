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
            <div className="flex justify-center items-center h-screen">
                <img src="https://cdn-icons-png.flaticon.com/128/17215/17215810.png" alt="logo" className='w-20 h-20 animate-spin' />
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
